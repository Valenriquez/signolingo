
import  React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavbarUser from '../components/NavbarUser';
import Sidebar from '../components/Sidebar';
import jsonData from './getAllCategories.json';
import words from './getAllWords.json';
import axios from 'axios';

// Categories: https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/categories/getall
 
function EditWord() {
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
    { label: 'Crear Categoría', link: '/create-category' },
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

  const [categoryData, setcategoryData] = useState({
    name: '',
    image: null, // Use null to store the selected file
    icon: null,
    color: null, // Use null to store the selected file
    idsettings: 1,
    isscannable: false,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setcategoryData({
      ...categoryData,
      [name]: type === 'checkbox' ? e.target.checked : value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setcategoryData({
      ...categoryData,
      [name]: files[0], // Store the selected file in state
    });
  };

  function resetForm() {
    setcategoryData({
      ...categoryData,
      image: null, // Clear selected image
      audio: null, // Clear selected audio
      video: null, // Clear selected video
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object to send the file data
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
      </div>
      </div>
      </>
   );
}

export default EditWord;