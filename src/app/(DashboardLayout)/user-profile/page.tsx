'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

export default function UserProfilePage() {
  const [open, setOpen] = useState(false)

  // MAIN PROFILE STATE
  const [profile, setProfile] = useState({
    firstName: 'igl',
    lastName: 'kumari',
    email: 'igl.kumari@gmail.com',
    phone: '9123333222',
    location: 'india',
    role: 'Team Leader',
  })

  // FORM STATE (for modal)
  const [form, setForm] = useState(profile)

  // OPEN MODAL
  const openModal = () => {
    setForm(profile) // preload previous values
    setOpen(true)
  }

  // SAVE CHANGES
  const saveProfile = () => {
    setProfile(form)
    setOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* PROFILE CARD */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/images/profile/user-9.jpg"
            alt="profile"
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="text-slate-400">
              {profile.role} · {profile.location}
            </p>
          </div>
        </div>

        <button
          onClick={openModal}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
        >
          Edit
        </button>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard title="Personal Information">
          <Info label="First Name" value={profile.firstName} />
          <Info label="Last Name" value={profile.lastName} />
          <Info label="Email" value={profile.email} />
          <Info label="Phone" value={profile.phone} />
        </InfoCard>

        <InfoCard title="Address Details">
          <Info label="Location" value={profile.location} />
          <Info label="Role" value={profile.role} />
        </InfoCard>
      </div>

      {/* EDIT MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 w-full max-w-lg rounded-xl p-6 relative">
            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X />
            </button>

            <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>

            {/* INPUTS */}
            <Input
              label="First Name"
              value={form.firstName}
              onChange={(v) =>
                setForm({ ...form, firstName: v })
              }
            />

            <Input
              label="Last Name"
              value={form.lastName}
              onChange={(v) =>
                setForm({ ...form, lastName: v })
              }
            />

            <Input
              label="Email"
              value={form.email}
              onChange={(v) =>
                setForm({ ...form, email: v })
              }
            />

            <Input
              label="Phone"
              value={form.phone}
              onChange={(v) =>
                setForm({ ...form, phone: v })
              }
            />

            <Input
              label="Location"
              value={form.location}
              onChange={(v) =>
                setForm({ ...form, location: v })
              }
            />

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={saveProfile}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ------------------ SMALL COMPONENTS ------------------ */

function Info({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="mb-3">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  )
}

function InfoCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
      <h3 className="font-semibold mb-4">{title}</h3>
      {children}
    </div>
  )
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="mb-3">
      <p className="text-sm text-slate-400 mb-1">{label}</p>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
  )
}
