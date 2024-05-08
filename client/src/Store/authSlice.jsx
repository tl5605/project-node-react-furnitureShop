import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: sessionStorage.getItem("token") || "",
        isUserLoggedIn: sessionStorage.getItem("token") ? true : false
    },
    reducers: {
        setToken: (state, action) => {
            const token = action.payload.accessToken
            state.token = token
            state.isUserLoggedIn = true
            sessionStorage.setItem("token", token)
        },
        removeToken: (state) => {
            state.token = ""
            state.isUserLoggedIn = false
            sessionStorage.removeItem("token")
        }
    }
})

export default authSlice.reducer
export const { setToken, removeToken } = authSlice.actions
export const selectToken = (state)=>state.auth.token