
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info, BookOpen } from "lucide-react";
import { questions, PeelResponse } from "@/lib/mockData";
import { processAudioTranscription } from "@/lib/feedback";
import AudioRecorder from "./AudioRecorder";
import PeelModal from "./PeelModal";
import VocabularyModal from "./VocabularyModal";
import { cn } from "@/lib/utils";

interface QuestionPageProps {
  questionId: number;
  onSubmit: (response: PeelResponse, isAudio: boolean) => void;
  onBack: () => void;
}

const QuestionPage: React.FC<QuestionPageProps> = ({ 
  questionId, 
  onSubmit,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState("form");
  const [isPeelModalOpen, setIsPeelModalOpen] = useState(false);
  const [isVocabModalOpen, setIsVocabModalOpen] = useState(false);
  const [response, setResponse] = useState<PeelResponse>({
    point: "",
    explanation: "",
    example: "",
    link: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({
    point: false,
    explanation: false,
    example: false,
    link: false
  });
  
  const question = questions.find((q) => q.id === questionId);
  
  if (!question) {
    return <div>Question not found</div>;
  }
  
  const questionTypeLabels = {
    1: "Picture-based Question",
    2: "Personal Experience",
    3: "Opinion & Suggestion"
  };
  
  const handleFormChange = (field: keyof PeelResponse, value: string) => {
    setResponse(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: false
      }));
    }
  };
  
  const validateForm = () => {
    const errors = {
      point: response.point.trim() === "",
      explanation: response.explanation.trim() === "",
      example: response.example.trim() === "",
      link: response.link.trim() === ""
    };
    
    setFormErrors(errors);
    return !Object.values(errors).some(Boolean);
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(response, false);
    }
  };
  
  const handleAudioComplete = async (audioBlob: Blob) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would send the audio to be transcribed
      const transcription = await processAudioTranscription(audioBlob);
      
      // For the demo, we'll use a simple approach to split the transcription into PEEL parts
      const sentences = transcription.split('. ');
      
      const audioResponse: PeelResponse = {
        point: sentences[0] || "",
        explanation: sentences.length > 1 ? sentences[1] : "",
        example: sentences.length > 2 ? sentences[2] : "",
        link: sentences.length > 3 ? sentences.slice(3).join('. ') : ""
      };
      
      onSubmit(audioResponse, true);
    } catch (error) {
      console.error("Error processing audio:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="text-neutral-600 hover:text-blue-700 mb-6"
      >
        ← Back to Questions
      </Button>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column - Question and image */}
        <div className="w-full lg:w-5/12">
          <Card className="overflow-hidden border border-neutral-200 card-shadow p-6 mb-4">
            <div className="rounded-lg bg-blue-100 text-blue-700 font-medium py-1 px-3 inline-block text-sm mb-4">
              {questionTypeLabels[question.type as keyof typeof questionTypeLabels]}
            </div>
            
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">
              {question.text}
            </h2>
            
            {question.type === 1 && question.imageSrc && (
              <div className="my-6 rounded-lg overflow-hidden border border-neutral-200">
                <img 
                  src={question.imageSrc} 
                  alt="Question Reference" 
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <div className="flex items-center space-x-2">
                <span className="text-neutral-600 text-sm">
                  Answer using the PEEL structure
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center justify-center text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-1 h-auto rounded-full"
                  onClick={() => setIsPeelModalOpen(true)}
                >
                  <Info className="h-4 w-4" />
                </Button>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2"
                onClick={() => setIsVocabModalOpen(true)}
              >
                <BookOpen className="h-4 w-4" />
                <span>Helpful Vocabulary</span>
              </Button>
            </div>
          </Card>
        </div>
        
        {/* Right column - Answer input */}
        <div className="w-full lg:w-7/12">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="form" className="text-lg">Form Input</TabsTrigger>
              <TabsTrigger value="audio" className="text-lg">Audio Recording</TabsTrigger>
            </TabsList>
            
            <TabsContent value="form" className="mt-0">
              <Card className="border border-neutral-200 card-shadow">
                <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
                  <div className="space-y-2">
                    <Label 
                      htmlFor="point" 
                      className={cn(
                        "text-lg font-medium flex items-center",
                        formErrors.point ? "text-red-500" : "text-blue-700"
                      )}
                    >
                      Point
                      <span className="text-red-500 ml-1">*</span>
                      <span className="text-neutral-500 text-xs ml-2 font-normal">
                        (max 20 words)
                      </span>
                    </Label>
                    <Textarea
                      id="point"
                      placeholder="State your main point that directly answers the question"
                      value={response.point}
                      onChange={(e) => handleFormChange("point", e.target.value)}
                      className={cn(
                        "resize-none h-20",
                        formErrors.point ? "border-red-300 focus-visible:ring-red-300" : ""
                      )}
                    />
                    {formErrors.point && (
                      <p className="text-red-500 text-sm">Please provide a point</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label 
                      htmlFor="explanation" 
                      className={cn(
                        "text-lg font-medium",
                        formErrors.explanation ? "text-red-500" : "text-blue-700"
                      )}
                    >
                      Explanation
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Textarea
                      id="explanation"
                      placeholder="Explain why you think this way"
                      value={response.explanation}
                      onChange={(e) => handleFormChange("explanation", e.target.value)}
                      className={cn(
                        "resize-none h-24",
                        formErrors.explanation ? "border-red-300 focus-visible:ring-red-300" : ""
                      )}
                    />
                    {formErrors.explanation && (
                      <p className="text-red-500 text-sm">Please provide an explanation</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label 
                      htmlFor="example" 
                      className={cn(
                        "text-lg font-medium",
                        formErrors.example ? "text-red-500" : "text-blue-700"
                      )}
                    >
                      Example
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Textarea
                      id="example"
                      placeholder="Give a specific example to support your explanation"
                      value={response.example}
                      onChange={(e) => handleFormChange("example", e.target.value)}
                      className={cn(
                        "resize-none h-24",
                        formErrors.example ? "border-red-300 focus-visible:ring-red-300" : ""
                      )}
                    />
                    {formErrors.example && (
                      <p className="text-red-500 text-sm">Please provide an example</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label 
                      htmlFor="link" 
                      className={cn(
                        "text-lg font-medium",
                        formErrors.link ? "text-red-500" : "text-blue-700"
                      )}
                    >
                      Link
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Textarea
                      id="link"
                      placeholder="Connect back to the question or extend to a broader context"
                      value={response.link}
                      onChange={(e) => handleFormChange("link", e.target.value)}
                      className={cn(
                        "resize-none h-24",
                        formErrors.link ? "border-red-300 focus-visible:ring-red-300" : ""
                      )}
                    />
                    {formErrors.link && (
                      <p className="text-red-500 text-sm">Please provide a link</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                  >
                    Submit Answer
                  </Button>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="audio" className="mt-0">
              <Card className="border border-neutral-200 card-shadow p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                    Record Your Answer
                  </h3>
                  <p className="text-neutral-600">
                    Click the microphone button below to start recording. 
                    A 3-second countdown will begin before recording starts.
                  </p>
                </div>
                
                <AudioRecorder onRecordingComplete={handleAudioComplete} />
                
                {isSubmitting && (
                  <div className="text-center mt-6 text-neutral-600">
                    Processing your recording...
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <PeelModal 
        isOpen={isPeelModalOpen} 
        onClose={() => setIsPeelModalOpen(false)} 
      />
      
      <VocabularyModal
        isOpen={isVocabModalOpen}
        onClose={() => setIsVocabModalOpen(false)}
      />
    </div>
  );
};

export default QuestionPage;
