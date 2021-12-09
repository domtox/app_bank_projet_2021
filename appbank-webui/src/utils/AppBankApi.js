// Fait le lien avec spring boot
import axios from 'axios'

// -- Axios

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

instance.interceptors.response.use(response => {
  return response
}, function (error) {
  return Promise.reject(error.response)
})

// -- Helper functions

// authorization: keycloak.idToken()

function bearerAuth (token) {
  return `Bearer ${token}`
}

/**
 *
 * From AccountController :
 *
 * 1- GET /api/accounts : get all accounts (admin only)
 *
 * 2- GET /api/accounts/email/{email} : get all accounts associate with this email (to protect)
 * 3- POST /api/accounts/email/{email} : add an account associate with this email (admin only)
 *
 * 4- GET /api/accounts/{accountid}   (param: accountid) : get account with its id (to protect)
 * 6- DELETE /api/accounts/{accountid} (param:accountid) : remove an account (admin only)
 * 
 * 7  7 POST retrait
 * 8 POST depot
 *
 * ----------------------------------------
 * From UserController :
 *
 * 7- GET /api/users : get all of users (admin only)
 * 8- PUT /api/users/synchronize/{email} :  Synchronize database of keycloak with our api for an user
 *
 * ----------------------------------------
 * From BankTransferController :
 * 9- POST /api/banktransfer : add a bank transfer that has to be validate by the admin
 */

const getAllAccounts = async (token) => {
  console.log('AppBankApi', 'getAllAccounts')
  try {
    const { status, data } = await instance.get('/api/accounts', {
      hearders: {
        'Content-type': 'application/json',
        Authorization: bearerAuth(token)
      }
    })
    if (status !== 200) { throw new Error(`Status is ${status}`) }
    return data
  } catch (e) {
    console.log('AppBankApi', 'getAllAccounts', 'error', e)
    return false
  }
}

const getAccountsFromEmail = async (email, token) => {
  console.log('AppBankApi', 'getAccountsFromEmail', email)
  try {
    const { status, data } = await instance.get(`/api/accounts/users/${email}`, {
      hearders: {
        'Content-type': 'application/json',
        Authorization: bearerAuth(token)
      }
    })
    if (status !== 200) { throw new Error(`Status is ${status}`) }
    return data
  } catch (e) {
    console.log('AppBankApi', 'getAccountsFromEmail', 'error', e)
    return false
  }
}

const addAccountFromEmail = async (email, token) => {
  console.log('AppBankApi', 'addAccountFromEmail', email)
  try {
    const { status, data } = await instance.post(`/api/accounts/users/${email}`, {
      hearders: {
        'Content-type': 'application/json',
        Authorization: bearerAuth(token)
      }
    })
    if (status !== 200) { throw new Error(`Status is ${status}`) }
    return data
  } catch (e) {
    console.log('AppBankApi', 'addAccountFromEmail', 'error', e)
    return false
  }
}

const getAccountFromAccountId = async (accountid) => {
  return instance.get(`/api/accounts/${accountid}`)
}

const depositAccount = async (accountid, depot, token) => {
  console.log('AppBankApi', 'depositAccount', accountid)
  try {
    const { status, data } = await instance.post(`/api/accounts/depot?accountId=${accountid}&deposit=${depot}`, {
      hearders: {
        'Content-type': 'application/json',
        Authorization: bearerAuth(token)
      }
    })
    if (status !== 200) {throw new Error(`Status is ${status}`) }
    return data
  } catch (e) {
    console.log('AppBankApi', 'depositaccount', 'error', e)
    return false
  }
}

const withdrawalAccount = async (accountid, retrait, token) => {
  console.log('AppBankApi', 'withdrawalAcount', accountid)
  try {
    const { status, data } = await instance.post(`/api/accounts/retrait?accountId=${accountid}&withdrawal=${retrait}`, {
      hearders: {
        'Content-type': 'application/json',
        Authorization: bearerAuth(token)
      }
    })
    if (status !== 200) {throw new Error(`Status is ${status}`) }
    return data
  } catch (e) {
    console.log('AppBankApi', 'withdrawalAccount', 'error', e)
    return false
  }
}

