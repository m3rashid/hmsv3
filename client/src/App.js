// import { Button } from "antd";
import AppLayout from "./components/Layout/AppLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Doctor from "./pages/doctor";
import Patient from "./pages/patient";
import Pharmacy from "./pages/pharmacy";
import Reception from "./pages/reception";
import Appointments from "./pages/appointments";
import Admin from "./pages/admin";
import Receptionists from "./pages/admin/receptionists";
import Doctors from "./pages/admin/doctors";
import Patients from "./pages/admin/patients";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <div className="App">
          <div
            style={{
              height: "100vh",
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin/home" element={<Admin />} />
              <Route path="/admin/receptionists" element={<Receptionists />} />
              <Route path="/admin/doctors" element={<Doctors />} />
              <Route path="/admin/patients" element={<Patients />} />
              <Route path="/doctor" element={<Doctor />} />
              <Route path="/patient" element={<Patient />} />
              <Route path="/pharmacy" element={<Pharmacy />} />
              <Route path="/reception" element={<Reception />} />
              <Route path="/appointments" element={<Appointments />} />
            </Routes>
          </div>
        </div>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
