
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { Mic, MicOff, Play, ArrowLeft, Volume2 } from "lucide-react";
import { PeelResponse, Question } from "@/lib/mockData";
import { processAudioTranscription } from "@/lib/feedback";
import { useToast } from "@/hooks/use-toast";

const ReviseAnswer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { question, mockAnswer } = location.state as { 
    question: Question, 
    mockAnswer: PeelResponse 
  };
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const {
    isRecording,
    recordingTime,
    audioBlob,
    audioUrl,
    formattedTime,
    startRecording,
    stopRecording,
    resetRecording,
  } = useAudioRecorder();
  
  const [transcription, setTranscription] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const speakMockAnswer = async () => {
    // This would connect to a TTS API in a real implementation
    // For now, we'll just toggle the state and show a toast notification
    setIsPlaying(true);
    toast({
      title: "Text-to-Speech",
      description: "In a real implementation, this would speak the mock answer.",
      duration: 3000,
    });
    
    // Simulate audio playing duration
    setTimeout(() => {
      setIsPlaying(false);
    }, 5000);
  };

  const processRecording = async () => {
    if (audioBlob) {
      setIsProcessing(true);
      try {
        const text = await processAudioTranscription(audioBlob);
        setTranscription(text);
      } catch (error) {
        console.error("Error processing audio:", error);
        toast({
          title: "Error",
          description: "Failed to process audio recording.",
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-6">
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={handleBackClick}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      
      <div className="max-w-5xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              {question.text}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {question.imageSrc && (
                <div className="md:col-span-1">
                  <img 
                    src={question.imageSrc} 
                    alt="Question visual aid" 
                    className="w-full rounded-md shadow-sm"
                  />
                </div>
              )}
              
              <div className={question.imageSrc ? "md:col-span-2" : "md:col-span-3"}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Model Answer</h2>
                  <Button 
                    onClick={speakMockAnswer} 
                    disabled={isPlaying}
                    variant="outline"
                  >
                    {isPlaying ? (
                      <>
                        <Volume2 className="mr-2 h-4 w-4 animate-pulse" />
                        Playing...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Listen
                      </>
                    )}
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-blue-600">Point</h3>
                    <p className="mt-1 border-l-4 border-blue-200 pl-3">{mockAnswer.point}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-green-600">Explanation</h3>
                    <p className="mt-1 border-l-4 border-green-200 pl-3">{mockAnswer.explanation}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-orange-600">Example</h3>
                    <p className="mt-1 border-l-4 border-orange-200 pl-3">{mockAnswer.example}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-purple-600">Link</h3>
                    <p className="mt-1 border-l-4 border-purple-200 pl-3">{mockAnswer.link}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Practice Speaking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Practice speaking this answer to improve your pronunciation and fluency.
              </p>
              
              <div className="flex flex-col items-center py-6">
                <div className="sound-wave-container mb-4 h-16 flex items-center justify-center">
                  {isRecording ? (
                    [...Array(5)].map((_, i) => (
                      <div key={i} className="sound-wave-bar h-10 w-1 bg-blue-500 mx-1 animate-sound-wave"></div>
                    ))
                  ) : (
                    <div className="text-center text-gray-400">
                      {!audioUrl && "Tap the microphone to start recording"}
                      {audioUrl && "Recording complete"}
                    </div>
                  )}
                </div>
                
                <div className="text-center mb-4">
                  <div className="text-2xl font-mono">{formattedTime}</div>
                </div>
                
                <div className="flex gap-3">
                  {!isRecording && !audioUrl && (
                    <Button 
                      onClick={startRecording} 
                      variant="outline" 
                      size="lg" 
                      className="rounded-full w-16 h-16 bg-red-50 hover:bg-red-100"
                    >
                      <Mic className="h-6 w-6 text-red-500" />
                    </Button>
                  )}
                  
                  {isRecording && (
                    <Button 
                      onClick={stopRecording} 
                      variant="outline" 
                      size="lg" 
                      className="rounded-full w-16 h-16 bg-red-100 hover:bg-red-200 animate-pulse"
                    >
                      <MicOff className="h-6 w-6 text-red-500" />
                    </Button>
                  )}
                  
                  {audioUrl && (
                    <>
                      <audio src={audioUrl} controls className="w-full max-w-md" />
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
                    </>
                  )}
                </div>
              </div>
              
              {transcription && (
                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <h3 className="font-medium mb-2">Your Recorded Answer</h3>
                  <p>{transcription}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReviseAnswer;
