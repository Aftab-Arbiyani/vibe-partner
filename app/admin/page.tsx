import type { Metadata } from "next";
import Link from "next/link";
import { getBookings, getSlots } from "@/lib/data";
import { getSkills, getCustomRequests } from "@/lib/skills-data";
import AdminBookingsPanel from "./AdminBookingsPanel";
import AdminSkillsPanel from "./AdminSkillsPanel";
import AdminCustomRequestsPanel from "./AdminCustomRequestsPanel";
import AdminLogout from "./AdminLogout";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — VibePartner",
  robots: { index: false, follow: false },
};

type Tab = "bookings" | "skills" | "requests";
const TABS: { id: Tab; label: string }[] = [
  { id: "bookings", label: "Bookings" },
  { id: "skills", label: "Skills" },
  { id: "requests", label: "Custom Requests" },
];

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab: rawTab = "bookings" } = await searchParams;
  const tab = (["bookings", "skills", "requests"].includes(rawTab) ? rawTab : "bookings") as Tab;

  const [bookings, slots, skills, customRequests] = await Promise.all([
    getBookings(),
    getSlots(),
    getSkills(),
    getCustomRequests(),
  ]);

  const visibleBookings = bookings
    .filter((b) => b.status !== "awaiting_payment");

  const sortedSlots = slots.sort((a, b) => a.date.localeCompare(b.date));

  const counts = {
    pending: visibleBookings.filter((b) => b.status === "pending").length,
    confirmed: visibleBookings.filter((b) => b.status === "confirmed").length,
    completed: visibleBookings.filter((b) => b.status === "completed").length,
    cancelled: visibleBookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <main className="min-h-screen bg-[#0D0D0D] px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <Link href="/" className="text-xl font-bold gradient-text">VibePartner</Link>
            <p className="text-gray-500 text-sm mt-0.5">Admin Dashboard</p>
          </div>
          <AdminLogout />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(counts).map(([status, count]) => (
            <div key={status} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">{status}</p>
              <p className="text-3xl font-bold">{count}</p>
            </div>
          ))}
        </div>

        {/* Tab navigation */}
        <div className="flex gap-1 bg-white/5 border border-white/10 rounded-xl p-1 mb-8 w-fit">
          {TABS.map(({ id, label }) => (
            <Link
              key={id}
              href={`/admin?tab=${id}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === id
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {label}
              {id === "requests" && customRequests.length > 0 && (
                <span className="ml-1.5 bg-white/10 text-xs px-1.5 py-0.5 rounded-full">
                  {customRequests.length}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Tab content */}
        {tab === "bookings" && (
          <AdminBookingsPanel bookings={visibleBookings} slots={sortedSlots} />
        )}
        {tab === "skills" && (
          <AdminSkillsPanel skills={skills} />
        )}
        {tab === "requests" && (
          <AdminCustomRequestsPanel requests={customRequests} />
        )}
      </div>
    </main>
  );
}
