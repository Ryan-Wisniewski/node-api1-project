// implement your API here
const express = require('express')
const db = require('./data/db')
// console.log(db)
// console.log(db.find())
const port = 5000

const server = express()
server.use(express.json())

server.post('/api/users', (req, res) => {
    res.status(201).json({url: '/api/users', operation: 'POST'})
})

server.get('/api/users', (req, res) => {
    
    res.db.find()
})

server.get('/api/users/:id', (req, res) => {
    res.send('eachUser')
})

server.put('/api/users/:id', (req, res) => {
    res.status(200).json({url: '/api/users/:id', operation: 'PUT'})
})

server.delete('/api/users/:id', (req, res) => {
    res.sendStatus(204)
})

server.listen(port, () => {
    console.log(`Server listening on ${port}`)
})