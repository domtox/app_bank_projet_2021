import React, { useCallback, useState } from 'react'
import { 
  Card, 
  Modal,
  Dropdown, 
  Header, 
  Container, 
  Icon, 
  Form,
  Dimmer, 
  Loader, 
  Button 
} from 'semantic-ui-react'
import { useKeycloak } from '@react-keycloak/web'
import { useRecoilValue } from 'recoil'

import TopMenu from '../components/TopMenu'
import {
  adminUsersState,
  adminAccountsState,
  userIsAdminState,
  userAccountsState,
  userEmailState
} from '../states/AppState'
import { appbankApi } from '../utils/AppBankApi'
import Keycloak from 'keycloak-js'

const AdminListUsers = () => {
  const users = useRecoilValue(adminUsersState)
  const [currentUser, setCurrentUser] = useState(false)

  const data = []
  users.map(user => {
    data.push({
      key: `userId_${user.id}`,
      text: user.email,
      value: user.email
    })
    return true
  })

  const addAccountFromEmail = useCallback(() => {
    console.log('AdminListUsers', 'addAccountFromEmail()', currentUser)
    appbankApi.addAccountFromEmail(currentUser).then(data => {
      if (data === false) {
        // try to do something in case of error
        return false
      }
      console.log('HomePage', 'addAccountFromEmail()', currentUser, data)
    })
  }, [currentUser])

  const handleChangeCurrentUser = (e, data) => {
    console.log('AdminListUsers', 'handleChangeCurrentUser()', data.value)
    setCurrentUser(data.value)
  }
  

  return (
    <>
    <Card fluid color='blue'>
      <Card.Content header='Quel utilisateur choisir pour ajouter un compte ?' />
      <Card.Content>
        <Dropdown onChange={handleChangeCurrentUser} placeholder='Sélectionner un utilisateur' fluid selection options={data} />
      </Card.Content>
      <Card.Content extra>
        <Button onClick={addAccountFromEmail} disabled={currentUser === false} color='blue'>Ajouter</Button>
      </Card.Content>
    </Card>
    </>
  )
}

const AdminAccountsCard = () => {
  const allAccounts = appbankApi.getAllAccounts()
  return (
    <Card.Group>
  
      {allAccounts.map(account => {
        return (
          <Card color='blue' key={`accountId_${account.id}`}>

            <Card.Content>
              <Card.Header>Compte n°{account.id}</Card.Header>
              <Card.Meta>Propriétaire: Toto</Card.Meta>
              <Card.Description>
                <strong>Solde :</strong> ${account.solde}€<br />
                <strong>Autorisation de découvert :</strong> Non
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <DepositModal accountId={account.id} accountSolde={account.solde} />
              <WithdrawalModal accountId={account.id} /> 
            </Card.Content> 
            

          </Card>
        )
      })}
    </Card.Group>
    
  )
}

const DepositModal = (props) => {
  const { accountId, accountSolde } = props
  const [open, setOpen] = useState();
  const [amount,setAmount] = useState(false)

  const confirmation = () => {
    console.log('confirmation')
    appbankApi.depositAccount(accountId, amount).then(data => {
      if (data === false) {
        return false
      }
    }) //Ajout 100 euros
    setOpen(false)
  }
  
  return(
  <Modal
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    trigger={<Button color='black'>Déposer</Button>}
  >
    <Modal.Header>Compte n° : {accountId} Dépot</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header>Solde actuel : {accountSolde} </Header>
        <Form>
          <header>Insérer le montant à déposer</header>
          <Form.Input type='number' as='input' value={amount} onChange={e => setAmount(e.target.value)} min="0" step="1" ></Form.Input> 
        </Form>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button color='black' onClick={() => setOpen(false)} content="Annuler" />
      <Button
        content="Confirmer"
        labelPosition='right'
        icon='checkmark'
        onClick={confirmation}
        positive
      />
      </Modal.Actions>
    </Modal>
    )
  }

  const WithdrawalModal = (props) => {
    const { accountId, accountSolde } = props
    const [open, setOpen] = useState();
    const [amount,setAmount] = useState(false)
  
    const confirmation = () => {
      console.log('WithdrawalModal', 'confirmation')
      appbankApi.withdrawalAccount(accountId, amount).then(data => {
        if (data === false) {
          return false
        }
        console.log('WithdrawalModal', 'confirmation', data)
      }) //Ajout 100 euros
      
      setOpen(false)
    }
    
    return(
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color='teal'>Retirer</Button>}
    >
      <Modal.Header>Compte n°  {accountId} : Retrait</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Header>Solde actuel : {accountSolde} </Header>
          <Form>
            <header>Insérer le montant à retirer</header>
            <Form.Input type='number' as='input' value={amount} onChange={e => setAmount(e.target.value)} min="0" step="1" ></Form.Input> 
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)} content="Annuler" />
        <Button
          content="Confirmer"
          labelPosition='right'
          icon='checkmark'
          onClick={confirmation}
          positive
        />
        </Modal.Actions>
      </Modal>
      )
    }


const AccountsCard = () => {
  const userEmail = useRecoilValue(userEmailState)
  const userAccounts = useRecoilValue(userAccountsState)
  // const [currentAccount, setCurrentAccount] = useState(false)

  const accounts = []
  userAccounts.map(account => {
    accounts.push({
      key: `accountId_${account.id}`,
      text: account.id,
      value: account.id
    })
    return true
  })

  return (
    <Card.Group>
  
      {userAccounts.map(account => {
        return (
          <Card color='blue' key={`accountId_${account.id}`}>

            <Card.Content>
              <Card.Header>Compte n°{account.id}</Card.Header>
              <Card.Meta>Propriétaire: {userEmail}</Card.Meta>
              <Card.Description>
                <strong>Solde :</strong> {account.solde}€<br />
                <strong>Autorisation de découvert :</strong> Non
              </Card.Description>
            </Card.Content>

            
            <Card.Content extra>
              <DepositModal accountId={account.id} accountSolde={account.solde} />
              <WithdrawalModal accountId={account.id} /> 
            </Card.Content> 
            

          </Card>
        )
      })}
    </Card.Group>
    
  )
}


const UserAccounts = () => {
  const userIsAdmin = useRecoilValue(userIsAdminState)
  const { initialized } = useKeycloak()

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
      <TopMenu />
     
      <Header as='h1' block style={{ marginTop: '100px' }}>
        <Icon name='print' />
        <Header.Content>
          UserAccounts
          <Header.Subheader>Nothing to do...</Header.Subheader>
        </Header.Content>
      </Header>
      {userIsAdmin &&
        <>
        <AdminListUsers />
        {/*<AdminAccountsCard />*/}
        </> }
      {!userIsAdmin &&
        <AccountsCard />}
        
    </Container>
  )
}

export default UserAccounts
