import { createAsyncThunk } from '@reduxjs/toolkit'
import {setLoading, setError} from './menuitemSlice';
import {TNewMenuItem, TUpdateMenuItem} from '../MenuItem.type';

export const getMenuItems = createAsyncThunk(
    "menuitem/getall",
    async (store_id: string, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await fetch(`http://localhost:3000/api/v1/menuitem?store_id=${store_id}`);
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

export const createMenuItem = createAsyncThunk(
    "menuitem/create",
    async (formData: TNewMenuItem, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            };
            const response = await fetch(`http://localhost:3000/api/v1/menuitem/create`, requestOptions);
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

export const updateMenuItem = createAsyncThunk(
    "menuitem/update",
    async (menuitem: TUpdateMenuItem, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: menuitem.id,
                    name: menuitem.name,
                    description: menuitem.description,
                    img_url: menuitem.img_url,
                    price: parseFloat(menuitem.price),
                    category_id: menuitem.menucategory.id,
                    store_id: menuitem.store_id,
                })
            };
            const response = await fetch(`http://localhost:3000/api/v1/menuitem/update?item_id=${menuitem.id}`, requestOptions);
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

export const deleteMenuItem = createAsyncThunk(
    "menuitem/delete",
    async (item_id: string, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            };
            const response = await fetch(`http://localhost:3000/api/v1/menuitem/delete?item_id=${item_id}`, requestOptions);
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