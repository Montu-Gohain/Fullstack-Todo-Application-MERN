import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import protectedRequest from "../../scripts/protectedRequest";
import thunkPromiseHandler from "../../scripts/thunkPromiseHandler";

export const thunks = {
    fetchTodos : createAsyncThunk("todos/fetchTodos", async (_, T) => (
        thunkPromiseHandler(protectedRequest().get("/api/todos/me"), T)
    )),
    createTodo : createAsyncThunk("todos/createTodo", async (todo, T) => (
        thunkPromiseHandler(protectedRequest().post("/api/todos", todo), T)
    )),
    updateTodo : createAsyncThunk("todos/updateTodo", async (todo, T) => (
        thunkPromiseHandler(protectedRequest().put(`/api/todos/${todo._id}`, todo), T)
    )),
    deleteTodo : createAsyncThunk("todos/deleteTodo", async (todo, T) => (
        thunkPromiseHandler(protectedRequest().delete(`/api/todos/${todo._id}`), T)
    )),
    deleteAll : createAsyncThunk("todos/deleteAll", async (_, T) => (
        thunkPromiseHandler(protectedRequest().delete("/api/todos/me"), T)
    ))
}

export const { reducer, actions } = createSlice({
    name : "todos",
    initialState : { 
        todos : [], numDispatches : 0, isLoading : false
    },
    reducers : {
        clearTodos (state) {
            state.todos = []
            state.numDispatches = 0
        }
    },
    extraReducers ({addCase}) {
        addCase(thunks.fetchTodos.pending, (state) => { state.isLoading = true })
        addCase(thunks.fetchTodos.rejected, (state) => { state.isLoading = false })
        addCase(thunks.fetchTodos.fulfilled, (state, {payload:todos}) => {
            state.todos = todos
            state.isLoading = false
        })
        helper.methods.forEach((n) => {
            addCase(thunks[n].pending, helper.pending)// Fulfilled Cases
            addCase(thunks[n].fulfilled, helper.fulfilled)// Fulfilled Cases
            addCase(thunks[n].rejected, helper.rejected)// Rejected Cases
        })
    }
})

const helper = {
    methods : ["createTodo", "updateTodo", "deleteTodo", "deleteAll"],
    pending(state) {
        state.isLoading = true
    },
    fulfilled (state) {
        state.numDispatches++
        state.isLoading = false
    },
    rejected (state, { payload:errorMessage }) {
        state.isLoading = false
        alert(errorMessage)
    }
}

