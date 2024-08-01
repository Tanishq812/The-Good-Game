import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [quote, setQuote] = useState('');
  const [savedQuotes, setSavedQuotes] = useState([]);

  // Function to fetch a random Ron Swanson quote
  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
      setQuote(response.data[0]); // Assuming API returns an array with one quote
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  // Function to save the current quote to the list of saved quotes
  const saveQuote = () => {
    if (quote && !savedQuotes.includes(quote)) {
      setSavedQuotes([...savedQuotes, quote]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Ron Swanson Quotes</h1>

      {/* Display current quote */}
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-4">
        <div className="p-4">
          <p className="text-lg font-bold text-center">{quote}</p>
        </div>
        <div className="p-4 bg-gray-100 text-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
            onClick={fetchQuote}
          >
            Get Another Quote
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2"
            onClick={saveQuote}
          >
            Save Quote
          </button>
        </div>
      </div>

      {/* Display saved quotes */}
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Saved Quotes</h2>
        {savedQuotes.map((savedQuote, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden mb-2 p-4">
            <p className="text-lg text-center">{savedQuote}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
