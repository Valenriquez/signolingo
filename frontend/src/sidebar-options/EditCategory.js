import  React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavbarUser from '../components/NavbarUser';
import Sidebar from '../components/Sidebar';
import jsonData from './getAllCategories.json';
import words from './getAllWords.json';
import axios from 'axios';

// Categories: https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/categories/getall
 
function EditCategory() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    color: '',
    icon: '',
    idsettings: 0,
    isscannable: false,
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Fetch categories from the API
    axios.get('https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/categories/getall')
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


  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      color: category.color,
      icon: category.icon,
      idsettings: category.idsettings,
      isscannable: category.isscannable,
    });
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory) {
      // Send a PUT request to update the selected category
      axios.put(`https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/categories/update/${selectedCategory.id}`, formData)
        .then((response) => {
          console.log('Updated Category:', response.data);
          // Update the local categories list with the updated category data
          const updatedCategories = categories.map((category) => {
            if (category.id === response.data.id) {
              return response.data;
            }
            return category;
          });
          setCategories(updatedCategories);
          // Clear the form and exit edit mode
          setFormData({
            name: '',
            color: '',
            icon: '',
            idsettings: 0,
            isscannable: false,
          });
          setEditMode(false);
          setSelectedCategory(null);
        })
        .catch((error) => {
          console.error('Error updating category:', error);
        });
    }
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
      <div className='col'>
         <h1>Editar Categoría</h1>
        <br />

        

        <strong>Selecciona una categoría:</strong>
        <br />
        <select onChange={(e) => handleCategorySelect(categoriesArray[e.target.value])}>
        <option value="">Categorías</option>
          {categoriesArray.map((jsonData, index) => (
            <option key={jsonData.id} value={index}>
              {jsonData.name}
            </option>
          ))}
        </select>
            
        {editMode && (
          <form onSubmit={handleFormSubmit}>  

            <label> 
            <strong>Nombre:</strong><br /> 
            <input 
             type="text"
             name="name"
             value={formData.name}
             onChange={handleInputChange}
            />
             </label>
          <label>
            <strong>Color:</strong><br /> 
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
            />
            </label>
          <label>
            <strong>Icon:</strong><br /> 
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleInputChange}
            />
            </label>
        
          <label>
            <strong>ID Settings:</strong><br /> 
            <input
              type="number"
              name="idsettings"
              value={formData.idsettings}
              onChange={handleInputChange}
            />
          </label>
          <br /> 
          <label>
            <strong>Is Scannable:</strong><br /> 
            <input
              type="checkbox"
              name="isscannable"
              value={formData.isscannable}
              onChange={handleInputChange}
            />
            </label>
           
            <br /><button type="submit" className="btn btn-success">Editar</button>
          </form>
            )}
          </div>
        </div>
      </div>
 
      </>
   );
}

export default EditCategory;