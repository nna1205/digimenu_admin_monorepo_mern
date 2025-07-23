import { createAsyncThunk } from '@reduxjs/toolkit'
import {setLoading, setError} from './optiongroupSlice';
import { TNewOptionGroup, TUpdateOptionGroup, TNewOptionItem } from '../OptionGroup.type';

export const getOptionGroupByStore = createAsyncThunk(
    "optiongroup/getoptiongroup",
    async (store_id: string, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await fetch(`http://localhost:3000/api/v1/optiongroup?store_id=${store_id}`);
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

export const createOptionGroup = createAsyncThunk(
    "optiongroup/create",
    async (optiongroup: TNewOptionGroup, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(optiongroup)
            };
            const response = await fetch(`http://localhost:3000/api/v1/optiongroup/create`, requestOptions);
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

export const updateOptionGroup = createAsyncThunk(
    "optiongroup/update",
    async (optiongroup: TUpdateOptionGroup, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(optiongroup)
            };
            const response = await fetch(`http://localhost:3000/api/v1/optiongroup/update`, requestOptions);
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

export const deleteOptionGroup = createAsyncThunk(
    "optiongroup/delete",
    async (option_group_id: string, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            };
            const response = await fetch(`http://localhost:3000/api/v1/optiongroup/delete?option_group_id=${option_group_id}`, requestOptions);
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

export const createOptionItem = createAsyncThunk(
    "optionitem/create",
    async (optionitem: TNewOptionItem, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: optionitem.name,
                    option_group_id: optionitem.option_group_id,
                    price: parseFloat(optionitem.price),
                })
            };
            const response = await fetch(`http://localhost:3000/api/v1/optionitem/create`, requestOptions);
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