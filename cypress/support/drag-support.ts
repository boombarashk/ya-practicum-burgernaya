export function drag(dragSelector: string, dropSelector: string) {
  cy.get(dragSelector).should("exist").get(dropSelector).should("exist");

  cy.get(dragSelector).first().trigger("dragstart");

  cy.get(dropSelector).trigger("drop");

  return cy.get(dropSelector);
}
