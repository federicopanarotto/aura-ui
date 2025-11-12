import { type FC } from "react";
import { Typography, type TypographyProps } from "@mui/material";

interface RecordingTimerProps extends TypographyProps {
  seconds: number;
}

const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

export const RecordingTimer: FC<RecordingTimerProps> = ({ seconds, ...props }) => {
  return <Typography {...props}>{formatTime(seconds)}</Typography>;
};