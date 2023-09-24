/* eslint-disable @typescript-eslint/no-unused-vars */
import { forwardRef } from "react";

import MoodBadIcon from "@mui/icons-material/MoodBad";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { styled } from "@mui/material/styles";
import Rating, { IconContainerProps } from "@mui/material/Rating";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <MoodBadIcon color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: "Little Dissatisfied",
  },
  4: {
    icon: <SentimentNeutralIcon color="warning" />,
    label: "Neutral",
  },
  5: {
    icon: <SentimentSatisfiedIcon color="success" />,
    label: "Little Satisfied",
  },
  6: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "Satisfied",
  },
  7: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: "Very Satisfied",
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

interface Props {
  name: string;
  value: number;
  onChange: Function;
}

function EmoticonRating({ name, value, onChange }: Props, ref: any) {
  return (
    <StyledRating
      name={name}
      value={value}
      onChange={(evt, newValue) => onChange(newValue)}
      max={7}
      IconContainerComponent={IconContainer}
      getLabelText={(value: number) => customIcons[value].label}
      highlightSelectedOnly
    />
  );
}

export default forwardRef(EmoticonRating);
