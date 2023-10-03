import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Start.css'; // Import the CSS file
 import Sidebar from './Sidebar';

function Start() {
  const buttons = [
    { label: 'Inicio', link: '/' },
    { label: 'Tutorial', link: '/tutorial' },
    { label: 'Dudas', link: '/dudas' },
    // Add more buttons as needed
  ];

  return (
    <>  
       <div className='grid-container'>
        <Sidebar />
        <div className='navbar'> 
         </div>
      </div>
      <div className='col-md-9'>
          <p className='centered-paragraph'>
            Somos una comunidad enfocada a contribuir un bien en la sociedad, debido a que ayudamos a personas sordomudas mediante nuestra aplicación móvil creada con Swift UI. El propósito de la aplicación es enseñar al usuario la lengua de señas. Se usará un modelo CO-ML el cual reconoce imágenes, así como se dará el significado de la palabra y ejercicios para hacer el método de aprendizaje más entretenido y didáctico.
          </p>
        </div>
      </>
   );
}

export default Start;
