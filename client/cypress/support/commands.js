import 'cypress-localstorage-commands'
import { login } from '../../src/redux/authReducer/actions'
import { deleteBoard, putBoard } from '../../src/redux/boardReducer/actions'
import { updateListsLocal } from '../../src/redux/listReducer/actions'
import { updateItemsLocal } from '../../src/redux/itemReducer/actions'

Cypress.Commands.add('login', (name, pass) => {
  cy.window().its('store').invoke('dispatch', login(name, pass))
})

Cypress.Commands.add('createBoard', (testBoard, token) => {
  cy.window().its('store').invoke('dispatch', putBoard(testBoard, token))
})

Cypress.Commands.add('deleteBoard', (id, token) => {
  cy.window().its('store').invoke('dispatch', deleteBoard(id, token))
})

Cypress.Commands.add('putLists', (lists) => {
  cy.window().its('store').invoke('dispatch', updateListsLocal(lists))
})

Cypress.Commands.add('putItems', (items) => {
  cy.window().its('store').invoke('dispatch', updateItemsLocal(items))
})
