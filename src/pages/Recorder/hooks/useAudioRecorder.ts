import { useState, useRef } from "react";

export interface AudioRecorderState {
  isRecording: boolean;
  seconds: number;
  audioURL: string | null;
}

export interface AudioRecorderRefs {
  mediaRecorder: MediaRecorder | null;
  audioChunks: Blob[];
  audioContext: AudioContext | null;
  analyser: AnalyserNode | null;
  source: MediaStreamAudioSourceNode | null;
  timerInterval: number | null;
  animationFrame: number | null;
  waveformData: number[];
}

export const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  const refs = useRef<AudioRecorderRefs>({
    mediaRecorder: null,
    audioChunks: [],
    audioContext: null,
    analyser: null,
    source: null,
    timerInterval: null,
    animationFrame: null,
    waveformData: [],
  });

  const startRecording = async (): Promise<AnalyserNode | null> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        } 
      });
      
      // Set up Web Audio API
      refs.current.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      refs.current.analyser = refs.current.audioContext.createAnalyser();
      refs.current.source = refs.current.audioContext.createMediaStreamSource(stream);
      refs.current.source.connect(refs.current.analyser);
      refs.current.analyser.fftSize = 256;
      refs.current.analyser.smoothingTimeConstant = 0.4; // Slightly more smoothing

      // Set up MediaRecorder
      refs.current.mediaRecorder = new MediaRecorder(stream);
      refs.current.audioChunks = [];
      refs.current.waveformData = [];

      refs.current.mediaRecorder.ondataavailable = (event: BlobEvent): void => {
        if (event.data.size > 0) {
          refs.current.audioChunks.push(event.data);
        }
      };

      refs.current.mediaRecorder.onstop = async (): Promise<void> => {
        const audioBlob = new Blob(refs.current.audioChunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      };

      refs.current.mediaRecorder.start();
      setIsRecording(true);
      setSeconds(0);
      
      // Start timer
      refs.current.timerInterval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);

      return refs.current.analyser;
    } catch (error) {
      console.error('Error accessing microphone:', error);
      return null;
    }
  };

  const stopRecording = (): Blob | null => {
    if (refs.current.mediaRecorder && isRecording) {
      refs.current.mediaRecorder.stop();
      setIsRecording(false);
      
      // Stop all tracks
      refs.current.mediaRecorder.stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      
      // Clear timer
      if (refs.current.timerInterval) {
        clearInterval(refs.current.timerInterval);
      }
      
      // Stop animation
      if (refs.current.animationFrame) {
        cancelAnimationFrame(refs.current.animationFrame);
      }
      
      // Clean up audio context
      if (refs.current.audioContext && refs.current.audioContext.state !== 'closed') {
        refs.current.audioContext.close();
      }

      // Return the recorded blob
      if (refs.current.audioChunks.length > 0) {
        return new Blob(refs.current.audioChunks, { type: 'audio/wav' });
      }
    }
    return null;
  };

  const cleanup = () => {
    if (refs.current.animationFrame) {
      cancelAnimationFrame(refs.current.animationFrame);
    }
    if (refs.current.timerInterval) {
      clearInterval(refs.current.timerInterval);
    }
    if (refs.current.audioContext && refs.current.audioContext.state !== 'closed') {
      refs.current.audioContext.close();
    }
  };

  return {
    // State
    isRecording,
    seconds,
    audioURL,
    setAudioURL,
    
    // Actions
    startRecording,
    stopRecording,
    cleanup,
    
    // Refs for external use
    refs: refs.current,
  };
};