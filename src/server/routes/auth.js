import express from 'express'
import Debug from 'debug'
import jwt from 'jsonwebtoken'
import { secret, secretToken } from '../config'
import { tokenMiddleware } from '../middleware'
import { User } from '../models'
import { hashSync as hash, compareSync as comparePasswords } from 'bcryptjs'

const tokenList = {}
const app = express.Router()
const debug = new Debug('market:auth')

app.post('/signin', async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    debug(`User with email ${email} not found`)
    return handleLoginFailed(res)
  }

  if (!comparePasswords(password, user.password)) {
    debug(`Passwords do not match: ${password} !== ${user.password}`)
    return handleLoginFailed(res, 'El correo y la contraseña no coinciden')
  }
  
  const token = createToken(user)
  const refreshToken = refreshTokenSecret(user)
    const response = {
        "status": "Logged in",
        "token": token,
        "refreshToken": refreshToken,
        userId: user._id,
        firstName: user.firstName,
        userName: user.userName,
        phone: user.phone,
        email: user.email
    }
    tokenList[refreshToken] = response
    res.status(200).json(response)
})

app.post('/token', (req, res)  => {
  const userToken = req.body

  if ((userToken.refreshToken) && (userToken.refreshToken in tokenList)) {

      const user = {
        email: userToken.email,
        firstName: userToken.firstName
      }
      const token = jwt.sign(user, secret, { expiresIn: 10400})
      const response = {
        "token": token,
      }

      tokenList[userToken.refreshToken].token = token
      res.status(200).json(response);        

  } else {
      res.status(404).send('Invalid request')
  }
})

app.get('/secure', tokenMiddleware, async (req,res) => {
  try {
    res.send('encript token secure method 503')
    
  } catch (error) {
    handleError(error, res)
  }
})

const createToken = (user) => jwt.sign({ user }, secret, { expiresIn: 10400}) 
const refreshTokenSecret = (user) => jwt.sign({ user }, secretToken, { expiresIn: 14400})

app.post('/signup', async (req, res) => {
  const { firstName, userName, phone, email, password } = req.body
  const newUser = new User({
    firstName,
    userName,
    phone,
    email,
    password: hash(password, 10)
  })
  debug(`Creating new user: ${newUser}`)
  const user = await newUser.save()
  const token = createToken(user)
  res.status(201).json({
    message: 'User saved',
    token,
    userId: user._id,
    firstName,
    userName,
    phone,
    email
  })
})

function handleLoginFailed(res, message) {
  return res.status(401).json({
    message: 'Login failed',
    error: message || 'Email and password don\'t match'
  })
}

export default app
