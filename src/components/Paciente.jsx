import React from 'react'
import usePacientes from '../hooks/usePacientes';

function Paciente({paciente}) {

  const {setEditando, eliminarPaciente} = usePacientes()

  const {nombre, propietario, email, fecha, sintomas, _id} = paciente



  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha);
    return new Intl.DateTimeFormat('es-MX', {dateStyle: 'long'}).format(nuevaFecha)
  }

  return (
    <>
    
      <div className="mx-5 my-10 bg-white shadow-xl px-5 py-10 rounded-xl" >
        <p className='font-bold uppercase text-gray-700 my-2'> Nombre: {' '} <span className='text-black font-normal normal-case'> {nombre} </span></p>

        <p className='font-bold uppercase text-gray-700 my-2'> Nombre de propietario: {' '} <span className='text-black font-normal normal-case'> {propietario} </span></p>

        <p className='font-bold uppercase text-gray-700 my-2'> Email del propietario: {' '} <span className='text-black font-normal normal-case'> {email} </span></p>

        <p className='font-bold uppercase text-gray-700 my-2'> Fecha de alta: {' '} <span className='text-black font-normal normal-case'> {formatearFecha(fecha)} </span></p>

        <p className='font-bold uppercase text-gray-700 my-2'> Sintomas de Mascota: {' '} <span className='text-black font-normal normal-case'> {sintomas} </span></p>

        <div className="flex justify-between my-10">
          <button onClick={() => setEditando(paciente)} type='button' className='py-2 px-10 bg-indigo-600 md:bg-indigo-700 text-white uppercase rounded-lg font-bold' > Editar </button>
          <button onClick={() => eliminarPaciente(_id)} type='button' className='py-2 px-10 bg-red-600 md:bg-red-700 text-white uppercase rounded-lg font-bold' > Borrar </button>
        </div>
      </div>
    </>
  )
}

export default Paciente