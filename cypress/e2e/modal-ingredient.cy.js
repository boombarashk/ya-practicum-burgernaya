import { BASE_LOCALHOST, DATA_URL } from "../../src/consts";
/* Тестирование конструктора бургеров:
    отображение модального окна при клике на ингридиент и отдельной страницы с детальной информацией об ингридиенте
*/
describe("Correct ingredient details", function () {
  beforeEach(() => {
    cy.intercept("GET", DATA_URL, { fixture: "ingredients" }).as(
      "getIngredients",
    );
  });

  it(`should open details ingredients in modal`, function () {
    cy.getIngredients();

    cy.get('[data-testid="constructor-item-ingredient-main"]').last().click();

    cy.log("Проверка отображенияи заголовков в модалке");
    cy.get('[data-testid="modal"]')
      .should("be.visible")
      .then(($modal) => {
        cy.wrap($modal)
          .should("contain.text", "Детали ингридиента")
          .should("contain.text", "Сыр с астероидной плесенью");
      });

    cy.location().should((location) => {
      expect(location.href).to.match(
        /\/#\/ingredients\/643d69a5c3f7b9001cfa094a$/,
      );
    });

    cy.get('[data-testid="modal-overlay"]').should("be.exist");

    cy.log("Закрытие модалки кликом на иконку");
    cy.get('[data-testid="modal"] > div').first().click();

    cy.get('[data-testid="modal"]').should("not.exist");
  });

  it("should open details by id ingredient", () => {
    cy.getIngredients(
      `${BASE_LOCALHOST}/#/ingredients/643d69a5c3f7b9001cfa094a`,
    );

    cy.get("h1").contains("Детали ингридиента");
    cy.contains("Сыр с астероидной плесенью");

    cy.get('[id="modal-content"]').should("be.empty");
  });
});
