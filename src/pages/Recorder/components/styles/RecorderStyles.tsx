import { styled } from "@mui/material/styles";
import { Paper, Typography, IconButton, Box } from "@mui/material";

export const RecorderContainer = styled(Paper)(({ theme }) => ({
  background: '#000000',
  borderRadius: 24,
  padding: theme.spacing(4),
  maxWidth: 800,
  margin: '0 auto',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
}));

export const WaveformCanvas = styled('canvas')({
  width: '100%',
  height: '200px',
  borderRadius: 8,
  backgroundColor: '#1a1a1a',
});

export const Timer = styled(Typography)({
  fontFamily: 'SF Mono, Monaco, monospace',
  fontSize: '3rem',
  fontWeight: 300,
  color: '#ffffff',
  marginBottom: 24,
  fontVariantNumeric: 'tabular-nums',
});

export const RecordButton = styled(IconButton)<{ isRecording?: boolean }>(({ isRecording }) => ({
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
  '&:active': {
    transform: 'scale(0.95)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 40,
  },
}));

export const RecordingIndicator = styled(Box)({
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
});