"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type IdListState = {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  remove: (id: string) => void;
};

function createIdList(name: string) {
  return create<IdListState>()(
    persist(
      (set, get) => ({
        ids: [],
        toggle: (id) =>
          set((state) => ({
            ids: state.ids.includes(id) ? state.ids.filter((x) => x !== id) : [...state.ids, id],
          })),
        has: (id) => get().ids.includes(id),
        remove: (id) => set((state) => ({ ids: state.ids.filter((x) => x !== id) })),
      }),
      { name, storage: createJSONStorage(() => localStorage) },
    ),
  );
}

// Header shows wishlist and compare counters (317:362, 317:370).
export const useWishlist = createIdList("nattarol-wishlist");
export const useCompare = createIdList("nattarol-compare");
