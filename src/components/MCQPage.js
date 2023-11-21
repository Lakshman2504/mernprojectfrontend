import React, { useState, useEffect } from 'react';

const MCQPage = () => {
  const mcqs = [
    {
      question: 'Question 1: What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4',
    },
    {
      question: 'Question 2: Which planet is known as the Red Planet?',
      options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
      correctAnswer: 'Mars',
    },
    {
      question: 'Question 3: What is the largest mammal on Earth?',
      options: ['Elephant', 'Giraffe', 'Blue Whale', 'Lion'],
      correctAnswer: 'Blue Whale',
    },
    {
      question: 'Question 4: Who wrote "Romeo and Juliet"?',
      options: ['Charles Dickens', 'Jane Austen', 'William Shakespeare', 'Leo Tolstoy'],
      correctAnswer: 'William Shakespeare',
    },
    {
      question: 'Question 5: Which gas do plants absorb from the atmosphere?',
      options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
      correctAnswer: 'Carbon Dioxide',
    },
    {
      question: 'Question 6: What is the largest planet in our solar system?',
      options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 'Jupiter',
    },
    {
      question: 'Question 7: What is the chemical symbol for gold?',
      options: ['Go', 'Au', 'Ag', 'Gd'],
      correctAnswer: 'Au',
    },
    {
      question: 'Question 8: What is the closest star to Earth?',
      options: ['Proxima Centauri', 'Betelgeuse', 'Sirius', 'Alpha Centauri A'],
      correctAnswer: 'Proxima Centauri',
    },
    {
      question: 'Question 9: In which year did Christopher Columbus discover America?',
      options: ['1492', '1607', '1776', '1498'],
      correctAnswer: '1492',
    },
    {
      question: 'Question 10: Which gas makes up the majority of Earth\'s atmosphere?',
      options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
      correctAnswer: 'Nitrogen',
    },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState(Array(mcqs.length).fill(''));
  const [timer, setTimer] = useState(10 * 60); // 10 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0 && !isSubmitted) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        clearInterval(interval);
        if (!isSubmitted) {
          handleSubmit(); // Automatically submit when the timer reaches zero
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer, isSubmitted]);

  const handleOptionChange = (index, option) => {
    if (!isSubmitted) {
      const updatedAnswers = [...selectedAnswers];
      updatedAnswers[index] = option;
      setSelectedAnswers(updatedAnswers);
    }
  };

  

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const calculateScore = () => {
    let score = 0;
    return mcqs.map((mcq, index) => {
      const isCorrect = selectedAnswers[index] === mcq.correctAnswer;
      if (isCorrect) {
        score++;
      }
      return isCorrect;
    });
  };

  const mcqContainerStyle = {
    background: '#caf4fe',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.7)',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const mcqQuestionStyle = {
    margin: '10px 0',
    border: '1px solid #000',
    padding: '20px',
    width: '100%',
  };

  const mcqSubmitButtonStyle = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
    display: 'flex',
  };

  const mcqTimerStyle = {
    fontSize: '24px',
    margin: '10px 0',
    
  };

  const correctAnswerStyle = {
    color: 'green',
    
  };

  return (
    <div style={mcqContainerStyle} className="mcq-container">
      <h2>MCQ Questions</h2>
      <div style={mcqTimerStyle}>
        Time Left: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
      </div>
      {mcqs.map((mcq, index) => (
        <div key={index} style={mcqQuestionStyle} className="mcq-question">
          <p>
            {mcq.question}
            {isSubmitted && (
              <span style={correctAnswerStyle}>
                {' (Correct Answer: ' + mcq.correctAnswer + ')'}
              </span>
            )}
          </p>
          {mcq.options.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name={`question${index}`}
                value={option}
                checked={selectedAnswers[index] === option}
                onChange={() => handleOptionChange(index, option)}
                disabled={isSubmitted}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        style={mcqSubmitButtonStyle}
        className="mcq-submit-button"
        disabled={isSubmitted}
      >
        Submit Answers
      </button>
      {isSubmitted && (
        <div>
          <p style={{fontSize:'25px'}}>Your score: {calculateScore().filter((correct) => correct).length} out of {mcqs.length}</p>
          <p>
            {calculateScore().map((correct, index) => (
              <span key={index} style={correct ? correctAnswerStyle : null}>
                {correct ? '✅' : '❌'}
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
};

export default MCQPage;
