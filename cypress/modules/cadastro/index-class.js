import { faker } from "@faker-js/faker";

class Cadastro {
  iniciarCadastro(nome, email) {
    cy.get('[data-qa="signup-name"]').type(nome);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();
  }

  preencherCadastro() {
    cy.get("#id_gender2").check();
    cy.get('[data-qa="password"]').type("12345");
    cy.get('[data-qa="days"]').select("1");
    cy.get('[data-qa="months"]').select("September");
    cy.get('[data-qa="years"]').select("1990");

    cy.get("#newsletter").check();
    cy.get("#optin").check();

    cy.get('[data-qa="first_name"]').type(faker.person.firstName());
    cy.get('[data-qa="last_name"]').type(faker.person.lastName());
    cy.get('[data-qa="company"]').type(`PGATS ${faker.company.name()}`);
    cy.get('[data-qa="address"]').type(faker.location.streetAddress());

    cy.get('[data-qa="country"]').select("United States");
    cy.get('[data-qa="state"]').type(faker.location.state());
    cy.get('[data-qa="city"]').type(faker.location.city());
    cy.get('[data-qa="zipcode"]').type(faker.location.zipCode());
    cy.get('[data-qa="mobile_number"]').type("999999999");
    cy.get('[data-qa="create-account"]').click();
  }

  verificarSeCadastroFoiEfetuadoComSucesso() {
    cy.get('[data-qa="account-created"]')
      .should("be.visible")
      .and("contain", "Account Created!");
  }

  verificarSeMensagemDeCadastroExistenteFoiExibida() {
    cy.get('form[action*="signup"] > p')
      .should("exist")
      .should("be.visible")
      .should("contain", "Email Address already exist!")
      .should("contain.text", "Email Address already exist!");
  }

   continuar() {
      cy.get('[data-qa="continue-button"]').click()
  }

  criarNovoUsuario(nome, email) {
    this.iniciarCadastro(nome, email);
    this.preencherCadastro();
    this.verificarSeCadastroFoiEfetuadoComSucesso();
    this.continuar();
  }

}

export default new Cadastro();
