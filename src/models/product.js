import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const ProductsSchema = Schema({
  quantity: { type: Number, required: true },
  price: { type: String, required: true },
  available: { type: Boolean, required: true, default: true },
  stars: { type: Number, required: true},
  subLevel_id: { type: Number, required: true },
  name: { type: String, required: true }, 
  description: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  user: { type: ObjectId, ref: 'User', required: true },
})

export default mongoose.model('Product', ProductsSchema)

