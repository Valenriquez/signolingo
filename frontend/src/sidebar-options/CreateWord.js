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

  useEffect(() => {
    const apiUrl = 'https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/categories/getall';
    axios.get(apiUrl)
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  const buttons = [
    { label: 'Crear Palabra', link: '/create-category' },
    { label: 'Tutorial', link: '/create-category-tutorial' },
  ];
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);

 
  const toggleExpansion = (categoryId) => {
    if (expandedCategoryId === categoryId) {
      setExpandedCategoryId(null);
    } else {
      setExpandedCategoryId(categoryId);
    }
  };

  const categoriesArray = jsonData.categories;
  const wordsArray = words.words;

  const [wordData, setWordData] = useState({
    id: 10,
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

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setWordData({
      ...wordData,
      [name]: type === 'checkbox' ? e.target.checked : value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setWordData({
      ...wordData,
      [name]: files[0], // Store the selected file in state
    });
  };

  function resetForm() {
    setWordData({
      ...wordData,
      image: null, // Clear selected image
      audio: null, // Clear selected audio
      video: null, // Clear selected video
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object to send the file data
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
        <div class="container">
         <div class="row">
         <div class="col">
            <h1 className='base-datos'>Base de datos</h1>
            <h2 className='palabras-actuales'>Palabras actuales</h2>
            {categoriesArray.map((jsonData) => (
          <div className='box' key={jsonData.id}>
          <button onClick={() => toggleExpansion(jsonData.id)}>
            {expandedCategoryId === jsonData.id ? '▼' : '▲'} {jsonData.name}
          </button>
          {expandedCategoryId === jsonData.id && (
            <div>
              {wordsArray
                .filter((words) => words.categoryid === jsonData.id)
                .map((matchingWordData) => (
                  <div key={matchingWordData.id}>
                    <li>{matchingWordData.word}</li>
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
        <label className='category-label'>
        <strong>Selecciona la categoria:</strong>
            <br />
            <input
              type="number"
              name="categoryid"
              value={wordData.categoryid}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
          <strong>Añade la palabra:</strong>
            <br />
            <input
              type="text"
              name="word"
              value={wordData.word}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
          <strong>Añade la definición:</strong>
            <br />
            <input
              type="text"
              name="definition"
              value={wordData.definition}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
          <strong>Añade los idsettings:</strong>
            <br />
            <input
              type="number"
              name="idsettings"
              value={wordData.idsettings}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
          <strong>Añade la imagen:</strong>
            <br /><br />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          <br />
          <label>
          <strong>Añade el audio:</strong>
            <br /><br />
            <input
              type="file"
              name="audio"
              accept="audio/*"
              onChange={handleFileChange}
            />
          </label>
          <br />
          <label>
          <strong>Añade el video:</strong>
            <br /><br />
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleFileChange}
            />
          </label>
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