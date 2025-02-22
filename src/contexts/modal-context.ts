import React from "react";

const noop = () => void 0;

export type ModalContextState = {
  openModal: () => void;
}

export const ModalContext = React.createContext<ModalContextState>({
  openModal: noop
});