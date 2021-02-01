import create from "zustand";
import produce from "immer";

export const useStore = create((set) => ({
  center: [0, 0],
  modal: false,
  fourSquare: {
    selectedVenue: null,
    venues: [],
    reqParams: {
      ll: null,
      section: "all",
      radius: null,
      limit: 20,
      offset: null,
    },
  },
  set: (fn) => set(produce(fn)),
  showModal: () => set({ modal: true }),
  hideModal: () => set({ modal: false }),
}));
