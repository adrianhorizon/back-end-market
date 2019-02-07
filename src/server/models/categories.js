import mongoose, { Schema } from 'mongoose'

const CategoriesSchema = Schema({
    name: { type: String, required: true },
    subLevels: {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        subLevels: {
            id: { type: Number, required: true },
            name: { type: String, required: true },
            subLevels: {
                id: { type: Number, required: true },
                name: { type: String, required: true },
            }
        }
    }
})

export default mongoose.model('Categories', CategoriesSchema)

