import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";

const Shop = () => {
  return <h1>I am the shop component</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />{" "}
        {/*index: this subroute is the default subroute of the parent*/}
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;
