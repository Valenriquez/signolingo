import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Login.css'; // Import the CSS file
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function Login() {
    const {
        register, handleSubmit,
        formState: {
            errors
        }
    } = useForm();
    
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

    const onSubmit = data => {
        if (data.password === "Hola123") {
            setIsPasswordCorrect(true);
        } 
    };

    return (
        <> 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#0C249F " fill-opacity="1" d="M0,32L30,58.7C60,85,120,139,180,138.7C240,139,300,85,360,85.3C420,85,480,139,540,170.7C600,203,660,213,720,224C780,235,840,245,900,250.7C960,256,1020,256,1080,250.7C1140,245,1200,235,1260,197.3C1320,160,1380,96,1410,64L1440,32L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path>
        </svg> 
        <div className='container'>
            <div className='row'>
                <h1>Ingresa</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p className='input-label'>Email *</p>
                    <input
                        className='input'
                        type="text"
                        placeholder='Email'
                        {...register("email", {
                            required: true,
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                        })}
                    />
                    {errors.email &&
                        <span className='error'>
                            {errors.email.type === 'required' && 'This field is required'}
                            {errors.email.type === 'pattern' && 'Invalid Email address'}
                        </span>
                    }

                    <p className='input-label'>Contraseña *</p>
                    <input
                        className='input'
                        type="password"
                        placeholder='Contraseña'
                        {...register("password", {
                            required: true
                        })}
                    />
                    {errors.password &&
                        <span className='error'>
                            {errors.password.type === 'required' && 'This field is required'}
                        </span>
                    }

                    <div>
                        <br />

                        {isPasswordCorrect ? (
                            <div className='buttons'>
                                <Link to="/home">
                                <button className="btn btn-outline-success" style={{ margin: '10px' }}>Inicio</button>
                                </Link> 
                             

                                <Link to="/see-users">
                                <button className="btn btn-outline-success" style={{ margin: '10px' }}>Ver Usuarios</button>
                                </Link>

                                <Link to="/see-admins">
                                <button className="btn btn-outline-success" style={{ margin: '10px' }}>Ver Administradores</button>
                                </Link>
                            </div>
                        ) : (
                            <> 
                            <button className="btn btn-outline-success" type="submit">Ingresa</button>
                            <Link to="/home">
                                <button className="btn btn-outline-success" style={{ margin: '10px' }}>Inicio</button>
                            </Link> 
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default Login;
