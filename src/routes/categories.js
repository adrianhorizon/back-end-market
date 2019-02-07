import express from 'express'
import Debug from 'debug'
import { required, categoriesMiddleware } from '../middleware'
import { categories } from '../db'
import { handleError } from '../utils'
import { Categories } from '../models'

const app = express.Router()
const debug = new Debug('market:categories')

app.get('/', async (req, res) => {
  try {
    const categorie = await categories.findAll()
    res.status(200).json(categorie)
  } catch (error) {
    handleError(error, res)
  }
})

app.get('/:id', categoriesMiddleware, async (req, res) => {
  try {
    res.status(200).json(req.categories)
  } catch (error) {
    handleError(error, res)
  }
})

app.post('/', required, async (req, res) => {
  const { name, price, image } = req.body
  const q = new Categories({
    name,
    subLevels: {
      id,
      name,
      subLevels: {
        id,
        name
      },
    },
    price,
    image,
    user: req.user._id
  })
  try {
    const savedProduct = await product.create(q)
    res.status(201).json(savedProduct)
  } catch (error) {
    handleError(error, res)
  }
})

app.delete('/:id', categoriesMiddleware, async (req, res) => {
  try {
    const categoriesId = await categories.delete(req.categories)
    res.status(200).json({
      message: 'Product deleted successfully!',
      categoriesId
    })
  } catch (error) {
    handleError(error, res)
  }
}) 

export default app