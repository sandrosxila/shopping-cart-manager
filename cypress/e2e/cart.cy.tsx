describe("Cart Page", () => {
  const TOAST_DURATION = 2000;

  beforeEach(() => {
    cy.visit("http://localhost:3000/");

    cy.findAllByLabelText("Quantity:").each(($el) => {
      cy.wrap($el).type("{selectAll}1");
    });

    cy.findAllByText("Add To Cart").each(($el) => {
      cy.wrap($el).click();
    });

    cy.wait(TOAST_DURATION);

    cy.get('[href="/cart"]').click();
  });

  it("should update cart item quantity", () => {
    const buttons = cy.findAllByText("Update Quantity");
    const inputs = cy.findAllByLabelText("Quantity:");
    const quantityTexts = cy.findAllByText(/Available/);

    let idx = -1;
    let quantity = 0;

    quantityTexts.each(($el, index) => {
      quantity = Number($el.text().split(" ").at(1));
      if (quantity > 0) {
        idx = index;
        return false;
      }
    }).then(() => {
      inputs.eq(idx).type(`{selectAll}${quantity}`);
      buttons.eq(idx).click();
      cy.findAllByText("Cart Item Quantity updated successfully!").should(
        "exist"
      );
    });
  });

  it("remove cart item", () => {
    let prevLen;
    cy.findAllByText("Remove").then($elems => {
      prevLen = $elems.length;
      cy.wrap($elems[0]).click();
      cy.wait(TOAST_DURATION);
    }).then(() => {
      cy.findAllByText("Remove").should('have.length', prevLen! - 1);
    });
  });

  it("should navigate show summary after navigating to the checkout page", () => {
    cy.findByText("Checkout").click();
    cy.findByText("Summary").should('exist');
  });
});
