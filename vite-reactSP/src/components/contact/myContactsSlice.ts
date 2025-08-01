import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Contact } from "../../types/contact";
import { getMyContacts } from "../../services/contactService";
import type { RootState } from "../../store";

// Correct usage of getState to get memberID
export const fetchMyContacts = createAsyncThunk<
  Contact[],
  string,
  { state: RootState }
>("contact/fetchMyContacts", async (query, thunkAPI) => {
  const memberID = thunkAPI.getState().auth.user?.memberID;
  if (!memberID) {
    throw new Error("Missing memberID");
  }

  return await getMyContacts(memberID, query);
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

const myContactsSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyContacts.fulfilled, (state, action) => {
        state.results = action.payload;
        state.loading = false;
      })
      .addCase(fetchMyContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      });
  },
});

export const { setQuery } = myContactsSlice.actions;
export default myContactsSlice.reducer;
