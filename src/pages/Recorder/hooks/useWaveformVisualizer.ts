import { useRef, useCallback } from "react";

interface WaveformVisualizerOptions {
  barWidth?: number;
  barGap?: number;
  updateInterval?: number; // milliseconds between updates
}

export const useWaveformVisualizer = (options: WaveformVisualizerOptions = {}) => {
  const {
    barWidth = 3,
    barGap = 2,
    updateInterval = 50, // Update every 50ms for less smooth scrolling
  } = options;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const waveformDataRef = useRef<number[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);

  const drawWaveform = useCallback((analyser: AnalyserNode | null) => {
    if (!canvasRef.current || !analyser) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Set canvas actual size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const totalBarWidth = barWidth + barGap;
    const maxBars = Math.floor(canvas.width / totalBarWidth);

    const draw = (currentTime: number) => {
      animationFrameRef.current = requestAnimationFrame(draw);

      // Only update at specified interval for less smooth scrolling
      if (currentTime - lastUpdateTimeRef.current < updateInterval) {
        return;
      }
      lastUpdateTimeRef.current = currentTime;

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
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw center line
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Draw waveform bars
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#ff3b30');
      gradient.addColorStop(0.5, '#ff6b60');
      gradient.addColorStop(1, '#ff3b30');

      waveformDataRef.current.forEach((height, index) => {
        const x = canvas.width - (waveformDataRef.current.length - index) * totalBarWidth;
        const barHeight = Math.max(4, height);
        
        ctx.fillStyle = gradient;
        
        // Top bar
        ctx.fillRect(
          x, 
          canvas.height / 2 - barHeight / 2, 
          barWidth, 
          barHeight / 2
        );
        
        // Bottom bar
        ctx.fillRect(
          x, 
          canvas.height / 2, 
          barWidth, 
          barHeight / 2
        );

        // Add glow effect for recent bars
        if (index > waveformDataRef.current.length - 5) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#ff3b30';
          ctx.fillRect(
            x, 
            canvas.height / 2 - barHeight / 2, 
            barWidth, 
            barHeight
          );
          ctx.shadowBlur = 0;
        }
      });
    };

    draw(0);
  }, [barWidth, barGap, updateInterval]);

  const stopAnimation = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    waveformDataRef.current = [];
  };

  return {
    canvasRef,
    drawWaveform,
    stopAnimation,
  };
};