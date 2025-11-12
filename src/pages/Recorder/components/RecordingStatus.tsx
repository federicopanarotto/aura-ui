import { type FC } from "react";
import { Typography, type TypographyProps } from "@mui/material";

interface RecordingStatusProps extends TypographyProps {
  isRecording: boolean;
  hasRecording: boolean;
}

export const RecordingStatus: FC<RecordingStatusProps> = ({
  isRecording,
  hasRecording,
  ...props
}) => {
  const getStatusText = () => {
    if (isRecording) return "Recording...";
    if (hasRecording) return "Recording complete";
    return "Tap to start";
  };

  return (
    <Typography
      sx={{
        mt: 2,
        color: "#999999",
        fontSize: "0.875rem",
      }}
      {...props}
    >
      {getStatusText()}
    </Typography>
  );
};