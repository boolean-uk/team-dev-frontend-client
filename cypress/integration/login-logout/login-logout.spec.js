describe('User Login Logout', () => {
  describe('a valid user', () => {
    beforeEach(() => {
      cy.intercept('POST', 'http://localhost:4000/users', {
        fixture: 'registration/valid-user.json'
      }).as('register')
      cy.intercept('POST', 'http://localhost:4000/login', {
        fixture: 'login-logout/valid-user.json'
      }).as('login')
      cy.intercept('GET', 'http://localhost:4000/posts', {
        fixture: 'posts/valid-posts.json'
      }).as('getPosts')
      cy.visit('/')
    })

    it('can login a user and be redirected to the posts page', () => {
      cy.get('#user-registration-link').click()
      cy.url().should('eq', `${Cypress.config('baseUrl')}/signup`)

      cy.get('input[name=firstName]').type('Edward')
      cy.get('input[name=lastName]').type('Withers')
      cy.get('input[name=email]').type('test@test.com')
      cy.get('input[name=password]').type('test12')
      cy.get('input[name=biography]').type('a long bio')
      cy.get('input[name=githubUrl]').type('https://github.com/dearshrewdwit')
      cy.get('#user-submit-button').click()

      cy.get('#user-login-link').click()
      cy.url().should('eq', `${Cypress.config('baseUrl')}/`)

      cy.get('input[name=email]').type('test@test.com')
      cy.get('input[name=password]').type('test12')
      cy.get('#user-submit-button').click()

      cy.url().should('eq', `${Cypress.config('baseUrl')}/posts`)
    })

    it('can log out after login', () => {
      cy.get('#user-registration-link').click()
      cy.url().should('eq', `${Cypress.config('baseUrl')}/signup`)

      cy.get('input[name=firstName]').type('Edward')
      cy.get('input[name=lastName]').type('Withers')
      cy.get('input[name=email]').type('test@test.com')
      cy.get('input[name=password]').type('test12')
      cy.get('input[name=biography]').type('a long bio')
      cy.get('input[name=githubUrl]').type('https://github.com/dearshrewdwit')
      cy.get('#user-submit-button').click()

      cy.get('#user-login-link').click()
      cy.wait('@register')
      cy.url().should('eq', `${Cypress.config('baseUrl')}/`)

      cy.get('input[name=email]').type('test@test.com')
      cy.get('input[name=password]').type('test12')
      cy.get('#user-submit-button').click()
      cy.wait('@login')

      cy.url().should('eq', `${Cypress.config('baseUrl')}/posts`)
      cy.wait('@getPosts')
      cy.get('#user-signout-button').click()
      cy.url().should('eq', `${Cypress.config('baseUrl')}/`)
    })
  })
})
