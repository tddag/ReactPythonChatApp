import { createSlice } from "@reduxjs/toolkit"
import { User } from "../../types/User"

interface UserState {
    currentUser: User | null
}

const initialState: UserState = {
    currentUser: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInSuccess: (state, action) => {
            state.currentUser = action.payload
        },
        reset: (state) => {
            state.currentUser = null;
        }
    }
})

export const { signInSuccess, reset } = userSlice.actions;
export default userSlice.reducer