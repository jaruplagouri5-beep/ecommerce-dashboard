'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const UserProfile = () => {
  const [openModal, setOpenModal] = useState(false)

  const [personal, setPersonal] = useState({
    firstName: 'igl',
    lastName: 'kumari',
    email: 'igl.kumari@gmail.com',
    phone: '9123333222',
    position: 'Team Leader',
    location: 'India',
  })

  const [tempPersonal, setTempPersonal] = useState(personal)

  useEffect(() => {
    if (openModal) {
      setTempPersonal(personal)
    }
  }, [openModal, personal])

  const handleSave = () => {
    setPersonal(tempPersonal)
    setOpenModal(false)
  }

  return (
    <div className="space-y-6">

      {/* ================= PROFILE HEADER ================= */}
      <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
        <div className="flex items-center gap-6">
          <Image
            src="/images/profile/user-1.jpg"
            alt="user"
            width={80}
            height={80}
            className="rounded-full border border-slate-600"
          />

          <div className="flex-1">
            <h2 className="text-xl font-semibold text-white">
              {personal.firstName} {personal.lastName}
            </h2>
            <p className="text-slate-400 text-sm">
              {personal.position} · {personal.location}
            </p>
          </div>

          <Button onClick={() => setOpenModal(true)}>Edit</Button>
        </div>
      </div>

      {/* ================= INFO SECTIONS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* PERSONAL INFO */}
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
          <h3 className="font-semibold text-white mb-4">
            Personal Information
          </h3>

          <div className="space-y-3 text-sm text-slate-300">
            <p>
              <span className="text-slate-400">First Name:</span>{' '}
              {personal.firstName}
            </p>
            <p>
              <span className="text-slate-400">Last Name:</span>{' '}
              {personal.lastName}
            </p>
            <p>
              <span className="text-slate-400">Email:</span>{' '}
              {personal.email}
            </p>
            <p>
              <span className="text-slate-400">Phone:</span>{' '}
              {personal.phone}
            </p>
          </div>
        </div>

        {/* ADDRESS INFO */}
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
          <h3 className="font-semibold text-white mb-4">
            Address Details
          </h3>

          <div className="space-y-3 text-sm text-slate-300">
            <p>
              <span className="text-slate-400">Location:</span>{' '}
              {personal.location}
            </p>
            <p>
              <span className="text-slate-400">Role:</span>{' '}
              {personal.position}
            </p>
          </div>
        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label>First Name</Label>
              <Input
                value={tempPersonal.firstName}
                onChange={(e) =>
                  setTempPersonal({
                    ...tempPersonal,
                    firstName: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>Last Name</Label>
              <Input
                value={tempPersonal.lastName}
                onChange={(e) =>
                  setTempPersonal({
                    ...tempPersonal,
                    lastName: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                value={tempPersonal.email}
                onChange={(e) =>
                  setTempPersonal({
                    ...tempPersonal,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>Phone</Label>
              <Input
                value={tempPersonal.phone}
                onChange={(e) =>
                  setTempPersonal({
                    ...tempPersonal,
                    phone: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button onClick={handleSave}>Save Changes</Button>
            <Button
              variant="outline"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UserProfile
