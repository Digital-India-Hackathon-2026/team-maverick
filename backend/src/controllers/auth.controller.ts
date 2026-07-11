import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { RegisterSchema, LoginSchema } from '../types/auth.types';
import { z } from 'zod';

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const validatedData = RegisterSchema.parse(req.body);
            const { user, token } = await AuthService.register(validatedData);

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.status(201).json({ status: 'success', data: { user, token } });
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ status: 'error', message: 'Validation failed', errors: error.errors });
            } else {
                res.status(400).json({ status: 'error', message: error.message });
            }
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const validatedData = LoginSchema.parse(req.body);
            const { user, token } = await AuthService.login(validatedData);

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.status(200).json({ status: 'success', data: { user, token } });
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ status: 'error', message: 'Validation failed', errors: error.errors });
            } else {
                res.status(401).json({ status: 'error', message: error.message });
            }
        }
    }

    static async logout(req: Request, res: Response) {
        res.clearCookie('token');
        res.status(200).json({ status: 'success', message: 'Logged out successfully' });
    }

    static async getMe(req: Request, res: Response) {
        try {
            if (!req.user) {
                res.status(401).json({ status: 'error', message: 'Not authenticated' });
                return;
            }

            const user = await AuthService.getUserById(req.user.id);
            res.status(200).json({ status: 'success', data: { user } });
        } catch (error: any) {
            res.status(404).json({ status: 'error', message: error.message });
        }
    }
}
