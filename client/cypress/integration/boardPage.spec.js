import { colors } from '../../src/constants/colors'
import { boardPage, boardsPage, loginPage } from '../../src/constants/routes'
import { listIdPrefix } from '../../src/constants/values'

const testBoard = {
  id: 'qwerty',
  name: 'cypressBoard',
  color: 'blue'
}

const keys = {
  space: 32,
  arrowRight: 39,
  arrowLeft: 37,
  arrowDown: 40,
  arrowTop: 38
}

const dndId = 'data-rbd-drag-handle-draggable-id'

// generate lists for dnd test
const dndLists = []
const dndListsCount = 3
for (let i = 0; i < dndListsCount; i++) {
  dndLists.push({
    name: `list${i + 1}`,
    id: `list${i + 1}`,
    parentId: testBoard.id,
    ind: i
  })
}

// generate items for dnd test
const dndItems = []
const itemsCount = 3
for (let i = 0; i < dndListsCount; i++) {
  for (let j = 0; j < itemsCount; j++) {
    dndItems.push({
      name: `item${j}`,
      id: `item${10 * i + j}`,
      parentId: dndLists[i].id,
      isDone: 0,
      ind: j
    })
  }
}

describe('Board Check', () => {
  before(() => {
    cy.visit(loginPage)
    cy.intercept('/api/auth/auth').as('auth')
    cy.login('test_user', '123456')
    cy.wait('@auth')
    cy.saveLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
  })
  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  it('Login and Create Test Board', () => {
    cy.intercept('/api/board/createOrChange').as('createBoard')
    cy.getLocalStorage('auth').then((auth) => {
      return cy.createBoard(testBoard, JSON.parse(auth).token)
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
    cy.intercept('/api/items/put*').as('putItem')
    cy.intercept('/api/item/delete*').as('delItem')

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
    cy.wait('@putItem')

    cy.get('.list-item').should('exist')
    cy.get('.list-item > span > input').click()
    cy.wait('@putItem')

    cy.get('.list-item').should('have.class', 'done')
    cy.get('.list-item > span > input').click()
    cy.wait('@putItem')

    cy.get('.list-item').should('not.have.class', 'done')
    cy.get('.list-item > svg').click()
    cy.wait('@delItem')

    cy.get('.list-card:first-child > .head > div > svg').click()
    cy.wait('@delList')

    cy.get('.list-card').should('not.exist')
  })
  it('Test Lists Drag And Drop', () => {
    cy.putLists(dndLists)
    cy.get(`.head[${dndId}="${listIdPrefix + '-' + dndLists[0].id}"]`)
      .trigger('keydown', { keyCode: keys.space })
      .trigger('keydown', { keyCode: keys.arrowRight, force: true })
      .trigger('keydown', { keyCode: keys.space, force: true })

    cy.get(`#${testBoard.id}`)
      .find(`.list-card:first > .head`)
      .should(`have.attr`, dndId, listIdPrefix + '-' + dndLists[1].id)

    cy.get(`#${testBoard.id}`)
      .find(`.list-card:nth(1) > .head`)
      .should(`have.attr`, dndId, listIdPrefix + '-' + dndLists[0].id)

    cy.get(`.head[${dndId}="${listIdPrefix + '-' + dndLists[2].id}"]`)
      .trigger('keydown', { keyCode: keys.space })
      .trigger('keydown', { keyCode: keys.arrowLeft, force: true })
      .trigger('keydown', { keyCode: keys.space, force: true })

    cy.get(`#${testBoard.id}`)
      .find(`.list-card:nth(1) > .head`)
      .should(`have.attr`, dndId, listIdPrefix + '-' + dndLists[2].id)

    cy.get(`#${testBoard.id}`)
      .find(`.list-card:nth(2) > .head`)
      .should(`have.attr`, dndId, listIdPrefix + '-' + dndLists[0].id)
  })
  it('Test Items Drag And Drop', () => {
    cy.putLists(dndLists)
    cy.putItems(dndItems)
    cy.get(`.list-item[${dndId}='${dndItems[0].id}']`)
      .trigger('keydown', { keyCode: keys.space })
      .trigger('keydown', { keyCode: keys.arrowDown, force: true })
      .trigger('keydown', { keyCode: keys.space, force: true })

    cy.get(
      '.list-card:first > .card-body > .list-group > .list-item:nth(0)'
    ).should('have.attr', dndId, 'item1')

    cy.get(
      '.list-card:first > .card-body > .list-group > .list-item:nth(1)'
    ).should('have.attr', dndId, 'item0')

    cy.get(`.list-item[${dndId}='${dndItems[0].id}']`)
      .trigger('keydown', { keyCode: keys.space })
      .trigger('keydown', { keyCode: keys.arrowDown, force: true })
      .trigger('keydown', { keyCode: keys.space, force: true })

    cy.get(
      '.list-card:first > .card-body > .list-group > .list-item:nth(1)'
    ).should('have.attr', dndId, 'item2')

    cy.get(
      '.list-card:first > .card-body > .list-group > .list-item:nth(2)'
    ).should('have.attr', dndId, 'item0')
  })
  it('Delete Test Board', () => {
    cy.intercept('/api/board/delete*').as('delBoard')
    cy.visit(boardsPage)
    cy.getLocalStorage('auth').then((auth) => {
      return cy.deleteBoard(testBoard.id, JSON.parse(auth).token)
    })
    cy.wait('@delBoard')
    cy.visit(boardsPage)
  })
})
