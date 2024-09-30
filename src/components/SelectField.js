import React,{ useState } from 'react'
import './SelectField.css'
import useQuestion from '../useReducer/QuestionContext';


function Form(props) {
    const {options, label} = props
    const [value, setValue] = useState("");

    const {handleCategoryChange, handleDifficultyChange, handleTypeChange} = useQuestion();

    const handleChange = (e) =>{
      setValue(e.target.value);
      switch(label){
        case "Category":
          handleCategoryChange(e.target.value);
          break;
        case "Difficulty":
          handleDifficultyChange(e.target.value);
          break;
        case "Type":
          handleTypeChange(e.target.value);
          break;
        default:
          return;
      }
    }

  return (
    <>
      <div>
        <label>{label}</label>
          
        <select value={value}  onChange={handleChange}>
          <option selected hidden>Any {label}</option>
          {
            options.map(({ id, name }) => (
              <option value={id} key={id}>
                {name}
              </option>
            ))
          }
        </select>
      </div>

    </>
  )
}

export default Form