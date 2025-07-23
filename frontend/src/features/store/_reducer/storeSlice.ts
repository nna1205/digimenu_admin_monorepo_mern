import { createSlice, createAsyncThunk, type PayloadAction  } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'
import {TStore } from '../Store.type';

interface StoreState {
    isLoading: boolean,
    error: string | null,
    store: TStore,
}

const initialState = {
    isLoading: false,
    error: null,
    store: {
        id: "",
        user_id: "",
        name: "",
        description: "",
        phone_number: "",
        img_url: "",
        address: "",
        open_time: "",
        close_time: "",
        created_at: "",
        updated_at: ""
    },
} satisfies StoreState as StoreState;

export const getStoreDetail = createAsyncThunk(
    "store/detail",
    async (storeid: string, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await fetch(`http://localhost:3000/api/v1/store/${storeid}`);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return response.json();
        } catch (error) {
            thunkAPI.dispatch(setError(error as string));
            thunkAPI.rejectWithValue(error as string);
            throw error;
        } finally {
            thunkAPI.dispatch(setLoading(false));
        }
    } 
)

export const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        setLoading(state: StoreState, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setError(state: StoreState, action: PayloadAction<string>) {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getStoreDetail.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getStoreDetail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.store = action.payload!.data;
        })
        .addCase(getStoreDetail.rejected, (state, action) => {
            state.isLoading = true;
            state.error = action.payload! as string | "Unknown error";
        })
    },
});

export const { setLoading, setError } = storeSlice.actions

export const selectStore = (state: RootState) => state.store.store;

export default storeSlice.reducer