/// <reference types="cypress" />

describe('Automation Exercise', () => {
    it('Cadastrar um novo usuário com sucesso', () => {

        //Cadastro
        cy.visit('https://automationexercise.com')
        cy.get('a[href*=login]').click()

        cy.get('[data-qa="signup-name"]').type(`PGATS ALUN`)
        //email dinâmico
        cy.get('[data-qa="signup-email"]').type(`pgats.aluno.${Date.now()}@testando.com`)
        cy.get('[data-qa="signup-button"]').click()

        //radio button -> check
        cy.get('#id_gender2').check()

        cy.get('[data-qa="password"]').type('12345')

        //Selects e Comboboxes -> select
        cy.get('[data-qa="days"]').select('1')
        cy.get('[data-qa="months"]').select('September')
        cy.get('[data-qa="years"]').select('1990')

        //Checkboxes -> check
        cy.get('#newsletter').check()
        cy.get('#option').check()

        //Demais campos de texto, similar ao nome e email
        cy.get('[data-qa="first_name"]').type('PGATS')
        cy.get('[data-qa="last_name"]').type('Aluno')
        cy.get('[data-qa="company"]').type('PGATS')
        cy.get('[data-qa="address"]').type('Example Address')

        cy.get('[data-qa="country"]').select('United States')
        cy.get('[data-qa="state"]').type('California')
        cy.get('[data-qa="city"]').type('San Francisco')
        cy.get('[data-qa="zipcode"]').type('12345678')
        cy.get('[data-qa="mobile_number"]').type('999999999')
        cy.get('[data-qa="create-account"]').click()
    });

    it('Efetuar Login de Usuário com email e senha correto', () => {

        cy.visit('https://automationexercise.com/login')
        cy.get('[data-qa="login-email"]').type('aluno-pgats-2026@testando.com')
        cy.get('[data-qa="login-password"]').type('12345')
        cy.get('[data-qa="login-button"]').click()

        cy.contains('Logged in as Aluno Pgats').should('be.visible')

    });

    it('Efetuar Login de Usuário email e senha INCORRETOS', () => {

        cy.visit('https://automationexercise.com/login')
        cy.get('[data-qa="login-email"]').type('aluno-pgats-2026@testando.com')
        cy.get('[data-qa="login-password"]').type('54321')
        
        cy.get('[data-qa="login-button"]').click()

        cy.get('form[action*="login"] > p')
        .should('exist')
        .should('be.visible')
        .should('contain', 'Your email or password is incorrect!')
        .should('contain.text', 'Your email or password is incorrect!')

    });

    it('Efetuar Logout', () => {

        cy.visit('https://automationexercise.com/login')
        cy.get('[data-qa="login-email"]').type('aluno-pgats-2026@testando.com')
        cy.get('[data-qa="login-password"]').type('12345')
        cy.get('[data-qa="login-button"]').click()
        cy.contains('Logged in as Aluno Pgats').should('be.visible')

        cy.get('a[href*="logout"]').should('be.visible').click()

        cy.get('.login-form > h2').should('be.visible')
        cy.get('a[href*="logout"]').should('not.exist')
        cy.get('[action*=login]').should('be.visible')
        cy.url().should('include', 'login')

    });

    it('Tentar cadastrar um usuário com email já cadastrado', () => {

        //Cadastro
        cy.visit('https://automationexercise.com')
        cy.get('a[href*=login]').click()

        cy.get('[data-qa="signup-name"]').type(`PGATS ALUN`)
        
        cy.get('[data-qa="signup-email"]').type('aluno-pgats-2026@testando.com')
        cy.get('[data-qa="signup-button"]').click()

        cy.get('form[action*="signup"] > p')
            .should('exist')
            .should('be.visible')
            .should('contain', 'Email Address already exist!')
            .should('contain.text', 'Email Address already exist!')
    
    });

});