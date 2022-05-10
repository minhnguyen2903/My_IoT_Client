import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrimarySearchAppBar from "./layouts/header";
import Dashboard from "./pages/dashboard";
import Chart from "./pages/chart";
import Login from "./pages/login";
import MainPage from "./pages";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import Example from "./components/notification";
import Setting from "./pages/setting";

export const socket = io.connect("https://m-iot.herokuapp.com");

function App() {
  const sensorData = useSelector((state) => state.data.clientData.sensor);
  function showNotifications() {
    if (this.n.supported()) this.n.show();
  }

  return (
    <BrowserRouter>
      <div className="App">
        {sensorData[0].value > 40 && (
          <Example message="CẢNH BÁO RÒ RỈ KHÍ GAS" />
        )}
        {sensorData[1].value > 45 && (
          <Example message="CẢNH BÁO NHIÊT ĐỘ CAO" />
        )}
        <PrimarySearchAppBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <MainPage>
                <Dashboard />
              </MainPage>
            }
          />
          <Route
            path="/chart"
            element={
              <MainPage>
                <Chart />
              </MainPage>
            }
          />
          <Route
            path="/setting"
            element={
              <MainPage>
                <Setting />
              </MainPage>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
