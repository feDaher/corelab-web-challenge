import Joi from 'joi'
import joiObjectid from 'joi-objectid'

Joi.objectId = joiObjectid(Joi)

export const createNoteSchema = Joi.object({
  title: Joi.string().required().max(30),
  text: Joi.string().required().max(256),
  color: Joi.string().required()
})

export const deleteNoteSchema = Joi.object({
  id: Joi.objectId().required()
})

export const editNoteSchema = Joi.object({
  id: Joi.objectId().required(),
  title: Joi.string().required().max(30),
  text: Joi.string().required().max(256),
  color: Joi.string()
})

export const editNoteColor = Joi.object({
  color: Joi.string().required()
})
