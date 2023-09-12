//~ Import Module
import { Route } from "react-router-dom";
import { LoginPage, SignUpPage, UserSettingsPage, CreateFamilyPage, NameFamilyPage, FamilySettingsPage, DashboardPage, SettingsPage } from "../Pages";

const Router = [
  // { id: 1, mainPath: "*", mainElement: <Page404 /> },
  { id: 1, mainPath: "/", mainElement: <LoginPage /> },
  { id: 2, mainPath: "/signup", mainElement: <SignUpPage /> },
  { id: 3, mainPath: "/usersettings", mainElement: <UserSettingsPage /> },
  { id: 4, mainPath: "/createfamily", mainElement: <CreateFamilyPage /> },
  { id: 5, mainPath: "/namefamily", mainElement: <NameFamilyPage /> },
  { id: 6, mainPath: "/familysettings", mainElement: <FamilySettingsPage /> },
  { id: 7, mainPath: "/dashboard", mainElement: <DashboardPage /> },
  { id: 8, mainPath: "/settings", mainElement: <SettingsPage /> },
];

const mainRoutes = Router.map(({ id, mainPath, mainElement }) => <Route key={id} path={mainPath} element={mainElement} />);

export { Router, mainRoutes };