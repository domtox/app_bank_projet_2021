import React, { useCallback } from 'react'
import { Header, Container, Icon, Dimmer, Loader, Card, Image } from 'semantic-ui-react'
import { useKeycloak } from '@react-keycloak/web'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import TopMenu from '../components/TopMenu'
import Synchronizer from '../components/Synchronizer'
import { appbankApi } from '../utils/AppBankApi'
import {
  adminAccountsState,
  adminUsersState,
  userIsAdminState,
  userIdState,
  userLastSyncroState,
  userEmailState,
  userFirstNameState,
  userLastNameState,
  userAccountsState,
  allAccountsState
} from '../states/AppState'

const UserCard = () => {
  const userId = useRecoilValue(userIdState)
  const userEmail = useRecoilValue(userEmailState)
  const userFirstName = useRecoilValue(userFirstNameState)
  const userLastName = useRecoilValue(userLastNameState)
  const userLastSyncro = useRecoilValue(userLastSyncroState)
  const userIsAdmin = useRecoilValue(userIsAdminState)
  const adminUsers = useRecoilValue(adminUsersState)
  const adminAccounts = useRecoilValue(adminAccountsState)
  const userAccounts = useRecoilValue(userAccountsState)

  const avatar = !userIsAdmin ? 'https://react.semantic-ui.com/images/avatar/large/matthew.png' : 'https://react.semantic-ui.com/images/avatar/large/elliot.jpg'

  return (
    <Card>
      <Image src={avatar} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{userFirstName} {userLastName}</Card.Header>
        <Card.Meta>
          <span className='date'>Synchro: {userLastSyncro}</span>
        </Card.Meta>
        <Card.Description>
          <strong>Id :</strong> {userId}<br />
          <strong>Email :</strong> {userEmail}
        </Card.Description>
      </Card.Content>
      {userIsAdmin &&
        <Card.Content extra>
          <Icon name='user' />
          {adminUsers.length} utilisateurs
          <Icon name='print' style={{ marginLeft: '5px' }} />
          {adminAccounts.length} comptes
        </Card.Content>}
      {!userIsAdmin &&
        <Card.Content extra>
          <Icon name='print' />
          {userAccounts.length} comptes
        </Card.Content>}
    </Card>
  )
}

const HomePage = () => {
  const userIsAdmin = useRecoilValue(userIsAdminState)
  const setAdminUsersState = useSetRecoilState(adminUsersState)
  const setAdminAccountsState = useSetRecoilState(adminAccountsState)
  const setUserAccountsState = useSetRecoilState(userAccountsState)
  const setAllAccounts = useSetRecoilState(allAccountsState)
  const userEmail = useRecoilValue(userEmailState)
  const { keycloak, initialized } = useKeycloak()

  const getAllUsers = useCallback(() => {
    const { authenticated = false } = keycloak
    console.log('HomePage', 'getAllUsers()', 'authenticated', authenticated)
    appbankApi.getAllUsers().then(data => {
      if (data === false) {
        // try to do something in case of error
        return false
      }
      console.log('HomePage', 'getAllUsers()', 'users', data.length)
      setAdminUsersState(data)
    })
  }, [keycloak, setAdminUsersState])

  const getAllAccounts = useCallback(() => {
    const { authenticated = false } = keycloak
    console.log('HomePage', 'getAllAccounts()', 'authenticated', authenticated)
    appbankApi.getAllAccounts().then(data => {
      if (data === false) {
        // try to do something in case of error
        return false
      }
      console.log('HomePage', 'getAllAccounts()', 'accounts', data.length)
      setAdminAccountsState(data)
      setAllAccounts(data)
    })
  }, [keycloak, setAdminAccountsState])

  const getAccountsFromEmail = useCallback(() => {
    const { authenticated = false } = keycloak
    console.log('HomePage', 'getAccountsFromEmail()', 'authenticated', authenticated)
    appbankApi.getAccountsFromEmail(userEmail).then(data => {
      if (data === false) {
        // try to do something in case of error
        return false
      }
      console.log('HomePage', 'getAllgetAccountsFromEmailAccouts()', 'accounts', data.length)
      setUserAccountsState(data)
    })
  }, [keycloak, setUserAccountsState, userEmail])

  if (userIsAdmin) {
    getAllUsers()
    getAllAccounts()
  }

  if (!userIsAdmin && userEmail !== false) {
    getAccountsFromEmail()
    getAllAccounts()
  }

  if (!initialized) {
    return (
      <Container>
        <Dimmer active>
          <Loader content='Loading' />
        </Dimmer>
      </Container>
    )
  }

  return (
    <Container>
      <Synchronizer />
      <TopMenu />
      <Header as='h1' block style={{ marginTop: '100px' }}>
        <Icon name='home' />
        <Header.Content>
          HomePage
          <Header.Subheader>Nothing to do...</Header.Subheader>
        </Header.Content>
      </Header>
      {keycloak.authenticated &&
        <UserCard />}
    </Container>
  )
}

export default HomePage
