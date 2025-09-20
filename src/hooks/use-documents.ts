import { useQuery } from "@tanstack/react-query";

interface Document {
  id: string;
  name: string;
  type: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const fetchDocuments = async (): Promise<Document[]> => {
  const response = await fetch("/api/documents");
  if (!response.ok) {
    throw new Error("Failed to fetch documents");
  }
  return response.json();
};

export const useDocuments = () => {
  return useQuery({
    queryKey: ["recent-documents"],
    queryFn: fetchDocuments,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
