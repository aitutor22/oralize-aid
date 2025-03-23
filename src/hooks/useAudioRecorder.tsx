
import { useState, useRef, useCallback, useEffect } from "react";

interface AudioRecorderState {
  isRecording: boolean;
  isPaused: boolean;
  recordingTime: number;
  mediaRecorder: MediaRecorder | null;
  audioBlob: Blob | null;
  audioUrl: string | null;
}

export function useAudioRecorder() {
  const [recorderState, setRecorderState] = useState<AudioRecorderState>({
    isRecording: false,
    isPaused: false,
    recordingTime: 0,
    mediaRecorder: null,
    audioBlob: null,
    audioUrl: null,
  });

  const chunks = useRef<Blob[]>([]);
  const timerInterval = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startTimer = useCallback(() => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
    
    timerInterval.current = window.setInterval(() => {
      setRecorderState((prevState) => ({
        ...prevState,
        recordingTime: prevState.recordingTime + 1,
      }));
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    }
  }, []);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream);
      chunks.current = [];
      
      mediaRecorder.ondataavailable = (e: BlobEvent) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        setRecorderState((prevState) => ({
          ...prevState,
          isRecording: false,
          isPaused: false,
          audioBlob,
          audioUrl,
        }));
        
        // Clean up the stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      };
      
      mediaRecorder.start();
      startTimer();
      
      setRecorderState({
        isRecording: true,
        isPaused: false,
        recordingTime: 0,
        mediaRecorder,
        audioBlob: null,
        audioUrl: null,
      });
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  }, [startTimer]);

  const stopRecording = useCallback(() => {
    stopTimer();
    
    if (recorderState.mediaRecorder && recorderState.isRecording) {
      recorderState.mediaRecorder.stop();
    }
  }, [recorderState.isRecording, recorderState.mediaRecorder, stopTimer]);

  const resetRecording = useCallback(() => {
    stopTimer();
    
    if (recorderState.audioUrl) {
      URL.revokeObjectURL(recorderState.audioUrl);
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    setRecorderState({
      isRecording: false,
      isPaused: false,
      recordingTime: 0,
      mediaRecorder: null,
      audioBlob: null,
      audioUrl: null,
    });
  }, [recorderState.audioUrl, stopTimer]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
      
      if (recorderState.audioUrl) {
        URL.revokeObjectURL(recorderState.audioUrl);
      }
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [recorderState.audioUrl]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return {
    isRecording: recorderState.isRecording,
    recordingTime: recorderState.recordingTime,
    audioBlob: recorderState.audioBlob,
    audioUrl: recorderState.audioUrl,
    formattedTime: formatTime(recorderState.recordingTime),
    startRecording,
    stopRecording,
    resetRecording,
  };
}
