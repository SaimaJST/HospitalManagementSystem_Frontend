import Login from "../pages/Auth/login";
import Home from "../pages/home";
import Register from "../pages/Auth/register";
import Profile from "../pages/patient/profile";
import Welcome from "../pages/welcome";
import PostBlood from "../pages/postBlood";
import PatientAppointMent from "../pages/patient/appointment";
import DocDashboard from "../pages/doctor/docDashboard";
import NurseDashboard from "../pages/nurse/nurseDashboard";
import TreatmentForm from "../pages/treatmentForm";
import DocProfile from "../pages/doctor/docProfile";
import DocAppointment from "../pages/doctor/docAppointment";
import Appointment from "../pages/patient/profileDoctor";
import Status from "../pages/status";

const routes = [
  {
    name: "Home",
    element: Home,
    isPrivate: true,
  },
  {
    name: "Profile",
    element: Profile,
    isPrivate: true,
  },
  {
    name: "PostBlood",
    element: PostBlood,
    isPrivate: true,
  },
  {
    name: "PatientAppointment",
    element: PatientAppointMent,
    isPrivate: true,
  },
  {
    name: "DocDashboard",
    element: DocDashboard,
    isPrivate: true,
  },
  {
    name: "NurseDashboard",
    element: NurseDashboard,
    isPrivate: true,
  },
  {
    name: "TreatmentForm",
    element: TreatmentForm,
    isPrivate: true,
  },
  {
    name: "DocProfile",
    element: DocProfile,
    isPrivate: true,
  },
  {
    name: "DocAppointment",
    element: DocAppointment,
    isPrivate: true,
  },
  {
    name: "Appointment",
    element: Appointment,
    isPrivate: true,
  },
  {
    name: "Status",
    element: Status,
    isPrivate: true,
  },
];

export default routes;
