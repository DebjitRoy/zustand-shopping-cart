// merge all the slices here like store and cart

import { Store } from '@/types/store';
import { create } from 'zustand';
import { createUserSlice } from '@/store/user_slice';
import { immer } from 'zustand/middleware/immer';
import { createCartSlice } from '@/store/cart_slice';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

export const useStore = create<Store>()(
  // devtools allows to check state data in redux devtool plugin
  // persist allows to persist data between page refreshes
  // immer is a middleware that helps nested objects updates
  devtools(
    persist(
      subscribeWithSelector(
        immer((...args) => ({
          ...createUserSlice(...args),
          ...createCartSlice(...args),
        }))
      ),
      {
        name: 'cart-local-storage',
      }
    )
  )
);
