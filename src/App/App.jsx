//~ Import Module
import { Routes, Route } from "react-router-dom";
import { mainRoutes } from "../Routes/Routes";
import Layout from '../Layout/Layout';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {mainRoutes}
      </Route>
    </Routes>
  );
};

export default App;