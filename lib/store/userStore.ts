import { create } from "zustand";

export type UserType = "student" | "teacher";

export interface UserState {
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
  reset: () => void;
}

export const useUserStore = create<UserState>((set) => ({
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
  reset: () =>
    set({
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
    }),
}));
