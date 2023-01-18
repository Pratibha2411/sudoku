# go to rapidapi.com/hub: search solve sudoku copy snippets for further needs 
# create files: index.html, style.css, app.js
# index.html: 
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Sudoku Solver</title>
                <link rel="stylesheet" href="./style.css">
            </head>
            <body>
                <div id="puzzle"></div>
                <button id="solve-button">Solve</button>

            <script src="./app.js"></script>
            </body>
            </html>
# app.js: 
            const puzzleBoard = document.querySelector('#puzzle')
            const solveButton = document.querySelector('#solve-button')
            const squares = 81 //9*9(in puzzle) = 81


            //for creating squares/grids in puzzle we'll use for loop(can use any loop)
            for(let i = 0; i<squares; i++){
                const inputElement = document.createElement('input')
                //setting attribute type here coz we want number input type only
                inputElement.setAttribute('type', 'number')
                //setting number luimit and type '1'(string) || 1(number) so that u can set number from 1-9 only
                inputElement.setAttribute('min', 1)
                inputElement.setAttribute('max', 9)
                //now put those number in our varibale puzzleBoard
                puzzleBoard.appendChild(inputElement)
            }
# style.css:
            #puzzle{
                width: 450px;
                height: 450px;
            }

            #puzzle input{
                width: 50px; /*so height of puzzle is gonna have 50*9=450px */
                height: 50px;
                /* now we are accounting for all these inputs little tiny borders which is really messing with our styling so below 3 lines of code will solve this*/
                box-sizing: border-box;
                border-spacing: 0;
                border: 1px solid grey ;
            } 

# app.js: after [puzzleBoard.appendChild(inputElement)}] an then define a varibale of an array named 'submission'

            const submission = []

<!-- now get all the values from the inputs that we can send off to be solved as we wanna get em all and change em into an array so going to write a function for this called joinValues. -->

            const joinValues = () => {
                const inputs = document.querySelectorAll('input')
                inputs.forEach(input => {
                    if (input.value){
                        submission.push(input.value)
                    }
                    else{
                        submission.push('.')
                    }
                })
                console.log(submission)
            }
            solveButton.addEventListener('click', joinValues)

# app.js: after [console.log(submission) } ]
<!-- now we need to turn that into a string like so, so we're gonna use some js methods and want to join the inputs||api||. all em together using the js methods "join" & by that time we wanna essentially be sending it to the api so   writing another function called "solve" in which we'll be calling api and paste the snippet code from the api under this function. -->

            const solve = () => {
                //code snippet from the rapidapi.com/hub/sudoku-solver-api
                const axios = require("axios").default;

                const options = {
                    method: 'POST',
                    url: 'https://solve-sudoku.p.rapidapi.com/',
                    headers: {
                        'content-type': 'application/json',
                        'X-RapidAPI-Key':       'ffcfab19b5msh2525db6e1bc06b8p132600jsnb1f6e68999bf',
                        'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com'
                    },
                    data: '{"puzzle":"2.............62....1....7...6..8...      3...9...7...6..4...4....8....52.............3"}'
            };

                axios.request(options).then(function (response) {
                    console.log(response.data);
                }).catch(function (error) {
                    console.error(error);
                });
            }

<!-- now we need to add axios to the project so ez way to to is to link axios script in html -->

# index.html: after [<button id="solve-button">Solve</button>]
 <!-- from axios package: axios-http.com -->
 <!-- Using unpkg CDN -->
                <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
# app.js : in the solve function[] before[solveButton.addEventListener('click', joinValues)]

            const solve = () => {
                // we don't need this anymore coz we added axios link in html
                // const axios = require("axios").default;

                const options = {
                    method: 'POST',
                    url: 'https://solve-sudoku.p.rapidapi.com/',
                    headers: {
                        'content-type': 'application/json',
                        'X-RapidAPI-Key':       'ffcfab19b5msh2525db6e1bc06b8p132600jsnb1f6e68999bf',
                        'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com'
                    },
                    data: '{"puzzle":"2.............62....1....7...6..8...      3...9...7...6..4...4....8....52.............3"}'
            };

                axios.request(options).then( (response) => {
                    console.log(response.data)
                }).catch( (error) => {
                    console.error(error)
                });
            }

            solveButton.addEventListener('click', solve)  

