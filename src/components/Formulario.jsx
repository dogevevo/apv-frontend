import React, { useEffect } from 'react'
import { useState } from 'react'
import Alerta from './Alerta';
import usePacientes from '../hooks/usePacientes';

function Formulario() {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState(''); 
  const [email, setEmail] =useState(''); 
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [id, setId] = useState(null)
  const [alerta, setAlerta] = useState(false);

  const { guardarPaciente, paciente } = usePacientes()

  useEffect(() => {

    if (paciente?.nombre) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
      setId(paciente._id)
    }

  }, [paciente])
  

  const handleSubmit = e => {
    e.preventDefault();
    
    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      setAlerta({
        msg : 'Todos los campos son obligatorios', 
        error : true, 
      })
     return
    }

    guardarPaciente({ nombre, propietario, email, fecha, sintomas, id })
    setAlerta({
        msg: 'Guardado Correctamente'
    })
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
    setId('')

  } 

  const {msg} = alerta

  return (
  <>
    <h1 className='font-black text-3xl text-center'> Formulario De Pacientes </h1>
    <p className='text-xl mt-5 mb-10 text-center'> Añade Tus Pacientes y  {''} <span className='text-indigo-500 font-bold'>Administralos</span>  </p>

    <form action="" className='bg-white py-10 px-5 mb-10 lg:mb-0 shadow rounded' onSubmit={ handleSubmit  }>
      <div className="mb-5">
        <label htmlFor='nombre' className='text-gray-700 uppercase font-bold' > Nombre de la mascota </label>
        <input type="text" id='nombre' placeholder='Nombre de la mascota' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' value={nombre} onChange={e => setNombre(e.target.value)} />
      </div>

      <div className="mb-5">
        <label htmlFor='propietario' className='text-gray-700 uppercase font-bold' > Nombre del Propietario </label>
        <input type="text" id='propietario' placeholder='Nombre del Propietario' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' value={propietario} onChange={e => setPropietario(e.target.value)} />
      </div>

      <div className="mb-5">
        <label htmlFor='email' className='text-gray-700 uppercase font-bold' > Nombre del Propietario</label>
        <input type="email" id='email' placeholder='Email del Propietario' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' value={email} onChange={e => setEmail(e.target.value)} />
      </div>

      <div className="mb-5">
        <label htmlFor='fecha' className='text-gray-700 uppercase font-bold' > Fecha de Alta </label>
        <input type="date" id='fecha' placeholder='Fecha de Alta' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' value={fecha} onChange={e => setFecha(e.target.value)}/>
      </div>

      <div className="mb-5">
        <label htmlFor='sintomas' className='text-gray-700 uppercase font-bold' > Sintomas del paciente </label>
        <textarea id='sintomas' placeholder='Descripcion de sintomas' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' value={sintomas} onChange={e => setSintomas( e.target.value )}/>
      </div>

      <input type='submit' className='bg-indigo-500 w-full p-3 text-white uppercase font-bold hover:bg-indigo-600 rounded cursor-pointer transition-colors' value={id ? 'Editar Paciente' : 'Agregar Paciente'}  />
    </form>
    {msg && <Alerta alerta={alerta} />}
  </>

  )
}

export default Formulario