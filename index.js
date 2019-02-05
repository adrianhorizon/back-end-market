import Debug from 'debug'
import app from './app'
import mongoose from 'mongoose'
import { mongoUrl, port } from './config'

const debug = new Debug('market:root')

async function start() {
  mongoose.Promise = global.Promise
  await mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true })
        mongoose.set('useFindAndModify', false)

  app.listen(port, () => {
    debug(`Server running at port ${port}`)
  })
}

start()
