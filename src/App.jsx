import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Die from './Components/Die';
import { nanoid } from 'nanoid';

function App() {
    // Set dice with a state of the function that generates 10 random numbers (objects)
    const [dice, setDice] = useState(generateAllNewDice());

    // generate 10 random numbers on first render of Die components
    function generateAllNewDice() {
        // Start with an empty array
        const diceRandomNums = [];

        // For every loop up to 10, create an array of objects which hold value, isHeld, and id.
        // Within the value of the object for each of the 10 objects, create a random number, a boolean value of isHeld: false, and a unique id.
        for (let i = 0; i < 10; i++) {
            const randomNum = {
                value: Math.floor(Math.random() * 6 + 1),
                isHeld: false,
                id: nanoid()
            };
            // After every loop, add the new object to the empty array that was created.
            diceRandomNums.push(randomNum);
        }
        // Return the Array of 10 objects
        return diceRandomNums;
    }

    console.log(generateAllNewDice());

    // Create a variable for the Die components
    // Map over the dice state using the dice objects to get each objects keys such as id, value, and isHeld.
    const diceElements = dice.map(dieObj => (
        // Return a Die component with the following props. There will be 10 of these components becasue there are 10 objects.
        <Die
            key={dieObj.id}
            id={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
            onClick={holdDice}
        />
    ));

    // Crete function that accepts the unique id of a single Die component to
    // determine which dice should be held and only changing the isHeld boolean of that component.
    function holdDice(id) {
        // Use the setDice state to set a new state for the Die components.
        setDice(prevDice =>
            // Map over the prev state of Dice to check through each dice to see if the id matches the id that was clicked.
            // If its a match, copy all previous props and toggle the isHeld from flase to true OR true ot false.
            // If the id does not match, return the original die and its properties.
            // If die.isHeld is false, then !die.isHeld is true and vice versa.
            // If the id does not match, the original die is returned with : die.
            prevDice.map(die => (die.id === id ? { ...die, isHeld: !die.isHeld } : die))
        );
    }

    //
    function getNewDice() {
        setDice(prevDice =>
            prevDice.map(die =>
                die.isHeld ? { ...die } : { ...die, value: Math.ceil(Math.random() * 6) }
            )
        );
    }

    return (
        <>
            <main className="mainContent">
                <h1 className="title">Tenzies</h1>
                <p className="instructions">
                    Roll until all dice are the same. Click each die to freeze it at its current
                    value between rolls.
                </p>
                <div className="dieContainer">{diceElements}</div>
                <button className="rollBtn" onClick={getNewDice}>
                    Roll
                </button>
            </main>
        </>
    );
}

export default App;
