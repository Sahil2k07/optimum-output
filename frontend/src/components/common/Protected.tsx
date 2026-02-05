import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

function Protected({ children }: Props) {
  const token = localStorage.getItem("API_TOKEN");

  if (!token) {
    return <Navigate to={"/signin"} />;
  }

  return children;
}

export default Protected;
