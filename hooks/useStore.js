import create from "zustand";
import produce from "immer";

export const useStore = create((set) => ({
  modal: false,
  fourSquare: {
    selectedVenue: null,
    venues: [],
    sections: ["all", "food", "drinks", "coffee", "shops", "arts", "outdoors"],
    reqParams: {
      section: "all",
      ll: null,
      near: null,
      radius: "auto",
      limit: 15,
      offset: null,
      sort: "auto",
    },
  },
  set: (fn) => set(produce(fn)),
  showModal: () => set({ modal: true }),
  hideModal: () => set({ modal: false }),
}));
