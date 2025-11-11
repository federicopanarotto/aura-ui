import { type FC } from "react";
import { Box } from "@mui/material";

interface AudioPlaybackProps {
  audioURL: string | null;
  isVisible: boolean;
}

export const AudioPlayback: FC<AudioPlaybackProps> = ({ audioURL, isVisible }) => {
  if (!audioURL || !isVisible) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <audio 
        controls 
        src={audioURL} 
        style={{ 
          width: '100%',
          maxWidth: 400,
          filter: 'invert(1)',
        }} 
      />
    </Box>
  );
};