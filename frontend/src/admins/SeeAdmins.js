import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './SeeAdmins.css'; // Import the CSS file
import { Link } from 'react-router-dom';
// /update/:id

//https://reqres.in/api/users?page=2
//  <td>{data.name}</td>
// <td>{data.email}</td>

function SeeAdmins() {
    const [admins, setAdmins] = useState([])
    
    useEffect(()=> {
        axios.get('https://reqres.in/api/users?page=2')
        .then(res => setAdmins(res.data.data))
        .catch(err => console.log(err));
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete('https://vc5kqp87-3000.usw3.devtunnels.ms/api/v1/adminsauth/delete' + id)
            window.location.reload()
        }catch(err) {
            console.log(err);
        }
    }

    return (
    <div className='d-flex vh-100 bg-white justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded'>
            <Link to='/add-admins' className='btn btn-success'>Añadir +</Link>
            <Link to="/home">
                <button className="btn btn-success" style={{ margin: '10px' }}> Inicio </button>
            </Link>
            <Link to="/">
                <button className="btn btn-outline-success" style={{ margin: '10px' }}> Salir </button>
            </Link>
            <table className='table'>
                <thead>
                    <tr>
                    <th>Nombre: </th>
                    <th>Email: </th>
                    <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        admins.map((data, i)=> (
                            <tr key={i}>
                                <td>{data.first_name}</td>
                                <td>{data.email}</td>
                                <td>
                                    <button className='btn btn-danger ms-2' onClick={ e => handleDelete(data.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
     </div>
    );
}

export default SeeAdmins;