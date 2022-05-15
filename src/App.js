import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';

import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";

import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import SignIn from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";


const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    //stop listening when user unmounts
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
        dispatch(setCurrentUser(user));
      }
      
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />{" "}
        {/*index: this subroute is the default subroute of the parent*/}
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<SignIn />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
