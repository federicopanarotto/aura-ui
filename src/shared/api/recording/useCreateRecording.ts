import { useMutation } from "@tanstack/react-query";
import QUERY_KEYS from "../QueryKeys";
import client from "../Client";
import toWav from 'audiobuffer-to-wav';

const useCreateRecording = () => {
  const doUpload = async (audioBlob: Blob): Promise<void> => {
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
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

export default useCreateRecording;