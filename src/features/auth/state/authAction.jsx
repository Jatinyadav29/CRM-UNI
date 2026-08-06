import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../config/api";
import { toast } from "react-toastify";

export const loginUserAction = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      console.log("Thunk action triggereddd ......");

      let res = await api.post("/auth/login", credentials);
      localStorage.setItem("accessToken", res.data.accessToken);

      toast.success("User Login succesful 🙌");

      return res.data;
    } catch (error) {
      toast.error("Authentication failed ☹️");
      return thunkApi.rejectWithValue("Login failed");
    }
  },
);

export const hydrateUserAction = createAsyncThunk(
  "/auth/hydrate",
  async (_, thunkApi) => {
    let token = localStorage.getItem("accessToken");

    try {
      let res = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("User authorized");
      return res.data;
    } catch (error) {
      toast.error("User unauthorized");
      return thunkApi.rejectWithValue("User Unauthorized");
    }
  },
);
