import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";


function Login() {

  
  const [alerta, setAlerta] = useState({})
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  
  const { setAuth } =  useAuth()
  
  const handleSubmit = async(e) => {
    e.preventDefault()

    if ( [ email, password ].includes('')) {
      setAlerta({ msg : 'todos los campos son obligatorios', error : true }); 
      return
    }


    try {
     
      const { data } = await clienteAxios.post('veterinarios/login', {email, password});
      localStorage.setItem('token', data.token)
      
      setAuth( data )
      navigate('/admin')

      // console.log(data);

    } catch (error) {
      setAlerta({ msg : error.response.data.msg, error : true }); 
    }

  }

  
  const {msg} = alerta
  return (
    <>
      <div>
        <h1 className="text-indigo-700 text-6xl font-black" > Inicia Sesion y Administra tus <span className="text-black"> Pacientes  </span>   </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-xl px-5 py-2 rounded-xl bg-white">

        {msg && <Alerta
          alerta = {alerta}
        />}

        <form onSubmit={ handleSubmit } >
          <div className="mt-7" >
            <label className="uppercase text-gray-600 block text-xl font-bold"> Email </label>
            <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="email" placeholder="Email de Registro" value={email} onChange={ e => setEmail( e.target.value )} />
          </div>
          <div className="mt-7" >
            <label className="uppercase text-gray-600 block text-xl font-bold"> Password </label>
            <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="password" placeholder="Password" value={password} onChange={e => setPassword( e.target.value )}  />
          </div>
          <input type="submit" value="Iniciar Sesion" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
          
          <nav className="mt-7 lg:flex lg:justify-between">
            <Link to="/registrar" className="block text-center text-gray-500 text-lg my-3">Registrarse</Link>
            <Link to="/olvide-password" className="block text-center text-gray-500  text-lg my-3">Olvide mi Password</Link>

          </nav>
        </form>
      </div>
    </>
  )
}

export default Login 