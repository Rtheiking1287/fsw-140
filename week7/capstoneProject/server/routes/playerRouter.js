const express = require('express')
const playersRouter = express.Router()
const { v4: uuidv4 } = require('uuid')

// Create an array of items
// In the future this will be a database
// Create a unique _id for each item using uuidv4
let players = [
    {"position": "Guard", "name": "Johnny Davis", "_id": uuidv4()},
    {"position": "Guard", "name": "Bradley Beal", "_id": uuidv4()},
    {"position": "Forward-Center", "name": "Kristaps Porzingis", "_id": uuidv4()},
    {"position": "Forward", "name": "Rui Hachimura", "_id": uuidv4()},
]

// Create the router
playersRouter
    // Get All players
    // Endpoint: GET - http://localhost:9000/players
    .get('/',(req, res) => {
        console.log("GETTING ALL ...")
        
        // Send back the players array
        res.send(players)
    })

    // Get ONE player based in the teamId sent in the URL
    // Endpoint: GET - http://localhost:9000/players/:playerId
    .get('/one/:playerId', (req, res) => {
        console.log("GETTING ONE...")
    
        // Grab the playerId from the URL
        const playerId = req.params.playerId
        
        // Using players array, pull one player at a time and put into player variable
        // Compare item._id is from the array => teamId was sent in the URL
        // The first one that matches goes in singularItem variable
        const singularItem = players.find(player => player._id === playerId)
        
        // Send back the one found item from the array
        res.send(singularItem)
    })

    // Get player that match a search term
    // Endpoint: SEARCH - http://localhost:9000/players/search
    // SEARCH is not a supported HTTP Verb in Express
    .get('/search/:string', (req, res) => {
        console.log("SEARCHING FOR ITEMS ...")

        // Grab the search term from the URL
        var searchString = req.params.string

        // Look for the name in the array, and find all that match
        const filteredItems = players.filter(player => player.name.toLowerCase().includes(searchString))

        if (!filteredItems) {
            const error = new Error('This Player was not found');
            res.send(error);
        }
        
        // Send back all the matched players from the array
        console.log(filteredItems)
        res.send(filteredItems)
    })
    
    // Add player to the players array
    // Endpoint: POST - http://localhost:9000/players
    .post('/', (req, res) => {
        console.log("CREATING A NEW ITEM ...")
        
        // Grab the new player JSON content from the POST body
        const newPlayer = req.body
        
        // Add a new field called _id and set it to a unique value
        newPlayer._id = uuidv4()
        
        // Add the new player to the players array
        players.push(newPlayer)
        
        // Send back the new players
        res.send(newPlayer)
    })

    // Update an item in the item array based on _id
    // Endpoint: PUT - http://localhost:9000/players/:playerId
    .put('/:playerId', (req, res) => {
        console.log("UPDATING AN ITEM ...")
        
        // Grab the teamId from the URL
        const playerId = req.params.playerId
        
        // Find the array index of the player with the matching _id
        const itemIndex = players.findIndex(item => item._id === playerId)
        
        // Push the udpated player into players array where the _id matchs
        Object.assign(players[itemIndex], req.body)
        
        // Send back the updated item
        res.send(players[itemIndex])
    })

    // Delete an item in the item array based on _id
    // Endpoint: DELETE - http://localhost:9000/players/:playerId
    .delete('/:playerId', (req, res) => {
        console.log("DELETING AN ITEM ...")
        
        // Grab the teamId from the URL
        const playerId = req.params.playerId

        // Find the array index of the player with the matching _id
        const itemIndex = players.findIndex(item => item._id === playerId)
        // Delete the player from the players array
        players.splice(itemIndex, 1)

        // Send back the success message
        res.status(200).send()
    })
// Export the router so can be used in the server.js file
module.exports = playersRouter