import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function SearchComponent() {
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState(new Map());

  const handleSearch = () => {
    const dirPath = inputValue || '~/';
    fetch('http://localhost:3000/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dirPath }),
    })
      .then((response) => response.json())
      .then((data) => {
        const map = new Map(Object.entries(data.files));
        setResults(map);
      })
      .catch((error) => console.error(error));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter directory path"
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        <h3>Results:</h3>
        <ul>
          {[...results.entries()].map(([key, values]) => (
            <li key={key}>
              <strong>{key}</strong>: {values.join(', ')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
const rootElement = document.getElementById('react-root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <SearchComponent />
  </React.StrictMode>
);

