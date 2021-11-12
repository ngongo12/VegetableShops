import { combineReducers } from "redux";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
const rootReducer = combineReducers({
    userReducer: userReducer,
    cartReducer: cartReducer
})

export default rootReducer;