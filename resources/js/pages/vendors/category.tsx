import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface VendorCategory {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string;
}

interface VendorProfile {
    id: number;
    business_name: string;
    description: string;
    average_rating: number;
    total_reviews: number;
    user: {
        name: string;
        location: string;
    };
    services: Array<{
        id: number;
        name: string;
        price: number;
        price_type: string;
    }>;
}

interface PaginatedVendors {
    data: VendorProfile[];
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
    category: VendorCategory;
    vendors: PaginatedVendors;
    [key: string]: unknown;
}

export default function VendorCategory() {
    const { category, vendors } = usePage<Props>().props;

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

    return (
        <AppShell>
            <Head title={`${category.name} - Wedding Vendors`} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-gray-200 pb-6 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                        <span className="text-4xl">{category.icon}</span>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                {category.name}
                            </h1>
                            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                                {category.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Vendor Grid */}
                {vendors.data.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {vendors.data.map((vendor) => (
                            <div
                                key={vendor.id}
                                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow dark:border-gray-700 dark:bg-gray-800"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {vendor.business_name}
                                        </h3>
                                        {vendor.user.location && (
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                📍 {vendor.user.location}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <span className="text-yellow-400">★</span>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                            {vendor.average_rating.toFixed(1)}
                                        </span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            ({vendor.total_reviews})
                                        </span>
                                    </div>
                                </div>
                                
                                <p className="mt-3 text-sm text-gray-600 line-clamp-3 dark:text-gray-300">
                                    {vendor.description}
                                </p>

                                {/* Services Preview */}
                                {vendor.services.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                            Services:
                                        </h4>
                                        <div className="mt-2 space-y-1">
                                            {vendor.services.slice(0, 2).map((service) => (
                                                <div key={service.id} className="flex justify-between text-sm">
                                                    <span className="text-gray-600 dark:text-gray-300">
                                                        {service.name}
                                                    </span>
                                                    <span className="font-medium text-rose-600 dark:text-rose-400">
                                                        {formatPrice(service.price, service.price_type)}
                                                    </span>
                                                </div>
                                            ))}
                                            {vendor.services.length > 2 && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    +{vendor.services.length - 2} more services
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-6 flex space-x-3">
                                    <Link
                                        href={route('vendors.show', vendor.id)}
                                        className="flex-1 rounded-lg bg-rose-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-rose-700 transition-colors"
                                    >
                                        View Profile
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <span className="text-6xl">{category.icon}</span>
                        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                            No vendors found
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            We're working on adding more {category.name.toLowerCase()} to our platform.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {vendors.meta.last_page > 1 && (
                    <div className="flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
                        <div className="flex flex-1 justify-between sm:hidden">
                            {vendors.links.find(link => link.label === '&laquo; Previous')?.url && (
                                <Link
                                    href={vendors.links.find(link => link.label === '&laquo; Previous')!.url!}
                                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Previous
                                </Link>
                            )}
                            {vendors.links.find(link => link.label === 'Next &raquo;')?.url && (
                                <Link
                                    href={vendors.links.find(link => link.label === 'Next &raquo;')!.url!}
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
                                    <span className="font-medium">{vendors.meta.current_page}</span>{' '}
                                    of{' '}
                                    <span className="font-medium">{vendors.meta.last_page}</span>{' '}
                                    ({vendors.meta.total} total vendors)
                                </p>
                            </div>
                            <div>
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                    {vendors.links.map((link, index) => {
                                        if (!link.url) {
                                            return (
                                                <span
                                                    key={index}
                                                    className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            );
                                        }
                                        
                                        return (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                                                    link.active
                                                        ? 'z-10 bg-rose-50 border-rose-500 text-rose-600 dark:bg-rose-900/20 dark:border-rose-400 dark:text-rose-400'
                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                                                } border`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        );
                                    })}
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}