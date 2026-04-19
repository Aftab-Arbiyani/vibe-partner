"use client";

import { useRouter } from "next/navigation";

export default function AdminLogout() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <button
      onClick={logout}
      className="text-gray-500 hover:text-white text-sm transition-colors"
    >
      Sign out
    </button>
  );
}
