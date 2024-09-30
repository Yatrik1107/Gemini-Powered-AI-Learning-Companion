import React from 'react'
import './FinalScreen.css'
import useQuestion from '../../useReducer/QuestionContext'
import { useNavigate } from 'react-router';
import { questionsAnswers } from '../Questions/Questions';

export default function FinalScreen() {
    const {state, handleCategoryChange, handleDifficultyChange, handleTypeChange, handleAmountChange, handleScoreChange} = useQuestion();
    const navigate = useNavigate();
    const qnas = questionsAnswers;
    // console.log('qnas =',qnas);

    const handlePlayAgain = () =>{
      handleScoreChange(0);

      navigate('/questions');
    }
    
    const handleBackToSettings = () =>{
      handleCategoryChange("");
      handleDifficultyChange("");
      handleTypeChange("");
      handleAmountChange(10);
      handleScoreChange(0);

      navigate('/');
    }
  
  return (
    <div className='result'>
      <h2>
        Score : {state.score}/{state.amount_of_question}
      </h2>

      <div className='scroll'>
        <table className='qnaTable' rules='all'>
            <thead style={{backgroundColor:'rgb(241 240 240)'}}>
              <th>No.</th>
              <th>Questions</th>
              <th>Your Answers</th>
              <th>Correct Answers</th>
              <th>Points</th>
            </thead>
          {
            qnas.map((qna,id)=>{
              return (
                <tr align='center'>
                  <td>{id + 1}</td>
                  <td>{qna. question}</td>
                  <td>{qna. user_answer}</td>
                  <td>{qna. correct_answer}</td>
                  <td>{qna. point}</td>
                </tr>
              )
            })
          }
        </table>
      </div>

        <div className="btns">
          <button className='playAgain' onClick={handlePlayAgain}>Play Again</button>
          <button className='backToHome' onClick={handleBackToSettings}>Back to Home</button>
        </div>

    </div>
  )
}
