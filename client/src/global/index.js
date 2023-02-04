// Ref the redux docs: https://redux-toolkit.js.org/tutorials/quick-start

import { configureStore } from "@reduxjs/toolkit"
import { reducer as todosReducer } from "./slices/todosSlice"
import { reducer as usersReducer } from "./slices/usersSlice"

export default configureStore({
    reducer : {
        todos : todosReducer,
        users : usersReducer
    }
})