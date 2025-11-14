import { useState, useRef, useCallback } from "react";

interface UseAudioRecorderReturn {
  isRecording: boolean;
  seconds: number;
  audioURL: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  mediaRecorderRef: React.RefObject<MediaRecorder | null>;
  audioContextRef: React.RefObject<AudioContext | null>;
  analyserRef: React.RefObject<AnalyserNode | null>;
}

interface UseAudioRecorderProps {
  onRecordingComplete?: (audioBlob: Blob) => Promise<void>;
}

export const useAudioRecorder = ({
  onRecordingComplete,
}: UseAudioRecorderProps = {}): UseAudioRecorderReturn => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const timerIntervalRef = useRef<number | null>(null);

  const startRecording = useCallback(async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      // Set up Web Audio API for visualization
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      sourceRef.current =
        audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;
      analyserRef.current.smoothingTimeConstant = 0.3;

      // Set up MediaRecorder
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event: BlobEvent): void => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async (): Promise<void> => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        
        if (onRecordingComplete) {
          await onRecordingComplete(audioBlob);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setSeconds(0);

      // Start timer
      timerIntervalRef.current = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      throw error;
    }
  }, [onRecordingComplete]);

  const stopRecording = useCallback((): void => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      // Stop all tracks
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track: MediaStreamTrack) => track.stop());

      // Clear timer
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }

      // Clean up audio context
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close();
      }
    }
  }, [isRecording]);

  return {
    isRecording,
    seconds,
    audioURL,
    startRecording,
    stopRecording,
    mediaRecorderRef,
    audioContextRef,
    analyserRef,
  };
};