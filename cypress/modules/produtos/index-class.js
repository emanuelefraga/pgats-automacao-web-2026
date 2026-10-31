class Produtos {
  verificarSeListaDeProdutosEstaVisivel() {
    cy.url().should("include", "/products");
    cy.contains("All Products").should("be.visible");
    cy.get(".features_items .product-image-wrapper").should(
      "have.length.greaterThan",
      0,
    );
  }

  abrirDetalhesDoPrimeiroProduto() {
    cy.get('.features_items a[href*="/product_details/"]').first().click();
  }

  verificarSeDetalhesDoProdutoEstaoVisiveis() {
    cy.get(".product-information h2").should("be.visible");
    cy.get(".product-information")
      .should("contain.text", "Category:")
      .and("contain.text", "Rs.")
      .and("contain.text", "Availability:")
      .and("contain.text", "Condition:")
      .and("contain.text", "Brand:");
  }

  buscarProduto(nome) {
    cy.get("#search_product").type(nome);
    cy.get("#submit_search").click();
  }

  verificarSeResultadoDaBuscaEstaVisivel(nome) {
    cy.contains("Searched Products").should("be.visible");
    cy.get(".features_items .productinfo p")
      .should("have.length.greaterThan", 0)
      .each(($produto) => {
        expect($produto.text().toLowerCase()).to.contain(nome.toLowerCase());
      });
  }

  adicionarProdutoAoCarrinho(id) {
    cy.get(`a.add-to-cart[data-product-id="${id}"]`).first().click({ force: true });
    cy.contains("Added!").should("be.visible");
    cy.contains("Continue Shopping").click();
  }
}

export default new Produtos();
