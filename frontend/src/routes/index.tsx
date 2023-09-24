import { Navigate, Routes, Route } from "react-router-dom";

import MinimalLayout from "layouts/MinimalLayout";
import MainLayout from "layouts/MainLayout";

import NoAuthLayer from "permissions/NoAuthLayer";
import AuthLayer from "permissions/AuthLayer";

import LoginPage from "pages/authentication/Login";
import InvitationPage from "pages/authentication/Invitation";
import UserPage from "pages/user";
import UserEdit from "pages/user/detail/Index";
import Profile from "pages/profile";
import Quote from "pages/quote";
import QuoteDetail from "pages/quote/detail";
import QuoteVisitCreate from "pages/quote/visit/Create";
import QuoteVisitDetail from "pages/quote/visit/Detail";
import Invitation from "pages/invitation";
import State from "pages/state";
import Error403 from "pages/errors/403";
import Error404 from "pages/errors/404";

import roles from "utils/roles";

const PageRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<MinimalLayout />}>
        <Route
          path="login"
          element={
            <NoAuthLayer>
              <LoginPage />
            </NoAuthLayer>
          }
        />
        <Route
          path="invitation/:token"
          element={
            <NoAuthLayer>
              <InvitationPage />
            </NoAuthLayer>
          }
        />
      </Route>

      <Route
        element={
          <AuthLayer roles={[roles.admin, roles.mad, roles.ecr]}>
            <MainLayout />
          </AuthLayer>
        }
      >
        <Route
          path="profile"
          element={
            <AuthLayer roles={[roles.admin, roles.mad, roles.ecr]}>
              <Profile />
            </AuthLayer>
          }
        />

        <Route path="quote">
          <Route
            index
            element={
              <AuthLayer roles={[roles.admin, roles.mad, roles.ecr]}>
                <Quote />
              </AuthLayer>
            }
          />

          <Route
            path="detail/:id"
            element={
              <AuthLayer roles={[roles.admin, roles.mad, roles.ecr]}>
                <QuoteDetail />
              </AuthLayer>
            }
          />

          <Route path="visit">
            <Route
              path="create"
              element={
                <AuthLayer roles={[roles.admin, roles.mad, roles.ecr]}>
                  <QuoteVisitCreate />
                </AuthLayer>
              }
            />

            <Route
              path="detail/:id"
              element={
                <AuthLayer roles={[roles.admin, roles.mad, roles.ecr]}>
                  <QuoteVisitDetail />
                </AuthLayer>
              }
            />
          </Route>
        </Route>

        <Route path="user">
          <Route
            index
            element={
              <AuthLayer roles={[roles.admin]}>
                <UserPage />
              </AuthLayer>
            }
          />
          <Route
            path="edit/:id"
            element={
              <AuthLayer roles={[roles.admin]}>
                <UserEdit />
              </AuthLayer>
            }
          />
        </Route>

        <Route
          path="invitation"
          element={
            <AuthLayer roles={[roles.admin]}>
              <Invitation />
            </AuthLayer>
          }
        />

        <Route
          path="state"
          element={
            <AuthLayer roles={[roles.admin]}>
              <State />
            </AuthLayer>
          }
        />
      </Route>

      <Route path="403" element={<Error403 />} />
      <Route path="404" element={<Error404 />} />

      <Route path="*" element={<Navigate to="login" replace />} />
    </Routes>
  );
};

export default PageRoutes;
