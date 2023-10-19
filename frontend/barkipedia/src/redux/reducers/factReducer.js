import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BarkipediaApi from "../../api";


// Async thunk for fetching a single fact
export const fetchFact = createAsyncThunk(
    'facts/fetchFact',
    async () => {
      return await BarkipediaApi.getFact();
    }
  );


// Async thunk for fetching multiple facts
export const fetchFacts = createAsyncThunk(
    'facts/fetchFacts',
    async () => {
      return await BarkipediaApi.getFacts();
    }
  );


export const factsSlice = createSlice({
    name: "facts",
    initialState: {
        factValue: ''
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchFact.fulfilled, (state, action) => {
                state.factValue = action.payload;
            })
            .addCase(fetchFacts.fulfilled, (state, action) => {
                state.factValue = action.payload;
            })
    }
})

export default factsSlice.reducer;