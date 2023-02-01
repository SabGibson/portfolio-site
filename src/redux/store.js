import {configureStore} from "@reduxjs/toolkit"
import { accountReducer} from "./user/"

export default configureStore({
    reducer: {
        user:accountReducer

    }
})