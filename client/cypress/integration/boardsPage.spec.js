import { login } from '../../src/redux/authReducer/actions'
import { boardsPage, loginPage } from '../../src/constants/routes'
import { colors, usableColors } from '../../src/constants/colors'
import { animBorder, animInterval, animStep } from '../../src/constants/values'

describe('Boards Tests', () => {
  it('Login and Visit Boards Page', () => {
    cy.server()
    cy.visit(loginPage)
    cy.window().its('store').invoke('dispatch', login('test_user', '123456'))

    cy.getLocalStorage('auth').should('exist')

    cy.intercept('/api/boards/get*').as('receiveBoards')
    cy.intercept('/api/board/createOrChange').as('createBoard')
    cy.intercept('/api/board/delete*').as('deleteBoard')

    cy.visit(boardsPage)
    cy.url().should('equal', `http://localhost:3000${boardsPage}`)

    cy.wait('@receiveBoards')
    cy.get('.board-button:first-child').click()

    cy.get('.board-create-form').should('exist')

    cy.get('.board-create-form > div > svg').click()

    cy.get('.board-create-form').should('not.exist')

    cy.get('.board-button:first-child').click()

    cy.get('#board_name').type('test_board').should('have.value', 'test_board')

    cy.get('.board-create-form > div > button').click()
    cy.wait('@createBoard')

    cy.contains('test_board').should('exist')

    for (let i = 0; i < usableColors.length; i++) {
      cy.get('.board-button:last-child').trigger('mouseover')
      cy.wait((animBorder.high / animStep) * animInterval)
      cy.get(
        `.board-button:last-child > div:first-child > .colors > .color-box:nth-child(${
          i + 1
        })`
      ).click()
      cy.get('.board-button:last-child').should(
        'have.css',
        'background-color',
        colors[usableColors[i]]
      )
      cy.wait('@createBoard')
      cy.get('.board-button:last-child').trigger('mouseout')
      cy.wait((animBorder.high / animStep) * animInterval)
    }

    cy.get('.board-button:last-child > div > svg').click()
    cy.wait('@deleteBoard')

    cy.contains('test_board').should('not.exist')
  })
})
