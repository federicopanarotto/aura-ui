import { useMutation } from "@tanstack/react-query";
import QUERY_KEYS from "../../../shared/api/QueryKeys";
import client from "../../../shared/api/Client";
import toWav from 'audiobuffer-to-wav';

const useUploadAudio = () => {
  const doUpload = async (audioBlob: Blob): Promise<void> => {
    // Converti in AudioBuffer
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    // Converti in WAV vero
    const wavArrayBuffer = toWav(audioBuffer);
    const wavBlob = new Blob([wavArrayBuffer], { type: 'audio/wav' });
    
    const formData = new FormData();
    const audioFile = new File(
      [wavBlob], 
      `recording_${Date.now()}.wav`,
      { type: 'audio/wav' }
    );
    
    formData.append('audio', audioFile);

    await client.post('/api/recordings', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  };

  return useMutation({
    mutationFn: doUpload,
    mutationKey: [QUERY_KEYS.RECORDING.UPLOAD]
  });
};

export default useUploadAudio;