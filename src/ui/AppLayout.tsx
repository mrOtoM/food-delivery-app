import { Outlet, useNavigation } from "react-router-dom";

import CartOverview from "@/features/cart/CartOverview";
import Header from "@/ui/Header";
import Loader from "@/ui/loader";

function AppLayout() {
  const navigation = useNavigation();
  const loading = navigation.state === "loading";
  console.log("navigation", navigation);

  return (
    <div className="layout">
      {loading && <Loader />}

      <Header />

      <main>
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
