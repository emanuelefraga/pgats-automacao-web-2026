import { faker } from "@faker-js/faker";

class Carrinho {
  verificarSeCarrinhoEstaVisivel() {
    cy.url().should("include", "/view_cart");
    cy.contains("Shopping Cart").should("be.visible");
    cy.get('#cart_info tr[id^="product-"]').should("have.length", 2);
  }

  prosseguirParaCheckout() {
    cy.contains("Proceed To Checkout").click();
  }

  verificarEnderecoERevisaoDoPedido() {
    cy.contains("Address Details").should("be.visible");
    cy.get("#address_delivery").should("be.visible");
    cy.get("#address_invoice").should("be.visible");
    cy.contains("Review Your Order").should("be.visible");
    cy.get('#cart_info tr[id^="product-"]').should("have.length", 2);
  }

  comentarEFinalizarPedido(comentario) {
    cy.get('textarea[name="message"]').type(comentario);
    cy.contains("Place Order").click();
  }

  preencherDadosDoPagamento() {
    cy.get('[data-qa="name-on-card"]').type(faker.person.fullName());
    cy.get('[data-qa="card-number"]').type("4111111111111111");
    cy.get('[data-qa="cvc"]').type("123");
    cy.get('[data-qa="expiry-month"]').type("12");
    cy.get('[data-qa="expiry-year"]').type("2030");
  }

  confirmarPagamento() {
    cy.get('[data-qa="pay-button"]').click();
  }

  verificarSePedidoFoiRealizado() {
    cy.url().should("include", "/payment_done/");
    cy.contains("Congratulations! Your order has been confirmed!").should(
      "be.visible",
    );
  }
}

export default new Carrinho();
