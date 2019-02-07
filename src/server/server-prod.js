import express from 'express'
import bodyParser from 'body-parser'
import { product, categories, auth } from './routes'
import mongoose from 'mongoose'
import { mongoUrl, port } from './config'

const app = express(),
            DIST_DIR = __dirname

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.use('/api/products', product)
app.use('/api/categories', categories)
app.use('/api/auth', auth)

app.use(express.static(DIST_DIR))
app.use(bodyParser.urlencoded({
  extended: true
}))

async function start() {
    mongoose.Promise = global.Promise
    await mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true })
          mongoose.set('useFindAndModify', false)
  
    app.listen(port, () => {
        console.log(`App listening to ${port}....`)
        console.log('Press Ctrl+C to quit.')
    })
  }
  
start()




