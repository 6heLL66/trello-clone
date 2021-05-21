import { colors } from '../../src/constants/colors'
import { putBoard } from '../../src/redux/boardReducer/actions'
import { login } from '../../src/redux/authReducer/actions'
import { boardPage, loginPage } from '../../src/constants/routes'

const testBoard = {
  id: 'qwerty',
  name: 'cypressBoard',
  color: 'blue'
}

describe('Board Check', () => {
  afterEach(() => {
    cy.saveLocalStorage()
  })
  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  it('Login and Create Test Board', () => {
    cy.visit(loginPage)
    cy.intercept('/api/board/createOrChange').as('createBoard')
    cy.intercept('/api/auth/auth').as('auth')
    cy.window().its('store').invoke('dispatch', login('test_user', '123456'))
    cy.wait('@auth')
    cy.getLocalStorage('auth').then((auth) => {
      let token = JSON.parse(auth).token
      cy.window().its('store').invoke('dispatch', putBoard(testBoard, token))
    })
    cy.wait('@createBoard')
    cy.visit(`${boardPage}/${testBoard.id}`)
    cy.url().should(
      'equal',
      `http://localhost:3000${boardPage}/${testBoard.id}`
    )
  })
  it('Border Props Check', () => {
    cy.get('.board-name')
    cy.get('.board-name > div > span')
      .should('have.css', 'color', colors[testBoard.color])
      .and('have.text', testBoard.name)
    cy.get('.list-create-button').should(
      'have.css',
      'background-color',
      colors[testBoard.color]
    )
  })
  it('List functional', () => {
    cy.intercept('/api/lists/put').as('putList')
    cy.intercept('/api/list/delete*').as('delList')
    cy.get('.list-create-button').click()
    cy.wait('@putList')
    cy.get('input[name="item"]').should('have.disabled', true)
    cy.get('input[name="list"]')
      .type('test list 1')
      .should('have.value', 'test list 1')
      .type('{enter}')
      .should('not.exist')
    cy.wait('@putList')
    cy.get('.list-card > .head > div > span').should('have.text', 'test list 1')
    cy.get('input[name="item"]')
      .type('test task')
      .should('have.value', 'test task')
      .type('{enter}')
      .should('have.value', '')
    cy.get('.list-card:first-child > .head > div > svg').click()
    cy.wait('@delList')
  })
})
