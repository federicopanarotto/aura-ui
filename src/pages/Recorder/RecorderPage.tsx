import { useState, useRef, useCallback, useEffect, type FC } from "react";
import { Typography, Box, IconButton, Paper } from "@mui/material";
import { FiberManualRecord, Stop } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import BasePage from "../../shared/ui/page/BasePage";

// Styled Components
const RecorderContainer = styled(Paper)(({ theme }) => ({
  background: '#000000',
  borderRadius: 24,
  padding: theme.spacing(4),
  maxWidth: 800,
  margin: '0 auto',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
}));

const WaveformCanvas = styled('canvas')({
  width: '100%',
  height: '200px',
  borderRadius: 8,
  backgroundColor: '#1a1a1a',
});

const Timer = styled(Typography)({
  fontFamily: 'SF Mono, Monaco, monospace',
  fontSize: '3rem',
  fontWeight: 300,
  color: '#ffffff',
  marginBottom: 24,
  fontVariantNumeric: 'tabular-nums',
});

const RecordButton = styled(IconButton)<{ isRecording?: boolean }>(({ isRecording }) => ({
  width: 72,
  height: 72,
  backgroundColor: isRecording ? '#ff4444' : '#ff3b30',
  color: '#ffffff',
  marginTop: 24,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: isRecording ? '#ff6666' : '#ff5555',
    transform: 'scale(1.05)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 40,
  },
}));

// Types
interface AudioUploadHook {
  uploadAudio: (audioBlob: Blob) => Promise<void>;
}

// Audio upload hook
const useAudioUpload = (): AudioUploadHook => {
  const uploadAudio = useCallback(async (audioBlob: Blob): Promise<void> => {
    console.log("Audio blob ready for upload:", audioBlob);
    // Implement your upload logic here
  }, []);

  return { uploadAudio };
};

const RecorderPage: FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const timerIntervalRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const waveformDataRef = useRef<number[]>([]);
  
  const { uploadAudio } = useAudioUpload();

  // Format time display
  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Draw progressive waveform
  const drawWaveform = useCallback(() => {
    if (!canvasRef.current || !analyserRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
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
      
      // Normalize to canvas height (with some headroom)
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
        
        // Draw mirrored bars (top and bottom)
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
        if (index > waveformDataRef.current.length - 10) {
          ctx.shadowBlur = 10;
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

    draw();
  }, []);

  const startRecording = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        } 
      });
      
      // Set up Web Audio API for visualization
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.fftSize = 256; // Smaller for more responsive visualization
      analyserRef.current.smoothingTimeConstant = 0.3; // Less smoothing for more reactive display

      // Set up MediaRecorder
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      waveformDataRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event: BlobEvent): void => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async (): Promise<void> => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        await uploadAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setSeconds(0);
      
      // Start timer
      timerIntervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);

      // Start waveform visualization
      drawWaveform();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = (): void => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop all tracks
      mediaRecorderRef.current.stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      
      // Clear timer
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      
      // Stop animation
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Clean up audio context
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <BasePage sx={{ 
      p: 4,
      backgroundColor: '#0a0a0a',
      minHeight: '100vh',
    }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial',
            fontWeight: 600,
            fontSize: '2.5rem',
            color: '#ffffff',
          }}
        >
          Voice Recorder
        </Typography>
      </Box>

      <RecorderContainer elevation={0}>
        <Box sx={{ textAlign: 'center' }}>
          {/* Timer */}
          <Timer>
            {formatTime(seconds)}
          </Timer>

          {/* Waveform Visualization */}
          <Box sx={{ mb: 3, position: 'relative' }}>
            <WaveformCanvas ref={canvasRef} />
            {isRecording && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: 20,
                  transform: 'translateY(-50%)',
                  width: 12,
                  height: 12,
                  backgroundColor: '#ff3b30',
                  borderRadius: '50%',
                  animation: 'pulse 1.5s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 1, transform: 'translateY(-50%) scale(1)' },
                    '50%': { opacity: 0.5, transform: 'translateY(-50%) scale(1.2)' },
                    '100%': { opacity: 1, transform: 'translateY(-50%) scale(1)' },
                  },
                }}
              />
            )}
          </Box>

          {/* Control Button */}
          <RecordButton
            onClick={isRecording ? stopRecording : startRecording}
            isRecording={isRecording}
          >
            {isRecording ? <Stop /> : <FiberManualRecord />}
          </RecordButton>

          {/* Status Text */}
          <Typography
            sx={{
              mt: 2,
              color: '#999999',
              fontSize: '0.875rem',
            }}
          >
            {isRecording ? "Recording..." : audioURL ? "Recording complete" : "Tap to start"}
          </Typography>

          {/* Audio Playback */}
          {audioURL && !isRecording && (
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
          )}
        </Box>
      </RecorderContainer>
    </BasePage>
  );
};

export default RecorderPage;