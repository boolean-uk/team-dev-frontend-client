describe('User Registration', () => {
  describe("a valid user", () => {
    beforeEach(() => {
      cy.intercept('POST', 'http://localhost:4000/users', { fixture: 'registration/valid-user.json' })
      cy.visit('/')
    })

    it('can register a user', () => {
      cy.get('#user-registration-link').click()
      cy.url().should('eq', `${Cypress.config('baseUrl')}/signup`)

      cy.get('input[name=firstName]').type('Edward')
      cy.get('input[name=lastName]').type('Withers')
      cy.get('input[name=email]').type('test@test.com')
      cy.get('input[name=password]').type('test12')
      cy.get('input[name=biography]').type('a long bio')
      cy.get('input[name=githubUrl]').type('https://github.com/dearshrewdwit/')
      cy.get('#user-submit-button').click()
    })
  })
})
