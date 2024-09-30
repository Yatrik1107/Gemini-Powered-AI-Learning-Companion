import React, { useState } from 'react'
import './TextField'
import useQuestion from '../useReducer/QuestionContext'

export default function TextField() {
      const {state, handleAmountChange } = useQuestion();
    
    const handleChange = (e) =>{
        handleAmountChange(e.target.value);
    }
    
  return (
    <div>
        <label>No. of Questions</label>
        <input type="number" onChange={handleChange}  value={state.amount_of_question}/>
    </div>
  )
}
