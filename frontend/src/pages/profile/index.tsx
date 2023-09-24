import { useEffect, useState } from "react";

import { Box } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useNavigate } from "react-router-dom";

import { RootState } from "store";
import { apiGetAllStates, apiSaveProfile } from "utils/api";
import { SITE_TITLE } from "utils/config";
import Detail from "./Detail";
import { setAuth } from "store/auth";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [states, setStates] = useState<StateType[]>([]);
  const [isSending, setIsSending] = useState<boolean>(false);

  useEffect(() => {
    const getAllStates = async () => {
      await apiGetAllStates()
        .then((res) => {
          if (res.status === 200) {
            setStates(res.data.states);
          }
        })
        .catch(() => {
          enqueueSnackbar("Something went wrong. Please try again later", {
            variant: "error",
          });
        });
    };

    getAllStates();
  }, []);

  const onSubmit = async (values: any) => {
    setIsSending(true);
    await apiSaveProfile({
      firstName: values.firstName,
      lastName: values.lastName,
    })
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar("User profile has been updated.", {
            variant: "success",
          });
          dispatch(setAuth({ initialized: true, user: res.data }));
          navigate(-1);
        } else {
          enqueueSnackbar("Something went wrong. Please try again later.", {
            variant: "warning",
          });
        }
        setIsSending(false);
      })
      .catch(() => {
        enqueueSnackbar("Something went wrong. Please try again later", {
          variant: "error",
        });
        setIsSending(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>{SITE_TITLE} | Profile</title>
      </Helmet>

      <Box sx={{ height: 1, p: 4, backgroundColor: "grey.A200" }}>
        <Box
          sx={{
            width: 1,
            height: 36,
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              color: "common.black",
              fontSize: 24,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
            }}
          >
            My Profile
          </Box>
        </Box>

        <Box sx={{ height: "calc(100% - 52px)" }}>
          <Scrollbars universal>
            {auth && states && (
              <Detail
                user={auth.user}
                states={states}
                onSave={onSubmit}
                isSending={isSending}
              />
            )}
          </Scrollbars>
        </Box>
      </Box>
    </>
  );
}
