import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Die from "./Die.jsx";
import RollButton from "./RollButton.jsx";

function App() {
  const [dice, setDice] = React.useState(createDice);
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const isAllHeld = dice.every((die) => die.isHeld);
    const allEqual = dice.every((die) => die.value === dice[0].value);
    if (isAllHeld && allEqual) {
      setTenzies(true);
      console.log("You Won");
    }
  }, [dice]);

  function toggleHold(id) {
    console.log("clikced");
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  function createDice() {
    let dice = [];
    for (let i = 1; i <= 10; ++i) {
      dice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return dice;
  }

  function newGame() {
    console.log("creating new game")
    setTenzies(false);
    setDice(createDice());
  }

  function rollDice() {
    setDice((prevDice) =>
      prevDice.map((die) => {
        if (die.isHeld) return die;
        else {
          const newDie = {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid(),
          };
          return newDie;
        }
      })
    );
  }

  let diceElements = dice.map((die) => {
    return (
      <Die
        value={die.value}
        id={die.id}
        key={die.id}
        isHeld={die.isHeld}
        handleClick={() => toggleHold(die.id)}
      />
    );
  });

  console.log("rendered App");
  return (
    <main>
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p>
        Get all the dice to same number and click to toggle freezing of number
      </p>
      <div className="dice">{diceElements}</div>
      <RollButton
        handleClick={tenzies ? newGame : rollDice}
        value={tenzies ? "New Game" : "Roll"}
      />
    </main>
  );
}

export default App;
