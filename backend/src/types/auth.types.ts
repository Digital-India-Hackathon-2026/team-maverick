import { z } from 'zod';

export const RoleEnum = z.enum(['admin', 'hotel', 'ngo', 'volunteer']);

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: RoleEnum,
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  // For Hotels
  hotelName: z.string().optional(),
  // For NGOs
  ngoName: z.string().optional(),
  registrationNumber: z.string().optional(),
  // For Volunteers
  vehicleType: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}
