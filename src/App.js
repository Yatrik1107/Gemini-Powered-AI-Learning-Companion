import React from "react"
import './App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Settings from './pages/Settings/Settings'
import Questions from './pages/Questions/Questions'
import FinalScreen from './pages/FinalScreen/FinalScreen'
// import { QuestionProvider } from "./useReducer/QuestionContext";


function App() {
  return (
    // <QuestionProvider>
    <div className="App">
      {/* <SelectForm/> */}
      <h1>QuizMaster</h1>
      <Router basename="Quiz-App">

            <Routes>
                <Route 
                  path="/" 
                  element={<Settings/> } />
                <Route 
                  path="/questions" 
                  element={<Questions/> } />
                <Route 
                  path="/score" 
                  element={<FinalScreen/>} />
            </Routes>

        </Router>
    </div>
    // </QuestionProvider>
  );
}

export default App;
