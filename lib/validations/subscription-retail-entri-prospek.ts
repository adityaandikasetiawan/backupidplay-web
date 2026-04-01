import { z } from 'zod';

// Schema dengan validasi yang lebih ketat
export const subscriptionRetailEntriProspekSchema = z.object({
  zip_code: z.string().regex(/^\d{5}$/, 'Zip code must be 5 digits'),
  provider_id: z.string().min(1, 'Provider ID is required'),
  fullname: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  phone: z
    .string()
    .regex(/^(\+62|62|0)8[1-9][0-9]{6,9}$/, 'Invalid Indonesian phone number format'),
  latitude: z.string().regex(/^-?\d+\.?\d*$/, 'Invalid latitude format'),
  longitude: z.string().regex(/^-?\d+\.?\d*$/, 'Invalid longitude format'),
  ktp: z.string().optional(),
  // .refine((val) => !val || val.length === 0 || /^\d{16}$/.test(val), 'KTP must be 16 digits'),
  services: z.string().min(1, 'Services is required'),
  harga: z.string().regex(/^\d+$/, 'Harga must be numeric'),
  product_code: z.string().min(1, 'Product code is required')
});

// Type untuk strict schema
export type SubscriptionRetailEntriProspekType = z.infer<
  typeof subscriptionRetailEntriProspekSchema
>;
