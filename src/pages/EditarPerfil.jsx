import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta";


function EditarPerfil() {

  const { auth, actualizarPerfil } = useAuth()
  const [ perfil, setPerfil] = useState({})
  const [ alerta, setAlerta] = useState({})
  
  useEffect(() => {
    setPerfil(auth)
  }, [auth])

  const handleSubmit  = async e => {
    e.preventDefault()

    const {nombre, email} = perfil
    
    if ([nombre, email].includes('') ) {
      setAlerta({ msg : 'Nombre y Correo son Requeridos', error : true })
      return
    }

    const resultado =  await actualizarPerfil(perfil)
    setAlerta(resultado)
  }

  const {msg} = alerta

  return (
    <>
      <AdminNav/>

      <h2 className="font-black text-3xl text-center mt-10" >Editar Perfil </h2>
      <p className="text-xl mt-10 mb-10 text-center">Modifica Tu <span className="text-indigo-600 font-bold"> Informacion Aqui </span></p>


      <div className="flex justify-center mb-10">
        <div className=" w-full md:w-1/2 bg-white shadow rounded-xl p-5 ">

          {msg && <Alerta  alerta={alerta} />} 

          <form action="" onSubmit={ handleSubmit }>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600 "> Nombre </label>
              <input name="nombre" value={perfil.nombre || ''} onChange={ e => setPerfil({...perfil, [e.target.name] : e.target.value })} type="text"  className="border bg-gray-50 w-full p-2 mt-5 rounded-lg " />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600 "> Sitio Web </label>
              <input type="text" name="web" value={perfil.web || ''} onChange={ e => setPerfil({...perfil, [e.target.name] : e.target.value })} className="border bg-gray-50 w-full p-2 mt-5 rounded-lg " />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600 "> Telefono </label>
              <input type="text" name="telefono" value={perfil.telefono || ''} onChange={ e => setPerfil({...perfil, [e.target.name] : e.target.value })} className="border bg-gray-50 w-full p-2 mt-5 rounded-lg " />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600 "> Email </label>
              <input type="text" name="email" value={perfil.email || ''} onChange={ e => setPerfil({...perfil, [e.target.name] : e.target.value })}  className="border bg-gray-50 w-full p-2 mt-5 rounded-lg " />
            </div>

            <input type="submit" value='Guardar Cambios' className="bg-indigo-500 w-full rounded-lg text-white px-10 py-3 font-bold uppercase mt-5" />
          </form>

        </div>
      </div>
    </>
  )
}

export default EditarPerfil 