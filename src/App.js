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
import { useEffect } from "react";

export const socket = io.connect(process.env.REACT_APP_SOCKET_URL);

function App() {
  const sensorData = useSelector((state) => state.data.clientData.sensor);
  useEffect(() => {
    if(sensorData[0].value > 40) {
      new Notification("Cảnh báo rò rỉ khí gas");
    }
    if(sensorData[1].value > 45) {
      new Notification("Cảnh báo nhiệt độ cao");
    }
  }, [sensorData]);
  return (
    <BrowserRouter>
      <div className="App">
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
