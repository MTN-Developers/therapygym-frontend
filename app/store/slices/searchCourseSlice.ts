import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  searchTerm: string;
}

const initialState: IInitialState = {
  searchTerm: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { updateSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;
