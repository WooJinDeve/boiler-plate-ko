const express = require('express')
const app = express()
const port = 5000



const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://root:11223344@boilerflate.offskgq.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB Connected..'))
    .catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})