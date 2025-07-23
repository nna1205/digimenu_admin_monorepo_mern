import { createSlice, type PayloadAction  } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'
import { TOptiongroupWithItems} from '../OptionGroup.type';
import { getOptionGroupByStore, createOptionGroup, deleteOptionGroup } from './optiongroupActions';

interface OptionGroupState {
    isLoading: boolean,
    error: string | null,
    optiongroup: TOptiongroupWithItems[], 
}

const initialState = {
    isLoading: false,
    error: null,
    optiongroup: [],
} satisfies OptionGroupState as OptionGroupState

export const optiongroupSlice = createSlice({
    name: 'optiongroup',
    initialState,
    reducers: {
        setLoading(state: OptionGroupState, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setError(state: OptionGroupState, action: PayloadAction<string>) {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        //handle getOptionGroupByStore
        builder
        .addCase(getOptionGroupByStore.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getOptionGroupByStore.fulfilled, (state, action) => {
            state.isLoading = false;
            state.optiongroup = action.payload!.data;
        })
        .addCase(getOptionGroupByStore.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload! as string | "Unknown error";
        })
        //handle createOptionGroup
        .addCase(createOptionGroup.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(createOptionGroup.fulfilled, (state, action) => {
            state.isLoading = false;
            state.optiongroup = [...state.optiongroup, action.payload!.data];
        })
        .addCase(createOptionGroup.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload! as string | "Unknown error";
        })
        //handle deleteOptionGroup
        .addCase(deleteOptionGroup.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(deleteOptionGroup.fulfilled, (state, action) => {
            state.isLoading = false;
            state.optiongroup = state.optiongroup.filter(optiongroup => optiongroup.id !== action.payload!.data.id);
        })
        .addCase(deleteOptionGroup.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload! as string | "Unknown error";
        })
    }
});

export const { setLoading, setError } = optiongroupSlice.actions

export const selectOptionGroup = (state: RootState) => state.optiongroup.optiongroup;

export default optiongroupSlice.reducer;
