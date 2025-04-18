import React from 'react'

const AnswerSection = ({questions, currentQuestion, handleAnsSelected}) => {

    console.log('Current Question:', questions[currentQuestion]);
console.log('Answers:', questions[currentQuestion]?.answers);


  return (
    <div>
        {questions[currentQuestion]?.answers && Object.entries(questions
            [currentQuestion]?.answers).map(([key, value]) =>(
                value && (
                    <button key={key} onClick={()=>
                        handleAnsSelected(questions[currentQuestion]
                            ?.correct_answers[`${key}_correct`] ==="true", value)}>
    {value}
</button>
                )
            ))}
    </div>
  )
}

export default AnswerSection