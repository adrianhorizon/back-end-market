import express from 'express'
import Debug from 'debug'
import { required, productMiddleware } from '../middleware'
import { product } from '../db'
import { handleError } from '../utils'
import { Product } from '../models'

const app = express.Router()
const debug = new Debug('market:product')

app.get('/', async (req, res) => {
  try {
    const { sort } = req.query
    const products = await product.findAll(sort)
    res.status(200).json(products)
  } catch (error) {
    handleError(error, res)
  }
})

app.get('/:id', productMiddleware, async (req, res) => {
  try {
    res.status(200).json(req.product)
  } catch (error) {
    handleError(error, res)
  }
})

app.post('/', required, async (req, res) => {
  const { quantity, price, available, stars, subLevel_id, name, description, image } = req.body
  const q = new Product({
    quantity,
    price,
    available,
    stars,
    subLevel_id,
    name,
    description,
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

app.delete('/:id', productMiddleware, async (req, res) => {
  try {
    const productId = await product.delete(req.product)
    res.status(200).json({
      message: 'Product deleted successfully!',
      productId
    })
  } catch (error) {
    handleError(error, res)
  }
})

export default app