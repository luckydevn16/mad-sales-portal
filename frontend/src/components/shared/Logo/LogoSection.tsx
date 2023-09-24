import { Link } from "react-router-dom";

// material-ui
import { Avatar, ButtonBase } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

// project import
import config from "config";
import { activeItem } from "store/menu";
import { RootState } from "store";

interface Props {
  width: number;
  height: number;
  to: string;
}

const LogoSection: React.FC<Props> = ({ width, height, to }) => {
  const { defaultId } = useSelector((state: RootState) => state.menu);
  const dispatch = useDispatch();

  return (
    <ButtonBase
      disableRipple
      component={Link}
      onClick={() => dispatch(activeItem({ openItem: [defaultId] }))}
      to={!to ? config.defaultPath : to}
    >
      <Avatar
        alt="Mad Logo"
        src="/images/mad-logo.png"
        sx={{ width: { width }, height: { height }, borderRadius: 0 }}
      />
    </ButtonBase>
  );
};

export default LogoSection;
