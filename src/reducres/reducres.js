import { combineReducers } from "redux";
import categoryReducer from './category.reducer'
import productReducer from './product.reducer'
import authReducer from './auth.reducer'
import cartReducer from './cart.reducer'
import userReducer from './user.reducer'
const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
})

export default rootReducer;