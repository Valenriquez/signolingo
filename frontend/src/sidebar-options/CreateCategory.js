import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavbarUser from '../components/NavbarUser';
import Sidebar from '../components/Sidebar';
import './CreateCategory.css'; 
import jsonData from './getAllCategories.json'; // CATEGORIAS
import words from './getAllWords.json'; // PALABRAS
import axios from 'axios';

// Categories: https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/categories/getall
 
function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [words, setWords] = useState([]);


  const [expandedCategoryId, setExpandedCategoryId] = useState(null);


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


  useEffect(() => {
    const apiUrl = 'https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/words/getall';
    axios.get(apiUrl)
      .then(response => {
        setWords(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  axios.get('https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/categories/getall')
  .then(function (response) {
     if (response.data && response.data.categories) {
       const categoryNames = response.data.categories.map(category => category.name);

       console.log('Category names:', categoryNames);
    } else {
      console.log('No categories found in the response.');
    }
  })
  .catch(function (error) {
    console.error('Error fetching data:', error);
  });

  axios.get('https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/words/getall')
  .then(function (response) {
     if (response.data && response.data.categories) {
       const wordsNames = response.data.words.map(words => words.word);

       console.log('Word names:', wordsNames);
    } else {
      console.log('No words found in the response.');
    }
  })
  .catch(function (error) {
    console.error('Error fetching data:', error);
  });

  
  const buttons = [
    { label: 'Crear Categoría', link: '/create-category' },
    { label: 'Tutorial', link: '/create-category-tutorial' },
  ];

  const toggleExpansion = (categoryId) => {
    if (expandedCategoryId === categoryId) {
      setExpandedCategoryId(null);
    } else {
      setExpandedCategoryId(categoryId);
    }
  };

  const categoriesArray = jsonData.categories;  //REEMPLAZAR
  const wordsArray = words.words;   //REEMPLAZAR

  const [categoryData, setcategoryData] = useState({
    name: '',
    image: null,  
    icon: null,
    color: null, 
    idsettings: 1,
    isscannable: false,
  });

  function resetForm() {
    console.log('resetForm function is triggered');  
    setcategoryData({
      ...categoryData,
      name: '',
      image: null,  
      icon: null,
      color: null, 
      idsettings: 1,
      isscannable: false, 
    });
  }

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setcategoryData({
      ...categoryData,
      [name]: type === 'checkbox' ? e.target.checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', categoryData.image);
    formData.append('color', categoryData.color);
    formData.append('icon', categoryData.icon);
    formData.append('idsettings', categoryData.idsettings);
    formData.append('isscannable', categoryData.isscannable);

    // Define the URL where you want to send the POST request
    const apiUrl = "https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/categories/add";

    // Send the POST request using Axios
    axios.post(apiUrl, formData)
      .then(function (response) {
        alert('sucess');
        console.log('Word added successfully:', response.data);
      })
      .catch(function (error) {
        alert('service error');
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
                    <button>{matchingWordData.word}</button>
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
      </div>
       <div class="col">
        <h1>Crear Categoría </h1>
        <form onSubmit={handleSubmit}>
          <label>
          <strong>Añade el nombre:</strong>
            <br />
            <input
              type="text"
              name="name"
              value={categoryData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
          <strong>Añade el color:</strong>
            <br />
            <input
              type="color"
              name="color"
              value={categoryData.color}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
          <strong>Añade el icono:</strong>
            <br />  <br />
            <input
              type="file"
              name="icon"
              value={categoryData.icon}
              onChange={handleChange}
            />
          </label>
          <label>
          <strong>Añade los idsettings:</strong>
            <br />
            <input
              type="number"
              name="idsettings"
              value={categoryData.idsettings}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
          <strong>Es escaneable:</strong>
          <br />
            <input
              type="checkbox"
              name="isscannable"
              checked={categoryData.isscannable}
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

export default CreateCategory;