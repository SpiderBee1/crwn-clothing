import { Outlet } from "react-router-dom";

import Directory, {categories} from "../../components/directory/directory.component";

const Home = () => {
  

  return (
    <div>
      <Directory categories={categories} />
      <Outlet />
    </div>
  );
};

export default Home;
