import React, { useState } from 'react';

const QuestionDisplay = ({ questions }) => {
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));

  const handleOptionChange = (questionIndex, optionIndex) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[questionIndex] = optionIndex;
    setSelectedOptions(updatedSelectedOptions);
  };

  return (
    <div>
      <h3>Test Questions</h3>
      <form>
        {questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <p>{question.question}</p>
            <ul>
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex}>
                  <label>
                    <input
                      type="radio"
                      name={`question_${questionIndex}`}
                      value={optionIndex}
                      checked={selectedOptions[questionIndex] === optionIndex}
                      onChange={() => handleOptionChange(questionIndex, optionIndex)}
                    />
                    Option {String.fromCharCode(65 + optionIndex)}: {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </form>
    </div>
  );
};

export default QuestionDisplay;
