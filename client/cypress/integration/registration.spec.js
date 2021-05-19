import { loginPage, registrationPage } from '../../src/constants/routes'
import {
  longPassword,
  longUsername, mismatchPassword,
  notFilled,
  shortPassword,
  shortUsername
} from '../../src/constants/validationMessages'
import { registerSuccess } from '../../src/constants/alerts'
import { setRegStatus } from '../../src/redux/authReducer/actions'
import { regStatuses } from '../../src/constants/values'

describe("Sign Up Errors", () => {
  afterEach(() => {
    cy.url().should('equal', `http://localhost:3000${registrationPage}`)
  })
  it("Check Not Filled Error", () => {
    cy.visit(registrationPage)
    cy.url().should('equal', `http://localhost:3000${registrationPage}`)
    cy.get('button[type="submit"]')
      .click()
    cy.get('.error').should('have.text', notFilled)
  })
  it("Check Username Errors", () => {
    cy.visit(registrationPage)
    cy.url().should('equal', `http://localhost:3000${registrationPage}`)

    cy.get('input[name="username"]')
      .type('123')
      .should('have.value', '123')

    cy.get('input[name="password"]')
      .type('123456')
      .should('have.value', '123456')

    cy.get('input[name="rpassword"]')
      .type('123456')
      .should('have.value', '123456')

    cy.get('button[type="submit"]')
      .click()

    cy.get('.error').should('have.text', shortUsername)

    cy.get('input[name="username"]')
      .type('45678910111213')
      .should('have.value', '12345678910111213')

    cy.get('button[type="submit"]')
      .click()

    cy.get('.error').should('have.text', longUsername)
  })
  it("Check Password Errors", () => {
    cy.visit(registrationPage)
    cy.url().should('equal', `http://localhost:3000${registrationPage}`)

    cy.get('input[name="username"]')
      .type('123456')
      .should('have.value', '123456')

    cy.get('input[name="password"]')
      .type('12345')
      .should('have.value', '12345')

    cy.get('input[name="rpassword"]')
      .type('12345')
      .should('have.value', '12345')

    cy.get('button[type="submit"]')
      .click()

    cy.get('.error').should('have.text', shortPassword)

    cy.get('input[name="rpassword"]')
      .type('6')
      .should('have.value', '123456')

    cy.get('input[name="password"]')
      .type('7')
      .should('have.value', '123457')

    cy.get('button[type="submit"]')
      .click()

    cy.get('.error').should('have.text', mismatchPassword)

    cy.visit(registrationPage)
    cy.url().should('equal', `http://localhost:3000${registrationPage}`)

    cy.get('input[name="username"]')
      .type('123456')
      .should('have.value', '123456')

    cy.get('input[name="password"]')
      .type('123123123123123123')
      .should('have.value', '123123123123123123')

    cy.get('input[name="rpassword"]')
      .type('123123123123123123')
      .should('have.value', '123123123123123123')

    cy.get('button[type="submit"]')
      .click()

    cy.get('.error').should('have.text', longPassword)
  })
})

describe("Sign Up Success", () => {
  it("Input Correct Data", () => {
    cy.visit(registrationPage)
    cy.url().should('equal', `http://localhost:3000${registrationPage}`)
    // in progress
  })
})