"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-background">
      <div className="w-12 h-12 border-4 border-cyber-pink border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-background p-4 flex gap-6 overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto no-scrollbar">
        <div className="glass rounded-3xl p-8 min-h-full border-white/5 relative">
          {children}
        </div>
      </main>
    </div>
  );
}
