
import React from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";

interface RecordingInterfaceProps {
  isRecording: boolean;
  audioUrl: string | null;
  isProcessing: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  resetRecording: () => void;
  processRecording: () => void;
}

const RecordingInterface: React.FC<RecordingInterfaceProps> = ({
  isRecording,
  audioUrl,
  isProcessing,
  startRecording,
  stopRecording,
  resetRecording,
  processRecording,
}) => {
  return (
    <div className="flex justify-center mt-8 space-x-4">
      {!isRecording && !audioUrl && (
        <Button 
          onClick={startRecording} 
          className="bg-red-500 hover:bg-red-600"
        >
          <Mic className="mr-2 h-4 w-4" /> Record Reading
        </Button>
      )}
      
      {isRecording && (
        <Button 
          onClick={stopRecording} 
          className="bg-red-600 hover:bg-red-700 animate-pulse"
        >
          <MicOff className="mr-2 h-4 w-4" /> Stop Recording
        </Button>
      )}
      
      {audioUrl && (
        <div className="flex flex-col gap-3 w-full max-w-md">
          <audio src={audioUrl} controls className="w-full" />
          <div className="flex gap-3">
            <Button 
              onClick={resetRecording} 
              variant="outline"
            >
              Record Again
            </Button>
            <Button 
              onClick={processRecording}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Submit Recording"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordingInterface;
