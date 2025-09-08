import { create } from "zustand";

export type UserType = "student" | "teacher";

export interface UserState {
  clerkUserId?: string | null;
  userType: UserType | null;
  universityId: string | null;
  sectionId: string | null;
  name: string;
  email: string;
  year: string;
  avatarUrl?: string;
  canComment?: boolean;
  isVerified?: boolean;
  plan?: "free" | "pro" | "max";
  isHydrating?: boolean;
  setUserType: (type: UserType) => void;
  setUniversity: (id: string) => void;
  setSection: (id: string) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setYear: (year: string) => void;
  setAvatarUrl: (url?: string) => void;
  setCanComment: (value: boolean) => void;
  setIsVerified: (value: boolean) => void;
  setPlan: (plan: "free" | "pro" | "max") => void;
  setClerkUserId: (id: string | null) => void;
  hydrateFromBackend: (id: string) => Promise<void>;
  reset: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  clerkUserId: null,
  userType: null,
  universityId: null,
  sectionId: null,
  name: "",
  email: "",
  year: "",
  avatarUrl: undefined,
  canComment: true,
  isVerified: false,
  plan: "free",
  isHydrating: false,
  setUserType: (type) => set({ userType: type }),
  setUniversity: (id) => set({ universityId: id }),
  setSection: (id) => set({ sectionId: id }),
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setYear: (year) => set({ year }),
  setAvatarUrl: (url) => set({ avatarUrl: url }),
  setCanComment: (value) => set({ canComment: value }),
  setIsVerified: (value) => set({ isVerified: value }),
  setPlan: (plan) => set({ plan }),
  setClerkUserId: (id) => set({ clerkUserId: id }),
  hydrateFromBackend: async (id: string) => {
    try {
      set({ isHydrating: true });
      const { convex } = await import("@/lib/convexClient");
      const { api } = await import("@/convex/_generated/api");
      // @ts-ignore convex/react types expect hooks; we can use client directly here
      const result: any = await convex.query(api.users.getByClerkId, { clerkUserId: id });
      if (result) {
        set({
          clerkUserId: id,
          userType: result.userType ?? null,
          universityId: result.universityId ?? null,
          sectionId: result.sectionId ?? null,
          name: result.name ?? "",
          email: result.email ?? "",
          year: result.year ?? "",
          avatarUrl: result.avatarUrl,
          canComment: result.canCreateCommunity ?? true,
          isVerified: result.isVerified ?? false,
          plan: result.plan ?? "free",
        });
      }
    } finally {
      set({ isHydrating: false });
    }
  },
  reset: () =>
    set({
      clerkUserId: null,
      userType: null,
      universityId: null,
      sectionId: null,
      name: "",
      email: "",
      year: "",
      avatarUrl: undefined,
      canComment: true,
      isVerified: false,
      plan: "free",
      isHydrating: false,
    }),
}));
