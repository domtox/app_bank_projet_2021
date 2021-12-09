import React from 'react'
import { useLocation, BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web'
import Keycloak from 'keycloak-js'

import Homepage from './pages/Homepage'
import UserAccounts from './pages/UserAccounts'
import UserTransfers from './pages/UserTransfers'

function RequireAuth ({ children }) {
  const { keycloak } = useKeycloak()
  const location = useLocation()
  const isAuthenticated = keycloak.authenticated

  if (!isAuthenticated) {
    return <Navigate to='/' state={{ from: location }} />
  }

  return children
}

const App = () => {
  const keycloak = new Keycloak({
    url: 'http://localhost:8000/auth', // KEYCLOAK URL
    realm: 'appbank',
    clientId: 'react-app'
  })

  const handleOnEvent = async (event, error) => {
    console.log('App', 'Keycloak handleOnEvent', event)
  }

  return (
    <ReactKeycloakProvider authClient={keycloak} onEvent={(event, error) => handleOnEvent(event, error)}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/espace-client/comptes' element={<RequireAuth><UserAccounts /></RequireAuth>} />
          <Route path='/espace-client/virements' element={<RequireAuth><UserTransfers /></RequireAuth>} />
        </Routes>
      </BrowserRouter>
    </ReactKeycloakProvider>
  )
}

export default App
