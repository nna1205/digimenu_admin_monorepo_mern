import { createAsyncThunk } from '@reduxjs/toolkit'
import {setLoading, setError} from './orderhistorySlice'

export const getHistoryOrderByStore = createAsyncThunk(
    "order/getstoreordershistory",
    async (store_id: string, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await fetch(`http://localhost:3000/api/v1/order/history/store?store_id=${store_id}`);
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
);

export const deleteOrder = createAsyncThunk(
    "order/delete",
    async (order_id: string, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            };
            const response = await fetch(`http://localhost:3000/api/v1/order/delete?order_id=${order_id}`, requestOptions);
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
);