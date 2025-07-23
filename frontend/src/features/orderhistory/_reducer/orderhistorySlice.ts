import { createSlice, type PayloadAction  } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'
import { TOrder } from '../OrderHistory.type'
import { getHistoryOrderByStore, deleteOrder } from './orderhistoryActions'

interface OrderHistoryState {
    isLoading: boolean,
    error: string | null,
    orderhistory: TOrder[],
}

const initialState = {
    isLoading: false,
    error: null,
    orderhistory: [],
} satisfies OrderHistoryState as OrderHistoryState

export const orderhistorySlice = createSlice({
    name: 'orderhistory',
    initialState,
    reducers: {
        setLoading(state: OrderHistoryState, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setError(state: OrderHistoryState, action: PayloadAction<string>) {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getHistoryOrderByStore.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getHistoryOrderByStore.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderhistory = action.payload!.data;
        })
        .addCase(getHistoryOrderByStore.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload! as string | "Unknown error";
        })
        //handle deleteOrder
        .addCase(deleteOrder.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(deleteOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderhistory = state.orderhistory.filter(item => item.id !== action.payload!.data.id);
        })
        .addCase(deleteOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload! as string | "Unknown error";
        })
    }
});

export const { setLoading, setError } = orderhistorySlice.actions

export const selectOrderHistory = (state: RootState) => state.orderhistory.orderhistory;

export default orderhistorySlice.reducer;