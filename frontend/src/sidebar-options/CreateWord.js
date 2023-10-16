import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavbarUser from '../components/NavbarUser';
import Sidebar from '../components/Sidebar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CreateWord.css';
import jsonData from './getAllCategories.json';
import words from './getAllWords.json';

function CreateWord() {
  const [categories, setCategories] = useState([]);
  const [words, setWords] = useState([]);
  
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);
  
  useEffect(() => {
    axios.get('https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/categories/getall')
      .then(res => {
        console.log('API Response category:', res.data); // Log the API response data
        setCategories(res.data.categories); // Update the admins state with the fetched data
      })
      .catch(err => console.log('API Error:', err)); // Log any API errors
  }, []); // Empty dependency array to run the effect only once

  console.log('categories Array:', categories); // Log the state of the admins array

  useEffect(() => {
    axios.get('https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/words/getall')
      .then(res => {
        console.log('API Response words:', res.data); // Log the API response data
        setWords(res.data.words); // Update the admins state with the fetched data
      })
      .catch(err => console.log('API Error:', err)); // Log any API errors
  }, []); // Empty dependency array to run the effect only once

  console.log('words Array:', words); // Log the state of the admins array

  const buttons = [
    { label: 'Crear Palabra', link: '/create-category' },
    { label: 'Tutorial', link: '/create-category-tutorial' },
  ];
 
  const toggleExpansion = (categoryId) => {
    if (expandedCategoryId === categoryId) {
      setExpandedCategoryId(null);
    } else {
      setExpandedCategoryId(categoryId);
    }
  };

  const categoriesArray = jsonData.categories; // REEMPLAZAR
  const wordsArray = words.words; // REEMPLAZAR

  const [wordData, setWordData] = useState({
    word: '',
    categoryid: 0,
    definition: '',
    image: null,  
    suggested1: '',
    suggested2: '',
    video: null,  
    idsettings: 1,
    isscannable: false,
    audio: null, 
  });

  function resetForm() {
    setWordData({
    ...wordData,
    word: '',
    categoryid: 0,
    definition: '',
    image: null, // Use null to store the selected file
    suggested1: '',
    suggested2: '',
    video: null, // Use null to store the selected file
    idsettings: 1,
    isscannable: false,
    audio: null, // Use null to store the selected file
    });
  }

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setWordData({
      ...wordData,
      [name]: type === 'checkbox' ? e.target.checked : value,
    });
    console.log(wordData); // This logs the entire categoryData object to the console

  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setWordData({
      ...wordData,
      [name]: files[0], // Store the selected file in state
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', wordData.image);
    formData.append('audio', wordData.audio);
    formData.append('video', wordData.video);
    formData.append('word', wordData.word);
    formData.append('categoryid', wordData.categoryid);
    formData.append('definition', wordData.definition);
    formData.append('idsettings', wordData.idsettings);
    formData.append('isscannable', wordData.isscannable);

    // Define the URL where you want to send the POST request
    const apiUrl = "https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/words/add";

    // Send the POST request using Axios
    axios.post(apiUrl, formData)
      .then(function (response) {
        console.log('Word added successfully:', response.data);
      })
      .catch(function (error) {
        console.error('Error adding word:', error);
      });
  };

  return (
    <>
         <Sidebar />
        <div className='navbar'> 
          <NavbarUser buttons={buttons} />
        </div>
        <div className="container">
         <div className="row">
          <div className="col">
            <h1 className='base-datos'>Base de datos</h1>
            <h2 className='palabras-actuales'>Palabras actuales</h2>
              {categories.map((categories) => (
              <div className='box' key={categories.id}>
              < button onClick={() => toggleExpansion(categories.id)}>
                {expandedCategoryId === categories.id ? '▼' : '▲'} {categories.name}
              </button>
              {expandedCategoryId === categories.id && (
              <div>
              {words
                .filter(word => word.categoryid === categories.id)
                .map(matchingWordData => (
                  <div key={matchingWordData.id}>
                    <button>{matchingWordData.word}</button>
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
      </div>
       <div class="col">
        <h1>Crear Palabra </h1>
        <form onSubmit={handleSubmit}>
        <label><strong>Selecciona la categoria:</strong></label>
            <br />
            <input
              type="number"
              name="categoryid"
              value={wordData.categoryid}
              onChange={handleChange}
            />
          <br />
          <label><strong>Añade la palabra:</strong></label>
            <br />
            <input
              type="text"
              name="word"
              value={wordData.word}
              onChange={handleChange}
            />
          <label><strong>Añade el Sugerido 1:  </strong></label>

            <input
              type="text"
              name="suggested1"
              value={wordData.suggested1}
              onChange={handleChange}
            />
          <label><strong>Añade el Sugerido 2:   </strong></label>

            <input
              type="text"
              name="suggested2"
              value={wordData.suggested2}
              onChange={handleChange}
            />
          <br />
          <label><strong>Añade la definición:</strong></label>
            <br />
            <input
              type="text"
              name="definition"
              value={wordData.definition}
              onChange={handleChange}
            />
          
          
          <br />
          <label><strong>Añade los idsettings:</strong></label>

            <br />
            <input
              type="number"
              name="idsettings"
              value={wordData.idsettings}
              onChange={handleChange}
            />
          <br />
          <label><strong>Añade la imagen:</strong></label>

            <br /><br />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          <br />
          <label><strong>Añade el audio:</strong></label>
            <br /><br />
            <input
              type="file"
              name="audio"
              accept="audio/*"
              onChange={handleChange}
            />
          <br />
          <label><strong>Añade el video:</strong></label>

            <br /><br />
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleChange}
            />
          <br />
          <label>
          <strong>Es escaneable:</strong>
          <br />
            <input
              type="checkbox"
              name="isscannable"
              checked={wordData.isscannable}
              onChange={handleChange}
            />
          </label>
          <br /><br />
          <button type="submit" className="custom-button">Añadir</button>
          <button type="button" onClick={resetForm}>Limpiar</button>
        </form>
      </div>
      </div>
      </div>
        </>
  );
}

export default CreateWord;