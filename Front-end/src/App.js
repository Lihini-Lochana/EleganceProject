import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ViewSeason } from "./components/ViewSeason";
import { CreateSeason } from "./components/CreateSeason";
import { ViewSeasonTable } from "./components/ViewSeasonTable";
import CreatePackage from "./components/CreatePackage";
import AddPlace from "./components/AddPlace";
import AddVehicle from "./components/AddVehicle";
import PackagePlace from "./components/PackagePlace";
import VehiclePackage from "./components/VehiclePackage";
import ViewPackage from "./components/ViewPackage";
import "./App.css";
import ViewSeasonPackages from "./components/ViewSeasonPackages";
import ViewPackageDetails from "./components/ViewPackageDetails";
import PreVehicleSelection from "./components/PreVehicleSelection";
import EventCreation from "./components/EventCreation";
import EventSelection from "./components/EventSelection";
import BookingForm from "./components/BookingForm";

import { BookingProvider } from "./context/BookingContext";
import TouristBookings from "./components/TouristBookings";
import CancelReasonForm from "./components/CancelReasonForm";
import AdminBookings from "./components/AdminBookings";
import RejectReasonForm from "./components/RejectReasonForm";
import CreateGuideForm from "./components/CreateGuideForm";
import GuideDetails from "./components/GuideDetails";
import TouristNotification from "./components/TouristNotification";
import ViewBookingAccept from "./components/ViewBookingAccept";
import BookingAcceptForm from "./components/BookingAcceptForm";
import RejectReasonView from "./components/RejectReasonView";
import BookingStatusRedirect from "./components/BookingStatusRedirect";
import AdminBookingById from "./components/AdminBookingById";
import GuideNotification from "./components/GuideNotification";
import CancelReasonView from "./components/CancelReasonView";

function App() {
    return (
        <BookingProvider>
            <Router>
                <Routes>
                    <Route path="/tourist-view-season" element={<ViewSeason />} />
                    <Route path="/view-season-packages/:seasonId" element={<ViewSeasonPackages />} />
                    <Route path="/view-package-details/:packageId" element={<ViewPackageDetails />} />
                    <Route path="/vehicle-selection/:packageId/:passengerCount" element={<PreVehicleSelection />} />
                    <Route path="/event-selection/:packageId" element={<EventSelection />} />
                    <Route path="/booking-form/:packageId" element={<BookingForm />} />

                    <Route path="/create-season" element={<CreateSeason />} />
                    <Route path="/admin-view-season" element={<ViewSeasonTable />} />
                    <Route path="/create-package/:seasonId" element={<CreatePackage />} />
                    <Route path="/add-package-places/:packageId" element={<PackagePlace />} />
                    <Route path="/add-package-vehicles/:packageId" element={<VehiclePackage />} />
                    <Route path="/view-package/:packageId" element={<ViewPackage />} />
                    <Route path="/add-place" element={<AddPlace />} />
                    <Route path="/add-vehicle" element={<AddVehicle />} />
                    <Route path="/create-event" element={<EventCreation />} />
                    <Route path="/tourist-bookings/:touristId" element={<TouristBookings />} />
                    <Route path="/cancel-booking/:bookingId" element={<CancelReasonForm />} />
                    <Route path="/admin-bookings" element={<AdminBookings />} />
                    <Route path="/bookings-accept/:bookingId" element={<BookingAcceptForm />} />
                    <Route path="/bookings-reject/:bookingId" element={<RejectReasonForm />} />
                    <Route path="/create-guide" element={<CreateGuideForm />} />
                    <Route path="/view-accept/:bookingId" element={<ViewBookingAccept />} />
                    <Route path="/guides/:guideId" element={<GuideDetails />} />
                    <Route path="/t-notifications" element={<TouristNotification />} />
                    <Route path="/view-reject/:bookingId" element={<RejectReasonView />} />
                    <Route path="/booking-status-redirect/:bookingId" element={<BookingStatusRedirect />} />
                    <Route path="/booking-by-id/:id" element={<AdminBookingById />} />
                    <Route path="/g-notifications" element={<GuideNotification />} />
                    <Route path="/view-cancel/:bookingId" element={<CancelReasonView />} />



                </Routes>
            </Router>
        </BookingProvider>
    );
}

export default App;
