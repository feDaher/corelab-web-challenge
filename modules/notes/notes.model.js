import mongoose from 'mongoose'

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 30 },
  text: { type: String, required: true, maxlength: 256 },
  color: { type: String, required: true },
  createdAt: { type: Date }
})

export default mongoose.models.Note || mongoose.model('Note', NoteSchema)
