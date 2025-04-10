import { resolve } from 'path';
import { StateCreator } from 'zustand';

type UserState = {
  userName: string;
  fullName: string;
  age: number;
  address: string;
};

type UserActions = {
  setAddress: (address: string) => void;
  fetchUser: () => Promise<void>;
};
export type UserSlice = UserState & UserActions;

export const createUserSlice: StateCreator<UserSlice, [['zustand/immer', never]], [], UserSlice> = (
  set
) => ({
  address: '',
  age: 0,
  fullName: '',
  userName: '',
  // default regular
  //   setAddress: (address) => set((state) => ({ ...state, address })),

  // shortcut for the same previous line without middleware
  //   setAddress: (address) => set(() => ({ address })),

  // using immer middleware to handle complex nested object spreding
  setAddress: (address) =>
    set((state) => {
      state.address = address;
    }),
  fetchUser: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    set({
      userName: 'JohnD25',
      fullName: 'JohnDoe',
      age: 32,
    });
  },
});
