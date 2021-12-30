import { combineReducers } from "redux";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import categoryReducer from "./categoryReducer";
import messageReducer from "./messageReducer";

const rootReducer = combineReducers({
    userReducer: userReducer,
    cartReducer: cartReducer,
    categoryReducer: categoryReducer,
    messageReducer: messageReducer
})

export default rootReducer;