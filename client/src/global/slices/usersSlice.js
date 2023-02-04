import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import thunkPromiseHandler from "../../scripts/thunkPromiseHandler"

export const thunks = {
    register : createAsyncThunk("auth/register", async (form, T) => (
        thunkPromiseHandler(axios.post("/api/users/register", form), T)
    )),
    login : createAsyncThunk("auth/login", async (form, T) => (
        thunkPromiseHandler(axios.post("/api/users/login", form), T)
    ))
}

export const { reducer, actions } = createSlice({
    name : "users",
    initialState : {
        isLoading : false,
        user : JSON.parse(window.localStorage.getItem("user"))
    },
    reducers : {
        logout (state) {
            window.localStorage.clear()
            state.user = null
        }
    },
    extraReducers ({addCase}) {
        helper.methods.forEach((n) => {
            addCase(thunks[n].pending, helper.registerAndLoginPending)// Pending
            addCase(thunks[n].fulfilled, helper.registerAndLoginFulfilled)// Fulfilled
            addCase(thunks[n].rejected, helper.registerAndLoginRejected)// Rejected
        })
    }
})

const helper = {
    methods : ["login", "register"],
    registerAndLoginPending(state) {
        state.isLoading = true
    },
    registerAndLoginFulfilled(state, { payload:user }) {
        state.isLoading = false
        state.user = user
        window.localStorage.setItem("user", JSON.stringify(user))
    },
    registerAndLoginRejected(state, { payload:errorMessage }) {
        alert(errorMessage || "Auth Rejected")
        state.isLoading = false
    }
}
