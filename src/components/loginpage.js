import React, { useState, useEffect } from 'react';
import QuestionForm from './QuestionForm';
import ViewResults from './viewresults';
import MCQPage from './MCQPage';
import SavedQuestions from './SavedQuestions';
import backgroundImage from './quiz.jpg';
import axios from 'axios';

const LoginPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('student');
  const [teacherQuestion, setTeacherQuestion] = useState('');
  const [studentRegistrationNumber, setStudentRegistrationNumber] = useState('');
  const [questions, setQuestions] = useState([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [teacherLoginEnabled, setTeacherLoginEnabled] = useState(false);
  const [studentLoginEnabled, setStudentLoginEnabled] = useState(false);
  const [mcqPageVisible, setMCQPageVisible] = useState(false);
  const [showButtons, setShowButtons] = useState(false); 
  const [loggedTeachers, setLoggedTeachers] = useState([]);
  const [ShowSavedQuestions, setShowSavedQuestions] = useState(false);
  const [score, setScore] = useState(null);
  const [showResults, setShowResults] = useState(false); 



  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover', // Adjust the background size
    backgroundPosition: 'center', // Center the background image
  };

  const formBackgroundStyle = {
    background: 'linear-gradient(90deg, #ff5733, #ffb347)',
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
    width: '90%',
    maxWidth: '500px', 
    margin: '50px auto',
  };

  const formStyle = {
    padding: '20px',
    borderRadius: '4px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.7)',
    width: '100%',
  };

  const inputStyle = {
    marginBottom: '10px',
    padding: '8px',
    width: '70%',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  };

  const buttonStyle = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '30%',
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleTeacherQuestionChange = (e) => {
    setTeacherQuestion(e.target.value);
    if (e.target.value === '1234' && name && email) {
      setTeacherLoginEnabled(true);
      setShowButtons(true); // Show the buttons after teacher login
      setShowQuestionForm(false); // Hide the QuestionForm initially
      setMCQPageVisible(false); // Hide the MCQPage
      setQuestions([]); // Clear the questions
    } else {
      setTeacherLoginEnabled(false);
      setShowButtons(false); // Hide the buttons if teacher login fails
      setShowQuestionForm(false); // Hide the QuestionForm initially
      setMCQPageVisible(false); // Hide the MCQPage
      setQuestions([]); // Clear the questions
    }
  };

  const handleStudentRegistrationNumberChange = (e) => {
    setStudentRegistrationNumber(e.target.value);
    if (e.target.value.length >= 9 && name && email) {
      setStudentLoginEnabled(true);
    } else {
      setStudentLoginEnabled(false);
    }
  };

  const onSaveQuestions = (newQuestions) => {
    setQuestions(newQuestions);
  };

  useEffect(() => {
    // This effect will run whenever score changes
    if (score !== null) {
      console.log('Score after update:', score);
      saveStudentData();
    }
  }, [score]);

  const handleScoreSubmit = async (submittedScore) => {
    console.log('Submitted Score:', submittedScore);

    // Set the score
    setScore(submittedScore);
  };

 
  const handleStudentLogin = async () => {
    if (studentLoginEnabled) {
      setMCQPageVisible(true);
      setScore(0); // Reset the score before starting the test

  
      // Now, the score state has been updated
      console.log('Score after reset:', score); // Add this line
  
      if (userType === 'student') {
        console.log('Before calling saveStudentData. Registration Number:', studentRegistrationNumber, 'Score:', score); // Add this line
        await saveStudentData(); // Call the function to save student data
      }
    }
  };

  const saveStudentData = async () => {
    try {
      console.log('Before sending request. Registration Number:', studentRegistrationNumber, 'Score:', score);
      const response = await axios.post('https://mernprojectbackend-2.onrender.com/saveStudentData', {
        registrationNumber: studentRegistrationNumber,
        score,
      });
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error saving student data:', error);
    }
  };
  
  
  

  const savequestions = () => {
    if (studentLoginEnabled) {
      
      setShowSavedQuestions(true);
    }
  }

  const handleViewResults = () => {
    setShowSavedQuestions(false); // Hide other components if necessary
    setShowQuestionForm(false);
    setMCQPageVisible(false);
    setShowButtons(false);
    setQuestions([]);

    // Show the ViewResults component
    setShowResults(true);
  };

  

  const handleTeacherLogin = () => {
    if (studentLoginEnabled) {
      setMCQPageVisible(true);
      if (userType === 'teacher') {
        // Add the teacher's name to the list of loggedTeachers
        setLoggedTeachers((prevTeachers) => [...prevTeachers, name]);
      }
    }
  };

  const handlePrepareTest = () => {
    setShowQuestionForm(true); // Show the QuestionForm
    setMCQPageVisible(false); // Hide the MCQPage
    setQuestions([]); // Clear the questions
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('User Type:', userType);

    if (userType === 'teacher') {
      console.log('Teacher Question:', teacherQuestion);
      setShowQuestionForm(false); // Hide the QuestionForm initially
      setMCQPageVisible(false); // Hide the MCQPage
      setQuestions([]); // Clear the questions
    } else {
      console.log('Student Registration Number:', studentRegistrationNumber);
      setShowQuestionForm(false); // Hide the QuestionForm initially
      setMCQPageVisible(false); // Hide the MCQPage
      setQuestions([]); // Clear the questions
    }

    setName('');
    setEmail('');
  };

  return (
    <div>
      <div style={backgroundStyle}>
        {/* <h2>Login Page</h2> */}
        <form onSubmit={handleSubmit} style={formBackgroundStyle}>
          <div style={formStyle}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                style={inputStyle}
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                style={inputStyle}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label>User Type:</label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="userType"
                    value="teacher"
                    checked={userType === 'teacher'}
                    onChange={() => {
                      setUserType('teacher');
                      setShowQuestionForm(false); // Hide the QuestionForm initially
                      setStudentLoginEnabled(false);
                    }}
                  />
                  Teacher
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name="userType"
                    value="student"
                    checked={userType === 'student'}
                    onChange={() => setUserType('student')}
                  />
                  Student
                </label>
              </div>
            </div>
            {userType === 'teacher' && (
              <>
                {!showButtons && (
                  <>
                    <label htmlFor="teacherQuestion">Teacher Question:</label>
                    <input
                      type="text"
                      id="teacherQuestion"
                      value={teacherQuestion}
                      onChange={handleTeacherQuestionChange}
                      style={inputStyle}
                      placeholder="Enter Teacher id"
                      required
                    />
                  </>
                )}
                {showButtons && (
                  <>
                    <button type="button" style={buttonStyle} onClick={() => setShowQuestionForm(true)}>
                      Prepare Test
                    </button>
                    <button type="button" style={buttonStyle} onClick={handleViewResults}>
                      View Results
                    </button>
                    
                  </>
                )}
              </>
            )}
            {userType === 'student' && (
              <div>
                <label htmlFor="studentRegistrationNumber">Student Registration Number:</label>
                <p>(Student Registration Number must be at least 9 characters long.)</p>
                <input
                  type="text"
                  id="studentRegistrationNumber"
                  value={studentRegistrationNumber}
                  onChange={handleStudentRegistrationNumberChange}
                  style={inputStyle}
                  placeholder="Enter Student Registration Number"
                  required
                />
                {studentLoginEnabled && (
                    <>
                      <button type="button" style={buttonStyle} onClick={(handleStudentLogin) }>
                        Default
                      </button>
                      <button type="button" style={buttonStyle} onClick={(savequestions) }>
                        Teacher Test
                      </button>
                    </>
                  )}
              </div>
            )}
          </div>
        </form>
      </div>
      
      {mcqPageVisible && (
       <MCQPage loggedTeachers={loggedTeachers} />

      )}

      {ShowSavedQuestions && (
        <SavedQuestions  onScoreSubmit={handleScoreSubmit}/>
      )}
      {showQuestionForm && (
        <QuestionForm
          onSaveQuestions={onSaveQuestions}
          teacherName={name} // Pass the teacher's name
          teacherEmail={email} // Pass the teacher's email
        />
      )}
      {/* {questions.length > 0 && <QuestionDisplay questions={questions} />} */}

      {showResults && <ViewResults />}
    </div>
  );
};

export default LoginPage;