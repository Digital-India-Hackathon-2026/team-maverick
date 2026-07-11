import { z } from 'zod';
import { UpdateProfileSchema, CreateDonationSchema, UpdateDonationSchema } from '../validators/hotel.validator';

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
export type CreateDonationInput = z.infer<typeof CreateDonationSchema>;
export type UpdateDonationInput = z.infer<typeof UpdateDonationSchema>;
