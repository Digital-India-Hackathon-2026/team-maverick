import http from 'http';
import app from './app';
import { Server } from 'socket.io';
import { env } from './config/env';
import { verifySupabaseConnection } from './config/supabase';

const PORT = env.PORT;

const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const startServer = async () => {
    const isConnected = await verifySupabaseConnection();

    if (!isConnected) {
        console.error('❌ Failed to connect to Supabase. Server shutting down.');
        process.exit(1);
    }

    server.listen(PORT, () => {
        console.log('✓ FoodBridge Backend Started');
        console.log('✓ Connected to Supabase');
    });
};

startServer();
