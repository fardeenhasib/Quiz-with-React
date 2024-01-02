import React from 'react';
import { useEffect, useState } from 'react';
import "./App.css";


const QUIZ_API_BASE_URL = 'https://api.frontendexpert.io/api/fe/quiz';

export default function Quiz() {
  // Write your code here.
  const [questions, setQuestions] = useState(null);
  const [curIndex, setCurIndex] = useState(0);
  const [ansArr, setAnsArr] = useState([]);

  useEffect(() => {
    const getQs = async () => {
      const fetchedQs = await fetch(QUIZ_API_BASE_URL);
      const Qs = await fetchedQs.json();
      setQuestions(Qs);
    }
    getQs();
  }, []);

  const updateAnswer = (qIndex, ansIndex) => {
    const ansArrClone = [...ansArr];
    ansArrClone[qIndex] = ansIndex;
    setAnsArr(ansArrClone);
  }

  if (questions == null) return null;
  const curQuestion = questions[curIndex];
  return (
    <>
      <h1>{curQuestion.question}</h1>
      {curQuestion.answers.map((answer, index) => {
        let className = 'answer';
        let chosenAnswer = ansArr[curIndex];
        if (chosenAnswer === index) {
          className += curQuestion.correctAnswer === chosenAnswer ? ' correct' : ' incorrect';
        }
        console.log(className);
        return (
          <h2
            key={answer}
            className={className}
            onClick={() => {
              if (ansArr[curIndex] != null) {
                return;
              }
              updateAnswer(curIndex, index);
            }}>{answer}</h2>

        );
      })}
      <button onClick={() => {
        setCurIndex(curIndex - 1);
      }}
        disabled={curIndex == 0}>Back</button>
      <button
        onClick={() => {
          setCurIndex(curIndex + 1);
        }}
        disabled={curIndex == questions.length - 1 || ansArr[curIndex] == null}>Next</button>
    </>
  );
}
