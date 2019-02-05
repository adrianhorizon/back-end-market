import Debug from 'debug'
import { Categories } from '../models'

const debug = new Debug('market:db:categories')

export default {
  findAll: () => {
    debug('Finding all categories')
    return Categories.find()
  },

  findById: (_id) => {
    debug(`Find categories with id ${ _id }`)
    return Categories
      .findOne({ _id })
      .populate({
        path: 'categories',
        populate: {
          path: 'user',
          model: 'User'
        }
      })
  },

  create: (q) => {
    debug(`Creating new categories ${ q }`)
    return q.save()
  },

  delete: (_id) => {
    debug(`Delete categories ${ _id }`)
    return Categories.findByIdAndRemove(_id)
  }
} 
