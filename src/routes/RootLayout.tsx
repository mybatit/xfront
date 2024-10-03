import Header from "@/components/ui/layout/Header";
import { Outlet } from "react-router-dom";

const RootLayout = () => {


  return (
    <>
      <Header/>
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default RootLayout;
