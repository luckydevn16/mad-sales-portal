import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import { setAuth } from "store/auth";
import { apiLogin, apiResendCode, apiVerifyCode } from "utils/api";

import Login from "./LoginForm";
import VerificationForm from "./VerificationForm";
import { Helmet } from "react-helmet-async";
import { SITE_TITLE } from "utils/config";

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [step, setStep] = useState("login");
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState<boolean>(false);

  const handleLogin = async (email: string) => {
    setIsSending(true);
    await apiLogin({ email })
      .then((res) => {
        if (res.status === 200) {
          setEmail(email);
          setStep("verification");
        } else {
          enqueueSnackbar(res.data.message, { variant: "error" });
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

  const handleVerify = async (code: string) => {
    setIsSending(true);
    await apiVerifyCode({ email, code })
      .then((res) => {
        if (res.status === 200) {
          dispatch(setAuth({ user: res.data }));
          navigate("/quote");
        } else {
          enqueueSnackbar(res.data.message, { variant: "error" });
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

  const handleResend = async () => {
    await apiResendCode({ email });
  };

  const handleBack = () => {
    setStep("login");
  };

  return (
    <>
      <Helmet>
        <title>{SITE_TITLE} | Login</title>
      </Helmet>

      {step === "login" && (
        <Login onLogin={handleLogin} isSending={isSending} />
      )}

      {step === "verification" && (
        <VerificationForm
          onVerify={handleVerify}
          onResend={handleResend}
          onBack={handleBack}
          isSending={isSending}
        />
      )}
    </>
  );
};

export default Auth;
