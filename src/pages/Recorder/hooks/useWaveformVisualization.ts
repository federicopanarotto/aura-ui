import { useRef, useCallback, useEffect } from "react";
import { useTheme } from "@mui/material/styles";

interface UseWaveformVisualizationProps {
  analyserRef: React.MutableRefObject<AnalyserNode | null>;
  isRecording: boolean;
}

export const useWaveformVisualization = ({
  analyserRef,
  isRecording,
}: UseWaveformVisualizationProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const waveformDataRef = useRef<number[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const theme = useTheme();

  const drawWaveform = useCallback(() => {
    if (!canvasRef.current || !analyserRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Set canvas actual size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const barWidth = 3;
    const barGap = 2;
    const totalBarWidth = barWidth + barGap;
    const maxBars = Math.floor(canvas.width / totalBarWidth);

    const draw = () => {
      animationFrameRef.current = requestAnimationFrame(draw);

      // Get audio data
      analyser.getByteFrequencyData(dataArray);

      // Calculate average amplitude
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const average = sum / bufferLength;

      // Normalize to canvas height
      const normalizedHeight = (average / 255) * canvas.height * 0.8;

      // Add new data point
      waveformDataRef.current.push(normalizedHeight);

      // Keep only the visible bars
      if (waveformDataRef.current.length > maxBars) {
        waveformDataRef.current = waveformDataRef.current.slice(-maxBars);
      }

      // Clear canvas
      ctx.fillStyle = theme.palette.background.default;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw center line
      ctx.strokeStyle = "#333333";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Draw waveform bars
      waveformDataRef.current.forEach((height, index) => {
        const x =
          canvas.width -
          (waveformDataRef.current.length - index) * totalBarWidth;
        const barHeight = Math.max(2, height);

        ctx.fillStyle = theme.palette.primary.main;

        // Top bar
        ctx.fillRect(
          x,
          canvas.height / 2 - barHeight / 2,
          barWidth,
          barHeight / 2
        );

        // Bottom bar
        ctx.fillRect(x, canvas.height / 2, barWidth, barHeight / 2);
      });
    };

    draw();
  }, [analyserRef, theme]);

  const stopVisualization = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    waveformDataRef.current = [];
  }, []);

  // Start/stop visualization based on recording state
  useEffect(() => {
    if (isRecording) {
      drawWaveform();
    } else {
      stopVisualization();
    }

    return () => {
      stopVisualization();
    };
  }, [isRecording, drawWaveform, stopVisualization]);

  return { canvasRef };
};