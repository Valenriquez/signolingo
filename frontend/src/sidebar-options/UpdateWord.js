import  React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
 

function UpdateWord() {
    const {id} = useParams();
  const [values, setValues] = useState({
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

  useEffect(() => {
    axios.get(`https://c9x08l7v-3000.usw3.devtunnels.ms/api/v1/categories/get/${id}`)
      .then((res) => {
        setValues({
          ...values,
          word: res.data.word,
          categoryid: res.data.categoryid,
          definition: res.data.definition,
          image: res.data.image,
          suggested1: res.data.suggested1,
          suggested2: res.data.suggested2,
          video: res.data.video,
          idsettings: 1,
          isscannable: res.data.isscannable,
          audio: res.data.audio,
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("https://c9x08l7v-3000.usw3.devtunnels.ms/api/v1/words/update/"+id, values)
    .then(res => {
      console.log("Words updated successfully:", res.data);
        navigate("/edit-word");
        console.log("Avr si se agrego")
    })
    .catch(err => console.log(err))

  }


  const handleDeleteWord = async (id) => {
    try {
        await axios.delete('https://c9x08l7v-3000.usw3.devtunnels.ms/api/v1/words/delete/' + id)
        window.location.reload()
    }catch(err) {
        console.log(err);
    }
}
  return (
    <div className='col'>
         <h1>Editar Palabra</h1>
          <form onSubmit={handleSubmit}>
            <label><strong>Nueva palabra:</strong></label>
            <input 
             type="text"
             name="word"
             className='form-control'
             placeholder='Ingresa el nuevo nombre'
             value={values.word}
             onChange={e=> setValues({...values, word: e.target.value})}
            />

            <label><strong>Category ID:</strong></label>
            <input
              type="number"
              name="categoryid"
              className='form-control'
              placeholder='Ingresa el nuevo categoryid'
              value={values.categoryid}
              onChange={e=> setValues({...values, categoryid: e.target.value})}
              
            />

            <label><strong>Sugerido 1:</strong></label>
            <input
              type="text"
              name="suggested1"
              className='form-control'
              placeholder='Ingresa el nuevo suggested1'
              value={values.suggested1}
              onChange={e=> setValues({...values, suggested1: e.target.value})}
              
            />

            <label><strong>Sugerido 2:</strong></label>
            <input
              type="text"
              name="suggested2"
              className='form-control'
              placeholder='Ingresa el nuevo suggested2'
              value={values.suggested2}
              onChange={e=> setValues({...values, suggested2: e.target.value})}
              
            />

            <label><strong>Definición:</strong></label>
            <input
              type="text"
              name="definition"
              className='form-control'
              placeholder='Ingresa el nuevo definition'
              value={values.definition}
              onChange={e=> setValues({...values, definition: e.target.value})}
              
            />

            <label><strong>Selcciona el idioma (1=español):</strong></label>
            <input
              type="number"
              name="idsettings"
              className='form-control'
              placeholder='Ingresa el nuevo idsettings'
              value={values.idsettings}
              onChange={e=> setValues({...values, idsettings: e.target.value})}
              
            />

            <label><strong>Imagen:</strong></label>
            <input
              type="text"
              name="image"
              className='form-control'
              placeholder='Ingresa el nuevo image'
              value={values.image}
              onChange={e=> setValues({...values, image: e.target.value})}
              
            />

            <label><strong>Audio:</strong></label>
            <input
              type="text"
              name="audio"
              className='form-control'
              placeholder='Ingresa el nuevo audio'
              value={values.audio}
              onChange={e=> setValues({...values, audio: e.target.value})}
              
            />


            <label><strong>Video:</strong></label>
            <input
              type="text"
              name="video"
              className='form-control'
              placeholder='Ingresa el nuevo video'
              value={values.video}
              onChange={e=> setValues({...values, video: e.target.value})}
              
            />  
            
            <label><strong>Es escaneable:</strong></label>
            <input
              type="checkbox"
              name="isscannable"
              placeholder='Ingresa el nuevo nombre'
              value={values.isscannable}
              onChange={e=> setValues({...values, isscannable: e.target.checked})}
            /> 
 
            </form>
            <br />
            <button className="btn btn-success" onClick={handleSubmit}>Editar</button>
            
            <button className='btn btn-danger ms-2' style={{ margin: '10px' }} onClick={ e => handleDeleteWord(id)}
            >Eliminar
            </button>

            
          </div>
  )
}

export default UpdateWord
