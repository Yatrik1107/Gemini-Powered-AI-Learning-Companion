import React, { useState, useEffect } from 'react'
import './Questions.css'
import Axios from '../../Axios/Axios';
import useQuestion from '../../useReducer/QuestionContext';
import { decode } from 'html-entities';
import { useNavigate } from 'react-router-dom';

var questionsAnswers;

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

export default function Questions() {
    const {state, handleScoreChange} = useQuestion();
    // console.log('state =', state)
    // console.log("question_category =",state.question_category)
    // console.log("question_type =",state.question_type)
    // console.log("question_difficulty =",state.question_difficulty)
    // console.log("amount_of_question =",state.amount_of_question)
    // console.log("score =",state.score)
    const navigate = useNavigate()


    // let apiURL = `https://opentdb.com/api.php?amount=${}&category=${}&difficulty=${}&type=${}`;
    let apiURL = `https://opentdb.com/api.php?amount=${state.amount_of_question}`;

    if (state.question_category){
      apiURL = apiURL.concat(`&category=${state.question_category}`);
    }
    if (state.question_difficulty){
      apiURL = apiURL.concat(`&difficulty=${state.question_difficulty}`);
    }
    if (state.question_type){
      apiURL = apiURL.concat(`&type=${state.question_type}`);
    }

    // console.log('apiURL =', apiURL);
    const { response, loading } = Axios({ url: apiURL});
    // console.log('question response =',response);

    const [questionIndex, setQuestionIndex] = useState(0);
    const [options, setOptions] = useState([]);
    // console.log('options =', options)

    useEffect(() => {
      if (response?.results.length) {
        const question = response.results[questionIndex];
        let answers = [...question.incorrect_answers];
        // to set options randomly
        answers.splice(
          getRandomInt(question.incorrect_answers.length),
          0,
          question.correct_answer
        );
        setOptions(answers);
      }
    }, [response, questionIndex]);
    

    const [userSlectedAns, setUserSlectedAns] = useState(null);
    const [selectedQuestioniD, setSelectedQuesionID] = useState(null);
    const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);


    const handleNextQuestion = () =>{
      const question = response.results[questionIndex];
      let point = 0;

      // console.log('correct answrer = ',question.correct_answer)
      if(userSlectedAns === question.correct_answer){
        // console.log('True')
        point = 1;
        handleScoreChange( state.score+1 );
      }

      const qna = questionsAndAnswers;
      qna.push({
        question: decode(question.question),
        user_answer: userSlectedAns,
        correct_answer: decode(question.correct_answer),
        point
      });
      
      if(questionIndex+1 < response.results.length){
        setUserSlectedAns(null);
        setSelectedQuesionID(null);
        setQuestionsAndAnswers(qna);
        setQuestionIndex(questionIndex+1);
      }
      else{
        questionsAnswers = questionsAndAnswers;
        navigate('/score');
      }
    }



    if(loading){
      return(
        <>
            <div className="loading"></div>
        </>
    )
    }

  return (
    <div className='container'>

        <div className='questionHeader'>
          <div className="questionNo">
            Question No.{questionIndex + 1} of {state.amount_of_question}
          </div>
          <div className="timer">
            <div className="hour">HH</div>
            <div className="minutes">MM</div>
            <div className="seconds">SS</div>
          </div>
        </div>

        <div className="question">
          { decode(response.results[questionIndex].question) }
        </div>

        <div className="options">
          {
            options.map((data, id)=>{
              return (
                <div className="option" onClick={()=>{setUserSlectedAns(data); setSelectedQuesionID(id)}} value={data} style={ selectedQuestioniD==id ? {backgroundColor:"#d7d7d7"} : null}>
                    
                  <span>
                    { id==0 ? 'A.': null }
                    { id==1 ? 'B.': null }
                    { id==2 ? 'C.': null }
                    { id==3 ? 'D.': null }
                  </span> {decode(data)}

                </div>
              )
            })
          }
        </div>

        {/* <h3>Score: {state.score} / {response.results.length}</h3> */}
        
        <div className='btn-container'>
          <button className='btn' onClick={handleNextQuestion} disabled={userSlectedAns==null? true : false}  style={userSlectedAns==null? {backgroundColor:'#8bb2cf',cursor:'not-allowed'} : null} title='Please select one option to move in next question' >
            {questionIndex+1 == response.results.length? 'Submit' : 'Next'}
          </button>
        </div>

    </div>
  )
}


export {questionsAnswers}