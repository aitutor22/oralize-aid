
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, StopCircle } from "lucide-react";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { cn } from "@/lib/utils";

interface AudioRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onRecordingComplete }) => {
  const { 
    isRecording, 
    recordingTime, 
    audioBlob, 
    audioUrl, 
    formattedTime,
    startRecording, 
    stopRecording, 
    resetRecording 
  } = useAudioRecorder();
  
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showWaveform, setShowWaveform] = useState(false);
  
  // Handle the countdown before recording starts
  useEffect(() => {
    if (countdown !== null) {
      if (countdown > 0) {
        const timer = setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        setShowWaveform(true);
        startRecording();
        setCountdown(null);
      }
    }
  }, [countdown, startRecording]);
  
  // When recording is stopped and we have an audioBlob
  useEffect(() => {
    if (!isRecording && audioBlob) {
      onRecordingComplete(audioBlob);
    }
  }, [isRecording, audioBlob, onRecordingComplete]);
  
  const handleStartRecording = () => {
    setCountdown(3); // Start a 3-second countdown
  };
  
  const handleStopRecording = () => {
    stopRecording();
    setShowWaveform(false);
  };
  
  const handleReset = () => {
    resetRecording();
    setShowWaveform(false);
  };
  
  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-md mx-auto py-8">
      {/* Countdown display */}
      {countdown !== null && (
        <div className="text-5xl font-bold text-blue-600 animate-count-down">
          {countdown}
        </div>
      )}
      
      {/* Recording visualization */}
      {showWaveform && (
        <div className="sound-wave-container my-4 min-h-[40px]">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="sound-wave-bar"></div>
          ))}
        </div>
      )}
      
      {/* Recording time */}
      {isRecording && (
        <div className="text-lg font-semibold text-blue-700">
          {formattedTime}
        </div>
      )}
      
      {/* Audio playback */}
      {audioUrl && !isRecording && (
        <div className="w-full">
          <audio 
            src={audioUrl} 
            controls 
            className="w-full mt-4 rounded-lg"
          />
        </div>
      )}
      
      {/* Action buttons */}
      <div className="flex space-x-4 justify-center">
        {!isRecording && !audioUrl && (
          <Button
            onClick={handleStartRecording}
            className={cn(
              "bg-blue-600 hover:bg-blue-700 transition-all rounded-full w-16 h-16",
              "flex items-center justify-center"
            )}
            disabled={countdown !== null}
          >
            <Mic className="h-6 w-6" />
          </Button>
        )}
        
        {isRecording && (
          <Button
            onClick={handleStopRecording}
            className={cn(
              "bg-red-500 hover:bg-red-600 transition-all rounded-full w-16 h-16",
              "flex items-center justify-center animate-pulse-glow"
            )}
          >
            <StopCircle className="h-6 w-6" />
          </Button>
        )}
        
        {audioUrl && !isRecording && (
          <Button
            onClick={handleReset}
            variant="outline"
            className="border-blue-200 text-blue-700 hover:bg-blue-50"
          >
            Record Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
