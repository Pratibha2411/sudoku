const PORT = 8080
const axios = require('axios').default
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express() //calling express and puting it in app so that we can use it ezily
app.use(cors()) //calling cors and passing it in express using  use method of express
app.use(express.json())

//post request coz this is a post request and grab all from const option = { } and axios function as well full function from app.js
// & we are going to make a post request 'solve' get the method and pass through the path as well as the request and response 
app.post('/solve', (req, res) => {
    console.log(req)
    const options = {
        method: 'POST',
        url: 'https://solve-sudoku.p.rapidapi.com/',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com'
        },
        data: {
            "puzzle":req.body.numbers
        }
};

    axios.request(options).then( (response) => {
	    console.log(response.data)
        // now this function does not exis here so cmnted now insted of that using res.json(response.data) to show the response data
        // populateValues(response.data.solvable,response.data.solution)
        res.json(response.data)
        

    }).catch( (error) => {
        console.error(error)
    });
})


//listen out to any changes made on port 8080 so:
app.listen(PORT, () => console.log(`server listening on PORT ${PORT}`))

// now to run this we need to write a script in the package.json
            // "start:backend": "nodemon",