import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Search } from "../../types/search";
import { getSearchList } from "../../services/contactService";
import type { RootState } from "../../store";

// Correct usage of getState to get memberID
export const fetchUsers = createAsyncThunk<
  Search[],
  string,
  { state: RootState }
>("search/fetchUsers", async (query, thunkAPI) => {
  const memberID = thunkAPI.getState().auth.user?.member_id;
  if (!memberID) {
    throw new Error("Missing memberID");
  }

  return await getSearchList(memberID, query);
});

// Interface name and type consistency
interface SearchState {
  query: string;
  results: Search[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: "",
  results: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.results = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      });
  },
});

export const { setQuery } = searchSlice.actions;
export default searchSlice.reducer;
