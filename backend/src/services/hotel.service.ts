import { v2 as cloudinary } from 'cloudinary';
import { env } from '../config/env';
import { supabase } from '../config/supabase';
import { UpdateProfileInput, CreateDonationInput, UpdateDonationInput } from '../types/hotel.types';

cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET
});

export class HotelService {
    static async uploadImage(fileBuffer: Buffer): Promise<string> {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'foodbridge/donations' },
                (error, result) => {
                    if (error) return reject(error);
                    if (result) return resolve(result.secure_url);
                    reject(new Error('Unknown Cloudinary upload error'));
                }
            );
            uploadStream.end(fileBuffer);
        });
    }

    static async getProfile(userId: string) {
        const { data: user, error: userError } = await supabase.from('users').select('*').eq('id', userId).single();
        const { data: hotel, error: hotelError } = await supabase.from('hotels').select('*').eq('id', userId).single();

        if (userError || hotelError) throw new Error('Failed to fetch profile');
        
        const { password_hash, ...safeUser } = user;
        return { ...safeUser, hotel_details: hotel };
    }

    static async updateProfile(userId: string, data: UpdateProfileInput) {
        const userFields = {
            first_name: data.first_name,
            last_name: data.last_name,
            phone: data.phone,
            address: data.address,
            latitude: data.latitude,
            longitude: data.longitude
        };

        const hotelFields = {
            name: data.name,
            license_number: data.license_number,
            food_safety_rating: data.food_safety_rating,
            operating_hours: data.operating_hours,
            hotel_type: data.hotel_type,
            manager_name: data.manager_name,
            manager_phone: data.manager_phone,
            manager_email: data.manager_email,
            fssai_number: data.fssai_number,
            business_registration_number: data.business_registration_number,
            gst_number: data.gst_number,
            average_daily_surplus_meals: data.average_daily_surplus_meals,
            accepted_food_categories: data.accepted_food_categories,
            logo_url: data.logo_url
        };

        const cleanUserFields = Object.fromEntries(Object.entries(userFields).filter(([_, v]) => v !== undefined));
        const cleanHotelFields = Object.fromEntries(Object.entries(hotelFields).filter(([_, v]) => v !== undefined));

        if (Object.keys(cleanUserFields).length > 0) {
            const { error } = await supabase.from('users').update(cleanUserFields).eq('id', userId);
            if (error) throw new Error(`User update failed: ${error.message}`);
        }

        if (Object.keys(cleanHotelFields).length > 0) {
            const { error } = await supabase.from('hotels').update(cleanHotelFields).eq('id', userId);
            if (error) throw new Error(`Hotel update failed: ${error.message}`);
        }

        return this.getProfile(userId);
    }

    static async createDonation(hotelId: string, data: CreateDonationInput, files: Express.Multer.File[]) {
        const imageUrls: string[] = [];
        
        for (const file of files) {
            const url = await this.uploadImage(file.buffer);
            imageUrls.push(url);
        }

        const { data: donation, error } = await supabase
            .from('donations')
            .insert([{
                hotel_id: hotelId,
                ...data,
                images: imageUrls
            }])
            .select()
            .single();

        if (error) throw new Error(`Failed to create donation: ${error.message}`);
        return donation;
    }

    static async getDonations(hotelId: string) {
        const { data, error } = await supabase
            .from('donations')
            .select('*')
            .eq('hotel_id', hotelId)
            .order('created_at', { ascending: false });

        if (error) throw new Error(`Failed to fetch donations: ${error.message}`);
        return data;
    }

    static async getDonationById(hotelId: string, donationId: string) {
        const { data, error } = await supabase
            .from('donations')
            .select('*')
            .eq('hotel_id', hotelId)
            .eq('id', donationId)
            .single();

        if (error || !data) throw new Error('Donation not found or unauthorized');
        return data;
    }

    static async updateDonation(hotelId: string, donationId: string, data: UpdateDonationInput) {
        const { data: donation, error } = await supabase
            .from('donations')
            .update(data)
            .eq('id', donationId)
            .eq('hotel_id', hotelId)
            .select()
            .single();

        if (error || !donation) throw new Error('Donation not found or unauthorized to update');
        return donation;
    }

    static async deleteDonation(hotelId: string, donationId: string) {
        const { error, count } = await supabase
            .from('donations')
            .delete({ count: 'exact' })
            .eq('id', donationId)
            .eq('hotel_id', hotelId);

        if (error || count === 0) throw new Error('Donation not found or unauthorized to delete');
        return true;
    }

    static async getAnalytics(hotelId: string) {
        const { data: donations } = await supabase
            .from('donations')
            .select('status, quantity_kg, serves_people')
            .eq('hotel_id', hotelId);
            
        let totalDonations = 0;
        let totalMeals = 0;
        let totalKg = 0;
        
        if (donations) {
            totalDonations = donations.length;
            donations.forEach(d => {
                totalMeals += d.serves_people || 0;
                totalKg += Number(d.quantity_kg) || 0;
            });
        }
        
        return { totalDonations, totalMeals, totalKg };
    }

    static async getNotifications(userId: string) {
        const { data, error } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw new Error('Failed to fetch notifications');
        return data;
    }

    static async getReports(userId: string) {
        const { data, error } = await supabase
            .from('reports')
            .select('*')
            .eq('generated_for_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw new Error('Failed to fetch reports');
        return data;
    }
}
