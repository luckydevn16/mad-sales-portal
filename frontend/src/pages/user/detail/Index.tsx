import { useEffect, useState } from "react";

import { Box } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Helmet } from "react-helmet-async";
import { enqueueSnackbar } from "notistack";

import { useNavigate, useParams } from "react-router-dom";

import { apiGetAllStates, apiGetUser, apiUpdateUser } from "utils/api";
import { SITE_TITLE } from "utils/config";
import Detail from "./Detail";

export default function UserEdit() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const [user, setUser] = useState<UserType>();
  const [states, setStates] = useState<StateType[]>([]);
  const [isSending, setIsSending] = useState<boolean>(false);

  useEffect(() => {
    const getAllStates = async () => {
      if (id) {
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
      }
    };

    getAllStates();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      if (id) {
        await apiGetUser({ id })
          .then((res) => {
            if (res.status === 200) {
              setUser(res.data.user);
            } else if (res.status === 403) {
              navigate("/403");
              enqueueSnackbar(res.data?.message, { variant: "warning" });
            } else {
              enqueueSnackbar(res.data?.message, { variant: "error" });
            }
          })
          .catch(() => {
            enqueueSnackbar("Something went wrong. Please try again later", {
              variant: "error",
            });
          });
      }
    };

    getUser();
  }, [id]);

  const handleSave = async (values: UserType) => {
    setIsSending(true);
    await apiUpdateUser({
      id: values.id,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      role: values.role,
      status: values.status,
      states: values.states,
    })
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar(res.data.message, { variant: "success" });
          setUser(res.data.user);
          navigate("/user");
        } else if (res.status === 400) {
          enqueueSnackbar(res.data?.message, { variant: "warning" });
        } else if (res.status === 403) {
          navigate("/403");
          enqueueSnackbar(res.data?.message, { variant: "warning" });
        } else {
          enqueueSnackbar(res.data?.message, { variant: "error" });
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
        <title>{SITE_TITLE} | User Details</title>
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
            User Details
          </Box>
        </Box>

        <Box sx={{ height: "calc(100% - 52px)" }}>
          <Scrollbars universal>
            {user && (
              <Detail
                user={user}
                states={states}
                onSave={handleSave}
                isSending={isSending}
              />
            )}
          </Scrollbars>
        </Box>
      </Box>
    </>
  );
}
