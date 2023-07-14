const connect2mongo= require('./db');
const express = require('express');
var cors = require('cors')

connect2mongo();

const app = express()
app.use(cors())
const port = 5000

app.use(express.json())

app.use('/api/auth',require('./routes/auth'))

app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => {
  console.log(`i-Notes is listening at http://localhost:${port}`)
})


