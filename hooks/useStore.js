import { create } from "zustand";
import { produce } from "immer";

export const useStore = create((set) => ({
  modal: false,
  mapBox: {
    center: [0, 0],
    zoom: 0,
    markers: [],
    popUp: null,
    userLocation: null,
  },
  fourSquare: {
    nearLabels: null,
    sections: ["all", "food", "drinks", "coffee", "shops", "arts", "outdoors"],
    reqParams: {
      section: "all",
      ll: null,
      near: null,
      radius: "auto",
      limit: 15,
      offset: 0,
      sort: "auto",
    },
  },
  set: (fn) => set(produce(fn)),
  showModal: () => set({ modal: true }),
  hideModal: () => set({ modal: false }),
}));
