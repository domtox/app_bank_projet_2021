import { atom } from 'recoil'

const userIsAdminState = atom({
  key: 'userIsAdminState',
  default: false
})

const userIdState = atom({
  key: 'userIdState',
  default: false
})

const userEmailState = atom({
  key: 'userEmailState',
  default: false
})

const userFirstNameState = atom({
  key: 'userFirstNameState',
  default: false
})

const userLastNameState = atom({
  key: 'userLastNameState',
  default: false
})

const userLastSyncroState = atom({
  key: 'userLastSyncroState',
  default: false
})

const userAccountsState = atom({
  key: 'userAccountsState',
  default: []
})

const adminUsersState = atom({
  key: 'adminUsersState',
  default: []
})

const adminAccountsState = atom({
  key: 'adminAccountsState',
  default: []
})

const bankTransfersState = atom({
  key: 'bankTransfersState',
  default: []
})

const allAccountsState = atom({
  key: 'allAccountsState',
  default: []
})

export {
  userIsAdminState,
  userLastSyncroState,
  userIdState,
  userEmailState,
  userLastNameState,
  userFirstNameState,
  userAccountsState,
  adminUsersState,
  adminAccountsState,
  bankTransfersState,
  allAccountsState
}
