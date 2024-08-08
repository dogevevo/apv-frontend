import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';

import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function RutaProtegida() {

  const {auth, cargando } = useAuth();
  // console.log(auth);
  // console.log(cargando);

  if(cargando) return 'Cargando ...'

  return (
    <>  

        <Header/>
          
          { auth?._id ? ( <main className='container mx-auto mt-20'> <Outlet/>  </main> ): <Navigate to="/" /> }
        <Footer/>
    </>
  )
}

export default RutaProtegida