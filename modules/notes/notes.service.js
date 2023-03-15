import Note from './notes.model'

export const createNote = async (body) => {
  await Note.create({
    title: body.title,
    text: body.text,
    color: body.color,
    createdAt: new Date()
  })
}

export const getNotes = async () => {
  return await Note.find().sort({ createdAt: -1 })
}

export const deleteNote = async (id) => {
  const deletedNote = await Note.findOneAndDelete({
    _id: id
  })
  if (deletedNote) {
    return deletedNote
  } else {
    throw new Error('Note not found')
  }
}

export const editNote = async (body) => {
  return Note.findOneAndUpdate(
    {
      _id: body.id
    },
    {
      ...body
    },
    {
      new: true
    }
  )
}
