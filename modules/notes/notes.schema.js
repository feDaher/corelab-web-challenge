import Joi from 'joi'
import joiObjectid from 'joi-objectid'

Joi.objectId = joiObjectid(Joi)

export const createNoteSchema = Joi.object({
  title: Joi.string()
    .required()
    .max(100)
    .message('O campo Título pode ter no máximo {{#limit}} caracteres'),
  text: Joi.string()
    .required()
    .max(512)
    .message('O campo "Criar nota" pode ter no máximo {{#limit}} caracteres'),
  color: Joi.string().required()
})

export const deleteNoteSchema = Joi.object({
  id: Joi.objectId().required()
})

export const editNoteSchema = Joi.object({
  id: Joi.objectId().required(),
  title: Joi.string().required().max(100),
  text: Joi.string().required().max(512),
  color: Joi.string()
})

export const editNoteColor = Joi.object({
  color: Joi.string().required()
})
