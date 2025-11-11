import { type FC, useEffect } from "react";
import { Box } from "@mui/material";
import { useWaveformVisualizer } from "../hooks/useWaveformVisualizer";
import { RecordingIndicator, WaveformCanvas } from "./styles/RecorderStyles";

interface WaveformVisualizerProps {
  analyser: AnalyserNode | null;
  isRecording: boolean;
}

export const WaveformVisualizer: FC<WaveformVisualizerProps> = ({ 
  analyser, 
  isRecording 
}) => {
  const { canvasRef, drawWaveform, stopAnimation } = useWaveformVisualizer({
    barWidth: 3,
    barGap: 2,
    updateInterval: 60, // Less frequent updates for slower scrolling
  });

  useEffect(() => {
    if (analyser && isRecording) {
      drawWaveform(analyser);
    } else {
      stopAnimation();
    }

    return () => stopAnimation();
  }, [analyser, isRecording, drawWaveform, stopAnimation]);

  return (
    <Box sx={{ mb: 3, position: 'relative' }}>
      <WaveformCanvas ref={canvasRef} />
      {isRecording && <RecordingIndicator />}
    </Box>
  );
};