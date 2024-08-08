import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function Header() {

    const { cerrarSesion } = useAuth()

  return (
    <>
        <header className='py-10 bg-indigo-600'>
            <div className="container mx-auto flex justify-between flex-col lg:flex-row items-center">
                <h1 className='font-bold text-2xl text-indigo-100 text-center'> Administrador de pacientes <span className='text-white font-black' > Veterinaria </span> </h1>
            
                <nav className='flex gap-4  mt-5 lg:mt-0 ' >
                    <Link to={'/admin'} className=' text-white uppercase text-xs font-bold '> Pacientes </Link>
                    <Link to={'/admin/perfil'} className=' text-white uppercase text-xs font-bold '> Perfil </Link>
                    <button type='button' className='text-white uppercase text-xs font-bold' onClick={cerrarSesion}> Cerrar Sesion </button>
                </nav>
            </div>
        </header>
    </>
  )
}

export default Header