import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { HotelController } from '../controllers/hotel.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Role verification middleware for Hotel
const requireHotelRole = (req: Request, res: Response, next: NextFunction): void => {
    if (req.user?.role !== 'hotel') {
        res.status(403).json({ status: 'error', message: 'Access denied. Hotel role required.' });
        return;
    }
    next();
};

// All routes require authentication and Hotel role
router.use(authMiddleware);
router.use(requireHotelRole);

router.get('/profile', HotelController.getProfile);
router.put('/profile', HotelController.updateProfile);

// Donations
router.post('/donations', upload.array('images', 5), HotelController.createDonation);
router.get('/donations', HotelController.getDonations);
router.get('/donations/:id', HotelController.getDonationById);
router.put('/donations/:id', HotelController.updateDonation);
router.delete('/donations/:id', HotelController.deleteDonation);

// Insights
router.get('/analytics', HotelController.getAnalytics);
router.get('/notifications', HotelController.getNotifications);
router.get('/reports', HotelController.getReports);

export default router;
