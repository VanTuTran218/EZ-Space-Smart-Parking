"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";
import { 
  User, History, CarFront, Wallet, Bell, Moon, HelpCircle, LogOut, 
  ChevronRight, CheckCircle2, Phone 
} from "lucide-react";
import { clsx } from "clsx";
import BottomSheet from "@/components/ui/BottomSheet";

export default function ProfilePage() {
  const router = useRouter();
  const { user, settings, setSettings, linkedWallet, toggleWallet, logout } = useStore();
  const [sheet, setSheet] = useState<"none" | "wallet" | "help" | "logout">("none");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // Sync theme to HTML class
  useEffect(() => {
    if (settings.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.theme]);

  if (!user) return null; // Wait for AuthGuard

  const toggleTheme = () => {
    setSettings({ theme: settings.theme === "light" ? "dark" : "light" });
  };

  const toggleNotif = () => {
    setSettings({ notifications: !settings.notifications });
  };

  const handleLogout = () => {
    logout();
    router.push("/dang-nhap");
  };

  const Row = ({ icon: Icon, label, value, onClick, isToggle, toggleValue, danger }: any) => (
    <button 
      onClick={onClick}
      className={clsx(
        "w-full bg-white dark:bg-slate-800 p-4 flex items-center justify-between transition-colors active:bg-slate-50 dark:active:bg-slate-700",
        danger ? "text-red-500" : "text-slate-700 dark:text-slate-200"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon size={20} className={danger ? "text-red-500" : "text-slate-400"} />
        <span className="font-bold text-sm">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{value}</span>}
        {isToggle ? (
          <div className={clsx("w-12 h-6 rounded-full transition-colors relative flex items-center", toggleValue ? "bg-[#2B4BD1]" : "bg-slate-200 dark:bg-slate-600")}>
            <div className={clsx("w-5 h-5 bg-white rounded-full shadow-sm transition-transform absolute", toggleValue ? "translate-x-[26px]" : "translate-x-[2px]")} />
          </div>
        ) : (
          <ChevronRight size={16} className={danger ? "text-red-500" : "text-slate-300"} />
        )}
      </div>
    </button>
  );

  const faqs = [
    { q: "Làm sao để hủy đặt chỗ?", a: "Bạn có thể hủy đặt chỗ miễn phí trong 5 phút đầu tiên. Sau 5 phút, phí cọc sẽ không được hoàn lại." },
    { q: "Thời gian giữ chỗ là bao lâu?", a: "Hệ thống giữ chỗ cho bạn tối đa 20 phút kể từ lúc thanh toán cọc thành công." },
    { q: "Tôi muốn thay đổi biển số xe?", a: "Vào mục 'Xe của tôi' để thêm xe mới hoặc chỉnh sửa biển số xe hiện tại." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-24 transition-colors">
      <div className="bg-[#2B4BD1] pt-12 pb-24 px-6 text-white">
        <h1 className="text-2xl font-black mb-6">Hồ sơ</h1>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
            <User size={32} />
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-blue-200 text-sm font-medium">{user.phone}</p>
          </div>
        </div>
      </div>

      <div className="-mt-12 px-4 space-y-4 relative z-10">
        
        {/* Section 1 */}
        <div className="rounded-[20px] overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700">
          <Row icon={History} label="Đặt chỗ và lịch sử" onClick={() => router.push("/lich-su")} />
          <Row icon={CarFront} label="Xe của tôi" onClick={() => router.push("/xe-cua-toi")} />
          <Row icon={Wallet} label="Ví thanh toán sandbox" value={linkedWallet ? "Đã liên kết" : "Chưa liên kết"} onClick={() => setSheet("wallet")} />
        </div>

        {/* Section 2 */}
        <div className="rounded-[20px] overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700">
          <Row icon={Bell} label="Thông báo" isToggle toggleValue={settings.notifications} onClick={toggleNotif} />
          <Row icon={Moon} label="Giao diện Tối" isToggle toggleValue={settings.theme === "dark"} onClick={toggleTheme} />
          <Row icon={HelpCircle} label="Trợ giúp & FAQ" onClick={() => setSheet("help")} />
        </div>

        {/* Logout */}
        <div className="rounded-[20px] overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700">
          <Row icon={LogOut} label="Đăng xuất" danger onClick={() => setSheet("logout")} />
        </div>
      </div>

      {/* Sheets */}
      <BottomSheet isOpen={sheet === "wallet"} onClose={() => setSheet("none")} title="Ví thanh toán Sandbox">
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-[16px] border border-slate-100 dark:border-slate-700 flex items-center gap-4">
            <div className="w-12 h-12 bg-pink-100 text-pink-600 font-black rounded-xl flex items-center justify-center text-xl">M</div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-900 dark:text-white">Ví MoMo (Sandbox)</h4>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Dùng để giả lập thanh toán</p>
            </div>
            {linkedWallet && <CheckCircle2 className="text-emerald-500" size={20} />}
          </div>
          
          <button 
            onClick={() => { toggleWallet(); setSheet("none"); }}
            className={clsx("w-full font-bold py-4 rounded-[16px] active:scale-95 transition-transform", 
              linkedWallet ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400" : "bg-[#2B4BD1] text-white shadow-lg shadow-[#2B4BD1]/30"
            )}
          >
            {linkedWallet ? "Hủy liên kết" : "Liên kết ngay"}
          </button>
        </div>
      </BottomSheet>

      <BottomSheet isOpen={sheet === "help"} onClose={() => setSheet("none")} title="Trợ giúp & FAQ">
        <div className="space-y-3 mb-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-slate-50 dark:bg-slate-800 rounded-[16px] border border-slate-100 dark:border-slate-700 overflow-hidden">
              <button 
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                className="w-full p-4 flex items-center justify-between text-left font-bold text-slate-900 dark:text-white text-sm"
              >
                {faq.q}
                <ChevronRight size={16} className={clsx("text-slate-400 transition-transform", faqOpen === i && "rotate-90")} />
              </button>
              {faqOpen === i && (
                <div className="px-4 pb-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
        <a href="tel:1900-6868" className="w-full bg-[#2B4BD1] text-white font-bold py-4 rounded-[16px] active:scale-95 flex items-center justify-center gap-2">
          <Phone size={18} /> Gọi tổng đài 1900-6868
        </a>
      </BottomSheet>

      <BottomSheet isOpen={sheet === "logout"} onClose={() => setSheet("none")} title="Đăng xuất">
        <p className="text-center text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">Bạn có chắc chắn muốn đăng xuất khỏi ứng dụng?</p>
        <div className="flex gap-3">
          <button onClick={() => setSheet("none")} className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold py-4 rounded-[16px] active:scale-95">Không</button>
          <button onClick={handleLogout} className="flex-1 bg-red-500 text-white font-bold py-4 rounded-[16px] active:scale-95">Đăng xuất</button>
        </div>
      </BottomSheet>
    </div>
  );
}
