import { Typography } from "@mui/material";
import { FiberManualRecord, Stop } from "@mui/icons-material";
import { RecordButton, Timer } from "./styles/RecorderStyles";
import type { FC } from "react";

interface RecorderControlsProps {
  isRecording: boolean;
  seconds: number;
  onStart: () => void;
  onStop: () => void;
}

export const RecorderControls: FC<RecorderControlsProps> = ({
  isRecording,
  seconds,
  onStart,
  onStop,
}) => {
  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <Timer>{formatTime(seconds)}</Timer>
      
      <RecordButton
        onClick={isRecording ? onStop : onStart}
        isRecording={isRecording}
      >
        {isRecording ? <Stop /> : <FiberManualRecord />}
      </RecordButton>

      <Typography
        sx={{
          mt: 2,
          color: '#999999',
          fontSize: '0.875rem',
        }}
      >
        {isRecording ? "Recording..." : "Tap to start"}
      </Typography>
    </>
  );
};