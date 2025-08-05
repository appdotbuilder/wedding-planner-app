import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface VendorCategory {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string;
    vendor_profiles_count: number;
}

interface VendorProfile {
    id: number;
    business_name: string;
    description: string;
    average_rating: number;
    total_reviews: number;
    category: VendorCategory;
    user: {
        name: string;
        location: string;
    };
}

interface Props extends SharedData {
    categories: VendorCategory[];
    featuredVendors: VendorProfile[];
    [key: string]: unknown;
}

export default function Welcome() {
    const { auth, categories = [], featuredVendors = [] } = usePage<Props>().props;

    return (
        <>
            <Head title="💒 Dream Wedding - Plan Your Perfect Day">
                <meta name="description" content="Connect with the best wedding vendors - photographers, caterers, venues, florists and more. Plan your dream wedding with ease." />
            </Head>
            
            <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
                {/* Header */}
                <header className="border-b border-rose-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl">💒</span>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dream Wedding</h1>
                            </div>
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-sm font-medium text-gray-700 hover:text-rose-600 dark:text-gray-300 dark:hover:text-rose-400"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 transition-colors"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
                                Plan Your 
                                <span className="text-rose-600"> Dream Wedding</span>
                            </h1>
                            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                                Connect with the best wedding vendors in your area. From photographers to caterers, 
                                venues to florists - find everything you need for your perfect day.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-lg bg-rose-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-rose-700 transition-colors"
                                    >
                                        View Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('register')}
                                            className="rounded-lg bg-rose-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-rose-700 transition-colors"
                                        >
                                            Start Planning
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="text-base font-semibold text-gray-900 hover:text-rose-600 dark:text-white dark:hover:text-rose-400"
                                        >
                                            Sign In <span aria-hidden="true">→</span>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 bg-white dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Everything You Need</h2>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                                Two powerful platforms in one application
                            </p>
                        </div>
                        
                        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
                            {/* For Couples */}
                            <div className="rounded-lg bg-gradient-to-br from-rose-50 to-pink-50 p-8 dark:from-gray-700 dark:to-gray-600">
                                <div className="flex items-center space-x-3">
                                    <span className="text-3xl">💕</span>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">For Couples</h3>
                                </div>
                                <ul className="mt-6 space-y-3">
                                    <li className="flex items-start space-x-3">
                                        <span className="text-rose-500">✓</span>
                                        <span className="text-gray-700 dark:text-gray-300">Browse vendor categories and profiles</span>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <span className="text-rose-500">✓</span>
                                        <span className="text-gray-700 dark:text-gray-300">Check real-time availability calendars</span>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <span className="text-rose-500">✓</span>
                                        <span className="text-gray-700 dark:text-gray-300">Book reservations instantly</span>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <span className="text-rose-500">✓</span>
                                        <span className="text-gray-700 dark:text-gray-300">Leave reviews and ratings</span>
                                    </li>
                                </ul>
                            </div>

                            {/* For Vendors */}
                            <div className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-8 dark:from-gray-700 dark:to-gray-600">
                                <div className="flex items-center space-x-3">
                                    <span className="text-3xl">🏢</span>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">For Vendors</h3>
                                </div>
                                <ul className="mt-6 space-y-3">
                                    <li className="flex items-start space-x-3">
                                        <span className="text-blue-500">✓</span>
                                        <span className="text-gray-700 dark:text-gray-300">Manage business profiles and services</span>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <span className="text-blue-500">✓</span>
                                        <span className="text-gray-700 dark:text-gray-300">Set availability and working hours</span>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <span className="text-blue-500">✓</span>
                                        <span className="text-gray-700 dark:text-gray-300">Handle reservation requests</span>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <span className="text-blue-500">✓</span>
                                        <span className="text-gray-700 dark:text-gray-300">Build your reputation with reviews</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vendor Categories */}
                {categories.length > 0 && (
                    <section className="py-16">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Find Your Perfect Vendors</h2>
                                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                                    Browse by category to find exactly what you need
                                </p>
                            </div>
                            
                            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                                {categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={route('categories.show', category.slug)}
                                        className="group rounded-lg bg-white p-6 text-center shadow-sm ring-1 ring-gray-200 hover:shadow-md hover:ring-rose-300 transition-all dark:bg-gray-800 dark:ring-gray-700 dark:hover:ring-rose-600"
                                    >
                                        <div className="text-3xl mb-3">{category.icon}</div>
                                        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-rose-600 dark:text-white dark:group-hover:text-rose-400">
                                            {category.name}
                                        </h3>
                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                            {category.vendor_profiles_count} vendors
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Featured Vendors */}
                {featuredVendors.length > 0 && (
                    <section className="py-16 bg-white dark:bg-gray-800">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Top-Rated Vendors</h2>
                                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                                    Highly recommended by couples like you
                                </p>
                            </div>
                            
                            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {featuredVendors.map((vendor) => (
                                    <Link
                                        key={vendor.id}
                                        href={route('vendors.show', vendor.id)}
                                        className="group rounded-lg bg-gray-50 p-6 hover:bg-gray-100 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl">{vendor.category.icon}</span>
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
                                        <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-rose-600 dark:text-white dark:group-hover:text-rose-400">
                                            {vendor.business_name}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                            {vendor.category.name}
                                        </p>
                                        {vendor.user.location && (
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                📍 {vendor.user.location}
                                            </p>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <section className="py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="rounded-2xl bg-rose-600 py-16 px-8 text-center">
                            <h2 className="text-3xl font-bold text-white">Ready to Plan Your Dream Wedding?</h2>
                            <p className="mt-4 text-lg text-rose-100">
                                Join thousands of couples who have found their perfect vendors through our platform.
                            </p>
                            <div className="mt-8">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-rose-600 shadow-sm hover:bg-gray-50 transition-colors"
                                    >
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('register')}
                                        className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-rose-600 shadow-sm hover:bg-gray-50 transition-colors"
                                    >
                                        Get Started Free
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white">
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center space-x-2">
                                <span className="text-2xl">💒</span>
                                <span className="text-xl font-bold">Dream Wedding</span>
                            </div>
                            <p className="mt-4 text-gray-400">
                                Making wedding planning simple and beautiful.
                            </p>
                            <p className="mt-8 text-sm text-gray-500">
                                Built with ❤️ by{" "}
                                <a 
                                    href="https://app.build" 
                                    target="_blank" 
                                    className="font-medium text-rose-400 hover:underline"
                                >
                                    app.build
                                </a>
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}