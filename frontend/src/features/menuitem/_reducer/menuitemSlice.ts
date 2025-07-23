import { createSlice, type PayloadAction  } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'
import {getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem} from './menuitemActions';
import {TMenuItemWithCategory} from '../MenuItem.type';

interface MenuItemState {
    isLoading: boolean,
    error: string | null,
    menuitem: TMenuItemWithCategory[], 
}

const initialState = {
    isLoading: false,
    error: null,
    menuitem: [],
} satisfies MenuItemState as MenuItemState

export const menuitemSlice = createSlice({
    name: 'menuitem',
    initialState,
    reducers: {
        setLoading(state: MenuItemState, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setError(state: MenuItemState, action: PayloadAction<string>) {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        //hanlde getMenuItems
        builder
        .addCase(getMenuItems.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getMenuItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.menuitem = action.payload!.data;
        })
        .addCase(getMenuItems.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload! as string | "Unknown error";
        })
        //handle createMenuItem
        .addCase(createMenuItem.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(createMenuItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.menuitem = [...state.menuitem, action.payload!.data];
        })
        .addCase(createMenuItem.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload! as string | "Unknown error";
        })
        //handle updateMenuItem
        .addCase(updateMenuItem.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(updateMenuItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.menuitem = state.menuitem.map(item => {
                if (item.id === action.payload!.data.id) {
                    return action.payload!.data;
                }
                return item;
            });
        })
        .addCase(updateMenuItem.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload! as string | "Unknown error";
        })
        //handle deleteMenuItem
        .addCase(deleteMenuItem.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(deleteMenuItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.menuitem = state.menuitem.filter(item => item.id !== action.payload!.data.id);
        })
        .addCase(deleteMenuItem.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload! as string | "Unknown error";
        })
    }
})

export const { setLoading, setError } = menuitemSlice.actions

export const selectMenuItem = (state: RootState) => state.menuitem.menuitem;

export default menuitemSlice.reducer