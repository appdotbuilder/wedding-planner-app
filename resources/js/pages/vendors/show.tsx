import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface VendorProfile {
    id: number;
    business_name: string;
    description: string;
    website: string | null;
    average_rating: number;
    total_reviews: number;
    is_verified: boolean;
    category: {
        name: string;
        icon: string;
    };
    user: {
        name: string;
        location: string | null;
        phone: string | null;
    };
    services: Array<{
        id: number;
        name: string;
        description: string;
        price: number;
        price_type: string;
        duration_hours: number | null;
    }>;
    reviews: Array<{
        id: number;
        rating: number;
        comment: string | null;
        created_at: string;
        couple: {
            name: string;
        };
    }>;
}

interface Availability {
    id: number;
    date: string;
    start_time: string;
    end_time: string;
}

interface Props extends SharedData {
    vendor: VendorProfile;
    availability: Availability[];
    [key: string]: unknown;
}

export default function VendorShow() {
    const { vendor, availability = [], auth } = usePage<Props>().props;

    const formatPrice = (price: number, priceType: string) => {
        const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);

        switch (priceType) {
            case 'per_hour':
                return `${formatted}/hour`;
            case 'per_day':
                return `${formatted}/day`;
            case 'per_guest':
                return `${formatted}/guest`;
            case 'custom':
                return `${formatted}+`;
            default:
                return formatted;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span
                key={i}
                className={i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}
            >
                ★
            </span>
        ));
    };

    return (
        <AppShell>
            <Head title={`${vendor.business_name} - Wedding Vendor`} />
            
            <div className="space-y-8">
                {/* Header */}
                <div className="border-b border-gray-200 pb-8 dark:border-gray-700">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                            <span className="text-5xl">{vendor.category.icon}</span>
                            <div>
                                <div className="flex items-center space-x-2">
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                        {vendor.business_name}
                                    </h1>
                                    {vendor.is_verified && (
                                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                            ✓ Verified
                                        </span>
                                    )}
                                </div>
                                <p className="mt-1 text-lg text-gray-600 dark:text-gray-300">
                                    {vendor.category.name}
                                </p>
                                {vendor.user.location && (
                                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                                        📍 {vendor.user.location}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center space-x-1">
                                {renderStars(Math.round(vendor.average_rating))}
                                <span className="ml-2 text-lg font-medium text-gray-900 dark:text-white">
                                    {vendor.average_rating.toFixed(1)}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {vendor.total_reviews} reviews
                            </p>
                        </div>
                    </div>
                    
                    <div className="mt-6">
                        <p className="text-gray-700 dark:text-gray-300">
                            {vendor.description}
                        </p>
                    </div>

                    <div className="mt-6 flex items-center space-x-4">
                        {vendor.website && (
                            <a
                                href={vendor.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300"
                            >
                                🌐 Visit Website
                            </a>
                        )}
                        {vendor.user.phone && (
                            <a
                                href={`tel:${vendor.user.phone}`}
                                className="text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300"
                            >
                                📞 {vendor.user.phone}
                            </a>
                        )}
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Services */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Services & Pricing
                            </h2>
                            <div className="mt-4 space-y-4">
                                {vendor.services.map((service) => (
                                    <div
                                        key={service.id}
                                        className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {service.name}
                                                </h3>
                                                <p className="mt-2 text-gray-600 dark:text-gray-300">
                                                    {service.description}
                                                </p>
                                                {service.duration_hours && (
                                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                                        ⏱️ Duration: {service.duration_hours} hours
                                                    </p>
                                                )}
                                            </div>
                                            <div className="ml-6 text-right">
                                                <div className="text-lg font-bold text-rose-600 dark:text-rose-400">
                                                    {formatPrice(service.price, service.price_type)}
                                                </div>
                                                {auth.user && auth.user.role === 'couple' && (
                                                    <Link
                                                        href={route('reservations.book', [vendor.id, service.id])}
                                                        className="mt-2 inline-block rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 transition-colors"
                                                    >
                                                        Book Now
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        {vendor.reviews.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Recent Reviews
                                </h2>
                                <div className="mt-4 space-y-4">
                                    {vendor.reviews.map((review) => (
                                        <div
                                            key={review.id}
                                            className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <div className="flex items-center space-x-1">
                                                        {renderStars(review.rating)}
                                                    </div>
                                                    <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                                                        {review.couple.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {new Date(review.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            {review.comment && (
                                                <p className="mt-3 text-gray-700 dark:text-gray-300">
                                                    {review.comment}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Availability Calendar */}
                        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                📅 Availability
                            </h3>
                            {availability.length > 0 ? (
                                <div className="mt-4 space-y-2">
                                    {availability.slice(0, 5).map((slot) => (
                                        <div
                                            key={slot.id}
                                            className="flex justify-between text-sm"
                                        >
                                            <span className="text-gray-600 dark:text-gray-300">
                                                {formatDate(slot.date)}
                                            </span>
                                            <span className="text-gray-900 dark:text-white">
                                                {slot.start_time} - {slot.end_time}
                                            </span>
                                        </div>
                                    ))}
                                    {availability.length > 5 && (
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            +{availability.length - 5} more available slots
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                    No availability information available.
                                </p>
                            )}
                        </div>

                        {/* Contact Info */}
                        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                📞 Contact
                            </h3>
                            <div className="mt-4 space-y-2">
                                <p className="text-sm">
                                    <span className="font-medium text-gray-900 dark:text-white">Contact:</span>
                                    <span className="ml-2 text-gray-600 dark:text-gray-300">
                                        {vendor.user.name}
                                    </span>
                                </p>
                                {vendor.user.phone && (
                                    <p className="text-sm">
                                        <span className="font-medium text-gray-900 dark:text-white">Phone:</span>
                                        <a
                                            href={`tel:${vendor.user.phone}`}
                                            className="ml-2 text-rose-600 hover:text-rose-700 dark:text-rose-400"
                                        >
                                            {vendor.user.phone}
                                        </a>
                                    </p>
                                )}
                                {vendor.website && (
                                    <p className="text-sm">
                                        <span className="font-medium text-gray-900 dark:text-white">Website:</span>
                                        <a
                                            href={vendor.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="ml-2 text-rose-600 hover:text-rose-700 dark:text-rose-400"
                                        >
                                            Visit Site
                                        </a>
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        {auth.user && auth.user.role === 'couple' && (
                            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Quick Actions
                                </h3>
                                <div className="mt-4 space-y-2">
                                    {vendor.services.length > 0 && (
                                        <Link
                                            href={route('reservations.book', [vendor.id, vendor.services[0].id])}
                                            className="block w-full rounded-lg bg-rose-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-rose-700 transition-colors"
                                        >
                                            📅 Book Service
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}