import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Reservation {
    id: number;
    event_date: string;
    start_time: string;
    end_time: string;
    status: string;
    total_price: number;
    notes: string | null;
    vendor_profile?: {
        business_name: string;
        category: {
            name: string;
            icon: string;
        };
        user: {
            name: string;
        };
    };
    service: {
        name: string;
    };
    couple?: {
        name: string;
    };
}

interface PaginatedReservations {
    data: Reservation[];
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    meta: {
        current_page: number;
        last_page: number;
        total: number;
    };
}

interface Props extends SharedData {
    reservations: PaginatedReservations;
    [key: string]: unknown;
}

export default function ReservationsIndex() {
    const { reservations, auth } = usePage<Props>().props;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            case 'completed':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'cancelled':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <AppShell>
            <Head title="My Reservations" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-gray-200 pb-6 dark:border-gray-700">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {auth.user?.role === 'couple' ? '📅 My Reservations' : '📋 Reservation Requests'}
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                        {auth.user?.role === 'couple' 
                            ? 'Track your wedding vendor bookings and requests.'
                            : 'Manage incoming reservation requests from couples.'
                        }
                    </p>
                </div>

                {/* Reservations List */}
                {reservations.data.length > 0 ? (
                    <div className="space-y-4">
                        {reservations.data.map((reservation) => (
                            <div
                                key={reservation.id}
                                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3">
                                            {reservation.vendor_profile && (
                                                <span className="text-2xl">
                                                    {reservation.vendor_profile.category.icon}
                                                </span>
                                            )}
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {reservation.vendor_profile?.business_name || 'Vendor'}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    {reservation.service.name}
                                                </p>
                                                {reservation.couple && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        Client: {reservation.couple.name}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                            <div>
                                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                    Date & Time
                                                </p>
                                                <p className="text-sm text-gray-900 dark:text-white">
                                                    {formatDate(reservation.event_date)}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    {reservation.start_time} - {reservation.end_time}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                    Total Price
                                                </p>
                                                <p className="text-lg font-semibold text-rose-600 dark:text-rose-400">
                                                    {formatPrice(reservation.total_price)}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                    Status
                                                </p>
                                                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium capitalize ${getStatusColor(reservation.status)}`}>
                                                    {reservation.status}
                                                </span>
                                            </div>
                                        </div>

                                        {reservation.notes && (
                                            <div className="mt-4">
                                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                    Notes
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    {reservation.notes}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="ml-6">
                                        <Link
                                            href={route('reservations.show', reservation.id)}
                                            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <span className="text-6xl">📅</span>
                        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                            No reservations yet
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            {auth.user?.role === 'couple' 
                                ? "You haven't made any reservations yet. Start exploring vendors!"
                                : "No reservation requests yet. Make sure your profile is complete to attract couples."
                            }
                        </p>
                        {auth.user?.role === 'couple' && (
                            <div className="mt-6">
                                <Link
                                    href={route('home')}
                                    className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 transition-colors"
                                >
                                    Browse Vendors
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* Pagination */}
                {reservations.meta.last_page > 1 && (
                    <div className="flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
                        <div className="flex flex-1 justify-between sm:hidden">
                            {reservations.links.find(link => link.label === '&laquo; Previous')?.url && (
                                <Link
                                    href={reservations.links.find(link => link.label === '&laquo; Previous')!.url!}
                                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Previous
                                </Link>
                            )}
                            {reservations.links.find(link => link.label === 'Next &raquo;')?.url && (
                                <Link
                                    href={reservations.links.find(link => link.label === 'Next &raquo;')!.url!}
                                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Showing page{' '}
                                    <span className="font-medium">{reservations.meta.current_page}</span>{' '}
                                    of{' '}
                                    <span className="font-medium">{reservations.meta.last_page}</span>{' '}
                                    ({reservations.meta.total} total reservations)
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}