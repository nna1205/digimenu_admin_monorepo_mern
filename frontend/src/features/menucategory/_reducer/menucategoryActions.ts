import { createAsyncThunk } from '@reduxjs/toolkit'
import {setLoading, setError} from './menucategorySlice';
import {TNewMenuCategory, TUpdateMenuCategory} from '../MenuCategory.type';

export const getMenuCategories = createAsyncThunk(
    "menucategory/getall",
    async (store_id: string, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await fetch(`http://localhost:3000/api/v1/menucategory/?store_id=${store_id}`);
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

export const createMenuCategory = createAsyncThunk(
    "menucategory/create",
    async (category: TNewMenuCategory, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(category),
            };
            const response = await fetch(`http://localhost:3000/api/v1/menucategory/create`, requestOptions);
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

export const updateMenuCategory = createAsyncThunk(
    "menucategory/update",
    async (category: TUpdateMenuCategory, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(category)
            };
            const response = await fetch(`http://localhost:3000/api/v1/menucategory/update`, requestOptions);
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

export const deleteMenuCategory = createAsyncThunk(
    "menucategory/delete",
    async (category_id: string, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            };
            const response = await fetch(`http://localhost:3000/api/v1/menucategory/delete?category_id=${category_id}`, requestOptions);
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