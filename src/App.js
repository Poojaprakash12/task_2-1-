import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

const App = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [joke, setJoke] = useState('');
  const [dogImage, setDogImage] = useState('');
  const [quote, setQuote] = useState('');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // Fetch Random Joke
  const fetchJoke = async () => {
    try {
      const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
      setJoke(`${response.data.setup} - ${response.data.punchline}`);
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
  };

  // Fetch Random Dog Image
  const fetchDogImage = async () => {
    try {
      const response = await axios.get('https://dog.ceo/api/breeds/image/random');
      setDogImage(response.data.message);
    } catch (error) {
      console.error('Error fetching dog image:', error);
    }
  };

  // Fetch Random Quote from the updated API endpoint
const fetchQuote = async () => {
  try {
    const response = await axios.get('http://api.quotable.io/quotes/random');
    
    // Assuming the response returns an array of quotes
    const randomQuote = response.data[0]; // Extract the first quote from the array
    setQuote(`${randomQuote.content} - ${randomQuote.author}`);
  } catch (error) {
    console.error('Error fetching quote:', error);
  }
};


  return (
    <div className="app-container">
      <h1>Fun API Integrations</h1>
      <input type="date" value={selectedDate} onChange={handleDateChange} />

      <div className="button-container">
        <button onClick={fetchJoke}>Get Random Joke</button>
        <button onClick={fetchDogImage}>Get Random Dog Image</button>
        <button onClick={fetchQuote}>Get Random Quote</button>
      </div>

      <div className="content-container">
        {/* Display Joke in Card Format */}
        {joke && (
          <div className="card">
            <h2>Joke</h2>
            <p>{joke}</p>
          </div>
        )}

        {/* Display Dog Image */}
        {dogImage && (
          <div className="image-container">
            <h2>Dog Image</h2>
            <img src={dogImage} alt="A random dog" />
          </div>
        )}

        {/* Display Quote in Table Format */}
        {quote && (
          <table className="quote-table">
            <thead>
              <tr>
                <th>Quote</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{quote.split(' - ')[0]}</td>
                <td>{quote.split(' - ')[1]}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default App;
