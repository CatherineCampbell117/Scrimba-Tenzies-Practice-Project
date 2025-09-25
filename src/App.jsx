import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Die from './Components/Die';

function App() {
    const [randomNumsArr, setRandomNumsArr] = useState(generateAllNewDice());

    function generateAllNewDice() {
        //   return new Array(10)
        //         .fill(0)
        //         .map(() => Math.ceil(Math.random() * 6))
        // }

        const diceRandomNums = [];

        for (let i = 0; i < 10; i++) {
            const randomNum = Math.floor(Math.random() * 6 + 1);
            diceRandomNums.push(randomNum);
        }
        return diceRandomNums;
    }

    console.log(generateAllNewDice());

    const diceElements = randomNumsArr.map((num, index) => <Die key={index} value={num} />);

    return (
        <>
            <main className="mainContent">
                <div className="dieContainer">{diceElements}</div>
            </main>
        </>
    );
}

export default App;
