import Debug from 'debug'
import { Product } from '../models'

const debug = new Debug('market:db:products')

export default {
  findAll: (sort = '-createdAt') => {
    debug('Finding all products')
    return Product.find().populate('products').sort(sort)
  },

  findById: (_id) => {
    debug(`Find product with id ${ _id }`)
    return Product
      .findOne({ _id })
      .populate('user')
      .populate({
        path: 'products',
        options: { sort: '-createdAt' },
        populate: {
          path: 'user',
          model: 'User'
        }
      })
  },

  create: (q) => {
    debug(`Creating new product ${ q }`)
    return q.save()
  },

  delete: (_id) => {
    debug(`Delete product ${ _id }`)
    return Product.findByIdAndRemove(_id)
  },

  update: (_id) => {
    debug(`Update product ${ _id }`)
    return Product.findByIdAndUpdate(_id, {
      firstName: req.body.firstName,
      userName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password
      }, {new: true})
  }
} 
