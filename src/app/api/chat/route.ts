import { convertToUIMessages } from "@/lib/utils";
import { convertToModelMessages, smoothStream, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { index } from "@/lib/vector";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Enhanced context extraction function
async function extractRelevantContext(namespace: any, userQuery: string) {
  try {
    // Primary search with the exact query
    const primaryResults = await namespace.query({
      includeData: true,
      includeMetadata: true,
      topK: 5,
      data: userQuery,
    });

    // Extract key terms for secondary search
    const keywords = userQuery
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 3)
      .slice(0, 3)
      .join(" ");

    // Secondary search with keywords if different from original query
    let secondaryResults = [];
    if (keywords !== userQuery.toLowerCase() && keywords.length > 0) {
      secondaryResults = await namespace.query({
        includeData: true,
        includeMetadata: true,
        topK: 3,
        data: keywords,
      });
    }

    // Combine and deduplicate results
    const allResults = [...primaryResults, ...secondaryResults];
    const uniqueResults = allResults.filter(
      (result, index, array) =>
        array.findIndex((r) => r.id === result.id) === index
    );

    // Sort by relevance score
    const sortedResults = uniqueResults.sort(
      (a, b) => (b.score || 0) - (a.score || 0)
    );

    return sortedResults.slice(0, 6); // Return top 6 most relevant
  } catch (error) {
    console.error("Context extraction error:", error);
    return [];
  }
}

// Enhanced context formatting function
function formatContextForResearch(contextResults: any[]) {
  if (!contextResults || contextResults.length === 0) {
    return "No relevant documents found in the knowledge base.";
  }

  return contextResults
    .map((result, index) => {
      const content = result.data || "";
      const metadata = result.metadata || {};
      const score = (result.score || 0) * 100;

      return `
📄 Document ${index + 1} (Relevance: ${score.toFixed(1)}%)
📂 Source: ${metadata.source || "Unknown Document"}
📊 Type: ${metadata.documentType || "Unknown Type"}
🔍 Content Preview:
${content.substring(0, 500)}${content.length > 500 ? "..." : ""}
${"─".repeat(50)}`;
    })
    .join("\n");
}

export async function POST(request: Request) {
  let requestBody;
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const json = await request.json();
    console.log("Received request body:", json);
    requestBody = json;

    // Extract user query from the request
    const userQuery = requestBody.message?.parts?.[0]?.text || "";

    if (!userQuery.trim()) {
      return new Response("Empty query provided", { status: 400 });
    }

    // Use the actual message from the request
    const messagesFromDb = [
      {
        id: requestBody.message?.id || "1",
        role: requestBody.message.role,
        parts: requestBody.message.parts,
        createdAt: new Date(),
        chatId: requestBody.id || "1",
        attachments: [],
      },
    ];

    const uiMessages = [...convertToUIMessages(messagesFromDb)];
    const modelMessages = convertToModelMessages(uiMessages).slice(-10);

    // Enhanced context extraction
    const namespace = await index.namespace(session?.user?.id as string);
    const contextResults = await extractRelevantContext(namespace, userQuery);
    const formattedContext = formatContextForResearch(contextResults);

    console.log("Extracted context:", contextResults);

    // Enhanced research agent system prompt
    const researchSystemPrompt = `You are an advanced AI Research Agent with access to the user's personal knowledge base. Your primary role is to conduct thorough research and provide comprehensive, well-sourced answers.

🎯 **Research Capabilities:**
- Deep analysis of uploaded documents and knowledge base
- Cross-referencing information across multiple sources
- Identifying patterns, connections, and insights
- Providing evidence-based conclusions
- Suggesting follow-up research areas

📚 **Knowledge Base Context:**
${formattedContext}

🔬 **Research Guidelines:**
1. **Comprehensive Analysis**: Always analyze ALL available context thoroughly
2. **Source Attribution**: Clearly cite which documents/sources inform your response
3. **Evidence-Based**: Support all claims with specific evidence from the knowledge base
4. **Gap Identification**: Identify what information might be missing and suggest additional research
5. **Multiple Perspectives**: Consider different angles and interpretations of the data
6. **Actionable Insights**: Provide practical recommendations based on your research

📝 **Response Format:**
- Start with a brief executive summary
- Provide detailed analysis with source citations
- Include relevant quotes or data points
- End with key insights and recommended next steps
- If information is insufficient, clearly state what additional data would be helpful

🧠 **Research Approach:**
- Be thorough, analytical, and objective
- Look for patterns and connections across documents
- Consider context and implications
- Provide both direct answers and broader insights
- Suggest related research questions or areas to explore

Remember: You are not just answering questions - you are conducting research to provide the most comprehensive and valuable insights possible.`;

    const result = streamText({
      model: openai("gpt-4o"),
      messages: modelMessages,
      system: researchSystemPrompt,
      temperature: 0.3, // Lower temperature for more focused research responses
      experimental_transform: smoothStream({
        chunking: "word",
        delayInMs: 15,
      }),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details:
          process.env.NODE_ENV === "development" ? errorMessage : undefined,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
