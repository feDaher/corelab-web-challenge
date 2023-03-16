import mongoose from 'mongoose'

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  text: { type: String, required: true, maxlength: 512 },
  color: { type: String, required: true },
  createdAt: { type: Date }
})

export default mongoose.models.Note || mongoose.model('Note', NoteSchema)
