const { response } = require("express")

const puzzleBoard = document.querySelector('#puzzle')
const solveButton = document.querySelector('#solve-button')
const solutionDisplay= document.querySelector('#solution')
const squares = 81 //9*9(in puzzle) = 81
const submission = []

//for creating squares/grids in puzzle we'll use for loop(can use any loop)
for(let i = 0; i<squares; i++){
    const inputElement = document.createElement('input')
    //setting attribute type here coz we want number input type only
    inputElement.setAttribute('type', 'number')
    //setting number luimit and type '1'(string) || 1(number) so that u can set number from 1-9 only
    inputElement.setAttribute('min', 1)
    inputElement.setAttribute('max', 9)
    //to give puzzle style to look alike sudoku
    if(
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
        ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)

    ) {
        inputElement.classList.add('odd-section')
    }

    //now put those number in our varibale puzzleBoard
    puzzleBoard.appendChild(inputElement)
}

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

const populateValues = (isSolvable, solution) => {
    const inputss = document.querySelectorAll('input')
    //this is outside of the scope of the other one so we can also give it name like "inputs" but for no daubt im taking it as "inputss" && we don't like to write response.solvable each time so pass it in populateValues(response.data.solvable, response.data.solution) by replacing populateValues(response.data) && pass isSolvable, solution in here: [const populateValues = (isSolvable, solution)] & replace [if (response.solvable && response.solution)] by [if (isSolvable && solution)]
    if (isSolvable && solution){
        inputss.forEach(input, i => {
            // looping over it 
            input.value = solution[i]
            
        })
        solutionDisplay.innerHTML = 'This is answer'
    }else{
        solutionDisplay.innerHTML = 'This is not solvable'
    }
}


const solve = () => {
    // we don't need this anymore coz we added axios link in html
    // const axios = require("axios").default;

    joinValues()
    const data = {number:submission.join('')}
    console.log('data', data)

    fetch('http://localhost:8080/solve', {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    //chaining to check out is everything is okay
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
        console.error('Error', error)
    })
}

solveButton.addEventListener('click', solve)  
// now we need to turn that into a string like so, so we're gonna use some js methods and want to join the inputs||api||. all em together using the js methods "join" & by that time we wanna essentially be sending it to the api so   writing another function called "solve" in which we'll be calling api and paste the snippet code from the api under this function.
