const testingRouter = require('express').Router()
const Blog = require('../models/bloges')
const User = require('../models/user')

console.log('testing router chargé')

testingRouter.post('/reset', async (request, response) => {
  console.log('reset appelé')
  await Blog.deleteMany({})
  await User.deleteMany({})
  response.status(204).end()
})

module.exports = testingRouter