import z from "zod";

export const placeOrderSchema = z.array(
  z.object({
    id: z.int(),
    quantity: z.int().min(1).max(10),
  }),
);

export type PlaceOrderRequest = z.infer<typeof placeOrderSchema>;
