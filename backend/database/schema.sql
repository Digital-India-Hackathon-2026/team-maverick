-- PostgreSQL Database Schema for FoodBridge
-- Designed for Supabase with Normalized Structure

-- Enable UUID extension if not already enabled (Supabase typically has this enabled by default)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. ENUMS
-- ==========================================
CREATE TYPE user_role AS ENUM ('admin', 'hotel', 'ngo', 'volunteer');
CREATE TYPE donation_status AS ENUM ('available', 'requested', 'accepted', 'assigned', 'picked_up', 'delivered', 'cancelled', 'expired');
CREATE TYPE delivery_status AS ENUM ('pending', 'in_transit', 'delivered', 'failed');
CREATE TYPE complaint_status AS ENUM ('open', 'investigating', 'resolved', 'closed');

-- ==========================================
-- 2. CORE TABLES
-- ==========================================

-- Users (Base table for authentication & common profile info)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    profile_image_url VARCHAR(500), -- Cloudinary URL
    address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Hotels (Donors)
CREATE TABLE hotels (
    id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    license_number VARCHAR(100),
    food_safety_rating VARCHAR(50),
    operating_hours VARCHAR(100),
    hotel_type VARCHAR(100),
    manager_name VARCHAR(100),
    manager_phone VARCHAR(20),
    manager_email VARCHAR(255),
    fssai_number VARCHAR(100),
    business_registration_number VARCHAR(100),
    gst_number VARCHAR(100),
    average_daily_surplus_meals INTEGER,
    accepted_food_categories TEXT[],
    verification_status VARCHAR(50) DEFAULT 'pending',
    logo_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- NGOs (Receivers)
CREATE TABLE ngos (
    id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    registration_number VARCHAR(100) UNIQUE,
    capacity_people INTEGER,
    serving_areas TEXT[], -- Array of areas or zip codes
    representative_name VARCHAR(100),
    representative_phone VARCHAR(20),
    representative_email VARCHAR(255),
    storage_capacity VARCHAR(100),
    current_storage VARCHAR(100),
    storage_type VARCHAR(100),
    meals_capacity_per_day INTEGER,
    accepted_food_categories TEXT[],
    verification_status VARCHAR(50) DEFAULT 'pending',
    logo_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Volunteers (Delivery Personnel)
CREATE TABLE volunteers (
    id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    vehicle_type VARCHAR(50),
    vehicle_number VARCHAR(50),
    license_number VARCHAR(100),
    is_available BOOLEAN DEFAULT true,
    date_of_birth DATE,
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    government_id_number VARCHAR(100),
    vehicle_registration_number VARCHAR(100),
    driving_license_number VARCHAR(100),
    availability_status VARCHAR(50) DEFAULT 'offline',
    rating DECIMAL(3, 2) DEFAULT 0.0,
    completed_deliveries INTEGER DEFAULT 0,
    verification_status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 3. TRANSACTIONAL TABLES
-- ==========================================

-- Donations
CREATE TABLE donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hotel_id UUID NOT NULL REFERENCES hotels(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    food_type VARCHAR(100) NOT NULL, -- e.g., 'Cooked', 'Raw', 'Packaged'
    quantity_kg DECIMAL(8, 2) NOT NULL,
    serves_people INTEGER,
    preparation_time TIMESTAMP WITH TIME ZONE,
    expiry_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status donation_status DEFAULT 'available',
    images TEXT[], -- Array of Cloudinary URLs
    pickup_latitude DECIMAL(10, 8),
    pickup_longitude DECIMAL(11, 8),
    assigned_ngo_id UUID REFERENCES ngos(id),
    food_category VARCHAR(100),
    meals_count INTEGER,
    storage_type VARCHAR(100),
    pickup_address TEXT,
    pickup_contact_name VARCHAR(100),
    pickup_contact_phone VARCHAR(20),
    assigned_volunteer_id UUID REFERENCES volunteers(id),
    special_instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Deliveries
CREATE TABLE deliveries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donation_id UUID NOT NULL REFERENCES donations(id),
    volunteer_id UUID REFERENCES volunteers(id),
    status delivery_status DEFAULT 'pending',
    pickup_time TIMESTAMP WITH TIME ZONE,
    dropoff_time TIMESTAMP WITH TIME ZONE,
    distance_km DECIMAL(6, 2),
    estimated_duration_mins INTEGER,
    notes TEXT,
    pickup_otp VARCHAR(10),
    delivery_otp VARCHAR(10),
    pickup_verified BOOLEAN DEFAULT false,
    delivery_verified BOOLEAN DEFAULT false,
    current_latitude DECIMAL(10, 8),
    current_longitude DECIMAL(11, 8),
    eta_minutes INTEGER,
    route_distance DECIMAL(6, 2),
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 4. SYSTEM TABLES
-- ==========================================

-- Notifications (Real-time updates & alerts)
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50), -- e.g., 'donation_alert', 'delivery_update', 'system'
    is_read BOOLEAN DEFAULT false,
    related_entity_id UUID, -- Can refer to donation_id, delivery_id, etc.
    related_entity_type VARCHAR(50),
    action_url VARCHAR(500),
    priority VARCHAR(50) DEFAULT 'normal',
    sender_id UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Complaints (User reporting issues)
CREATE TABLE complaints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID NOT NULL REFERENCES users(id),
    reported_user_id UUID REFERENCES users(id),
    donation_id UUID REFERENCES donations(id),
    delivery_id UUID REFERENCES deliveries(id),
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status complaint_status DEFAULT 'open',
    resolution_notes TEXT,
    priority VARCHAR(50) DEFAULT 'normal',
    assigned_admin_id UUID REFERENCES users(id),
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Reports (Generated impact/system reports)
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    generated_by UUID REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    report_type VARCHAR(100) NOT NULL, -- e.g., 'monthly_impact', 'hotel_contribution'
    parameters JSONB, -- Criteria used to generate report
    data JSONB NOT NULL, -- The actual report data
    file_url VARCHAR(500), -- Cloudinary PDF link if exported
    generated_for_role VARCHAR(50),
    generated_for_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Analytics (Events logging for Gemini API insights or general metrics)
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(100) NOT NULL, -- e.g., 'donation_created', 'food_wasted', 'delivery_delayed'
    user_id UUID REFERENCES users(id),
    entity_id UUID,
    entity_type VARCHAR(50),
    event_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Dispatch Assignments (AI/Manual allocation)
CREATE TABLE dispatch_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donation_id UUID NOT NULL REFERENCES donations(id) ON DELETE CASCADE,
    ngo_id UUID REFERENCES ngos(id),
    volunteer_id UUID REFERENCES volunteers(id),
    ai_score DECIMAL(5, 2),
    assignment_reason TEXT,
    distance_km DECIMAL(6, 2),
    estimated_time INTEGER,
    assignment_status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Document Uploads (Verification documents)
CREATE TABLE document_uploads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    document_type VARCHAR(100) NOT NULL,
    document_url VARCHAR(500) NOT NULL,
    verification_status VARCHAR(50) DEFAULT 'pending',
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 5. INDEXES (Performance Optimization)
-- ==========================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_location ON users(latitude, longitude);

CREATE INDEX idx_donations_status ON donations(status);
CREATE INDEX idx_donations_hotel ON donations(hotel_id);
CREATE INDEX idx_donations_ngo ON donations(assigned_ngo_id);
CREATE INDEX idx_donations_expiry ON donations(expiry_time);

CREATE INDEX idx_deliveries_donation ON deliveries(donation_id);
CREATE INDEX idx_deliveries_volunteer ON deliveries(volunteer_id);
CREATE INDEX idx_deliveries_status ON deliveries(status);

CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);
CREATE INDEX idx_analytics_event_type ON analytics_events(event_type);

-- New verification_status indexes
CREATE INDEX idx_hotels_verification ON hotels(verification_status);
CREATE INDEX idx_ngos_verification ON ngos(verification_status);
CREATE INDEX idx_volunteers_verification ON volunteers(verification_status);
CREATE INDEX idx_documents_verification ON document_uploads(verification_status);

-- New created_at indexes
CREATE INDEX idx_donations_created_at ON donations(created_at);
CREATE INDEX idx_deliveries_created_at ON deliveries(created_at);
CREATE INDEX idx_complaints_created_at ON complaints(created_at);
CREATE INDEX idx_dispatch_created_at ON dispatch_assignments(created_at);
CREATE INDEX idx_users_created_at ON users(created_at);

-- New assigned indexes
CREATE INDEX idx_donations_assigned_volunteer ON donations(assigned_volunteer_id);
CREATE INDEX idx_complaints_assigned_admin ON complaints(assigned_admin_id);
CREATE INDEX idx_dispatch_donation_assigned ON dispatch_assignments(donation_id, assignment_status);

-- ==========================================
-- 6. TRIGGERS (Auto-update timestamps)
-- ==========================================
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_modtime BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_hotels_modtime BEFORE UPDATE ON hotels FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_ngos_modtime BEFORE UPDATE ON ngos FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_volunteers_modtime BEFORE UPDATE ON volunteers FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_donations_modtime BEFORE UPDATE ON donations FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_deliveries_modtime BEFORE UPDATE ON deliveries FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_complaints_modtime BEFORE UPDATE ON complaints FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_dispatch_modtime BEFORE UPDATE ON dispatch_assignments FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_documents_modtime BEFORE UPDATE ON document_uploads FOR EACH ROW EXECUTE FUNCTION update_modified_column();