const removeAccountFromAccountId = async (accountid, token) => {
  return instance.delete(`/api/accounts/${accountid}`, {
    headers: { Authorization: bearerAuth(token) }
  })
}

const getAllUsers = async (token) => {
  console.log('AppBankApi', 'getAllUsers')
  try {
    const { status, data } = await instance.get('/api/users', {
      hearders: {
        'Content-type': 'application/json',
        Authorization: bearerAuth(token)
      }
    })
    if (status !== 200) { throw new Error(`Status is ${status}`) }
    return data
  } catch (e) {
    console.log('AppBankApi', 'getAllUsers', 'error', e)
    return false
  }
}

const synchronizeDatabaseWithKeycloak = async (email, isAdmin, token) => {
  console.log('AppBankApi', 'synchronizeDatabaseWithKeycloak', email)
  try {
    const { status, data } = await instance.put(`/api/users/synchronize?email=${email}&isAdmin=${isAdmin}`, {
      hearders: {
        'Content-type': 'application/json',
        Authorization: bearerAuth(token)
      }
    })
    if (status !== 200) { throw new Error(`Status is ${status}`) }
    return data
  } catch (e) {
    console.log('AppBankApi', 'synchronizeDatabaseWithKeycloak', 'error', e)
    return false
  }
}

const addBankTransfer = async (accountIdSrc, accountIdDst, amount, token) => {
  console.log('AppBankApi', 'addBankTransfer', amount)
  try {
    const { status, data } = await instance.post(`/api/banktransfer?accountIdSrc=${accountIdSrc}&accountIdDst=${accountIdDst}&amount=${amount}`, {
      hearders: {
        'Content-type': 'application/json',
        Authorization: bearerAuth(token)
      }
    })
    if (status !== 200) {throw new Error(`Status is ${status}`) }
    return data
  } catch (e) {
    console.log('AppBankApi', 'addBankTransfer', 'error', e)
    return false
  }
}

const getAllBankTransfers = async (token) => {
  console.log('AppBankApi', 'getAllBankTransfers')
  try {
    const { status, data } = await instance.get('/api/banktransfer', {
      hearders: {
        'Content-type': 'application/json',
        Authorization: bearerAuth(token)
      }
    })
    if (status !== 200) { throw new Error(`Status is ${status}`) }
    return data
  } catch (e) {
    console.log('AppBankApi', 'getAllBankTransfers', 'error', e)
    return false
  }
}

const validateBankTransfer = async (bankTransferId, validate, token) => {
  console.log('AppBankApi', 'validateBankTransfer')
  try {
    const { status, data } = await instance.delete(`/api/banktransfer/${bankTransferId}?validate=${validate}`, {
      hearders: {
        'Content-type': 'application/json',
        Authorization: bearerAuth(token)
      }
    })
    if (status !== 200) { throw new Error(`Status is ${status}`) }
    return data
  } catch (e) {
    console.log('AppBankApi', 'validateBankTransfer', 'error', e)
    return false
  }
}

const getAllBankTransfersFromUserid = async (userId, token) => {
  console.log('AppBankApi', 'getAlgetAllBankTransfersFromUseridlBankTransfers')
  try {
    const { status, data } = await instance.get(`/api/banktransfer/${userId}`, {
      hearders: {
        'Content-type': 'application/json',
        Authorization: bearerAuth(token)
      }
    })
    if (status !== 200) { throw new Error(`Status is ${status}`) }
    return data
  } catch (e) {
    console.log('AppBankApi', 'getAllBankTransfersFromUserid', 'error', e)
    return false
  }
}

export const appbankApi = {
  // From AccountController
  getAllAccounts, // 1

  getAccountsFromEmail, // 2
  addAccountFromEmail, // 3

  getAccountFromAccountId, // 4 //Pas sûre d'avoir besoin de ça...
  depositAccount, // 7
  withdrawalAccount ,
  removeAccountFromAccountId, // 6
  // -------------------------------------------
  // From UserController
  getAllUsers, // 7
  synchronizeDatabaseWithKeycloak, // 8
  //--------------------------------------------
  // From BankTransferController
  addBankTransfer, //9
  getAllBankTransfers, // 10
  validateBankTransfer, //11
  getAllBankTransfersFromUserid, //12

}
