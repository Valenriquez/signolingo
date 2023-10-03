import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavbarUser from '../components/NavbarUser';
import Sidebar from '../components/Sidebar';
import './CreateCategory.css'; // Import the CSS file
import jsonData from './getAllCategories.json';
import wordData from './getAllWords.json';

function CreateCategory() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const buttons = [
    { label: 'Crear Categoría', link: '/create-category' },
    { label: 'Tutorial', link: '/create-category-tutorial' },
  ];

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
    console.log('Button clicked. isExpanded:', !isExpanded);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const categoriesArray = jsonData.categories;
  const categoryOptions = categoriesArray.map((category) => (
    <option key={category.id} value={category.name}>
      {category.name}
    </option>
  ));

  const wordsArray = wordData.words;
  const wordsNames = wordsArray.map((words) => words.word);

  return (
    <>
      <div className="grid-container">
        <Sidebar />
        <div className="navbar">
          <NavbarUser buttons={buttons} />
        </div>
      </div>


      
  <div className="col-md-9">
   <p className="centered-paragraph">
  Modo administrador para aplicación de ¡OS SignoLingo
  </p>
  <h1>Base de datos</h1>
  <div className="left-side">
    <h2>Palabras actuales</h2>
  {categoriesArray.map((jsonData) => (
  <div className='box' key={jsonData.id}>
    <button onClick={toggleExpansion}>
      {isExpanded ? '▼' : '▲'} {jsonData.name}
    </button>
    {isExpanded && (
      <div>
        {wordsArray
          .filter((wordData) => wordData.categoryid === jsonData.id)
          .map((matchingWordData) => (
            <div key={matchingWordData.id}>
              <li> {matchingWordData.word} </li>
            </div>
          ))}
      </div>
    )}
  </div>
    ))}
    </div>
  </div>
  </>
  );
}

export default CreateCategory;
