import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavbarUser from '../components/NavbarUser';
import Sidebar from '../components/Sidebar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CreateWord.css';


function CreateWord() {
  const [categories, setCategories] = useState([]);
  const [words, setWords] = useState([]);
  
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);
  
  // {"id":28,"word":"Rojo","categoryid":17,"definition":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  //"image":"red","suggested1":"Amarillo","suggested2":"Azul","video":"Alimentos_7_Rojo","idsettings":1,
  //"isscannable":false,"audio":"Manzana"}]}
  const [word, setWord] = useState('')
  const [categoryid, setCategoryid] = useState(0)
  const [definition, setDefinition] = useState('')
  const [image, setImage] = useState('')
  const [suggested1, setSuggested1] = useState('')
  const [suggested2, setSuggested2] = useState('')
  const [video, setVideo] = useState('')
  const [idsettings, setIdsettings] = useState(1)
  const [isscannable, setIsscannable] = useState(false)
  const [audio, setAudio] = useState('')


  useEffect(() => {
    axios.get('https://c9x08l7v-3000.usw3.devtunnels.ms/api/v1/categories/getall')
      .then(res => {
        console.log('API Response category:', res.data); // Log the API response data
        setCategories(res.data.categories); // Update the admins state with the fetched data
      })
      .catch(err => console.log('API Error:', err)); // Log any API errors
  }, []); // Empty dependency array to run the effect only once

  console.log('categories Array:', categories); // Log the state of the admins array

  useEffect(() => {
    axios.get('https://c9x08l7v-3000.usw3.devtunnels.ms/api/v1/words/getall')
      .then(res => {
        console.log('API Response words:', res.data); // Log the API response data
        setWords(res.data.words); // Update the admins state with the fetched data
      })
      .catch(err => console.log('API Error:', err)); // Log any API errors
  }, []); // Empty dependency array to run the effect only once

  console.log('words Array:', words); // Log the state of the admins array

  const buttons = [
    { label: 'Crear Palabra', link: '/create-word' },
    { label: 'Tutorial', link: '/tutorial' },
  ];
 
  const toggleExpansion = (categoryId) => {
    if (expandedCategoryId === categoryId) {
      setExpandedCategoryId(null);
    } else {
      setExpandedCategoryId(categoryId);
    }
  };
 

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


   // {"id":28,"word":"Rojo","categoryid":17,"definition":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  //"image":"red","suggested1":"Amarillo","suggested2":"Azul","video":"Alimentos_7_Rojo","idsettings":1,
  //"isscannable":false,"audio":"Manzana"}]}
  const handleWord = (e) => {
    setWord(e.target.value)
  }

  const handleCategoryid = (e) => {
    setCategoryid(e.target.value)
  }

  const handleDefinition = (e) => {
    setDefinition(e.target.value)
  }

  const handleImage = (e) => {
    setImage(e.target.value)
  }

  const handleSuggested1 = (e) => {
    setSuggested1(e.target.value)
  }
 
  const handleSuggested2 = (e) => {
    setSuggested2(e.target.value)
  }

  const handleVideo = (e) => {
    setVideo(e.target.value)
  }

  const handleIdsettings= (e) => {
    setIdsettings(e.target.checked)
  }

  const handleIsscannable = (e) => {
    setIsscannable(e.target.checked)
  }

  const handleAudio = (e) => {
    setAudio(e.target.value)
  }


  // {"id":28,"word":"Rojo","categoryid":17,"definition":"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  //"image":"red","suggested1":"Amarillo","suggested2":"Azul","video":"Alimentos_7_Rojo","idsettings":1,
  //"isscannable":false,"audio":"Manzana"}]}
  const handleApiForWord = () => {
    console.log({ word, categoryid, definition, image, suggested1, suggested2, video, idsettings, isscannable, audio });
    axios
      .post("https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/words/add", {
        word: word, 
        categoryid: categoryid, 
        definition: definition, 
        image: image, 
        suggested1: suggested1, 
        suggested2: suggested2, 
        video: video, 
        idsettings: idsettings, 
        isscannable: isscannable,
        audio: audio
      })
      .then((result) => {
        console.log('Word added successfully:', result.data);
        alert('success');
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
        <h1>Crear Palabra </h1>
         <label><strong>Selecciona la categoria:</strong></label>
            <br />
            <input
              type="number"
              name="categoryid"
              value={categoryid}
              onChange={handleCategoryid}
              className="input"
              autoComplete="off"

            />
          <br />
          <label><strong>Añade la palabra:</strong></label>
            <br />
            <input
              type="text"
              name="word"
              value={word}
              onChange={handleWord}
              className="input"
              autoComplete="off"
            />
          <label><strong>Añade el Sugerido 1:  </strong></label>

            <input
              type="text"
              name="suggested1"
              value={suggested1}
              onChange={handleSuggested1}
              className="input"
              autoComplete="off"
            />
          <label><strong>Añade el Sugerido 2:   </strong></label>

            <input
              type="text"
              name="suggested2"
              value={suggested2}
              onChange={handleSuggested2}
              className="input"
              autoComplete="off"
            />
          <br />
          <label><strong>Añade la definición:</strong></label>
            <br />
            <input
              type="text"
              name="definition"
              value={definition}
              onChange={handleDefinition}
              className="input"
              autoComplete="off"
            />
          
          
          <br />
          <label><strong>Selcciona el idioma (1=español)::</strong></label>

            <br />
            <input
              type="number"
              name="idsettings"
              value={idsettings}
              onChange={handleIdsettings}
              className="input"
              autoComplete="off"
            />
          <br />
          <label><strong>Añade la imagen:</strong></label>

            <br /><br />
            <input
              type="text"
              name="image"
              value={image}
              onChange={handleImage}
              className="input"
              autoComplete="off"

              
            />
          <br />
          <label><strong>Añade el audio:</strong></label>
            <br /><br />
            <input
              type="text"
              name="audio"
              value={audio}
              onChange={handleAudio}
              className="input"
              autoComplete="off"
            />
          <br />
          <label><strong>Añade el video:</strong></label>

            <br /><br />
            <input
              type="text"
              name="video"
              value={video}
              onChange={handleVideo}
              className="input"
              autoComplete="off"
            />
          <br />
          <label>
          <strong>Es escaneable:</strong>
          <br />
            <input
               type="checkbox"
               name="isscannable"
               checked={isscannable}
               className="input"
               onChange={handleIsscannable}
            />
          </label>
          <br /><br />
          <button className="custom-button" onClick={handleApiForWord} >Añadir</button>
          <button type="button" onClick={resetForm}>Limpiar</button>
       </div>
      </div>
      </div>
        </>
  );
}

export default CreateWord;