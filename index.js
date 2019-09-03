// implement your API here
const express = require('express')
const db = require('./data/db')
// console.log(db)
// console.log(db.find())
const port = 5000

const server = express()
server.use(express.json(db))

server.post('/api/users', (req, res) => {
    // res.status(201).json({url: '/api/users', operation: 'POST'})
    const { name, bio } = req.body

    if ( !name || !bio ){
        res
        .status(400)
        .json({ error: 'Please provide a name and bio for the user.'})        
    } else{
        db.insert(req.body)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(()=>{
                res.status(500).json({
                    error:
                        'There was an error accesing the user database'
                })
            })
    }
})

server.get('/api/users', (req, res) => {
    db.find()
    .then(user => {
        res.status(200).json(user)
    })
    .catch(()=>{
        res.status(500).jason({error: "The users information could not be retrieved."})
    })
    
})
//no internet this seems close if not working :)
server.get('/api/users/:id', (req, res, id) => {
    // const { id } = req.body
    console.log(id)

    if (id !== Number(id)){
        res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." })
    }else{
        db.findById(req.body)
        .then(user=>{
            res.status(200).json(user)
        })
        .catch(()=>{
            res.status(500).json({
                error: "The users information could not be retrieved."
            })
        })
    }
})

server.put('/api/users/:id', (req, res) => {
    res.status(200).json({url: '/api/users/:id', operation: 'PUT'})
})

server.delete('/api/users/:id', (req, res) => {
    //takes id
    const { id } = req.body

    if (id !== Number(id)){
        res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." })
    } else {
        db.remove()
        .then(user=>{
            res.status(200).json(user)
        })
        .catch(()=>{
            res.status(500).json({ error: "The user could not be removed" })
        })
    }
})

server.listen(port, () => {
    console.log(`Server listening on ${port}`)
})
