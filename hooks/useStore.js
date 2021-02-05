import create from "zustand";
import produce from "immer";

export const useStore = create((set) => ({
  modal: false,
  fourSquare: {
    selectedVenue: null,
    venues: [],
    reqParams: {
      section: "all",
      ll: null,
      near: null,
      radius: null,
      limit: 20,
      offset: null,
      sort: null,
    },
  },
  set: (fn) => set(produce(fn)),
  showModal: () => set({ modal: true }),
  hideModal: () => set({ modal: false }),
}));
