Cypress.Commands.add('creerUtilisateur', ({ username, name, password }) => {
  cy.request('POST', 'http://localhost:3001/api/users', { username, name, password })
})

Cypress.Commands.add('connexion', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', { username, password })
    .then(({ body }) => {
      localStorage.setItem('utilisateurBlogapp', JSON.stringify(body))
    })
})