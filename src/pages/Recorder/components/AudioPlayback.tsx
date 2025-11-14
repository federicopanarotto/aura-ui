import { type FC } from "react";
import { Box, type BoxProps } from "@mui/material";

interface AudioPlaybackProps extends BoxProps {
  audioURL: string | null;
  isRecording: boolean;
}

export const AudioPlayback: FC<AudioPlaybackProps> = ({
  audioURL,
  isRecording,
  ...boxProps
}) => {
  if (!audioURL || isRecording) return null;

  return (
    <Box sx={{ mt: 4 }} {...boxProps}>
      <audio
        controls
        src={audioURL}
        style={{
          width: "100%",
          maxWidth: 400,
          filter: "invert(1)",
        }}
      />
    </Box>
  );
};