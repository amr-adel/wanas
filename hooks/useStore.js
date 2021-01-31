import create from "zustand";
import produce from "immer";

export const useStore = create((set) => ({
  center: [0, 0],
  modal: false,
  set: (fn) => set(produce(fn)),
  showModal: () => set({ modal: true }),
  hideModal: () => set({ modal: false }),
}));
