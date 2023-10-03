 

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavbarUser from '../components/NavbarUser';
import Sidebar from '../components/Sidebar';
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#000b76" fill-opacity="1" d="M0,64L24,101.3C48,139,96,213,144,229.3C192,245,240,203,288,192C336,181,384,203,432,208C480,213,528,203,576,186.7C624,171,672,149,720,144C768,139,816,149,864,160C912,171,960,181,1008,197.3C1056,213,1104,235,1152,245.3C1200,256,1248,256,1296,245.3C1344,235,1392,213,1416,202.7L1440,192L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"></path></svg>

function CreateWord() {
  const buttons = [
    { label: 'Crear Palabra', link: '/create-word' },
    { label: 'Tutorial', link: '/create-word-tutorial' },
    // Add more buttons as needed
  ];

  return (
    <>  
        <div className='grid-container'>
        <Sidebar />
        <div className='navbar'> 
        <NavbarUser buttons={buttons} />
        </div>
      </div>
      <div className='col-md-9'>
          <p className='centered-paragraph'>
          CreateWord
          </p>
        </div>
      </>
   );
}

export default CreateWord;