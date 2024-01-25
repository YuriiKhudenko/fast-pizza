import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./../ui/Loader";

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />

      <main>
        <h1>Content</h1>
        {/* // render whatever is a current nested route */}
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
};

export default AppLayout;
