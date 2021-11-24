import { combineReducers } from "redux";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import categoryReducer from "./categoryReducer";
const rootReducer = combineReducers({
    userReducer: userReducer,
    cartReducer: cartReducer,
    categoryReducer: categoryReducer
})

export default rootReducer;