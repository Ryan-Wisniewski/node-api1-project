// implement your API here
const express = require('express')
const db = require('./data/db')
// console.log(db)
// console.log(db.find())
const port = 5000

const server = express()
server.use(express.json(db))

//w
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

//w
server.get('/api/users', (req, res) => {
    db.find()
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err=>{
        res.status(500).json({error: "The users information could not be retrieved."})
    })
    
})
//w
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    db.findById(id)
        .then(user => {
            if(id.length > 0){
                res.status(200).json(user)
            } else {
                res.status(404).json({ error: 'invalid id' })
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not process'})
        })
})

// server.put('/api/users/:id', (req, res) => {
//     const { name, bio } = req.body;
  
//     if (!name || !bio) {
//       res
//         .status(400)
//         .json({ errorMessage: 'Please provide name and bio for the user.' });
//     } else {
//       Users.update(req.params.id, req.body)
//         .then(user => {
//           if (user) {
//             res.status(200).json(user);
//           } else {
//             res
//               .status(404)
//               .json({
//                 message: 'The user with the specified ID does not exist.',
//               });
//           }
//         })
//         .catch(() => {
//           res.status(500).json({
//             errorMessage: 'The user information could not be modified.',
//           });
//         });
//     }
//   });
  
server.put('/api/users/:id', (req, res) => {
    const { name, bio } = req.body
    const { id } = req.params
    console.log(id)
    if (!name || !bio){
        res.status(400).json({ errer: 'provide a name and bio'})
    } else {
    db.update(id, req.body)
        .then(user => {
            if(user){
                res.status(200).json(user)
            } else {
                res.status(404).jason({ error: 'user not found'})
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not process'})
        })
    }
})

//w
server.delete('/api/users/:id', (req, res) => {
    //takes id
    const { id } = req.params
    db.remove(id)
        .then(users => {
            if(id){
                res.status(204).json(users)
            } else {
                res.status(400).json({ error: 'Invalid format'})
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not process'})
        })
})

server.listen(port, () => {
    console.log(`Server listening on ${port}`)
})
