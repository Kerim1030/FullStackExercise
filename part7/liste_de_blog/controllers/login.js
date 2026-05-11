const loginRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user
    ? await bcrypt.compare(password, user.passwordHash)
    : false

  if (!user || !passwordCorrect) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.SECRET,
    { expiresIn: '1h' }
  )

  response.json({ token, username: user.username, name: user.name })
})

module.exports = loginRouter