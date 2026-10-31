class Inscricao {
  rolarAteORodape() {
    cy.get("footer").scrollIntoView();
  }

  verificarSeTituloDeInscricaoEstaVisivel() {
    cy.contains("Subscription").should("be.visible");
  }

  inscreverEmail(email) {
    cy.get("#susbscribe_email").type(email);
    cy.get("#subscribe").click();
  }

  verificarSeInscricaoFoiEfetuadaComSucesso() {
    cy.get("#success-subscribe")
      .should("be.visible")
      .and("contain", "You have been successfully subscribed!");
  }
}

export default new Inscricao();
