import { CartSlice } from '@/store/cart_slice';
import { UserSlice } from '@/store/user_slice';

export type Store = UserSlice & CartSlice;
