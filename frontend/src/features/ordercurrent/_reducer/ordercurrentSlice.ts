import { createSlice, type PayloadAction  } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'
import { TOrder } from '../../orderhistory/OrderHistory.type'
import { getOrderCurrentByStore, updateOrderCurrentStatus } from './ordercurrentActions'

interface OrderCurrentState {
    isLoading: boolean,
    error: string | null,
    ordercurrent: TOrder[],
}

const initialState = {
    isLoading: false,
    error: null,
    ordercurrent: [],
} satisfies OrderCurrentState as OrderCurrentState

export const ordercurrentSlice = createSlice({
    name: 'ordercurrent',
    initialState,
    reducers: {
        setLoading(state: OrderCurrentState, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setError(state: OrderCurrentState, action: PayloadAction<string>) {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getOrderCurrentByStore.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getOrderCurrentByStore.fulfilled, (state, action) => {
            state.isLoading = false;
            state.ordercurrent = action.payload!.data;
        })
        .addCase(getOrderCurrentByStore.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload! as string | "Unknown error";
        })
        //handle update order current status
        .addCase(updateOrderCurrentStatus.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(updateOrderCurrentStatus.fulfilled, (state, action) => {
            state.isLoading = false;
            state.ordercurrent = action.payload!.data;
        })
        .addCase(updateOrderCurrentStatus.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload! as string | "Unknown error";
        })
    }
});

export const { setLoading, setError } = ordercurrentSlice.actions

export const selectOrderHistory = (state: RootState) => state.ordercurrent.ordercurrent;

export default ordercurrentSlice.reducer;