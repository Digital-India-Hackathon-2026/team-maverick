import { Request, Response } from 'express';
import { z } from 'zod';
import { HotelService } from '../services/hotel.service';
import { UpdateProfileSchema, CreateDonationSchema, UpdateDonationSchema } from '../validators/hotel.validator';

export class HotelController {
    static async getProfile(req: Request, res: Response) {
        try {
            const profile = await HotelService.getProfile(req.user!.id);
            res.status(200).json({ status: 'success', data: profile });
        } catch (error: any) {
            res.status(400).json({ status: 'error', message: error.message });
        }
    }

    static async updateProfile(req: Request, res: Response) {
        try {
            const validated = UpdateProfileSchema.parse(req.body);
            const profile = await HotelService.updateProfile(req.user!.id, validated);
            res.status(200).json({ status: 'success', data: profile });
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ status: 'error', message: 'Validation failed', errors: error.errors });
            } else {
                res.status(400).json({ status: 'error', message: error.message });
            }
        }
    }

    static async createDonation(req: Request, res: Response) {
        try {
            const parsedBody = {
                ...req.body,
                quantity_kg: req.body.quantity_kg ? Number(req.body.quantity_kg) : undefined,
                serves_people: req.body.serves_people ? Number(req.body.serves_people) : undefined,
                pickup_latitude: req.body.pickup_latitude ? Number(req.body.pickup_latitude) : undefined,
                pickup_longitude: req.body.pickup_longitude ? Number(req.body.pickup_longitude) : undefined,
                meals_count: req.body.meals_count ? Number(req.body.meals_count) : undefined,
            };

            const validated = CreateDonationSchema.parse(parsedBody);
            const files = req.files as Express.Multer.File[] || [];
            
            const donation = await HotelService.createDonation(req.user!.id, validated, files);
            res.status(201).json({ status: 'success', data: donation });
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ status: 'error', message: 'Validation failed', errors: error.errors });
            } else {
                res.status(400).json({ status: 'error', message: error.message });
            }
        }
    }

    static async getDonations(req: Request, res: Response) {
        try {
            const donations = await HotelService.getDonations(req.user!.id);
            res.status(200).json({ status: 'success', data: donations });
        } catch (error: any) {
            res.status(400).json({ status: 'error', message: error.message });
        }
    }

    static async getDonationById(req: Request, res: Response) {
        try {
            const donation = await HotelService.getDonationById(req.user!.id, req.params.id);
            res.status(200).json({ status: 'success', data: donation });
        } catch (error: any) {
            res.status(404).json({ status: 'error', message: error.message });
        }
    }

    static async updateDonation(req: Request, res: Response) {
        try {
            const validated = UpdateDonationSchema.parse(req.body);
            const donation = await HotelService.updateDonation(req.user!.id, req.params.id, validated);
            res.status(200).json({ status: 'success', data: donation });
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ status: 'error', message: 'Validation failed', errors: error.errors });
            } else {
                res.status(400).json({ status: 'error', message: error.message });
            }
        }
    }

    static async deleteDonation(req: Request, res: Response) {
        try {
            await HotelService.deleteDonation(req.user!.id, req.params.id);
            res.status(200).json({ status: 'success', message: 'Donation deleted successfully' });
        } catch (error: any) {
            res.status(404).json({ status: 'error', message: error.message });
        }
    }

    static async getAnalytics(req: Request, res: Response) {
        try {
            const analytics = await HotelService.getAnalytics(req.user!.id);
            res.status(200).json({ status: 'success', data: analytics });
        } catch (error: any) {
            res.status(400).json({ status: 'error', message: error.message });
        }
    }

    static async getNotifications(req: Request, res: Response) {
        try {
            const notifications = await HotelService.getNotifications(req.user!.id);
            res.status(200).json({ status: 'success', data: notifications });
        } catch (error: any) {
            res.status(400).json({ status: 'error', message: error.message });
        }
    }

    static async getReports(req: Request, res: Response) {
        try {
            const reports = await HotelService.getReports(req.user!.id);
            res.status(200).json({ status: 'success', data: reports });
        } catch (error: any) {
            res.status(400).json({ status: 'error', message: error.message });
        }
    }
}
