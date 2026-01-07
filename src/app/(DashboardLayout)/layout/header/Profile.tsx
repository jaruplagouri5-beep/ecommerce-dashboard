"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

const Profile = () => {
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    document.cookie = "auth=; path=/; max-age=0";
    document.cookie = "role=; path=/; max-age=0";
    window.location.href = "/auth/login";
  };

  return (
    <div className="relative">
      {/* AVATAR */}
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer flex items-center justify-center"
      >
        <Image
          src="/images/profile/user-9.jpg"
          alt="user"
          width={36}
          height={36}
          className="rounded-full border border-slate-600"
        />
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-3 w-48 rounded-xl bg-slate-900 border border-slate-700 shadow-lg z-50">
          <Link
            href="/user-profile"
            className="flex items-center gap-2 px-4 py-3 hover:bg-slate-800"
            onClick={() => setOpen(false)}
          >
            <Icon icon="solar:user-linear" width={18} />
            <span>My Profile</span>
          </Link>

          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-slate-800"
          >
            <Icon icon="solar:logout-2-linear" width={18} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
