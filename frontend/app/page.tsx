import LoginPage from "@/src/views/pages/LoginPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "eClinic",
  description: "Nurse Dashboard",
};
const LandingPage = () => {
  return <LoginPage />;
};

export default LandingPage;
