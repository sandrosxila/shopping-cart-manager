/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation AddItemToCart($input: AddItemArgs!) {\n  addItem(input: $input) {\n    _id\n    hash\n    items {\n      product {\n        title\n        cost\n      }\n      quantity\n    }\n  }\n}": typeof types.AddItemToCartDocument,
    "mutation Auth {\n  register {\n    _id\n    token\n    cartId\n    isActive\n  }\n}": typeof types.AuthDocument,
    "subscription CartItemUpdateSubscription {\n  cartItemUpdate {\n    event\n    payload {\n      _id\n      product {\n        title\n        availableQuantity\n      }\n      quantity\n    }\n  }\n}": typeof types.CartItemUpdateSubscriptionDocument,
    "query GetCartItems {\n  getCart {\n    _id\n    hash\n    items {\n      _id\n      product {\n        title\n        cost\n        availableQuantity\n      }\n      quantity\n      addedAt\n      cartId\n    }\n  }\n}": typeof types.GetCartItemsDocument,
    "query GetProducts {\n  getProducts {\n    products {\n      _id\n      title\n      cost\n      availableQuantity\n      isArchived\n    }\n    total\n  }\n}": typeof types.GetProductsDocument,
    "mutation RemoveCartItem($input: RemoveItemArgs!) {\n  removeItem(input: $input) {\n    hash\n    _id\n  }\n}": typeof types.RemoveCartItemDocument,
};
const documents: Documents = {
    "mutation AddItemToCart($input: AddItemArgs!) {\n  addItem(input: $input) {\n    _id\n    hash\n    items {\n      product {\n        title\n        cost\n      }\n      quantity\n    }\n  }\n}": types.AddItemToCartDocument,
    "mutation Auth {\n  register {\n    _id\n    token\n    cartId\n    isActive\n  }\n}": types.AuthDocument,
    "subscription CartItemUpdateSubscription {\n  cartItemUpdate {\n    event\n    payload {\n      _id\n      product {\n        title\n        availableQuantity\n      }\n      quantity\n    }\n  }\n}": types.CartItemUpdateSubscriptionDocument,
    "query GetCartItems {\n  getCart {\n    _id\n    hash\n    items {\n      _id\n      product {\n        title\n        cost\n        availableQuantity\n      }\n      quantity\n      addedAt\n      cartId\n    }\n  }\n}": types.GetCartItemsDocument,
    "query GetProducts {\n  getProducts {\n    products {\n      _id\n      title\n      cost\n      availableQuantity\n      isArchived\n    }\n    total\n  }\n}": types.GetProductsDocument,
    "mutation RemoveCartItem($input: RemoveItemArgs!) {\n  removeItem(input: $input) {\n    hash\n    _id\n  }\n}": types.RemoveCartItemDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddItemToCart($input: AddItemArgs!) {\n  addItem(input: $input) {\n    _id\n    hash\n    items {\n      product {\n        title\n        cost\n      }\n      quantity\n    }\n  }\n}"): (typeof documents)["mutation AddItemToCart($input: AddItemArgs!) {\n  addItem(input: $input) {\n    _id\n    hash\n    items {\n      product {\n        title\n        cost\n      }\n      quantity\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Auth {\n  register {\n    _id\n    token\n    cartId\n    isActive\n  }\n}"): (typeof documents)["mutation Auth {\n  register {\n    _id\n    token\n    cartId\n    isActive\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription CartItemUpdateSubscription {\n  cartItemUpdate {\n    event\n    payload {\n      _id\n      product {\n        title\n        availableQuantity\n      }\n      quantity\n    }\n  }\n}"): (typeof documents)["subscription CartItemUpdateSubscription {\n  cartItemUpdate {\n    event\n    payload {\n      _id\n      product {\n        title\n        availableQuantity\n      }\n      quantity\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCartItems {\n  getCart {\n    _id\n    hash\n    items {\n      _id\n      product {\n        title\n        cost\n        availableQuantity\n      }\n      quantity\n      addedAt\n      cartId\n    }\n  }\n}"): (typeof documents)["query GetCartItems {\n  getCart {\n    _id\n    hash\n    items {\n      _id\n      product {\n        title\n        cost\n        availableQuantity\n      }\n      quantity\n      addedAt\n      cartId\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProducts {\n  getProducts {\n    products {\n      _id\n      title\n      cost\n      availableQuantity\n      isArchived\n    }\n    total\n  }\n}"): (typeof documents)["query GetProducts {\n  getProducts {\n    products {\n      _id\n      title\n      cost\n      availableQuantity\n      isArchived\n    }\n    total\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RemoveCartItem($input: RemoveItemArgs!) {\n  removeItem(input: $input) {\n    hash\n    _id\n  }\n}"): (typeof documents)["mutation RemoveCartItem($input: RemoveItemArgs!) {\n  removeItem(input: $input) {\n    hash\n    _id\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;