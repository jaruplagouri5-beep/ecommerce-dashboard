'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type Admin = {
  _id?: string
  name: string
  email: string
  role: 'SUPER_ADMIN' | 'ADMIN'
  active: boolean
}

export default function AdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [editing, setEditing] = useState<Admin | null>(null)
  const [showAdd, setShowAdd] = useState(false)

  const emptyAdmin: Admin = {
    name: '',
    email: '',
    role: 'ADMIN',
    active: true,
  }

  const [form, setForm] = useState<Admin>(emptyAdmin)

  /* ================= FETCH ================= */
  async function fetchAdmins() {
    const res = await fetch('/api/admins')
    const data = await res.json()
    setAdmins(data)
  }

  useEffect(() => {
    fetchAdmins()
  }, [])

  /* ================= ADD ================= */
  async function addAdmin() {
    const toastId = toast.loading('Adding admin...')
    await fetch('/api/admins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    toast.success('Admin added', { id: toastId })
    setShowAdd(false)
    setForm(emptyAdmin)
    fetchAdmins()
  }

  /* ================= UPDATE ================= */
  async function updateAdmin() {
    const toastId = toast.loading('Updating admin...')
    await fetch('/api/admins', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    })
    toast.success('Admin updated', { id: toastId })
    setEditing(null)
    fetchAdmins()
  }

  /* ================= DELETE ================= */
  async function removeAdmin(id?: string) {
    if (!id) return
    const toastId = toast.loading('Removing admin...')
    await fetch(`/api/admins?id=${id}`, { method: 'DELETE' })
    toast.success('Admin removed', { id: toastId })
    fetchAdmins()
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Admins</h1>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Add Admin
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-slate-800 rounded-xl p-4">
        {admins.map(a => (
          <div
            key={a._id}
            className="grid grid-cols-6 gap-4 py-3 border-b border-slate-700"
          >
            <div>{a.name}</div>
            <div>{a.email}</div>
            <div>{a.role}</div>
            <div>{a.active ? 'Active' : 'Inactive'}</div>
            <div className="flex gap-2 col-span-2">
              <button
                onClick={() => setEditing(a)}
                className="border px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => removeAdmin(a._id)}
                className="bg-red-600 px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= ADD MODAL ================= */}
      {showAdd && (
        <Modal
          title="Add Admin"
          form={form}
          setForm={setForm}
          onClose={() => setShowAdd(false)}
          onSave={addAdmin}
        />
      )}

      {/* ================= EDIT MODAL ================= */}
      {editing && (
        <Modal
          title="Edit Admin"
          form={editing}
          setForm={setEditing}
          onClose={() => setEditing(null)}
          onSave={updateAdmin}
        />
      )}
    </div>
  )
}

/* ================= MODAL ================= */
function Modal({ title, form, setForm, onClose, onSave }: any) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-slate-900 p-6 rounded-xl w-[400px]">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="w-full mb-2 p-2 bg-slate-800 rounded"
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full mb-2 p-2 bg-slate-800 rounded"
        />

        <select
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
          className="w-full mb-2 p-2 bg-slate-800 rounded"
        >
          <option value="ADMIN">Admin</option>
          <option value="SUPER_ADMIN">Super Admin</option>
        </select>

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={onSave}
            className="bg-blue-600 px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
