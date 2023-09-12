//~ Import Module
import { Route } from "react-router-dom";
import { LoginPage, SignUpPage, UserSettingsPage, CreateFamilyPage, NameFamilyPage, FamilySettingsPage, DashboardPage, SettingsPage } from "../Pages";

const Router = [
  // { id: 1, mainPath: "*", mainElement: <Page404 /> },
  { id: 2, mainPath: "/", mainElement: <LoginPage /> },
  { id: 3, mainPath: "/signup", mainElement: <SignUpPage /> },
  { id: 4, mainPath: "/usersettings", mainElement: <UserSettingsPage /> },
  { id: 5, mainPath: "/createfamily", mainElement: <CreateFamilyPage /> },
  { id: 6, mainPath: "/namefamily", mainElement: <NameFamilyPage /> },
  { id: 7, mainPath: "/familysettings", mainElement: <FamilySettingsPage /> },
  { id: 8, mainPath: "/dashboard", mainElement: <DashboardPage /> },
  { id: 9, mainPath: "/settings", mainElement: <SettingsPage /> },
];

const mainRoutes = Router.map(({ id, mainPath, mainElement }) => <Route key={id} path={mainPath} element={mainElement} />);

export { Router, mainRoutes };