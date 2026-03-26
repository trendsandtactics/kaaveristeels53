import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logout } from "./actions";
import pool from "../contact-us/db";

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

export default async function AdminDashboard() {
    // 1. Verify authentication
    const session = cookies().get('admin_session');
    if (!session || session.value !== 'authenticated') {
        redirect('/admin/login');
    }

    // 2. Fetch submissions from the database
    let requests: QuoteRequest[] = [];
    try {
        // Using `ORDER BY id DESC` if you have an auto-incrementing ID to show newest first.
        const [rows] = await pool.query('SELECT * FROM quote_requests ORDER BY id DESC LIMIT 100');
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
                </div>
            </div>
        </div>
    );
}