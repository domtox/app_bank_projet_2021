import React, { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'
import { useKeycloak } from '@react-keycloak/web'

import { appbankApi } from '../utils/AppBankApi'
import { userIdState, userLastSyncroState, userEmailState, userFirstNameState, userLastNameState, userIsAdminState } from '../states/AppState'

const Synchronizer = () => {
  const setUserId = useSetRecoilState(userIdState)
  const setUserEmail = useSetRecoilState(userEmailState)
  const setUserFirstName = useSetRecoilState(userFirstNameState)
  const setUserLastName = useSetRecoilState(userLastNameState)
  const setUserIsAdmin = useSetRecoilState(userIsAdminState)
  const setUserLastSyncro = useSetRecoilState(userLastSyncroState)

  const { keycloak } = useKeycloak()

  const synchronizeDatabaseWithKeycloak = useCallback(() => {
    const { authenticated = false } = keycloak
    console.log('Synchronizer', 'synchronizeDatabaseWithKeycloak()', 'authenticated', authenticated)

    if (authenticated === false) { return false }
    const { email, given_name: firstName, family_name: lastName } = keycloak.idTokenParsed
    const isAdmin = keycloak.hasRealmRole('appbank-admin')
    console.log('Synchronizer', 'synchronizeDatabaseWithKeycloak()', 'isAdmin', isAdmin)

    appbankApi.synchronizeDatabaseWithKeycloak(email, isAdmin).then(data => {
      if (data === false) {
        // try to do something in case of error
        return false
      }
      setUserId(data.id)
      setUserEmail(data.email)
      setUserFirstName(firstName)
      setUserLastName(lastName)
      setUserIsAdmin(isAdmin)
      const date = new Date().toLocaleString()
      setUserLastSyncro(date)
    })
  }, [keycloak, setUserLastSyncro, setUserId, setUserEmail, setUserFirstName, setUserLastName, setUserIsAdmin])

  synchronizeDatabaseWithKeycloak()

  return (<></>)
}

export default Synchronizer
