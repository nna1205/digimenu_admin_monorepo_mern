import { createAsyncThunk } from '@reduxjs/toolkit'
import {setLoading, setError} from './ordercurrentSlice'

export const getOrderCurrentByStore = createAsyncThunk(
    "order/getstoreorderscurrent",
    async (store_id: string, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await fetch(`http://localhost:3000/api/v1/order/current/store?store_id=${store_id}`);
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


export const updateOrderCurrentStatus = createAsyncThunk(
    "order/update",
    async ({ order_id, order_status }: { order_id: string, order_status: string }, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: order_status
                }),
            };
            const response = await fetch(`http://localhost:3000/api/v1/order/current/update?order_id=${order_id}`, requestOptions);
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
