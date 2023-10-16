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
  const [words, setWords] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(""); // Store selected category name
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    axios.get('https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/categories/getall')
      .then(res => {
        console.log('API Response category:', res.data);
        setCategories(res.data.categories);
        // Fetch words data once categories data is available
        axios.get('https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/words/getall')
          .then(res => {
            console.log('API Response words:', res.data);
            setWords(res.data.words);
          })
          .catch(err => console.log('API Error:', err));
      })
      .catch(err => console.log('API Error:', err));
  }, []);
  

  const [formData, setFormData] = useState({
    name: '',
    color: '',
    icon: '',
    idsettings: 0,
    isscannable: false,
  });
  const [editMode, setEditMode] = useState(false);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategoryName(categoryName);
  };
  
  const buttons = [
    { label: 'Editar Categoría', link: '/create-category' },
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

  //const categoriesArray = jsonData.categories;
  //const wordsArray = words.words;


  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      color: category.color,
      icon: category.icon,
      idsettings: category.idsettings,
      isscannable: category.isscannable
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
  
  useEffect(() => {
    if (selectedCategoryId !== null) {
      const selectedCategory = categories.find((category) => categories.id === selectedCategoryId);
      if (selectedCategory) {
        setFormData({
          name: selectedCategory.name,
          color: selectedCategory.color,
          icon: selectedCategory.icon,
          idsettings: selectedCategory.idsettings,
          isscannable: selectedCategory.isscannable
        });
        setEditMode(true);
      }
    } else {
      setFormData({
        name: '',
        color: '',
        icon: '',
        idsettings: 0,
        isscannable: false
      });
      setEditMode(false);
    }
  }, [selectedCategoryId]);
  

  ////aaa change

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory) {
       axios.put(`https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/categories/update/${selectedCategory.id}`, formData)
        .then((response) => {
          console.log('Updated Category:', response.data);
           const updatedCategories = categories.map((category) => {
            if (category.id === response.data.id) {
              return response.data;
            }
            return category;
          });
          setCategories(updatedCategories);
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

          {categories.map((category) => (
          <div className='box' key={category.id}>
          <button onClick={() => toggleExpansion(category.id)}>
            {expandedCategoryId === category.id ? '▼' : '▲'} <span onClick={() => handleCategorySelect(category.name)}> {category.name}</span>

          </button>
          {expandedCategoryId === category.id && (
          <div>
          {words
          .filter(word => word.categoryid === category.id)
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
      <div className='col'>
         <h1>Editar Categoría</h1>
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
            <br />
            <button type="submit" className="btn btn-success">Editar</button>
            <button className="btn btn-danger" style={{ margin: '10px' }} >
              Borrar 
            </button>
          </form>
            )}
          </div>
        </div>
      </div>
 
      </>
   );
}

export default EditCategory;