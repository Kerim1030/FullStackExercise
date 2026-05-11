describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.creerUtilisateur({ username: 'kerim', name: 'Kerim', password: 'motdepasse' })
    cy.visit('http://localhost:5173')
  })

  it('le formulaire de connexion est affiché par défaut', function() {
    cy.contains('Se connecter')
    cy.get('input').should('exist')
    cy.contains('se connecter')
  })

  describe('Connexion', function() {
    it('réussit avec les bons identifiants', function() {
      cy.get('input').first().type('kerim')
      cy.get('input').last().type('motdepasse')
      cy.contains('se connecter').click()
      cy.contains('Kerim connecté')
    })

    it('échoue avec un mauvais mot de passe', function() {
      cy.get('input').first().type('kerim')
      cy.get('input').last().type('mauvaismdp')
      cy.contains('se connecter').click()
      cy.contains('identifiants incorrects')
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('Quand connecté', function() {
    beforeEach(function() {
      cy.connexion({ username: 'kerim', password: 'motdepasse' })
      cy.visit('http://localhost:5173')
    })

    it('un nouveau blog peut être créé', function() {
      cy.contains('créer un nouveau blog').click()
      cy.get('input').eq(0).type('Mon blog Cypress')
      cy.get('input').eq(1).type('Kerim')
      cy.get('input').eq(2).type('https://cypress.io')
      cy.contains('ajouter').click()
      cy.contains('Mon blog Cypress')
    })

    describe('quand un blog existe', function() {
      beforeEach(function() {
        cy.contains('créer un nouveau blog').click()
        cy.get('input').eq(0).type('Blog pour les tests')
        cy.get('input').eq(1).type('Kerim')
        cy.get('input').eq(2).type('https://example.com')
        cy.contains('ajouter').click()
        cy.contains('Blog pour les tests')
        cy.contains('annuler').click()
        })

      it('un utilisateur peut liker un blog', function() {
        cy.contains('Blog pour les tests').parent().find('button').contains('voir').click()
        cy.contains('likes 0')
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('le créateur peut supprimer son blog', function() {
        cy.contains('Blog pour les tests').parent().find('button').contains('voir').click()
        cy.on('window:confirm', () => true)
        cy.contains('supprimer').click()
        cy.contains('Blog pour les tests').should('not.exist')
      })

      it('seul le créateur voit le bouton supprimer', function() {
        cy.creerUtilisateur({ username: 'autreuser', name: 'Autre', password: 'motdepasse' })
        cy.connexion({ username: 'autreuser', password: 'motdepasse' })
        cy.visit('http://localhost:5173')
        cy.contains('Blog pour les tests').parent().find('button').contains('voir').click()
        cy.contains('supprimer').should('not.exist')
      })

      it('les blogs sont triés par likes', function() {
        cy.contains('créer un nouveau blog').click()
        cy.get('input').eq(0).type('Blog avec beaucoup de likes')
        cy.get('input').eq(1).type('Kerim')
        cy.get('input').eq(2).type('https://example2.com')
        cy.contains('ajouter').click()

        cy.contains('Blog avec beaucoup de likes').parent().find('button').contains('voir').click()
        cy.contains('Blog avec beaucoup de likes').parent().find('.blog-likes button').click()
        cy.contains('Blog avec beaucoup de likes').parent().find('.blog-likes').contains('likes 1')
        cy.contains('Blog avec beaucoup de likes').parent().find('.blog-likes button').click()
        cy.contains('Blog avec beaucoup de likes').parent().find('.blog-likes').contains('likes 2')

        cy.reload()
        cy.contains('Blog avec beaucoup de likes')

        cy.get('.blog').eq(0).should('contain', 'Blog avec beaucoup de likes')
        cy.get('.blog').eq(1).should('contain', 'Blog pour les tests')
       })
    })
  })
})