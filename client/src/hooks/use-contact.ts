import { useMutation } from "@tanstack/react-query";
import { api, type ContactMessageInput } from "@shared/routes";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

function buildApiUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${API_BASE_URL}${path}`;
}

export function useCreateContactMessage() {
  return useMutation({
    mutationFn: async (data: ContactMessageInput) => {
      const validated = api.contact.create.input.parse(data);

      const res = await fetch(buildApiUrl(api.contact.create.path), {
        method: api.contact.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const errorData = await res.json();
          const error = api.contact.create.responses[400].parse(errorData);
          throw new Error(error.message || "Validation failed");
        }

        throw new Error("Failed to send message. Please try again later.");
      }

      return api.contact.create.responses[201].parse(await res.json());
    },
  });
}