import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

function Registrar() {


  const [ nombre, setNombre ] = useState(''); 
  const [ email, setEmail ] = useState(''); 
  const [ password, setPassword ] = useState(''); 
  const [ repetirPassword, setRepetirPassword ] = useState(''); 
  const [ alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // console.log('Desde la funcion Submit');

    if ([nombre, email, password, repetirPassword].includes('')) {
      //console.log('hay campos vacios');
      setAlerta({ msg: 'Hay campos vacios', error: true  });
      return 
    }
    if (password !== repetirPassword) {
      //console.log('los password no son iguales');
      setAlerta({ msg: 'Los password no son iguales', error: true  });
      return 
    }
    if (password.length < 6) {
      //console.log('el password es muy corto, minimo 6 caracteres');
      setAlerta({ msg: 'El password es muy corto, minimo 6 caracteres', error: true  }); 

      return 
    }

    setAlerta({})

    //conectar con el backend o la api a como querras decirle 
    try {
      await clienteAxios.post('/veterinarios', {nombre, email, password}); 
      setAlerta({ msg : 'usuario creado, revisa tu email' })
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true })
      console.log(error.response);
    }
  }

  const {msg} = alerta;
  
  return (
    <> 
        
      <div>
        <h1 className="text-indigo-700 text-6xl font-black" > Inicia Sesion y Administra tus <span className="text-black"> Pacientes  </span>   </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-xl px-5 py-2 rounded-xl bg-white">

        {msg &&  <Alerta 
          alerta =  {alerta}
        />}

        <form onSubmit={ handleSubmit }>
          <div className="mt-7" >
            <label className="uppercase text-gray-600 block text-xl font-bold"> Nombre </label>
            <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="text" placeholder="Nombre de usuario" value={nombre} onChange={ e => setNombre( e.target.value )} />
          </div>

          <div className="mt-7" >
            <label className="uppercase text-gray-600 block text-xl font-bold"> Email </label>
            <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="email" placeholder="Email de Registro" value={email} onChange={ e => setEmail(e.target.value)} />
          </div>

          <div className="mt-7" >
            <label className="uppercase text-gray-600 block text-xl font-bold"> Contraseña </label>
            <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="password" placeholder="Contraseña" value={password} onChange={ e => setPassword(e.target.value)}/>
          </div>

          <div className="mt-7" >
            <label className="uppercase text-gray-600 block text-xl font-bold"> Reperir Contraseña </label>
            <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="password" placeholder="Reperir Contraseña" value={repetirPassword} onChange={ e => setRepetirPassword(e.target.value)} />
          </div>

          <input type="submit" value="Crear Cuenta" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
          
          <nav className="mt-7 lg:flex lg:justify-between">
            <Link to="/" className="block text-center text-gray-500 text-lg my-3">Inicia Sesion</Link>
            <Link to="/olvide-password" className="block text-center text-gray-500  text-lg my-3">Olvide mi Password</Link>

          </nav>
        </form>
      </div>


    </>
  )
}

export default Registrar