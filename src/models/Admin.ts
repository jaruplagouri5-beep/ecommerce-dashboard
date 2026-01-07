import mongoose, { Schema, models } from 'mongoose'

const AdminSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ['SUPER_ADMIN', 'ADMIN'],
      default: 'ADMIN',
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default models.Admin || mongoose.model('Admin', AdminSchema)
