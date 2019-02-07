import { product } from '../db'
import { handleError } from '../utils'

export const productMiddleware = async (req, res, next) => {
  try {
    req.product = await product.findById(req.params.id)
    next()
  } catch (err) {
    handleError(err, res)
  }
}