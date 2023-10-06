import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ItemType = {
    title: string;
    tempData: {
        id: number;
        name: string;
        count: number;
    };
}

const initialState: ItemType[] = [
    { title: 'data1', tempData: { id: 1, name: 'test', count: 0 } },
    { title: 'data2', tempData: { id: 2, name: 'test2', count: 0 } },
];

const cartSlice = createSlice({
    name: 'myCart',
    initialState: initialState,
    reducers: {
        add: (state, action: PayloadAction<ItemType>) => {
            const itemId = action.payload.tempData.id;
            const existingItemIndex = state.findIndex(item => item.tempData.id === itemId);

            if (existingItemIndex !== -1) {
                state[existingItemIndex].tempData.count += 1;
            } else {
                state.push(action.payload);
            }
        },

        minus: (state, action: PayloadAction<ItemType>) => {
            const itemId = action.payload.tempData.id;
            const existingItemIndex = state.findIndex(item => item.tempData.id === itemId);

            if (existingItemIndex !== -1 && state[existingItemIndex].tempData.count > 0) {
                state[existingItemIndex].tempData.count -= 1;
            }
        },

        addItem: (state, action: PayloadAction<ItemType>) => {
            // Check if item already exists
            const itemId = action.payload.tempData.id;
            const existingItemIndex = state.findIndex(item => item.tempData.id === itemId);

            if (existingItemIndex === -1) {
                state.push(action.payload);
            } else {
                state[existingItemIndex] = action.payload;
            }
        }
    },
});

export const { add, minus, addItem } = cartSlice.actions;
export default cartSlice;
