import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BarkipediaApi from "../../api";

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (userData) => {
    return await BarkipediaApi.signup(userData);
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (loginData) => {
    return await BarkipediaApi.login(loginData);
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (username) => {
    return await BarkipediaApi.deleteUser(username);
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({username, updateData}) => {
    console.log(`reducer is reading ${username} and ${updateData}`)
    return await BarkipediaApi.updateUser(username, updateData);
  }
);

export const saveFact = createAsyncThunk(
  "user/saveFact",
  async ({ username, fact }) => {
    return await BarkipediaApi.saveFact(username, fact);
  }
);

export const deleteFact = createAsyncThunk(
  "user/deleteFact",
  async ({ username, factBody }) => {
    return await BarkipediaApi.deleteFact(username, factBody);
  }
);

export const getSavedFacts = createAsyncThunk(
  "user/getSavedFacts",
  async (username) => {
    return await BarkipediaApi.getSavedFacts(username);
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    status: "idle",
    error: null,
    facts: [],
  },
  reducers: {
    clearUser: (state) => {
      state.currentUser = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // handle user signing up
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload.username;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //handle user logging in
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload.username;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //handles user deletion
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.currentUser = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // handles updating user
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload.username;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handle saving a fact to user's saved facts
      .addCase(saveFact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveFact.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(saveFact.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //handles deleting specific facts from user's saved facts
      .addCase(deleteFact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteFact.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteFact.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handle retrieving user saved facts
      .addCase(getSavedFacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSavedFacts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.facts = action.payload.facts;
      })
      .addCase(getSavedFacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder.addCase(userSlice.actions.clearUser, (state) => {
      state.status = "idle";
      state.currentUser = null;
      state.error = null;
    });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
