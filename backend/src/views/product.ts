import z from "zod";

export const getProductSchema = z.object({
  skip: z
    .string()
    .optional()
    .transform((v) => Number(v ?? 0))
    .refine((v) => Number.isInteger(v) && v >= 0, {
      message: "skip must be a non-negative integer",
    }),

  take: z
    .string()
    .optional()
    .transform((v) => Number(v ?? 10))
    .refine((v) => Number.isInteger(v) && v > 0 && v <= 50, {
      message: "take must be between 1 and 50",
    }),

  filter: z.string().optional(),
});

export type GetProductView = z.infer<typeof getProductSchema>;
