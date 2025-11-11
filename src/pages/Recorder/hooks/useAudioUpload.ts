import { useCallback, useState } from "react";

export interface AudioUploadHook {
  uploadAudio: (audioBlob: Blob) => Promise<void>;
  isUploading: boolean;
  error: string | null;
}

export const useAudioUpload = (): AudioUploadHook => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const uploadAudio = useCallback(async (audioBlob: Blob): Promise<void> => {
    setIsUploading(true);
    setError(null);
    
    try {
      console.log("Audio blob ready for upload:", audioBlob);
      // Implement your upload logic here
      // const formData = new FormData();
      // formData.append('audio', audioBlob, 'recording.wav');
      // await fetch('/api/upload-audio', {
      //   method: 'POST',
      //   body: formData
      // });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  }, []);

  return { uploadAudio, isUploading, error };
};