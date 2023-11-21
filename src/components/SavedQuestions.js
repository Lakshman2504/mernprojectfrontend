import React, { useState, useEffect } from 'react';
import axios from 'axios';


const API_URL = 'https://mernprojectbackend-2.onrender.com';

function SavedQuestions({ onScoreSubmit }) {
  const [testInfo, setTestInfo] = useState({});
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [timer, setTimer] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [studentsData, setStudentsData] = useState([]); // State to store fetched student data

  useEffect(() => {
    const fetchTestInfoAndQuestions = async () => {
      try {
        const res = await axios.get(`${API_URL}/questions`);
        const testQuestions = res.data[0]?.questions || [];
        setTestInfo({
          testTitle: res.data[0]?.testTitle || 'Default Test Title',
          testTime: res.data[0]?.testTime || 0,
        });
        setQuestions(testQuestions);
        setTimer(res.data[0]?.testTime || 0);

        // Extract correct answers from fetched questions
        const correctAnswersObj = {};
        testQuestions.forEach((question) => {
          correctAnswersObj[question._id] = question.correctAnswer;
        });
        setCorrectAnswers(correctAnswersObj);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTestInfoAndQuestions();
  }, []);

  useEffect(() => {
    // Fetch student data when the component mounts
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`${API_URL}/saveStudentData`);
        setStudentsData(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, []); 

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        clearInterval(timerInterval);
        if (!submitted) {
          handleSubmit();
        } // Automatically submit when the timer reaches zero
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer, submitted]);
  

  const handleAnswerChange = (questionId, selectedAnswer) => {
    setUserAnswers({ ...userAnswers, [questionId]: selectedAnswer });
  };

  

  const handleSubmit = async () => {
    try {
      // Calculate the score by comparing user answers with correct answers
      const calculatedScore = Object.keys(userAnswers).reduce((totalScore, questionId) => {
        const userAnswer = userAnswers[questionId];
        const correctAnswer = correctAnswers[questionId];
        if (userAnswer === correctAnswer) {
          return totalScore + 1;
        }
        return totalScore;
      }, 0);

      setScore(calculatedScore);
      setSubmitted(true);
      onScoreSubmit(calculatedScore);
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <div>
      <h1>{testInfo.testTitle}</h1>
      {timer > 0 ? (
        <p>Test Time Remaining: {timer} seconds</p>
      ) : (
        <p>Test Time is up!</p>
      )}
      <h2>Questions</h2>
      {questions.map((question) => (
        <div key={question._id}>
          <p>{question.question}</p>
          <ul>
            {question.options.map((option, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name={question._id}
                    value={option}
                    onChange={() => handleAnswerChange(question._id, option)}
                    disabled={timer <= 0}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {timer > 0 ? (
       <>
       <button onClick={() => { handleSubmit(); setTimer(0); }} disabled={timer <= 0 || submitted}>
         Submit Test
       </button>
     </>
     
      ) : (
        <div>
          <p>Your Score: {score}</p>
          <h3>Correct Answers:</h3>
          {questions.map((question) => (
            <p key={question._id}>
              {question.question}: {correctAnswers[question._id]}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedQuestions;