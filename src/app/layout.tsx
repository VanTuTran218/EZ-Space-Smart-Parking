import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "../components/layout/BottomNav";
import ToastContainer from "../components/ui/Toast";
import AuthGuard from "../components/layout/AuthGuard";

export const metadata: Metadata = {
  title: "EZ-Space Smart Parking",
  description: "Tìm kiếm và đặt chỗ đỗ xe dễ dàng",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen pb-20 bg-slate-50 font-sans">
        <ToastContainer />
        <AuthGuard>
          <main className="max-w-md mx-auto min-h-screen bg-white shadow-xl relative overflow-hidden pb-16">
            {children}
            <BottomNav />
          </main>
        </AuthGuard>
      </body>
    </html>
  );
}
