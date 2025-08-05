import { useAuth } from "@clerk/clerk-react";

export const useAuthenticatedApi = () => {
  const { getToken } = useAuth();

  const authenticatedFetch = async (
    endpoint: string,
    options: RequestInit = {}
  ) => {
    try {
      const token = await getToken({ template: "test-template" });

      const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(endpoint, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Authenticated API call error:", error);
      throw error;
    }
  };

  return authenticatedFetch;
};
