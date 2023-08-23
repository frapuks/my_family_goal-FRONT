// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import { useSelector } from "react-redux";
// // Components
// import NavBar from "../NavBar/NavBar";
// import ProtectedRoute from "../Routes/ProtectedRoute";
// import Header from "../Header/Header";
// import Page404 from "./404/Page404";
// // Pages
// import LoginPage from "../../pages/LoginPage";
// import SettingsPage from "../../pages/SettingsPage";
// import SignUpPage from "../../pages/SignUpPage";
// import CreateFamilyPage from "../../pages/CreateFamilyPage";
// import NameFamilyPage from "../../pages/NameFamilyPage";
// import UserSettingsPage from "../../pages/UserSettingsPage";
// import FamilySettingsPage from "../../pages/FamilySettingsPage";
// import DashboardPage from "../../pages/DashboardPage";

// function App() {
//     const token = useSelector(state => state.user.token);

//     return (
//         <>
//             {token && <Header />}

//             <Routes>
//                 <Route path="/" element={<LoginPage />} />
                
//                 <Route path="/signup" element={<SignUpPage />} />

//                 <Route path="/settings" element={<ProtectedRoute />}>
//                     <Route path="/settings" element={<SettingsPage />} />
//                 </Route>

//                 <Route path="/usersettings" element={<ProtectedRoute />}>
//                     <Route path="/usersettings" element={<UserSettingsPage />} />
//                 </Route>

//                 <Route path="/createfamily" element={<ProtectedRoute />}>
//                     <Route path="/createfamily" element={<CreateFamilyPage />} />
//                 </Route>

//                 <Route path="/namefamily" element={<ProtectedRoute />}>
//                     <Route path="/namefamily" element={<NameFamilyPage />} />
//                 </Route>

//                 <Route path="/familysettings" element={<ProtectedRoute />}>
//                     <Route path="/familysettings" element={<FamilySettingsPage />} />
//                 </Route>

//                 <Route path="/dashboard" element={<ProtectedRoute />}>
//                     <Route path="/dashboard" element={<DashboardPage />} />
//                 </Route>

//                 <Route path="/404" element={<Page404 />} />

//                 <Route path="*" element={<Page404 />} />
//             </Routes>

//             {token && <NavBar />}
//         </>
//     );
// }

// export default App;