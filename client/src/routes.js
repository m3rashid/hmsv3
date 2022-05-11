import Home from "./pages/home";
import Doctor from "./pages/doctor";
import Patient from "./pages/patient";
import Pharmacy from "./pages/pharmacy";
import Reception from "./pages/reception";
import Appointments from "./pages/appointments";
import Admin from "./pages/admin";

export const validateRoute = (Auth, route) => {
  if (Auth.isLoggedIn) {
    const { user } = Auth;

    if (!route.role.includes(user.role)) {
      return false;
    }
  } else {
    if (route.isLoggedIn === true) {
      return false;
    }
  }
  return true;
};

const routes = [
  {
    path: "/",
    component: Home,
    text: "Home",
    role: ["ADMIN", "RECEPTIONIST", "DOCTOR", "PATIENT", "PHARMACY"],
    isLoggedIn: false,
  },
  {
    path: "/admin",
    component: Admin,
    text: "Admin",
    role: ["ADMIN"],
    isLoggedIn: true,
  },
  {
    path: "/doctor",
    component: Doctor,
    text: "Doctor",
    role: ["ADMIN", "DOCTOR"],
    isLoggedIn: true,
  },
  {
    path: "/patient",
    component: Patient,
    text: "Patient",
    role: ["ADMIN", "PATIENT"],
    isLoggedIn: true,
  },
  {
    path: "/pharmacy",
    component: Pharmacy,
    text: "Pharmacy",
    role: ["ADMIN", "PHARMACY"],
    isLoggedIn: true,
  },
  {
    path: "/reception",
    component: Reception,
    text: "Reception",
    role: ["ADMIN", "RECEPTIONIST"],
    isLoggedIn: true,
  },
  {
    path: "/appointments",
    component: Appointments,
    text: "Appointments",
    role: ["ADMIN", "RECEPTIONIST"],
    isLoggedIn: true,
  },
];

export default routes;
