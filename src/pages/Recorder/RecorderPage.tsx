import { type FC } from "react";
import { Box } from "@mui/material";
import BasePage from "../../shared/ui/page/BasePage";
import { useAudioRecorder } from "./hooks/useAudioRecorder";
import { useWaveformVisualization } from "./hooks/useWaveformVisualization";
import { RecordingTimer } from "./components/RecordingTimer";
import { WaveformCanvas } from "./components/WaveformCanvas";
import { RecordButton } from "./components/RecordButton";
import useUploadAudio from "./api/useUploadAudio";

const RecorderPage: FC = () => {
  const { mutateAsync: uploadAudio } = useUploadAudio();

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
    barGap: 5,
    barWidth: 6,
    minBarHeight: 4,
    heightMultiplier: 1.2,
    updateInterval: 30,
    smoothing: 0.6
  });

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <BasePage
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <Typography variant="h3">Voice Recorder</Typography> */}

      <Box sx={{ textAlign: "center" }}>
        <WaveformCanvas
          canvasRef={canvasRef}
          sx={{ mb: 3, position: "relative" }}
        />
        <RecordingTimer seconds={seconds} />

        <RecordButton
          isRecording={isRecording}
          onToggleRecording={handleToggleRecording}
        />

        {/* <RecordingStatus isRecording={isRecording} hasRecording={!!audioURL} /> */}

        {/* <AudioPlayback 
          audioURL={audioURL} 
          isRecording={isRecording} 
        /> */}
      </Box>
    </BasePage>
  );
};

export default RecorderPage;
