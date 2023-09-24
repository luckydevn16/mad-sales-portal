import { Avatar } from "@mui/material";

interface Props {
  width: number;
  height: number;
}

const Logo: React.FC<Props> = ({ width = 120, height = 120 }) => {
  return (
    <Avatar
      alt="Mad Logo"
      src="./images/mad-logo.png"
      sx={{ width: { width }, height: { height }, borderRadius: 0 }}
    />
  );
};

export default Logo;
