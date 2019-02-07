import express from 'express'
import bodyParser from 'body-parser'
import { product, categories, auth } from './routes'
import mongoose from 'mongoose'
import { mongoUrl, port } from './config'
import 'babel-polyfill';

const app = express(),
            DIST_DIR = __dirname

app.use(express.static(DIST_DIR))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use('/api/products', product)
app.use('/api/categories', categories)
app.use('/api/auth', auth)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS')
  next()
})

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




