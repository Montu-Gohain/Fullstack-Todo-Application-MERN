export default function thunkPromiseHandler (promise, thunkAPI) {
    return promise
        .then(({data}) => thunkAPI.fulfillWithValue(data))
        .catch((e) => thunkAPI.rejectWithValue(e?.response?.data?.message))
}