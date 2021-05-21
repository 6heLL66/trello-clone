import {
  boardPage,
  boardsPage,
  loginPage,
  registrationPage
} from '../../src/constants/routes'

describe('Guest routing', () => {
  it('Visit login page', () => {
    cy.visit(loginPage)
    cy.url().should('equal', `http://localhost:3000${loginPage}`)
  })
  it('Visit registration page', () => {
    cy.visit(registrationPage)
    cy.url().should('equal', `http://localhost:3000${registrationPage}`)
  })
  it('Visit boards page', () => {
    cy.visit(boardsPage)
    cy.url().should('equal', `http://localhost:3000${loginPage}`)
  })
  it('Visit board page', () => {
    // default
    cy.visit(boardPage)
    cy.url().should('equal', `http://localhost:3000${loginPage}`)
    // with param
    cy.visit(`${boardPage}?id=asolkc`)
    cy.url().should('equal', `http://localhost:3000${loginPage}`)
  })
  it('Visit not existed page', () => {
    cy.visit('/notExist')
    cy.url().should('equal', `http://localhost:3000${loginPage}`)
  })
})

describe('Sign In', () => {
  it('Go to Login Page', () => {
    cy.visit(loginPage)
    cy.url().should('equal', `http://localhost:3000${loginPage}`)
  })
  it('Input username', () => {
    cy.get('input[name="username"]')
      .type('test_user')
      .should('have.value', 'test_user')
  })
  it('Input Password', () => {
    cy.get('input[name="password"]')
      .type('123456')
      .should('have.value', '123456')
  })
  it('Click Submit Button', () => {
    cy.get('button[type="submit"]').click()
    cy.url().should('equal', `http://localhost:3000${boardsPage}`)
    cy.saveLocalStorage()
  })
  it('Check localStorage', () => {
    cy.restoreLocalStorage()
    cy.getLocalStorage('auth').should('exist')
  })
})

describe('User routing', () => {
  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  it('Visit login page', () => {
    cy.visit(loginPage)
    cy.url().should('equal', `http://localhost:3000${boardsPage}`)
  })
  it('Visit registration page', () => {
    cy.visit(registrationPage)
    cy.url().should('equal', `http://localhost:3000${boardsPage}`)
  })
  it('Visit boards page', () => {
    cy.visit(boardsPage)
    cy.url().should('equal', `http://localhost:3000${boardsPage}`)
  })
  it('Visit board page', () => {
    // default
    cy.visit(boardPage)
    cy.url().should('equal', `http://localhost:3000${boardsPage}`)
    // with param
    cy.visit(`${boardPage}/id`)
    cy.url().should('equal', `http://localhost:3000${boardPage}/id`)
  })
  it('Visit not existed page', () => {
    cy.visit('notExist')
    cy.url().should('equal', `http://localhost:3000${boardsPage}`)
  })
})

describe('Logout', () => {
  it('Click Logout', () => {
    cy.contains('Logout').click()
    cy.url().should('equal', `http://localhost:3000${loginPage}`)
  })
})
