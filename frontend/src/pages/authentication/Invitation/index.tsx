import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { setAuth } from "store/auth";
import { apiAcceptInvitation } from "utils/api";
import { SITE_TITLE } from "utils/config";

const Invitation = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const accept = async () => {
      await apiAcceptInvitation({ token })
        .then((res) => {
          if (res.status == 200) {
            dispatch(setAuth({ initialized: true, user: res.data }));
            navigate("/quote", { replace: true });
          } else {
            navigate("/login", { replace: true });
          }
        })
        .catch(() => {
          enqueueSnackbar("Something went wrong. Please try again later", {
            variant: "error",
          });
        });
    };

    accept();
  }, []);

  return (
    <>
      <Helmet>
        <title>{SITE_TITLE} | Invitation</title>
      </Helmet>
    </>
  );
};

export default Invitation;
