import  React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
 

function UpdateCategory() {
    const {id} = useParams();
  const [values, setValues] = useState({
    name: "",
    color: "",
    icon: "",
    idsettings: 0,
    isscannable: false
  });

  useEffect(() => {
    axios.get(`https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/categories/get/${id}`)
      .then((res) => {
        setValues({
          ...values,
          name: res.data.name,
          color: res.data.color,
          icon: res.data.icon,
          idsettings: 1,
          isscannable: res.data.isscannable
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);





const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/categories/update/"+id, values)
    .then(res => {
      console.log("Category updated successfully:", res.data);
        navigate("/edit-category");
        console.log("Avr si se agrego")
    })
    .catch(err => console.log(err))

  }

  const handleDeleteCategory = async (id) => {
    try {
        await axios.delete('https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/words/delete/' + id)
        window.location.reload()
    }catch(err) {
        console.log(err);
    }
}
  return (
    <div className='col'>
         <h1>Editar Categoría</h1>
          <form onSubmit={handleSubmit}>
            <label><strong>Nuevo nombre:</strong></label>
            <input 
             type="text"
             name="name"
             className='form-control'
             placeholder='Ingresa el nuevo nombre'
             value={values.name}
             onChange={e=> setValues({...values, name: e.target.value})}
            />
            
          <label><strong>Color:</strong></label>
            <input
              type="text"
              name="color"
              className='form-control'
              placeholder='Ingresa el nuevo color'
              value={values.color}
              onChange={e=> setValues({...values, color: e.target.value})}
            />
          <label><strong>Icon:</strong><label>
            <input
              type="text"
              name="icon"
              className='form-control'
              placeholder='Ingresa el nuevo icon'
              value={values.icon}
              onChange={e=> setValues({...values, icon: e.target.value})}
            />
            </label>
        
            <strong>ID Settings:</strong></label>
            <input
              type="number"
              name="idsettings"
              placeholder='Ingresa el nuevo idsettings'
              value={values.idsettings}
              onChange={e=> setValues({...values, idsettings: e.target.value})}
              
            />
          
          <br /> 
          <label>
            <strong>Is Scannable:</strong></label>

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
            <button className='btn btn-danger ms-2' style={{ margin: '10px' }} onClick={ e => handleDeleteCategory(id)}
            >Eliminar
            </button>
          </div>
  )
}

export default UpdateCategory
