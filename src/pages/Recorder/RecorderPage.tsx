import { type FC } from "react";
import { Typography, Box } from "@mui/material";
import BasePage from "../../shared/ui/page/BasePage";
import { useAudioRecorder } from "./hooks/useAudioRecorder";
import { useWaveformVisualization } from "./hooks/useWaveformVisualization";
import { RecordingTimer } from "./components/RecordingTimer";
import { WaveformCanvas } from "./components/WaveformCanvas";
import { RecordButton } from "./components/RecordButton";
import { RecordingStatus } from "./components/RecordingStatus";
import { AudioPlayback } from "./components/AudioPlayback";

// Audio upload hook (move to separate file)
const useAudioUpload = () => {
  const uploadAudio = async (audioBlob: Blob): Promise<void> => {
    console.log("Audio blob ready for upload:", audioBlob);
    // Implement your upload logic here
  };

  return { uploadAudio };
};

const RecorderPage: FC = () => {
  const { uploadAudio } = useAudioUpload();

  const {
    isRecording,
    seconds,
    audioURL,
    startRecording,
    stopRecording,
    analyserRef,
  } = useAudioRecorder({
    onRecordingComplete: uploadAudio,
  });

  const { canvasRef } = useWaveformVisualization({
    analyserRef,
    isRecording,
  });

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <BasePage sx={{ p: 2 }}>
      <Typography variant="h3">Voice Recorder</Typography>

      <Box sx={{ textAlign: "center" }}>
        <RecordingTimer seconds={seconds} />

        <WaveformCanvas 
          canvasRef={canvasRef} 
          sx={{ mb: 3, position: "relative" }}
        />

        <RecordButton
          isRecording={isRecording}
          onToggleRecording={handleToggleRecording}
        />

        <RecordingStatus
          isRecording={isRecording}
          hasRecording={!!audioURL}
        />

        <AudioPlayback 
          audioURL={audioURL} 
          isRecording={isRecording} 
        />
      </Box>
    </BasePage>
  );
};

export default RecorderPage;