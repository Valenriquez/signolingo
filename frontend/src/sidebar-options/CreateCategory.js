import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavbarUser from '../components/NavbarUser';
import Sidebar from '../components/Sidebar';
import './CreateCategory.css'; 
import axios from 'axios';

// Categories: https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/categories/getall

// ame":"Comida","color":"verde","icon":"fork.knife","idsettings":1,"isscannable":fals
function CreateCategory() {
 
  const [categories, setCategories] = useState([]);
  const [words, setWords] = useState([]);

  const [name, setName] = useState('')
  const [color, setColor] = useState('')
  const [icon, setIcon] = useState('')
  const [idsettings, setIdsettings] = useState(0)
  const [isscannable, setIsscannable] = useState(false)
  //<button type="submit" className="custom-button">Añadir</button>


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

  const [categoryData, setCategoryData] = useState({
    name: '',
    color: '',
    icon: '',
    idsettings:0,
    isscannable: false,
  });

  function resetForm() {
    console.log('resetForm function is triggered');  
    setCategoryData({
      ...categoryData,
      name: '',
      color: '',
      icon: '',
      idsettings:0, 
      isscannable: false, 
    });
  }

  // ame":"Comida","color":"verde","icon":"fork.knife","idsettings":1,"isscannable":fals

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleColor = (e) => {
    setColor(e.target.value)
  }

  const handleIcon = (e) => {
    setIcon(e.target.value)
  }

  const handleIdsettings = (e) => {
    setIdsettings(e.target.value)
  }

  const handleIsscannable = (e) => {
    setIsscannable(e.target.checked)
  }
 


  const handleApiForCategory = () => {
    console.log({ name, color, icon, idsettings, isscannable });
    axios
      .post("https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/categories/add", {
        name: name,
        color: color,
        icon: icon,
        idsettings: idsettings, 
        isscannable: isscannable
      })
      .then((result) => {
        console.log(result.data);
       })
      .catch((error) => {
        alert('service error');
         console.log(error);
      });
  }
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
           <label>
          <strong>Añade el nombre:</strong>
            <br />
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleName}
              className="input"
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
              value={color}
              onChange={handleColor}
              className="input"
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
              value={icon}
              onChange={handleIcon}
              className="input"
              autoComplete="off"
            />
          </label>
          <label>
          <strong>Añade el idsettings:</strong>
            <br />  <br />
            <input
              type="number"
              name="idsettings"
              value={idsettings}
              onChange={handleIdsettings}
              className="input"
              autoComplete="off"
            />
          </label>
          <br />
          <label style={{ marginLeft: '30px' }}>
          <strong>Es escaneable:</strong>
             <input
              type="checkbox"
              name="isscannable"
              checked={isscannable}
              className="input"
              onChange={handleIsscannable}
             />
          </label>
          <br /><br />
          <button className="custom-button" onClick={handleApiForCategory} >Añadir</button>

          <button type="button" onClick={resetForm}>Limpiar</button>
       </div>
      </div>
      </div>
        </>
  );
}

export default CreateCategory;





