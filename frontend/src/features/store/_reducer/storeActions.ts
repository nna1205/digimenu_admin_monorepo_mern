import { createAsyncThunk } from '@reduxjs/toolkit'
import { setLoading, setError } from './storeSlice';
import { TNewStore, TUpdateStore } from '../Store.type';

export const getStoreDetail = createAsyncThunk(
    "store/detail",
    async (store_id: string, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await fetch(`http://localhost:3000/api/v1/store/${store_id}`);
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

export const createStore = createAsyncThunk(
    "store/create",
    async (formData: TNewStore, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            };
            const response = await fetch(`http://localhost:3000/api/v1/store/create`, requestOptions);
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

export const updateStoreDetail = createAsyncThunk(
    "store/update",
    async (formData: TUpdateStore, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    description: formData.description,
                    address: formData.address,
                    phone_number: formData.phone_number,
                    img_url: formData.img_url,
                    open_time: formData.open_time,
                    close_time: formData.close_time,
                })
            };
            const response = await fetch(`http://localhost:3000/api/v1/store/update?store_id=${formData.id}`, requestOptions);
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