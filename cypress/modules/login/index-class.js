class Login {
  preencherLogin(email, senha) {
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(senha);
    cy.get('[data-qa="login-button"]').click();
  }

  verificarSeMensagemDeErroFoiExibidaNoLogin() {
    cy.get('form[action*="login"] > p')
      .should("exist")
      .should("be.visible")
      .should("contain", "Your email or password is incorrect!")
      .should("contain.text", "Your email or password is incorrect!");
  }

  verificarSeOUsuarioFoiDeslogado() {
    cy.get(".login-form > h2").should("be.visible");
    cy.get('a[href*="logout"]').should("not.exist");
    cy.get("[action*=login]").should("be.visible");
    cy.url().should("include", "login");
  }
}

export default new Login();
