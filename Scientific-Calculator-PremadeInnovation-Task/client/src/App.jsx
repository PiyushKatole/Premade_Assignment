import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleClick = (value) => {
    setInput(prevInput => prevInput + value);
  };

  const handleCalculate = async () => {
    if (!input) return; // If the input is empty, do nothing

    try {
      const response = await axios.post('http://localhost:5000/api/calculate', { expression: input });
      setInput(response.data.result.toString()); // Ensure the result is a string
      setHistory(response.data.history || []);
    } catch (error) {
      setInput('Error');
    }
  };

  const handleClear = () => {
    setInput('');
  };

  const toggleHistory = async () => {
    setShowHistory(!showHistory);

    if (!showHistory) {
      try {
        const response = await axios.get('http://localhost:5000/api/history');
        setHistory(response.data || []);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="App">
      <button onClick={toggleHistory} className="history-button">History</button>
      <div className="calculator">
        <h2>Scientific Calculator</h2>
        <input type="text" value={input || ''} readOnly />
        <div className="keypad">
          <button onClick={handleClear}>AC</button>
          <button onClick={() => handleClick('(')}>(</button>
          <button onClick={() => handleClick(')')}>)</button>
          <button onClick={() => handleClick('/')}>÷</button>
          <button onClick={() => handleClick('*')}>×</button>
          <button onClick={() => handleClick('-')}>-</button>
          <button onClick={() => handleClick('+')}>+</button>
          <button onClick={handleCalculate}>=</button>
          <button onClick={() => handleClick('.')}>.</button>
          {[...Array(10).keys()].map((num) => (
            <button key={num} onClick={() => handleClick(num.toString())}>{num}</button>
          ))}
          <button onClick={() => handleClick('sin(')}>sin</button>
          <button onClick={() => handleClick('cos(')}>cos</button>
          <button onClick={() => handleClick('tan(')}>tan</button>
          <button onClick={() => handleClick('log(')}>log</button>
          <button onClick={() => handleClick('ln(')}>ln</button>
          <button onClick={() => handleClick('exp(')}>exp</button>
          <button onClick={() => handleClick('^')}>^</button>
          <button onClick={() => handleClick('mean(')}>mean</button>
          <button onClick={() => handleClick('median(')}>median</button>
          <button onClick={() => handleClick('std(')}>std</button>
        </div>
      </div>
      {showHistory && (
        <div className="overlay" onClick={toggleHistory}>
          <div className="popup" onClick={e => e.stopPropagation()}>
            <h2>Calculation History</h2>
            <ul>
              {history.map((item, index) => (
                <li key={index}>{item.expression} = {item.result}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;




// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// const App = () => {
//   const [input, setInput] = useState('');
//   const [history, setHistory] = useState([]);

//   const handleClick = (value) => {
//     setInput(prevInput => prevInput + value);
//   };

//   const handleCalculate = async () => {
//     if (!input) return; // If the input is empty, do nothing

//     try {
//       const response = await axios.post('http://localhost:5000/api/calculate', { expression: input });
//       setInput(response.data.result.toString()); // Ensure the result is a string
//       setHistory(response.data.history || []);
//     } catch (error) {
//       setInput('Error');
//     }
//   };

//   const handleClear = () => {
//     setInput('');
//   };

//   const handleHistoryClick = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/history');
//       setHistory(response.data || []);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="App">
//       <button onClick={handleHistoryClick} className="history-button">Store Calculation History</button>
//       <div className="calculator">
//         <input type="text" value={input || ''} readOnly />
//         <div className="keypad">
//           <button onClick={handleClear}>AC</button>
//           <button onClick={() => handleClick('(')}>(</button>
//           <button onClick={() => handleClick(')')}>)</button>
//           <button onClick={() => handleClick('/')}>÷</button>
//           <button onClick={() => handleClick('*')}>×</button>
//           <button onClick={() => handleClick('-')}>-</button>
//           <button onClick={() => handleClick('+')}>+</button>
//           <button onClick={handleCalculate}>=</button>
//           <button onClick={() => handleClick('.')}>.</button>
//           {[...Array(10).keys()].map((num) => (
//             <button key={num} onClick={() => handleClick(num.toString())}>{num}</button>
//           ))}
//           <button onClick={() => handleClick('sin(')}>sin</button>
//           <button onClick={() => handleClick('cos(')}>cos</button>
//           <button onClick={() => handleClick('tan(')}>tan</button>
//           <button onClick={() => handleClick('log(')}>log</button>
//           <button onClick={() => handleClick('ln(')}>ln</button>
//           <button onClick={() => handleClick('exp(')}>exp</button>
//           <button onClick={() => handleClick('^')}>^</button>
//           <button onClick={() => handleClick('mean(')}>mean</button>
//           <button onClick={() => handleClick('median(')}>median</button>
//           <button onClick={() => handleClick('std(')}>std</button>
//         </div>
//       </div>
//       <div className="history">
//         <h2>Calculation History</h2>
//         <ul>
//           {history.map((item, index) => (
//             <li key={index}>{item.expression} = {item.result}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default App;
