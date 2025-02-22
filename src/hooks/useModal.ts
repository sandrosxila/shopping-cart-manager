import { ModalContext } from "@/contexts/modal-context"
import { useContext } from "react"

export const useModal = () => useContext(ModalContext);