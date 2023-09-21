import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ItemType {
    id: number;
    name: string;
    count: number;
}
const initialState: ItemType[] = [];

const cartSlice = createSlice({
    name: 'myCart',
    initialState: initialState,
    reducers: {
        add: (state, action: PayloadAction<ItemType>) => {
            const itemId = action.payload.id;
            const existingItemIndex = state.findIndex(item => item.id === itemId);

            if (existingItemIndex !== -1) {
                state[existingItemIndex].count += 1;
            } else {
                state.push(action.payload);
                const newItemIndex = state.findIndex(item => item.id === itemId);
                if (newItemIndex !== -1) {
                    state[newItemIndex].count += 1;
                }
            }
        },

        minus: (state, action: PayloadAction<ItemType>) => {
            const itemId = action.payload.id;
            const existingItemIndex = state.findIndex(item => item.id === itemId);

            if (existingItemIndex !== -1) {
                state[existingItemIndex].count -= 1;
            } else {
                state.push(action.payload);
                const newItemIndex = state.findIndex(item => item.id === itemId);
                if (newItemIndex !== -1) {
                    state[newItemIndex].count -= 1;
                }
            }
        },
    },
});

export const { add, minus } = cartSlice.actions;
// export const add = createAction<ItemType>('myCart/add');
// export const minus = createAction<ItemType>('myCart/minus');

export default cartSlice;
