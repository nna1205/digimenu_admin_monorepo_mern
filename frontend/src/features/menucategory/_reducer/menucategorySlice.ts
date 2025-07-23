import { createSlice, type PayloadAction  } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'
import {TMenuCategory} from '../MenuCategory.type';
import { getMenuCategories, createMenuCategory, updateMenuCategory, deleteMenuCategory } from './menucategoryActions';

interface MenuCategoryState {
    isLoading: boolean,
    error: string | null,
    categories: TMenuCategory[],
}

const initialState = {
    isLoading: false,
    error: null,
    categories: [],
} satisfies MenuCategoryState as MenuCategoryState

export const menucategorySlice = createSlice({
    name: 'menucategory',
    initialState,
    reducers: {
        setLoading(state: MenuCategoryState, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setError(state: MenuCategoryState, action: PayloadAction<string>) {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        //handle getMenuCategories
        .addCase(getMenuCategories.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getMenuCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = action.payload!.data;
        })
        .addCase(getMenuCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload! as string | "Unknown error";
        })
        //handle createMenuCategory
        .addCase(createMenuCategory.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(createMenuCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = [...state.categories, action.payload!.data];
        })
        .addCase(createMenuCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload! as string | "Unknown error";
        })
        //handle updateMenuCategory
        .addCase(updateMenuCategory.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(updateMenuCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = state.categories.map(category => {
                if (category.id === action.payload!.data.id) {
                    return action.payload!.data;
                }
                return category;
            });
        })
        .addCase(updateMenuCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload! as string | "Unknown error";
        })
        //handle deleteMenuCategory
        .addCase(deleteMenuCategory.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(deleteMenuCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = state.categories.filter(category => category.id !== action.payload!.data.id);
        })
        .addCase(deleteMenuCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload! as string | "Unknown error";
        })
    }
});

export const { setLoading, setError } = menucategorySlice.actions

export const selectCategory = (state: RootState) => state.menucategory.categories;

export default menucategorySlice.reducer