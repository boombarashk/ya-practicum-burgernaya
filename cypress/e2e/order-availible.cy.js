import { DATA_URL, LOGIN_URL, ORDER_URL } from "../../src/consts";

/* Тестирование конструктора бургеров:
    функциональность перетаскивания ингредиента, создания заказа и модальных окон
*/
describe("Order is available", function () {
  beforeEach(() => {
    cy.intercept("GET", DATA_URL, { fixture: "ingredients" }).as(
      "getIngredients",
    );
    cy.intercept("POST", LOGIN_URL, { fixture: "signin" }).as("postLogin");
    cy.intercept("POST", ORDER_URL, { fixture: "orders" }).as("postOrder");
  });

  it(`should correct DnD and create order`, function () {
    cy.getIngredients();

    cy.log("Добавление ингридиентов в конструкторе заказов");
    cy.drag(
      '[data-testid="constructor-item-ingredient-bun"] > img',
      '[data-testid="constructor-droppable"]',
    )
      .should("contain", "Краторная булка N-200i (верх)")
      .should("contain", "Краторная булка N-200i (низ)");

    cy.drag(
      '[data-testid="constructor-item-ingredient-main"]:nth-child(1) > img',
      '[data-testid="constructor-droppable"]',
    ).should("contain", "Биокотлета из марсианской Магнолии");
    cy.drag(
      '[data-testid="constructor-item-ingredient-main"]:nth-child(2) > img',
      '[data-testid="constructor-droppable"]',
    ).should("contain", "Сыр с астероидной плесенью");

    cy.get('[data-testid="button-order"]').should("be.enabled").click();

    cy.log("Авторизация при заказе");
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/login");
    });

    cy.get("input[name=email]").type("1@test.com");
    cy.get("input[name=password]").type("test1");
    cy.get("[type=submit]").should("be.enabled").click();

    cy.wait("@postLogin");

    cy.get('[data-testid="button-order"]').click();

    cy.wait("@postOrder");

    cy.log("Проверка отображения модального окна с номером заказа");
    cy.get('[data-testid="modal"]')
      .should("be.visible")
      .should("contain.text", 72876);
  });
});
