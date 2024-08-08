import React from 'react'
import usePacientes from '../hooks/usePacientes'
import Paciente from './Paciente';


function ListadoPacientes() {

  const {pacientes} = usePacientes()
  

  return (
    <>
      { pacientes.length ?
      (
        <>
          <h1 className='font-black text-3xl text-center'> Listado De Pacientes </h1>
          <p className='text-xl mt-5 mb-10 text-center'> Administra Tus  {''} <span className='text-indigo-500 font-bold'>Pacientes y Citas</span>  </p>

          {pacientes.map( paciente => (
            <Paciente
              key={paciente._id}
              paciente={paciente}
            />
          ))}
        </>
      ) : 
      (
        <>
          <h1 className='font-black text-3xl text-center'> No Hay Pacientes </h1>
          <p className='text-xl mt-5 mb-10 text-center'> LLena el formulario para agregar {''} <span className='text-indigo-500 font-bold'>pacientes en esta lista</span>  </p>
        </>
      )}
    </>
  )
}

export default ListadoPacientes