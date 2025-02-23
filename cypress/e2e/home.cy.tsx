import React from "react";
import Home from "../../src/app/page";
import { ApolloMockProvider } from "../providers/apollo-mock-provider";
import { GetProductsDocument } from "../../src/generated/graphql";

const mocks = [
  {
    request: {
      query: GetProductsDocument,
    },
    result: {
      data: {
        getProducts: {
          products: [
            {
              _id: "67a7a4aaea6cab17b137f956",
              title: "Eco-Friendly Bamboo Toothbrush",
              cost: 18.11,
              availableQuantity: 3,
              isArchived: false,
              __typename: "Product",
            },
            {
              _id: "67a7a4aaea6cab17b137f957",
              title: "Compact Wireless Mouse",
              cost: 12.54,
              availableQuantity: 3,
              isArchived: false,
              __typename: "Product",
            },
            {
              _id: "67a7a4aaea6cab17b137f958",
              title: "Rechargeable Mini LED Flashlight",
              cost: 7.23,
              availableQuantity: 9,
              isArchived: false,
              __typename: "Product",
            },
            {
              _id: "67a7a4aaea6cab17b137f959",
              title: "Silicone Collapsible Cup",
              cost: 7.04,
              availableQuantity: 3,
              isArchived: false,
              __typename: "Product",
            },
            {
              _id: "67a7a4aaea6cab17b137f95a",
              title: "Organic Lavender Essential Oil",
              cost: 14.19,
              availableQuantity: 5,
              isArchived: false,
              __typename: "Product",
            },
            {
              _id: "67a7a4aaea6cab17b137f95b",
              title: "Portable USB Charging Cable",
              cost: 11.72,
              availableQuantity: 0,
              isArchived: false,
              __typename: "Product",
            },
            {
              _id: "67a7a4aaea6cab17b137f95c",
              title: "Handcrafted Ceramic Mug",
              cost: 4.87,
              availableQuantity: 10,
              isArchived: false,
              __typename: "Product",
            },
            {
              _id: "67a7a4aaea6cab17b137f95d",
              title: "Natural Almond Facial Scrub",
              cost: 0.48,
              availableQuantity: 7,
              isArchived: false,
              __typename: "Product",
            },
            {
              _id: "67a7a4aaea6cab17b137f95e",
              title: "Vegan Leather Passport Holder",
              cost: 15.18,
              availableQuantity: 2,
              isArchived: false,
              __typename: "Product",
            },
            {
              _id: "67a7a4aaea6cab17b137f95f",
              title: "Small Decorative Succulent Planter",
              cost: 1.81,
              availableQuantity: 9,
              isArchived: false,
              __typename: "Product",
            },
            {
              _id: "67a7a4aaea6cab17b137f960",
              title: "Travel-Sized Hair Brush",
              cost: 12.45,
              availableQuantity: 9,
              isArchived: false,
              __typename: "Product",
            },
            {
              _id: "67a7a4aaea6cab17b137f961",
              title: "Miniature Desktop Calendar",
              cost: 13.18,
              availableQuantity: 2,
              isArchived: false,
              __typename: "Product",
            },
            {
              _id: "67a7a4aaea6cab17b137f962",
              title: "Pocket-Sized Notebook",
              cost: 4.72,
              availableQuantity: 9,
              isArchived: false,
              __typename: "Product",
            },
            {
              _id: "67a7a4aaea6cab17b137f963",
              title: "Multicolor Gel Pen Set",
              cost: 4.35,
              availableQuantity: 8,
              isArchived: false,
              __typename: "Product",
            },
            {
              _id: "67a7a4aaea6cab17b137f964",
              title: "Stainless Steel Water Bottle",
              cost: 17.79,
              availableQuantity: 1,
              isArchived: false,
              __typename: "Product",
            },
            {
              _id: "67a7a4aaea6cab17b137f965",
              title: "Foldable Shopping Tote Bag",
              cost: 4.07,
              availableQuantity: 5,
              isArchived: false,
              __typename: "Product",
            },
            {
              _id: "67a7a4aaea6cab17b137f966",
              title: "Quick-Dry Microfiber Towel",
              cost: 19.64,
              availableQuantity: 8,
              isArchived: false,
              __typename: "Product",
            },
            {
              _id: "67a7a4aaea6cab17b137f967",
              title: "Magnetic Phone Mount",
              cost: 11.32,
              availableQuantity: 6,
              isArchived: false,
              __typename: "Product",
            },
            {
              _id: "67a7a4aaea6cab17b137f968",
              title: "Herbal Tea Sampler Pack",
              cost: 12.21,
              availableQuantity: 9,
              isArchived: false,
              __typename: "Product",
            },
            {
              _id: "67a7a4aaea6cab17b137f969",
              title: "Compact First Aid Kit",
              cost: 5.84,
              availableQuantity: 8,
              isArchived: false,
              __typename: "Product",
            },
          ],
          total: 20,
          __typename: "GetProductsData",
        },
      },
    },
  },
];

describe("<Home />", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });


  it("shouldn't add 0 cart items", () => {
    cy.findAllByText("Add To Cart").first().click().then(() => {
      cy.findAllByText("Number must be greater than or equal to 1").should('exist');
    });

    
  });

  it("shouldn't add the same product to the cart twice", () => {
    const buttons = cy.findAllByText("Add To Cart");
    const inputs = cy.findAllByLabelText("Quantity:");
    const quantityTexts = cy.findAllByText(/Available/);

    let idx = 0;

    quantityTexts.each(($el, index) => {
      if(Number($el.text().split(' ').at(1)) > 0) {
        console.log(idx);
        idx = index;
      }
    }).then(() => {
      inputs.eq(idx).type("1");
      buttons.eq(idx).click().click().then(() => {
        cy.findAllByText("This product has already been added to the cart");
      })
    });
    
  });
});
