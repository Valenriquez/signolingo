import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './SeeAdmins.css'; // Import the CSS file
import { Link } from 'react-router-dom';
// /update/:id
function SeeAdmins() {
    const [admins, setAdmins] = useState([])
    
    useEffect(()=> {
        axios.get('http://localhost/3000/getall')
        .then(res => setAdmins(res.data))
        .catch(err => console.log(err));
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete('http://localhost/3000/delete' + id)
            window.location.reload()
        }catch(err) {
            console.log(err);
        }
    }

    return (
    <div className='d-flex vh-100 bg-white justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded'>
            <Link to='/add-admins' className='btn btn-success'>Añadir +</Link>
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
                                <td>{data.name}</td>
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