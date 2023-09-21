import { configureStore } from '@reduxjs/toolkit';
import cartSlice,{ItemType} from './slice/cartSlice';



export interface RootState {
    myCart: ItemType[];
}


const store = configureStore({
    reducer: {
        myCart: cartSlice.reducer,
    },
});

export default store;
