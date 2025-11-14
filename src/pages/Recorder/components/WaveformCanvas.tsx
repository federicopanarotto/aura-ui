import { type FC } from "react";
import { Box, type BoxProps } from "@mui/material";

interface WaveformCanvasProps extends Omit<BoxProps, 'ref'> {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const WaveformCanvas: FC<WaveformCanvasProps> = ({
  canvasRef,
  ...boxProps
}) => {
  return (
    <Box {...boxProps}>
      <Box
        component="canvas"
        ref={canvasRef}
        sx={{ 
          width: "100%", 
          height: "200px", 
          borderRadius: 2,
          ...boxProps.sx 
        }}
      />
    </Box>
  );
};