import { supabase } from '../config/supabase';
import { RegisterInput, LoginInput } from '../types/auth.types';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';

export class AuthService {
    static async register(data: RegisterInput) {
        const { data: existingUser } = await supabase
            .from('users')
            .select('id')
            .eq('email', data.email)
            .single();

        if (existingUser) {
            throw new Error('User already exists');
        }

        const password_hash = await hashPassword(data.password);

        const { data: newUser, error: userError } = await supabase
            .from('users')
            .insert([{
                email: data.email,
                password_hash,
                role: data.role,
                first_name: data.firstName,
                last_name: data.lastName,
                phone: data.phone
            }])
            .select()
            .single();

        if (userError || !newUser) {
            throw new Error(`Failed to create user: ${userError?.message}`);
        }

        try {
            if (data.role === 'hotel') {
                await supabase.from('hotels').insert([{
                    id: newUser.id,
                    name: data.hotelName || `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Unnamed Hotel'
                }]);
            } else if (data.role === 'ngo') {
                await supabase.from('ngos').insert([{
                    id: newUser.id,
                    name: data.ngoName || `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Unnamed NGO',
                    registration_number: data.registrationNumber
                }]);
            } else if (data.role === 'volunteer') {
                await supabase.from('volunteers').insert([{
                    id: newUser.id,
                    vehicle_type: data.vehicleType
                }]);
            }
        } catch (error) {
            console.error('Failed to create role profile', error);
        }

        const token = generateToken({ id: newUser.id, role: newUser.role });
        const { password_hash: _, ...userWithoutPassword } = newUser;

        return { user: userWithoutPassword, token };
    }

    static async login(data: LoginInput) {
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', data.email)
            .single();

        if (error || !user) {
            throw new Error('Invalid email or password');
        }

        const isMatch = await comparePassword(data.password, user.password_hash);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }

        const token = generateToken({ id: user.id, role: user.role });
        const { password_hash, ...userWithoutPassword } = user;

        let profile = null;
        if (user.role === 'hotel') {
            const { data } = await supabase.from('hotels').select('*').eq('id', user.id).single();
            profile = data;
        } else if (user.role === 'ngo') {
            const { data } = await supabase.from('ngos').select('*').eq('id', user.id).single();
            profile = data;
        } else if (user.role === 'volunteer') {
            const { data } = await supabase.from('volunteers').select('*').eq('id', user.id).single();
            profile = data;
        }

        return { user: { ...userWithoutPassword, profile }, token };
    }

    static async getUserById(userId: string) {
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error || !user) {
            throw new Error('User not found');
        }

        const { password_hash, ...userWithoutPassword } = user;

        let profile = null;
        if (user.role === 'hotel') {
            const { data } = await supabase.from('hotels').select('*').eq('id', userId).single();
            profile = data;
        } else if (user.role === 'ngo') {
            const { data } = await supabase.from('ngos').select('*').eq('id', userId).single();
            profile = data;
        } else if (user.role === 'volunteer') {
            const { data } = await supabase.from('volunteers').select('*').eq('id', userId).single();
            profile = data;
        }

        return { ...userWithoutPassword, profile };
    }
}
