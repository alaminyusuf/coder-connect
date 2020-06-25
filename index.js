const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.status(200).send('Hello World...')
})

app.listen(4000, () => console.log('Server started...'))
