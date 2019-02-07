import { categories } from '../db'
import { handleError } from '../utils'

export const categoriesMiddleware = async (req, res, next) => {
  try {
    req.categories = await categories.findById(req.params.id)
    next()
  } catch (err) {
    handleError(err, res)
  }
}

