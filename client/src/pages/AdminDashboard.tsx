import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { getQueryFn } from "@/lib/queryClient";
import { format } from "date-fns";
import {
    LogOut,
    RefreshCw,
    Mail,
    Phone,
    User,
    Briefcase,
    MessageSquare,
    Calendar,
    Inbox,
    ShieldCheck,
    Eye,
    X,
} from "lucide-react";

interface ContactMessage {
    id: number;
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    createdAt: string;
}

function truncateMessage(text: string, max = 80): string {
    if (!text || text.length <= max) return text;
    return text.slice(0, max).trimEnd() + "…";
}

export default function AdminDashboard() {
    const [, setLocation] = useLocation();
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

    // Check session
    const {
        data: session,
        isLoading: sessionLoading,
    } = useQuery<{ authenticated: boolean }>({
        queryKey: ["/api/admin/session"],
        queryFn: getQueryFn({ on401: "returnNull" }),
    });

    // Fetch messages
    const {
        data: messages,
        isLoading: messagesLoading,
        refetch,
    } = useQuery<ContactMessage[]>({
        queryKey: ["/api/admin/messages"],
        queryFn: getQueryFn({ on401: "returnNull" }),
        enabled: session?.authenticated === true,
    });

    // Redirect if not authenticated
    useEffect(() => {
        if (!sessionLoading && (!session || !session.authenticated)) {
            setLocation("/admin/login");
        }
    }, [session, sessionLoading, setLocation]);

    const handleLogout = async () => {
        try {
            await apiRequest("POST", "/api/admin/logout");
        } catch {
            // ignore
        }
        setLocation("/admin/login");
    };

    if (sessionLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!session?.authenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-slate-900 leading-tight">
                                Admin Dashboard
                            </h1>
                            <p className="text-xs text-slate-500 -mt-0.5">Dynamic Exterior</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => refetch()}
                            className="p-2 text-slate-500 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                            title="Refresh data"
                        >
                            <RefreshCw className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats bar */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">
                            Contact Submissions
                        </h2>
                        <p className="text-sm text-slate-500">
                            {messages ? `${messages.length} total message${messages.length !== 1 ? "s" : ""}` : "Loading..."}
                        </p>
                    </div>
                </div>

                {/* Table */}
                {messagesLoading ? (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 flex items-center justify-center">
                        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
                    </div>
                ) : !messages || messages.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
                        <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-slate-700">
                            No messages yet
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                            Contact form submissions will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            <div className="flex items-center gap-1.5">
                                                <User className="w-3.5 h-3.5" />
                                                Name
                                            </div>
                                        </th>
                                        <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            <div className="flex items-center gap-1.5">
                                                <Mail className="w-3.5 h-3.5" />
                                                Email
                                            </div>
                                        </th>
                                        <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            <div className="flex items-center gap-1.5">
                                                <Phone className="w-3.5 h-3.5" />
                                                Phone
                                            </div>
                                        </th>
                                        <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            <div className="flex items-center gap-1.5">
                                                <Briefcase className="w-3.5 h-3.5" />
                                                Service
                                            </div>
                                        </th>
                                        <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider max-w-xs">
                                            <div className="flex items-center gap-1.5">
                                                <MessageSquare className="w-3.5 h-3.5" />
                                                Message
                                            </div>
                                        </th>
                                        <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                Date
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {messages.map((msg) => (
                                        <tr
                                            key={msg.id}
                                            className="hover:bg-slate-50 transition-colors"
                                        >
                                            <td className="px-6 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">
                                                {msg.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
                                                <a
                                                    href={`mailto:${msg.email}`}
                                                    className="text-primary hover:underline"
                                                >
                                                    {msg.email}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
                                                <a
                                                    href={`tel:${msg.phone}`}
                                                    className="hover:text-primary transition-colors"
                                                >
                                                    {msg.phone}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                                    {msg.service}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600 max-w-xs">
                                                <div className="flex items-center gap-2">
                                                    <span className="truncate">
                                                        {truncateMessage(msg.message)}
                                                    </span>
                                                    {msg.message && msg.message.length > 80 && (
                                                        <button
                                                            onClick={() => setSelectedMessage(msg)}
                                                            className="shrink-0 inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                                                        >
                                                            <Eye className="w-3.5 h-3.5" />
                                                            View
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                                                {msg.createdAt
                                                    ? format(new Date(msg.createdAt), "MMM d, yyyy h:mm a")
                                                    : "—"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>

            {/* Message detail slide-over */}
            {selectedMessage && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                        onClick={() => setSelectedMessage(null)}
                    />

                    {/* Panel */}
                    <div className="relative w-full max-w-md bg-white shadow-2xl animate-in slide-in-from-right duration-200 flex flex-col">
                        {/* Panel header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                            <h3 className="text-lg font-semibold text-slate-900">Message Details</h3>
                            <button
                                onClick={() => setSelectedMessage(null)}
                                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Panel body */}
                        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                            {/* Contact info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Name</p>
                                    <p className="text-sm font-medium text-slate-900">{selectedMessage.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Service</p>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                        {selectedMessage.service}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Email</p>
                                    <a href={`mailto:${selectedMessage.email}`} className="text-sm text-primary hover:underline">
                                        {selectedMessage.email}
                                    </a>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Phone</p>
                                    <a href={`tel:${selectedMessage.phone}`} className="text-sm text-slate-700 hover:text-primary transition-colors">
                                        {selectedMessage.phone}
                                    </a>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Date</p>
                                <p className="text-sm text-slate-600">
                                    {selectedMessage.createdAt
                                        ? format(new Date(selectedMessage.createdAt), "MMMM d, yyyy 'at' h:mm a")
                                        : "—"}
                                </p>
                            </div>

                            {/* Full message */}
                            <div>
                                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Message</p>
                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap break-words">
                                        {selectedMessage.message}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Panel footer */}
                        <div className="px-6 py-4 border-t border-slate-200 flex gap-3">
                            <a
                                href={`mailto:${selectedMessage.email}`}
                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
                            >
                                <Mail className="w-4 h-4" />
                                Reply via Email
                            </a>
                            <a
                                href={`tel:${selectedMessage.phone}`}
                                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                Call
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
