import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "0m0s8nai",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});