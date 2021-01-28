import create from "zustand";
import produce from "immer";

export const useStore = create((set) => ({
  center: [0, 0],
  set: (fn) => set(produce(fn)),
}));
