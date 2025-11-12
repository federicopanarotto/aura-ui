import { useRef, useCallback, useEffect } from "react";
import { useTheme } from "@mui/material/styles";

interface UseWaveformVisualizationProps {
  analyserRef: React.MutableRefObject<AnalyserNode | null>;
  isRecording: boolean;
  barWidth?: number;
  barGap?: number;
  heightMultiplier?: number;
  updateInterval?: number;
  minBarHeight?: number;
  smoothing?: number;
}

export const useWaveformVisualization = ({
  analyserRef,
  isRecording,
  barWidth = 3,
  barGap = 2,
  heightMultiplier = 0.8,
  updateInterval = 50,
  minBarHeight = 2,
  smoothing = 0.7,
}: UseWaveformVisualizationProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const waveformDataRef = useRef<number[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);
  const currentAudioValueRef = useRef<number>(0);
  const theme = useTheme();

  const drawWaveform = useCallback(() => {
    if (!canvasRef.current || !analyserRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const analyser = analyserRef.current;
    
    // Riduci la risoluzione dell'analyser per performance migliori
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const totalBarWidth = barWidth + barGap;
    let maxBars = Math.floor(width / totalBarWidth);

    // Colori pre-calcolati
    const bgColor = theme.palette.background.default;
    const lineColor = theme.palette.divider;
    const barColor = theme.palette.primary.main;

    const draw = (timestamp: number) => {
      animationFrameRef.current = requestAnimationFrame(draw);

      // Leggi dati audio
      analyser.getByteFrequencyData(dataArray);

      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const average = sum / bufferLength;
      const normalizedHeight = (average / 255) * height * heightMultiplier;

      // Smooth
      currentAudioValueRef.current = 
        currentAudioValueRef.current * smoothing + normalizedHeight * (1 - smoothing);

      // Aggiungi nuova barra
      if (timestamp - lastUpdateTimeRef.current >= updateInterval) {
        waveformDataRef.current.push(currentAudioValueRef.current);

        if (waveformDataRef.current.length > maxBars) {
          waveformDataRef.current.shift();
        }

        lastUpdateTimeRef.current = timestamp;
      }

      // Clear
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      // Center line
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Draw bars - batch rendering
      ctx.fillStyle = barColor;
      
      const dataLength = waveformDataRef.current.length;
      for (let i = 0; i < dataLength; i++) {
        const height_val = waveformDataRef.current[i];
        const x = width - (dataLength - i) * totalBarWidth;
        const barHeight = Math.max(minBarHeight, height_val);

        // Top e bottom insieme
        ctx.fillRect(
          x,
          height / 2 - barHeight / 2,
          barWidth,
          barHeight
        );
      }
    };

    draw(0);
  }, [
    analyserRef,
    theme,
    barWidth,
    barGap,
    heightMultiplier,
    updateInterval,
    minBarHeight,
    smoothing,
  ]);

  const stopVisualization = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    waveformDataRef.current = [];
    currentAudioValueRef.current = 0;
    lastUpdateTimeRef.current = 0;
  }, []);

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