import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavbarUser from '../components/NavbarUser';
import Sidebar from '../components/Sidebar';
import './CreateCategory.css'; 
import axios from 'axios';

// Categories: https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/categories/getall


function CreateCategory() {
 
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

  const [categoryData, setcategoryData] = useState({
    name: '',
    color: '',
    icon: '',
    idsettings:0,
    isscannable: false,
  });

  function resetForm() {
    console.log('resetForm function is triggered');  
    setcategoryData({
      ...categoryData,
      name: '',
      color: '',
      icon: '',
      idsettings:'', 
      isscannable: false, 
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', categoryData.name)
    formData.append('color', categoryData.color);
    formData.append('icon', categoryData.icon);
    formData.append('idsettings', categoryData.idsettings);
    formData.append('isscannable', categoryData.isscannable);
    console.log(categoryData);  

    
    const apiUrl = "https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/categories/add";

    axios.post(apiUrl, formData)
      .then(function (response) {
        alert('sucess');
        console.log('category added successfully:', response.data);
      })
      .catch(function (error) {
        alert('service error');
        console.error('Error adding word:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue;
  
    if (type === 'checkbox') {
      newValue = checked;
    } else if (name === 'idsettings') {
      // Ensure that idsettings is a valid integer
      console.log('idsettings must be a valid integer');
      newValue = parseInt(value); // Convert the value to an integer
    } else {
      newValue = value;
    }
  
    setcategoryData({
      ...categoryData,
      [name]: newValue,
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
              autoComplete="off"
            />
          </label>
          <br />
          <label>
          <strong>Añade el color:</strong>
            <br />
            <input
              type="text"
              name="color"
              value={categoryData.color}
              onChange={handleChange}
              autoComplete="off"
            />
          </label>
          <br />
          <label>
          <strong>Añade el icono:</strong>
            <br />  <br />
            <input
              type="text"
              name="icon"
              value={categoryData.icon}
              onChange={handleChange}
              autoComplete="off"
            />
          </label>
          <label>
          <strong>Añade el idsettings:</strong>
            <br />  <br />
            <input
              type="number"
              name="idsettings"
              value={categoryData.idsettings}
              onChange={handleChange}
              autoComplete="off"
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





