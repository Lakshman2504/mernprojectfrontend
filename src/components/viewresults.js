import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDataDisplay = () => {
  const [studentsData, setStudentsData] = useState([]);

  const table = {
    padding: '20px',
    border :'2px solid black'
  }

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get('https://mernprojectbackend-2.onrender.com/saveStudentData');
        setStudentsData(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    // Fetch student data when the component mounts
    fetchStudentData();
  }, []);

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thTdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

  const thStyle = {
    backgroundColor: '#f2f2f2',
  };

  return (
    <center>
    <div>
      <h2>Student Data</h2>
      <table style={tableStyle}>
        <thead>
          <tr style={table}>
            <th style={{ ...thTdStyle, ...thStyle }}>Registration Number</th>
            <th style={thTdStyle}>Score</th>
          </tr>
        </thead>
        <tbody>
          {studentsData.map((student) => (
            <tr key={student.registrationNumber}>
              <td style={thTdStyle}>{student.registrationNumber}</td>
              <td style={thTdStyle}>{student.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </center>
  );
};

export default StudentDataDisplay;
