import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { RootState } from "store";

interface Props {
  children: React.ReactElement;
}

const NoAuthLayer: React.FC<Props> = ({ children }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return children;
  }

  return <Navigate to="/quote" replace />;
};

export default NoAuthLayer;
