class Menu {
  navegarParaLogin() {
    cy.get("a[href*=login]").click();
  }

  verificarSeUsuarioEstaLogado(nome) {
    cy.contains(`Logged in as ${nome}`).should("be.visible");
  }

  navegarParaProdutos() {
    cy.get('a[href="/products"]').click();
  }

  navegarParaCarrinho() {
    cy.get('a[href="/view_cart"]').first().click();
  }

  efetuarLogout() {
    cy.get('a[href*="logout"]').should("be.visible").click();
  }

  deletarConta() {
    cy.get('a[href="/delete_account"]').click();
    cy.get('[data-qa="account-deleted"]')
      .should("be.visible")
      .and("contain", "Account Deleted!");
  }
}

export default new Menu();
