import { useState, useEffect} from "react"
import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

function NuevoPassword() {
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const [tokenValido, setTokenValido] = useState(false)
  const [ passwordModificado, setPasswordModificado ] = useState(false); 

  const params =  useParams(); 
  const { token } = params; 


  useEffect(() => {

    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`); 
        setAlerta({ msg : 'Coloca una nueva contraseña' })
        setTokenValido(true)
      } catch (error) {
        setAlerta({ msg : 'Hubo un error con el enlace', error : true })
      }
    }

    
    comprobarToken()
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (password.length < 6) {
      setAlerta({ msg : 'La contraseña debe de tener minimo 6 caracteres', error : true } )
      return
    }

    try {
      
      const url = `/veterinarios/olvide-password/${token}` ;
      const {data} =  await clienteAxios.post(url, {password}); 
      setAlerta({ msg : data.msg  })
      setPasswordModificado(true)

    } catch (error) {
      setAlerta({ msg : error.response.data.msg, error : true }); 
    }
  }


  const {msg} = alerta 
  return (
    <>
      <div>
        <h1 className="text-indigo-700 text-6xl font-black" > Restablece tu password y no pierdas tus <span className="text-black"> Pacientes  </span>   </h1>
      </div>
      
      <div className="mt-20 md:mt-5 shadow-xl px-5 py-2 rounded-xl bg-white">
        
        {msg &&  <Alerta 
          alerta =  {alerta}
        />}
        
        { tokenValido && (
          <>
            <form onSubmit={ handleSubmit }>
              
              <div className="mt-7" >
                <label className="uppercase text-gray-600 block text-xl font-bold"> Nueva Contraseña </label>
                <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="password" placeholder="Nueva Contraseña" value={password} onChange={ e => setPassword(e.target.value)}/>
              </div>

              <input type="submit" value="Guardar Nueva Contraseña" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
            
            </form>

            

          </>
        )}

        { passwordModificado && <Link to="/" className="block text-center text-gray-500 text-lg my-3">Inicia Sesion</Link> }
      </div>
    </>
  )
}

export default NuevoPassword
