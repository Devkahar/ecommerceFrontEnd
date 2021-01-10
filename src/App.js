import './App.css';
import HomePage from './containers/HomePage/HomePage';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import ProductListPage from './containers/ProductListPage/ProductListPage';
import { useEffect } from 'react';
import { isUserLoggedIn, updateCart } from './actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import ProductDetailsPage from './containers/ProductDetailsPage/ProductDetailsPage';
import CartPage from './containers/CartPage/CartPage';
import CheckoutPage from './containers/CheckoutPage/CheckoutPage';
function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  useEffect(()=>{
    if(!auth.authenticate){
      dispatch(isUserLoggedIn());
    }
  },[auth.authenticate])

  useEffect(()=>{
    dispatch(updateCart());
  },[auth.authenticate]);
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/cart" exact component={CartPage}/>
            <Route path="/checkout" exact component={CheckoutPage}/>
            <Route path="/:productSlug/:productId/p" component={ProductDetailsPage}/>
            <Route path="/:slug" component={ProductListPage}/>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
