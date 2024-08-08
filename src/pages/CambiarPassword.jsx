import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth";
import { useState } from "react"


function CambiarPassword() {

  const { guardarPassword } = useAuth()
  const [ alerta, setAlerta ] = useState({});
  const [password, setPassword] = useState({ pwd_actual: '', pwd_nuevo: '' })

  const handleSubmit = async (e)  => {
    e.preventDefault()


    if(Object.values(password).some( campo => campo === '' ) ){

      setAlerta({
        msg: 'Todos los campos son obligatorios', 
        error: true
      })

      return
    }

    if (password.pwd_nuevo.length < 6) {
      
      setAlerta({
        msg: 'El Password Debe de Tener minimo 6 caracteres', 
        error: true
      })

      return
    }
    


    const respuesta =  await guardarPassword(password)
    setAlerta( respuesta )
  }

  const { msg } = alerta

  return (
    <>
      <AdminNav/>

      <h2 className="font-black text-3xl text-center mt-10" > Cambiar Password </h2>
      <p className="text-xl mt-10 mb-10 text-center">Modifica Tu <span className="text-indigo-600 font-bold"> Password aqui </span></p>


      <div className="flex justify-center mb-10">
        <div className=" w-full md:w-1/2 bg-white shadow rounded-xl p-5 ">

          {msg && <Alerta  alerta={alerta} />} 

          <form action="" onSubmit={ handleSubmit }>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600 "> Password Actual  </label>
              <input name="pwd_actual" onChange={ e => setPassword({ ...password, [e.target.name] : e.target.value }) }  type="password"  className="border bg-gray-50 w-full p-2 mt-5 rounded-lg " placeholder="Escribe tu Password Actual"/>
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600 "> Nuevo Password  </label>
              <input name="pwd_nuevo"  onChange={ e => setPassword({ ...password, [e.target.name] : e.target.value }) }  type="password"  className="border bg-gray-50 w-full p-2 mt-5 rounded-lg " placeholder="Escribe un Nuevo Password"/>
            </div>

           
            <input type="submit" value='Actualizar Password' className="bg-indigo-500 w-full rounded-lg text-white px-10 py-3 font-bold uppercase mt-5" />
          </form>

        </div>
      </div>
    </>
  )
}

export default CambiarPassword