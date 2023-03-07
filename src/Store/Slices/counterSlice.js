import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    counterDetails: {}
}

const counter = createSlice({
    name: 'counterDetails',
    initialState,
    reducers: {
        getAllCounterDetailSuccess: (state, action) => {
            // const { CId } = action.payload
            state.counterDetails = action.payload
            console.log(state, action);
        }
    }
})

export const {
    getAllCounterDetailSuccess
} = counter.actions;

export default counter.reducer;