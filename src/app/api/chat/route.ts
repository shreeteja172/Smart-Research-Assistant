// import { auth } from "@/lib/auth";
// import { NextResponse } from "next/server";
// import { headers } from "next/headers";
// import { index } from "@/lib/vector";
// import { streamText, convertToCoreMessages } from "ai";
// import { openai } from "@ai-sdk/openai";

// export const runtime = "edge";

// export async function POST(request: Request) {
//   try {
//     // Authenticate user
//     const session = await auth.api.getSession({
//       headers: await headers(),
//     });

//     if (!session) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const { messages } = await request.json();

//     if (!messages || !Array.isArray(messages) || messages.length === 0) {
//       return NextResponse.json(
//         { message: "Messages are required" },
//         { status: 400 }
//       );
//     }

//     // Get the latest user message
//     const latestMessage = messages[messages.length - 1];
//     const userQuery = latestMessage.content;

//     // Search for relevant context from user's namespace in Upstash
//     const namespace = index.namespace(`${session.user.id}`);

//     let contextualInfo = "";

//     try {
//       // Query the vector database for relevant documents
//       const searchResults = await namespace.query({
//         data: userQuery,
//         topK: 5,
//         includeMetadata: true,
//       });

//       if (searchResults && searchResults.length > 0) {
//         contextualInfo = searchResults
//           .map((result, index) => {
//             const content = result.data || "";
//             const metadata = result.metadata || {};
//             const score = result.score || 0;

//             return `
// Document ${index + 1} (Relevance: ${(score * 100).toFixed(1)}%):
// Source: ${metadata.source || "Unknown"}
// Content: ${content}
// ---`;
//           })
//           .join("\n");
//       }
//     } catch (vectorError) {
//       console.error("Vector search error:", vectorError);
//       // Continue without context if vector search fails
//     }

//     // Prepare the system prompt with context
//     const systemPrompt = `You are a helpful research assistant. You have access to the user's uploaded documents and can provide detailed answers based on their content.

// ${
//   contextualInfo
//     ? `Here is relevant information from the user's documents:

// ${contextualInfo}

// Please use this information to provide a comprehensive and accurate response to the user's question. If the provided context doesn't fully answer the question, let the user know and provide the best answer you can based on the available information.`
//     : "The user hasn't uploaded any relevant documents for this query. Please provide a helpful response based on your general knowledge, and suggest that they upload relevant documents for more specific assistance."
// }

// Guidelines:
// - Always cite specific documents when referencing information
// - Be clear about what information comes from their documents vs general knowledge
// - Provide detailed, well-structured responses
// - If you need more specific information, suggest what type of documents would be helpful`;

//     // Prepare messages for the AI model
//     const coreMessages = convertToCoreMessages([
//       { role: "system", content: systemPrompt },
//       ...messages,
//     ]);

//     // Stream the response using Vercel AI SDK
//     const result = await streamText({
//       model: openai("gpt-4o-mini"),
//       messages: coreMessages,
//       temperature: 0.7,
//       stream: true,
//     });

//     return result.toDataStreamResponse();
//   } catch (error) {
//     console.error("Chat API error:", error);

//     return NextResponse.json(
//       {
//         message: "Internal server error",
//         error:
//           process.env.NODE_ENV === "development" ? error.message : undefined,
//       },
//       { status: 500 }
//     );
//   }
// }
