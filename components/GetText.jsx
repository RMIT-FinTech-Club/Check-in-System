import { data } from 'autoprefixer';
import React, { useEffect, useState } from 'react';

export const TextDisplay = () => {
  const [textData, setTextData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from your Flask API
    fetch('api/objectDetection/get_text')
      .then((response) => response.json())
      .then((data) => {
        setTextData(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Text Display</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Data from API</h2>
          <ul>
            <li>
              ID: {textData.ID}, Name: {textData.Name}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
