/// <reference types="cypress" />
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import { BASE_LOCALHOST } from "../../src/consts";
import { drag } from "./drag-support";

declare global {
  namespace Cypress {
    interface Chainable {
      getIngredients: (url?: string) => void;

      drag: (dragSelector: string, dropSelector: string) => Chainable;
    }
  }
}

Cypress.Commands.add("getIngredients", (url = BASE_LOCALHOST) => {
  cy.visit(url);
  cy.wait("@getIngredients");
  cy.get("[data-testid=loader]").should("not.exist");
});

Cypress.Commands.add("drag", drag);
