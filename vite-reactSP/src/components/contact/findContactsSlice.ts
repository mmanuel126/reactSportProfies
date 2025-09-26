import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Contact } from "../../types/contact";
import { getSearchContacts } from "../../services/contactService";
import type { RootState } from "../../store";

// Correct usage of getState to get memberID
export const fetchFindContacts = createAsyncThunk<
  Contact[],
  string,
  { state: RootState }
>("search/fetchUsers", async (query, thunkAPI) => {
  const memberID = thunkAPI.getState().auth.user?.member_id;
  if (!memberID) {
    throw new Error("Missing memberID");
  }

  return await getSearchContacts(memberID, query);
});

// Interface name and type consistency
interface SearchState {
  query: string;
  results: Contact[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: "",
  results: [],
  loading: false,
  error: null,
};

const findContactsSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFindContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFindContacts.fulfilled, (state, action) => {
        state.results = action.payload;
        state.loading = false;
      })
      .addCase(fetchFindContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      });
  },
});

export const { setQuery } = findContactsSlice.actions;
export default findContactsSlice.reducer;
