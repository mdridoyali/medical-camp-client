import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from './../Pages/Home';
import AvailableCamp from "../Pages/AvailableCamp";
import ContactUs from "../Pages/ContactUs";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Layout/Dashboard";
import OrganizerProfile from "../Pages/Dashboard/OrganizerRoute/OrganizerProfile";
import AddCamp from "../Pages/Dashboard/OrganizerRoute/AddCamp";
import ManageCamp from "../Pages/Dashboard/OrganizerRoute/ManageCamp";
import ManageRegisteredCamp from "../Pages/Dashboard/OrganizerRoute/ManageRegisteredCamp";
import UpdateCamp from "../Pages/Dashboard/OrganizerRoute/UpdateCamp";
import ErrorPage from './../Components/ErrorPage';
import PrivetRoutes from "./PrivetRoutes";
import CampDetails from "../Pages/CampDetails";
import ParticipantProfile from "../Pages/Dashboard/ParticipantRoute/ParticipantProfile";
import RegisteredCamp from "../Pages/Dashboard/ParticipantRoute/RegisteredCamp";
import Feedback from "../Pages/Dashboard/ParticipantRoute/Feedback";
import Payment from "../Pages/Dashboard/ParticipantRoute/Payment/Payment";
import HealthProfessional from './../Pages/Dashboard/HealthProfessionalRoute/HealthProfessional';
import AddUpcomingCamp from "../Pages/Dashboard/OrganizerRoute/AddUpcomingCamp";
import ManageUpcomingCamps from "../Pages/Dashboard/OrganizerRoute/ManageUpcomingCamps";
import UpcomingCampDetails from "../Pages/Home/UpcomingCampDetails";
import AcceptedCamps from "../Pages/Dashboard/HealthProfessionalRoute/AcceptedCamps";
import PaymentHistory from "../Pages/Dashboard/ParticipantRoute/Payment/PaymentHistory";
import UpdateProfile from "../Pages/Dashboard/OrganizerRoute/UpdateProfile";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'available-camp',
        element: <PrivetRoutes> <AvailableCamp /></PrivetRoutes>
      },
      {
        path: 'camp-details/:id',
        element: <PrivetRoutes> <CampDetails /></PrivetRoutes>
      },
      {
        path: 'upcoming-camp-details/:id',
        element: <PrivetRoutes> <UpcomingCampDetails /></PrivetRoutes>
      },
      {
        path: 'contact-us',
        element: <ContactUs />
      },
    ]
  },
  {
    path: 'dashboard',
    element: <PrivetRoutes><Dashboard /></PrivetRoutes>,
    errorElement: <ErrorPage />,
    children: [
      // for Organizer 
      {
        path: 'organizer-profile',
        element: <PrivetRoutes><OrganizerProfile /></PrivetRoutes>
      },
      {
        path: 'update-profile',
        element: <PrivetRoutes><UpdateProfile /></PrivetRoutes>
      },
      {
        path: 'add-a-camp',
        element: <PrivetRoutes><AddCamp /></PrivetRoutes>
      },
      {
        path: 'manage-camps',
        element: <PrivetRoutes><ManageCamp /></PrivetRoutes>
      },
      {
        path: 'manage-registered-camps',
        element: <PrivetRoutes><ManageRegisteredCamp /></PrivetRoutes>
      },
      {
        path: 'add-upcoming-camp',
        element: <PrivetRoutes><AddUpcomingCamp /></PrivetRoutes>
      },
      {
        path: 'manage-upcoming-camps',
        element: <PrivetRoutes><ManageUpcomingCamps /></PrivetRoutes>
      },
      {
        path: 'update-camp/:id',
        element: <PrivetRoutes><UpdateCamp /></PrivetRoutes>,
        loader: ({ params }) => fetch(`https://medi-camp-server.vercel.app/camp/${params.id}`)
      },

 
      // for Participant
      {
        path: 'participant-profile',
        element: <PrivetRoutes><ParticipantProfile /></PrivetRoutes>
      },
      {
        path: 'registered-camps',
        element: <PrivetRoutes><RegisteredCamp /></PrivetRoutes>
      },
      {
        path: 'payment-history',
        element: <PaymentHistory />
      },
      {
        path: 'feedback',
        element: <PrivetRoutes><Feedback /></PrivetRoutes>
      },
      {
        path: 'payment/:id',
        element: <PrivetRoutes><Payment /></PrivetRoutes>,
        loader: ({ params }) => fetch(`${params.id}`)
      },
      // for health professional
      {
        path: 'health-professional-profile',
        element: <PrivetRoutes><HealthProfessional /></PrivetRoutes>
      },
      {
        path: 'accepted-camps',
        element: <PrivetRoutes><AcceptedCamps /></PrivetRoutes>
      },
    ]
  },



  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
]);

export default router