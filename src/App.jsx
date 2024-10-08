import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import RutaProtegida from './layout/RutaProtegida'

import Login from './pages/Login'
import Registrar from './pages/Registrar'
import ConfirmarCuenta from './pages/ConfirmarCuenta'
import OlvidePassword from './pages/OlvidePassword'
import NuevoPassword from './pages/NuevoPassword'
import AdministrarPacientes from './pages/AdministrarPacientes'
import CambiarPassword from './pages/CambiarPassword'
import EditarPerfil from './pages/EditarPerfil'

import { AuthProvider } from './context/AuthProviders'
import {PacientesProvider} from './context/PacientesProvider'


function App() {

  return (
    <>
     <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element= {<Login />} />
              <Route path='registrar' element={ <Registrar /> } />
              <Route path='olvide-password/:token' element={ <NuevoPassword /> } />
              <Route path='olvide-password' element={ <OlvidePassword /> } />
              <Route path='confirmar/:id' element={ <ConfirmarCuenta/> } />
            </Route>

            <Route path='/admin' element={ <RutaProtegida/> }> 
              <Route index element={ <AdministrarPacientes/> } />
              <Route path='perfil' element={ <EditarPerfil/> } />
              <Route path='cambiar-password' element={ <CambiarPassword/> } />

            </Route>

          </Routes>
        </PacientesProvider>
      </AuthProvider>
     </BrowserRouter>
    </>
  )
}

export default App 
