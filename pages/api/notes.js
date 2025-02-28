import validate from '../../lib/middlewares/validation'
import createHandler from '../../lib/middlewares/nextConnect'
import {
  createNoteSchema,
  deleteNoteSchema,
  editNoteSchema
} from '../../modules/notes/notes.schema'
import { createNote, getNotes, deleteNote, editNote } from '../../modules/notes/notes.service'

const handler = createHandler()

handler
  .post(validate({ body: createNoteSchema }), async (req, res) => {
    try {
      const newNote = await createNote(req.body)
      res.status(201).json(newNote)
    } catch (err) {
      return res.status(500).send(err.message)
    }
  })
  .get('/api/notes', async (req, res) => {
    const { page, perPage, lazy } = req.query
    console.log(req.query)
    try {
      if (lazy) {
        const initialNotes = await getNotes(parseInt(page), parseInt(perPage))
        const fetchMore = async () => {
          const newNotes = await getNotes(parseInt(page) + 1, parseInt(perPage))
          return newNotes
        }
        res.status(200).send({ initialNotes, fetchMore })
      } else {
        const notes = await getNotes(parseInt(page), parseInt(perPage))
        res.status(200).send(notes)
      }
    } catch (err) {
      return res.status(500).send(err.message)
    }
  })
  .delete(validate(deleteNoteSchema), async (req, res) => {
    try {
      const deletedNotes = await deleteNote(req.body.id)
      if (deletedNotes) return res.status(200).send({ ok: true })
      return res.status(400).send('Notes not found')
    } catch (err) {
      return res.status(500).send(err.message)
    }
  })
  .patch(validate(editNoteSchema), async (req, res) => {
    try {
      const patchNote = editNote(req.body)
      if (patchNote) return res.status(200).send({ ok: true })
      return res.status(400).send('note not found')
    } catch (err) {
      return res.status(500).send(err.message)
    }
  })

export default handler
