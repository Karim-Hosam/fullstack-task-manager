import { createSlice } from "@reduxjs/toolkit";

let savedToken = localStorage.getItem('token');
if (savedToken === 'undefined') {
    localStorage.removeItem('token');
    savedToken = '';
}
const initialState = savedToken || '';
const TokenSlice = createSlice({
    name: "TokenSlice",
    initialState,
    reducers: {
        setToken: (state, { payload }) => {
            return payload ?? '';
        },
        clearToken: (state) => {
            localStorage.removeItem('token');  // Remove token from localStorage
            return '';  // Clear the token in Redux state
        }
    }
})

export const { setToken, clearToken } = TokenSlice.actions;
export const TokenSliceReducer = TokenSlice.reducer;