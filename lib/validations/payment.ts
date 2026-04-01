import { z } from 'zod';

// Enum untuk gateway payment
export const PaymentGatewayEnum = z.enum(['MIDTRANS'], {
  message: 'Gateway must be MIDTRANS'
});

// Enum untuk source
export const PaymentSourceEnum = z.enum(['MOBILE'], {
  message: 'Source must be MOBILE'
});

// Schema untuk payment
export const paymentSchema = z.object({
  task_id: z.string().min(1, 'Task ID is required'),
  gateway: PaymentGatewayEnum,
  source: PaymentSourceEnum
});

// Type untuk payment schema
export type PaymentType = z.infer<typeof paymentSchema>;
