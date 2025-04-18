import React, {useState, useEffect} from 'react'
import AnswerSection from './AnswerSection'

const Quiz = () => {

    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const [score, setScore] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState([])

    const formatQuestions = (rawQuestions) => {
  return rawQuestions.map((question) => {
    const allAnswers = [question.correct_answer, ...question.incorrect_answers];
    const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

    const answers = {};
    const correct_answers = {};
    const answerKeys = ['answer_a', 'answer_b', 'answer_c', 'answer_d'];

    shuffledAnswers.forEach((answer, index) => {
      const key = answerKeys[index];
      answers[key] = answer;
      correct_answers[`${key}_correct`] = answer === question.correct_answer ? "true" : "false";
    });

    return {
      ...question,
      answers,
      correct_answers,
    };
  });
};


    //     //fetch questions from API

useEffect(()=> {
  fetch("https://opentdb.com/api.php?amount=5&category=28&difficulty=medium&type=multiple")
  .then(res => res.json())
  .then(data => setQuestions(formatQuestions(data.results)))
  .catch(err => console.log(err))
}, [])

// Handle the Clicked answers option

const handleAnsSelected = (isCorrect, answer)=> {
  if(isCorrect){
    setScore((prev)=> prev + 1)
  }

  const updatedSelectedAns = [...selectedAnswers]
  updatedSelectedAns[currentQuestion] = answer
  setSelectedAnswers(updatedSelectedAns)

  const nextQuestion = currentQuestion + 1
  if(nextQuestion < questions.length){
    setCurrentQuestion(nextQuestion)
  }
  else {
    setShowScore(true)
  }
}

// Handle play button functionality

const handleRetry = ()=> {
  setCurrentQuestion(0)
  setShowScore(false)
  setScore(0)
  setSelectedAnswers([])
}


  return (
    <div>
      <h1>G9 Quiz App</h1>
      {showScore ? (
        <div>
          <h2>Your Score: {score}</h2>
          <button onClick={handleRetry}>Retry</button>
        </div>
      ) : (
        <section>
        {questions.length > 0 && (
  <div>
    <div>
      <span>{currentQuestion + 1}</span>/{questions.length}
    </div>
    <div>
      {questions[currentQuestion]?.question}
    </div>

    <AnswerSection
      questions={questions}
      currentQuestion={currentQuestion}
      handleAnsSelected={handleAnsSelected}
    />

    <div>
      {currentQuestion > 0 && (
        <button onClick={() => setCurrentQuestion(currentQuestion - 1)}>Previous</button>
      )}
      {currentQuestion < questions.length - 1 && (
        <button onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next</button>
      )}
    </div>
  </div>
)}

         
        </section>
      )}
    </div>
  )
}

export default Quiz

