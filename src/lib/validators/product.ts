import { z } from 'zod'

export const productSchema = z.object({
  name: z
    .string()
    .min(2, 'Product name must be at least 2 characters'),

  price: z
    .number()
    .min(1, 'Price must be greater than 0'),

  stock: z
    .number()
    .min(0, 'Stock cannot be negative'),

  image: z.string().optional(),
})

export type ProductInput = z.infer<typeof productSchema>
