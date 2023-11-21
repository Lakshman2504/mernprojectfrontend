import React, { useState } from 'react';
import image from './quiz.jpeg';
import axios from 'axios';

const QuestionForm = ({ onSaveQuestions, teacherName, teacherEmail }) => {
  const inputStyle = {
    marginBottom: '10px',
    padding: '8px',
    width: '90%',
    maxWidth: '700px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  };
  
  const inputStyle1 = {
    marginBottom: '10px',
    marginLeft: '30%',
    padding: '8px',
    width: '50%',
    maxWidth: '500px',
    display: 'flex',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  };
  
  const formBackgroundStyle = {
    background: 'linear-gradient(90deg, #ff5733, #ffb347)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: '50px auto',
  };
  

  const defaultQuestion = {
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
  };

  const [questions, setQuestions] = useState([defaultQuestion]);
  const [prevQuestions, setPrevQuestions] = useState([]);
  const [warning, setWarning] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showSavedQuestions, setShowSavedQuestions] = useState(false);
  const [testTitle, setTestTitle] = useState('');
  const [testTime, setTestTime] = useState('');
  // const [teacherName, setTeacherName] = useState('');
  // const [selectedImage, setSelectedImage] = useState(null);

  const API_URL = 'https://mernprojectbackend-2.onrender.com';

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setSelectedImage(file);
  // };

  const handleAddQuestion = () => {
    setPrevQuestions([...prevQuestions, questions.slice()]);
    setQuestions([...questions, defaultQuestion]);
    setCurrentQuestionIndex(questions.length);
  };

  const handleUndoQuestion = () => {
    if (currentQuestionIndex > 0) {
      setQuestions(prevQuestions[currentQuestionIndex - 1]);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleChange = (e, index, optionIndex) => {
    const { name, value } = e.target;

    const updatedQuestions = [...questions];

    if (optionIndex !== undefined) {
      updatedQuestions[index].options[optionIndex] = value;
    } else if (name === "question") {
      updatedQuestions[index].question = value;
    }

    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (e, index) => {
    const { value } = e.target;

    const updatedQuestions = [...questions];
    updatedQuestions[index].correctAnswer = value;

    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any question has empty options
    const hasEmptyOptions = questions.some((question) =>
      question.options.some((option) => option.trim() === '')
    );

    if (hasEmptyOptions) {
      setWarning('Please fill in all the options.');
      return;
    }

    

    try {
      const response = await axios.post(`${API_URL}/questions`, {
        
        testTitle,
        testTime,
        questions: questions.map(({ question, options, correctAnswer }) => ({
          question,
          options,
          correctAnswer,
        })),
      });

      console.log('Questions saved successfully:', response.data);
      setShowSavedQuestions(true);
    } catch (error) {
      console.error('Error saving questions:', error.message);
      setWarning('Error saving questions. Please try again.');
    }
  };

  const handleUpdate = () => {
    setShowSavedQuestions(false);
  };

  return (
    <div style={{ backgroundImage:`url(${image})` }}>
      {!showSavedQuestions && (
        <form onSubmit={handleSubmit} style={formBackgroundStyle}>
          <div>
            <h4>Instrutions to follow while preparing questions:</h4>
            <h4>1. Click the "Add Question" button only after filling the current question and options.</h4>
            <h4>2. After saving questions, it will show the questions and options. If you want to update the questions, click the "Update Questions" button.</h4>
            <label htmlFor="testTitle">Test Title:</label>
            <input
              id="testTitle"
              name="testTitle"
              value={testTitle}
              style={inputStyle}
              onChange={(e) => setTestTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="testTime">Test Time (in seconds):</label>
            <input
              id="testTime"
              name="testTime"
              value={testTime}
              style={inputStyle1}
              type="number"
              onChange={(e) => setTestTime(e.target.value)}
              required
            />
          </div>

          {questions.map((question, index) => (
            <div key={index}>
              <label htmlFor={`question${index}`}>Question {index + 1}:</label>

              <input
                id={`question${index}`}
                name="question"
                value={question.question}
                style={inputStyle}
                onChange={e => handleChange(e, index)}
                required
              />

              

              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <label htmlFor={`option${optionIndex}`}>
                    Option {String.fromCharCode(65 + optionIndex)}:
                  </label>

                  <input
                    id={`option${optionIndex}`}
                    name={optionIndex}
                    value={option}
                    style={inputStyle1}
                    onChange={e => handleChange(e, index, optionIndex)}
                    required
                  />
                </div>
              ))}

              <div>
                <label htmlFor={`correctAnswer${index}`}>Correct Answer:</label>
                <select
                  id={`correctAnswer${index}`}
                  value={question.correctAnswer}
                  style={inputStyle1}
                  onChange={e => handleCorrectAnswerChange(e, index)}
                  required
                >
                  <option value="">Select correct answer</option>
                  {question.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          {warning && <p style={{ color: 'white' }}>{warning}</p>}

          <button
            type="button"
            onClick={handleAddQuestion}
            style={{ backgroundColor: 'green', color: 'black', padding: '10px' }}
          >
            Add Question
          </button>

          {questions.length > 1 && (
            <button
              type="button"
              onClick={handleUndoQuestion}
              style={{ backgroundColor: 'red', color: 'black', padding: '10px' }}
            >
              Delete Question
            </button>
          )}
          <button type="submit" style={{ backgroundColor: 'white', color: 'black', padding: '10px' }}>
            Save Questions
          </button>
        </form>
      )}

      {showSavedQuestions && (
        <div style={{ backgroundColor: 'white', color: 'black', padding: '2px' }}>
          <h3>Questions Saved Successfully!</h3>
          <h4>Teacher Name: {teacherName}</h4>
          <h4>Teacher Email: {teacherEmail}</h4>
          <h4>Test Title: {testTitle}</h4>
          <h4>Test Time (in seconds): {testTime}</h4>
          <h4>MCQ Questions:</h4>
          {questions.map((question, index) => (
            <div key={index}>
              <p>{`Question ${index + 1}: ${question.question}`}</p>
              <ul>
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>{`${String.fromCharCode(65 + optionIndex)}. ${option}`}</li>
                ))}
              </ul>
              <p>{`Correct Answer: ${question.correctAnswer}`}</p>
            </div>
          ))}
          
          <button
            type="button"
            onClick={handleUpdate}
            style={{ backgroundColor: 'blue', color: 'white', padding: '10px' }}
          >
            Update Questions
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionForm;