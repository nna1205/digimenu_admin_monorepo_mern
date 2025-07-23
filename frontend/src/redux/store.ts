import { configureStore } from '@reduxjs/toolkit'
import menucategoryReducer from '@/features/menucategory/_reducer/menucategorySlice';
import menuitemReducer from '@/features/menuitem/_reducer/menuitemSlice';
import optiongroupReducer from '@/features/optiongroup/_reducer/optiongroupSlice';
import storeReducer from '@/features/store/_reducer/storeSlice';
import orderhistoryReducer from '@/features/orderhistory/_reducer/orderhistorySlice';
import ordercurrentReducer from '@/features/ordercurrent/_reducer/ordercurrentSlice';

const store = configureStore({
  reducer: {
    menucategory: menucategoryReducer,
    menuitem: menuitemReducer,
    optiongroup: optiongroupReducer,
    store: storeReducer,
    orderhistory: orderhistoryReducer,
    ordercurrent: ordercurrentReducer,
  },
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>

export default store