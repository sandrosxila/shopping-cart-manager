describe("Home Page", () => {
  const TOAST_DURATION = 2000;

  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("shouldn't add 0 cart items", () => {
    cy.findAllByLabelText("Quantity:").first().type("{selectAll}0");
    cy.findAllByText("Add To Cart")
      .first()
      .click()
      .then(() => {
        cy.findAllByText("Number must be greater than or equal to 1").should(
          "exist"
        );
      });
  });

  it("shouldn't add the same product to the cart twice", () => {
    const buttons = cy.findAllByText("Add To Cart");
    const inputs = cy.findAllByLabelText("Quantity:");
    const quantityTexts = cy.findAllByText(/Available/);

    let idx = -1;

    quantityTexts.each(($el, index) => {
        const quantity = Number($el.text().split(" ").at(1));
        if (quantity > 0) {
          idx = index;
        }
      })
      .then(() => {
        inputs.eq(idx).type("{selectAll}1");
        buttons.eq(idx).click().click().then(() => {
          cy.findAllByText("This product has already been added to the cart");
        });
      });
  });

  it("should add an item to cart", () => {
    const buttons = cy.findAllByText("Add To Cart");
    const inputs = cy.findAllByLabelText("Quantity:");
    const titles = cy.get('[data-slot="card-title"]');
    const quantityTexts = cy.findAllByText(/Available/);
    
    cy.get('[data-slot="card"]').each(($el) => {
      cy.wrap($el).within(() => {
        cy.findByText(/Available/).then(($el) => {
          const quantity = Number($el.text().split(" ").at(1));
          if (quantity > 0) {
            
          }
        });
      });
    });

    let idx = -1;

    quantityTexts.each(($el, index) => {
      const quantity = Number($el.text().split(" ").at(1));
      if (quantity > 0) {
        console.log(idx);
        idx = index;

        return false;
      }
    });

    inputs.eq(idx).type('{selectAll}1');
    buttons.eq(idx).click();
    cy.wait(TOAST_DURATION);

    titles.eq(idx).then($el => {
      const title = $el.text();

      cy.get('[href="/cart"]').click();

      cy.findByText(title);
    });
  });
});
