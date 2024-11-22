import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./cart/CartReducer";

export default configureStore({
    reducer: {
        cart: CartReducer
    }
})