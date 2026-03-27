import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logout } from "./actions";

type QuoteRequest = {
    id: number;
    name: string;
    company?: string;
    email: string;
    phone: string;
    product_type: string;
    quantity: string;
    location?: string;
    notes?: string;
};

export const dynamic = 'force-dynamic'; // Ensures this page isn't statically cached

export const metadata = {
    title: "Dashboard | KAAVERI TMT",
};

export default async function AdminDashboard({ searchParams }: { searchParams: { page?: string } }) {
    // 1. Verify authentication
    const session = cookies().get('admin_session');
    if (!session || session.value !== 'authenticated') {
        redirect('/admin/login');
    }

    // 2. Pagination setup
    const page = parseInt(searchParams.page || '1', 10) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    // 3. Fetch submissions from the database
    let requests: QuoteRequest[] = [];
    let totalPages = 1;
    try {
        const { getDbPool } = await import('./db');
        const pool = getDbPool();

        const [countResult] = await pool.query('SELECT COUNT(*) as count FROM quote_requests');
        const totalItems = (countResult as unknown as { count: number }[])[0]?.count || 0;
        totalPages = Math.ceil(totalItems / limit) || 1;

        const [rows] = await pool.query(`SELECT * FROM quote_requests ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`);
        requests = rows as QuoteRequest[];
    } catch (err) {
        console.error("Failed to fetch requests:", err);
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 font-heading">Quote Requests</h1>
                    <form action={logout}>
                        <button type="submit" className="px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-accent-red transition-colors shadow-md">
                            Logout
                        </button>
                    </form>
                </div>
                
                <div className="bg-white shadow-xl rounded-sm border border-gray-100 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#f8f9fa]">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-black/70 uppercase tracking-widest">Name / Company</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-black/70 uppercase tracking-widest">Contact</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-black/70 uppercase tracking-widest">Details</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-black/70 uppercase tracking-widest">Notes</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 font-body">
                            {requests.length > 0 ? requests.map((req, i) => (
                                <tr key={req.id || i} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-900"><span className="font-bold">{req.name}</span><br/><span className="text-gray-500">{req.company}</span></td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{req.email}<br/>{req.phone}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900"><span className="font-semibold">{req.product_type}</span><br/><span className="text-gray-500">{req.quantity}</span><br/><span className="text-xs text-gray-400">{req.location}</span></td>
                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">{req.notes || '-'}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No requests found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200 bg-[#f8f9fa]">
                        <Link
                            href={`?page=${page > 1 ? page - 1 : 1}`}
                            className={`px-4 py-2 border border-gray-300 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors ${page <= 1 ? 'text-gray-400 bg-gray-50 cursor-not-allowed pointer-events-none' : 'text-black bg-white hover:bg-gray-50 shadow-sm'}`}
                        >
                            Previous
                        </Link>
                        <span className="text-xs text-black/70 font-bold uppercase tracking-widest">
                            Page {page} of {totalPages}
                        </span>
                        <Link
                            href={`?page=${page < totalPages ? page + 1 : totalPages}`}
                            className={`px-4 py-2 border border-gray-300 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors ${page >= totalPages ? 'text-gray-400 bg-gray-50 cursor-not-allowed pointer-events-none' : 'text-black bg-white hover:bg-gray-50 shadow-sm'}`}
                        >
                            Next
                        </Link>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}