<!-- & replace joinValues with solve and pass it like this: -->
solveButton.addEventListener('click', solve) 
<!-- also we've replace function with arrow function(=>). -->
# app.js: after [const options = {method: 'POST',] and after [const solve = () => {// we don't need this anymore coz we added axios link in html// const axios = require("axios").default;]
<!-- now when i click solve i'd also like to call a function i've is called joinValues & also gonna have to get the submission & use the js method to join up the submission, we wanna change hard coded puzzle and wanna join the input values and api solution value to it so =  -->

            joinValues()
                const data = submission.join('')
                console.log('data', data)
    
<!-- & then replace hard coded puzzle wid the data variable. -->

            data: {
                    "puzzle":data <!-- this -->
                    }

# app.js: after[console.log(response.data)] before[}).catch( (error) => {]
<!-- now what we gonna do well here we wanna go into the response data and get solution so lets do that now and create the variable above and create function as well= -->

            const populateValues = (isSolvable, solution) => {
                const inputss = document.querySelectorAll('input')
<!-- //this is outside of the scope of the other one so we can also give it name like "inputs" but for no daubt im taking it as "inputss" && we don't like to write response.solvable each time so pass it in populateValues(response.data.solvable, response.data.solution) by replacing populateValues(response.data) && pass isSolvable, solution in here: [const populateValues = (isSolvable, solution)] & replace [if (response.solvable && response.solution)] by [if (isSolvable && solution)]  -->
                if (isSolvable && solution){
                    inputss.forEach(input, i => {
<!-- // looping over it  -->
                        input.value = solution[i]
                        
                    })
                }
            }

&
<!-- populateValues(response.data) -->
<!-- updated by given -->
            populateValues(response.data.solvable,response.data.solution)
# index.html: 
            <p id="solution"></p>
# app.js: after [const solveButton = document.querySelector('#solve-button')]
            const solutionDisplay= document.querySelector('#solution')
<!-- after the loop [ // looping over it input.value = solution[i]})] -->
            solutionDisplay.innerHTML = 'This is answer'
                }else{
                    solutionDisplay.innerHTML = 'This is not solvable'
                }
                
# app.js: after[inputElement.setAttribute('max',9)]
<!-- to style it like sudoku we need to do is when we loop over it("min,1 and max,9" line) we can assign it a color so:  -->

# style.css
<!-- then style using class .odd-section{} -->
            .odd-section {
                background-color: lightgray;
            }

# it's done, create a new file ".env" coz we need to hide our api-key so that no-one can steel
<!-- copy the api-key and paste it in .env file -->
            RAPID_API_KEY=ffcfab19b5msh2525db6e1bc06b8p132600jsnb1f6e68999bf
<!-- now create a mini backend to hide api_key -->
app.js:
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
<!-- Now you need to get tha package to make this work so  in the terminal & do "npm init" then you'll see a package.json file -->
<!-- now create a server.js file to defina a backend to hide ur api_key -->
Server.js
    <!-- define port: -->
            const PORT = 8080
<!-- now install few packages like: axios, express, cors, dotenv -->
        terminal "npm i axios express cors dotenv"
<!-- if the version aren't similar then change dependecies in package.jso and in terminal say "npm i" -->
express: we'll be using for rooting in backend to hide api_key
dotenv: dotenv allows us to get information from the env package
cors: we'll be using to admit a cause error msg
axios: package we used to allow us to make POST request, PUT request, GET request and so on

<!-- so now again conti9nue in server.js -->
server.js: 
            const PORT = 8080
            const axios = require('axios').default
            const express = require('express')
            const cors = require('cors')
            require('dotenv').config()

            const app = express() //calling express and puting it in app so that we can use it ezily
            app.use(cors()) //calling cors and passing it in express using  use method of express
            app.use(express.json())
            //listen out to any changes made on port 8080 so:
            app.listen(PORT, () => console.log('server listening on PORT ${PORT}'))

            // now to run this we need to write a script in the package.json
                        // "start:backend": "nodemon server.js",
<!-- then say "npm run start:backend" in terminal -->
Now we'll do some routing so that we can add our api related credentials in the backend:

# server.js: after [app.use(express.json())]


# app.js: after [colsole.log('data',data)]
            fetch('http://localhost:8080/solve', {
                    method: 'POST',
                    header: {
                        'content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                //chaining to check out is everything is okay
                .then(response => response.json())
                .then(data => console.log(data))
                .catch((error) => {
                    console.error('Error', error)
                })
#
#
#
#
#
#
#
#