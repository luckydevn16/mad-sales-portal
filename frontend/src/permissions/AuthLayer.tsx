import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { RootState } from "store";

interface Props {
  roles: string[];
  children: React.ReactElement;
}

const AuthLayer: React.FC<Props> = ({ roles, children }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (user && roles.includes(user?.role)) return children;

  return <Navigate to="/login" replace />;
};

export default AuthLayer;
