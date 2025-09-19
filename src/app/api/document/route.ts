import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getLoader } from "@/lib/document-loader";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { index } from "@/lib/vector";
import prisma from "@/lib/providers/prisma";

export const POST = async (request: Request) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(), // you need to pass the headers object.
    });

    const userInfo = session?.user;

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, type, size, lastModified, base64 } = await request.json();

    if (!name || !type || !size || !lastModified || !base64) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    // Check if document already exists for this user

    const pdfBuffer = Buffer.from(base64, "base64");
    const blob = new Blob([pdfBuffer], { type: type });

    const loader = getLoader(type, blob);

    const docs = await loader.load();

    if (docs.length === 0) {
      throw new Error("Failed to load document");
    }

    if (type === "application/pdf" && docs[0].metadata.pdf.totalPages > 20) {
      throw new Error("PDF more than 20 pages are not supported");
    }

    const spliter = new RecursiveCharacterTextSplitter({
      chunkSize: 2000,
      chunkOverlap: 100,
    });

    const chunkedDocs = await spliter.splitDocuments(docs);
    const namespace = index.namespace(`${session.user.id}`);
    console.log(namespace);

    // Create structured embeddings with college context
    const formattedChunks = chunkedDocs.map((chunk, index) => ({
      id: `${session.user.id}-${userInfo?.name}-${name}-${index}`,
      content: chunk.pageContent,
      metadata: {
        source: name,

        userId: session.user.id,
        documentType: type,
        chunkIndex: index,
        totalChunks: chunkedDocs.length,
      },
    }));

    for (const doc of formattedChunks) {
      try {
        await namespace.upsert({
          id: doc.id,
          data: doc.content,
          metadata: doc.metadata,
        });
      } catch (e) {
        console.error(e);
        throw new Error("Failed to ingest document");
      }
    }

    // Insert document record with user relationship
    await prisma.document.create({
      data: {
        userId: session.user.id,
        name,
        type: "document",
        status: "success",
      },
    });

    return NextResponse.json(
      { message: "Document Ingested Successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    throw new Error("Failed to create document");
  }
};
