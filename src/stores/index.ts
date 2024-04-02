import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { AuthSlice, createAuthSlice } from "./auth";
import { createSelectors } from "@/lib/zustand";

type RootState = AuthSlice;

const useAppStoreBase = create<RootState>()(
  immer(
    devtools(
      persist(
        (...a) => ({
          ...createAuthSlice(...a),
        }),
        {
          name: "sn-jobs-app",
        }
      )
    )
  )
);

export const useAppStore = createSelectors(useAppStoreBase);
