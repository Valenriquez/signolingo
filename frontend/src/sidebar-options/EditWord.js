import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavbarUser from '../components/NavbarUser';
import Sidebar from '../components/Sidebar';
import jsonData from './getAllCategories.json'; // Assuming this JSON file is valid
import wordsData from './getAllWords.json'; // Assuming this JSON file is valid
import axios from 'axios';

function EditWord() {
  const [categories, setCategories] = useState([]);
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);

  useEffect(() => {
    const apiUrl = 'https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/categories/getall';
    axios
      .get(apiUrl)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const buttons = [
    { label: 'Crear Categoría', link: '/create-category' },
    { label: 'Tutorial', link: '/create-category-tutorial' },
  ];

  const [categoryData, setCategoryData] = useState({
    name: '',
    image: null,
    icon: null,
    color: null,
    idsettings: 1,
    isscannable: false,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: type === 'checkbox' ? e.target.checked : value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: files[0], // Store the selected file in state
    });
  };

  function resetForm() {
    setCategoryData({
      ...categoryData,
      image: null,
      audio: null,
      video: null,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', categoryData.image);
    formData.append('color', categoryData.color);
    formData.append('icon', categoryData.icon);
    formData.append('idsettings', categoryData.idsettings);
    formData.append('isscannable', categoryData.isscannable);

    const apiUrl = 'https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/categories/add';

    axios
      .post(apiUrl, formData)
      .then(function (response) {
        console.log('Category added successfully:', response.data);
      })
      .catch(function (error) {
        console.error('Error adding category:', error);
      });
  };

  const wordsArray = wordsData.words;
  const [selectedWord, setSelectedWord] = useState(null); // Add this line
  const [formValues, setFormValues] = useState({
    word: '',
    categoryid: '',
    definition: '',
    image: '',
    suggested1: '',
    suggested2: '',
    video: '',
    idsettings: 0,
    isscannable: false,
    audio: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [words, setWords] = useState([]); // Add this line
  const categoriesArray = jsonData.categories; // Assuming this JSON data is available

  const handleWordSelect = (word) => {
    setSelectedWord(word);
    setFormValues({
      word: word.word,
      categoryid: word.categoryid,
      definition: word.definition,
      image: word.image,
      suggested1: word.suggested1,
      suggested2: word.suggested2,
      video: word.video,
      idsettings: word.idsettings,
      isscannable: word.isscannable,
      audio: word.audio,
    });
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

 
 
  const toggleExpansion = (categoryId) => {
    if (expandedCategoryId === categoryId) {
      setExpandedCategoryId(null);
    } else {
      setExpandedCategoryId(categoryId);
    }
  };


  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selectedWord) {
      axios
        .put(
          `https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/words/update/${selectedWord.id}`,
          formValues
        )
        .then((response) => {
          console.log('Updated Word:', response.data);
          const updatedWords = wordsArray.map((word) => {
            if (word.id === response.data.id) {
              return response.data;
            }
            return word;
          });
          setWords(updatedWords);
          setFormValues({
            word: '',
            categoryid: '',
            definition: '',
            image: '',
            suggested1: '',
            suggested2: '',
            video: '',
            idsettings: 0,
            isscannable: false,
            audio: '',
          });
          setEditMode(false);
          setSelectedWord(null);
        })
        .catch((error) => {
          console.error('Error updating word:', error);
        });
    }
  };

  return (
    <>
      <Sidebar />
      <div className="navbar">
        <NavbarUser buttons={buttons} />
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="base-datos">Base de datos</h1>
            <h2 className="palabras-actuales">Palabras actuales</h2>
            {categoriesArray.map((jsonData) => (
              <div className="box" key={jsonData.id}>
                <button onClick={() => toggleExpansion(jsonData.id)}>
                  {expandedCategoryId === jsonData.id ? '▼' : '▲'} {jsonData.name}
                </button>
                {expandedCategoryId === jsonData.id && (
                  <div>
                    {wordsArray
                      .filter((word) => word.categoryid === jsonData.id)
                      .map((matchingWordData) => (
                        <div key={matchingWordData.id}>
                          <button>{matchingWordData.word}</button>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="col"> 
          <h1>Editar Palabra</h1>
        <br />
          <strong>Selecciona una palabra:</strong>
          <br />
          <select onChange={(e) => handleWordSelect(wordsArray[e.target.value])}>
            <option value="">Palabras</option>
            {wordsArray.map((word, index) => (
              <option key={word.id} value={index}>
                {word.word}
              </option>
            ))}
          </select>
          {editMode && (
            <form onSubmit={handleFormSubmit}>
              <br />
              <label>
                <strong>Palabra:</strong>
                <br />
                <input
                  type="text"
                  name="word"
                  value={formValues.word}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <strong>ID Categoría:</strong>
                <br />
                <input
                  type="number"
                  name="categoryid"
                  value={formValues.categoryid}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <strong>Definición:</strong>
                <br />
                <input
                  type="text"
                  name="definition"
                  value={formValues.definition}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                <strong>Imagen:</strong>
                <br />
                <input
                  type="text"
                  name="image"
                  value={formValues.image}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                <strong>Primera palabra sugerida:</strong>
                <br />
                <input
                  type="text"
                  name="suggested1"
                  value={formValues.suggested1}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                <strong>Segunda palabra sugerida:</strong>
                <br />
                <input
                  type="text"
                  name="suggested2"
                  value={formValues.suggested2}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                <strong>Video:</strong>
                <br />
                <input
                  type="text"
                  name="video"
                  value={formValues.video}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                <strong>idsettings:</strong> 
                <br />
                <input
                  type="number"
                  name="idsettings"
                  value={formValues.idsettings}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                <strong>isscannable:</strong>  
                <br />
                <input
                  type="text"
                  name="isscannable"
                  value={formValues.isscannable}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                <strong>Audio:</strong>  
                <br />
                <input
                  type="text"
                  name="audio"
                  value={formValues.audio}
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit" className="btn btn-success">
                Editar
              </button>
            </form>
          )}
        </div>
        </div>
      </div>
    </>
  );
}

export default EditWord;
