import React from 'react';
import { useEffect, useState } from 'react';
import "./App.css";

const WORD_LIST_API_URL = 'https://api.frontendexpert.io/api/fe/wordle-words';
const TOTAL_CHANCES = 6;
const WORD_LENGTH = 5;


export default function Wordle() {
  // Write your code here.
  const [guesses, setGuesses] = useState(Array(TOTAL_CHANCES).fill(null));
  const [currentGuess, setCurrentGuess] = useState('');
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      const response = await fetch(WORD_LIST_API_URL);
      const words = await response.json();
      setSolution(words[Math.floor(Math.random() * words.length)].toLowerCase());
    }
    fetchResult();
  }, []);

  useEffect(() => {
    // to handle keypress

    if (solution == null) return;

    const handlePress = event => {
      if (guesses[TOTAL_CHANCES - 1] != null || guesses.includes(solution)) {
        return;
      }

      const newKeyCharCode = event.key.toLowerCase().charCodeAt(0);
      const isLetter =
        event.key.length === 1 &&
        newKeyCharCode >= 'a'.charCodeAt(0) &&
        newKeyCharCode <= 'z'.charCodeAt(0);

      setCurrentGuess((prevGuess) => {
        if (event.key === "Backspace") {
          return prevGuess.slice(0, -1);
        } else if (event.key === "Enter" && prevGuess.length === WORD_LENGTH) {
          // guesslist update korte hobe
          const currentGuessIndex = guesses.findIndex(guess => guess == null);
          const guessClone = [...guesses];
          guessClone[currentGuessIndex] = prevGuess;
          setGuesses(guessClone);
          return '';
        } else if (prevGuess.length < WORD_LENGTH && isLetter) {
          return prevGuess + event.key.toLowerCase();
        }
        return prevGuess;

      });
    };

    window.addEventListener("keydown", handlePress);
    return () => window.removeEventListener("keydown", handlePress);
  }, [solution, guesses]);


  const currentGuessIndex = guesses.findIndex(guess => guess == null);

  if (solution == null) return null;

  return (
    <div className="board">
      {/* Write your code here. */
        guesses.map((guess, i) => {
          return (
            <GuessLine
              key={i}
              guess={(i === currentGuessIndex ? currentGuess : guess ?? '').padEnd(WORD_LENGTH)}
              isFinal={i < currentGuessIndex || currentGuessIndex === -1}
              solution={solution}
            />
          );
        })
      }
    </div>
  );
}

function GuessLine({ guess, solution, isFinal }) {
  return (
    <div className="line">
      {
        guess.split('').map((char, i) => {
          let className = 'tile';
          if (isFinal) {
            if (solution[i] === char) { className += " correct"; }
            else if (solution.includes(char)) { className += " close"; }
            else { className += " incorrect"; }
          }

          return <div key={i} className={className}>{char}</div>
        })
      }
    </div>
  );
}