import { z } from 'zod';

export const UpdateProfileSchema = z.object({
    name: z.string().optional(),
    license_number: z.string().optional(),
    food_safety_rating: z.string().optional(),
    operating_hours: z.string().optional(),
    hotel_type: z.string().optional(),
    manager_name: z.string().optional(),
    manager_phone: z.string().optional(),
    manager_email: z.string().email().optional(),
    fssai_number: z.string().optional(),
    business_registration_number: z.string().optional(),
    gst_number: z.string().optional(),
    average_daily_surplus_meals: z.number().int().optional(),
    accepted_food_categories: z.array(z.string()).optional(),
    logo_url: z.string().url().optional(),
    // Base user fields
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
});

export const CreateDonationSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    food_type: z.string().min(1),
    quantity_kg: z.number().positive(),
    serves_people: z.number().int().positive().optional(),
    preparation_time: z.string().datetime().optional(), // ISO string
    expiry_time: z.string().datetime(), // ISO string
    pickup_latitude: z.number().optional(),
    pickup_longitude: z.number().optional(),
    food_category: z.string().optional(),
    meals_count: z.number().int().optional(),
    storage_type: z.string().optional(),
    pickup_address: z.string().optional(),
    pickup_contact_name: z.string().optional(),
    pickup_contact_phone: z.string().optional(),
    special_instructions: z.string().optional(),
});

export const UpdateDonationSchema = CreateDonationSchema.partial().extend({
    status: z.enum(['available', 'cancelled']).optional(),
});
