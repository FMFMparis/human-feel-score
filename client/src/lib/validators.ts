import { z } from "zod";

export const urlSchema = z
  .string()
  .url()
  .refine((url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }, "Please enter a valid URL");
