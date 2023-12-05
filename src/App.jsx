import { Outlet } from "react-router-dom";
import "./App.css";
import MainLayout from "./Layout/MainLayout";
import Footer from "./Shared/Footer";

function App() {
  return (
    <div className="h-[100vh]">
      <MainLayout>
        <Outlet></Outlet>
      </MainLayout>
      <Footer />
    </div>
  );
}

export default App;
