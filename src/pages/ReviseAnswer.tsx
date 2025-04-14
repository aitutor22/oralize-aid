
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { Mic, MicOff, Play, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { PeelResponse, Question } from "@/lib/mockData";
import { processAudioTranscription } from "@/lib/feedback";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import RevisionModal from "@/components/RevisionModal";

// Define the sections of the PEEL structure
type SectionType = "point" | "explanation" | "example" | "link";

// Interface for scored word
interface ScoredWord {
  word: string;
  score: "good" | "fair" | "poor";
}

const ReviseAnswer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { question, mockAnswer } = location.state as { 
    question: Question, 
    mockAnswer: PeelResponse 
  };
  
  // State for section navigation
  const [currentSection, setCurrentSection] = useState<SectionType>("point");
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [scoredWords, setScoredWords] = useState<Record<SectionType, ScoredWord[]>>({
    point: [],
    explanation: [],
    example: [],
    link: []
  });
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  
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
  
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleNextSection = () => {
    if (currentSection === "point") setCurrentSection("explanation");
    else if (currentSection === "explanation") setCurrentSection("example");
    else if (currentSection === "example") setCurrentSection("link");
  };

  const handlePreviousSection = () => {
    if (currentSection === "explanation") setCurrentSection("point");
    else if (currentSection === "example") setCurrentSection("explanation");
    else if (currentSection === "link") setCurrentSection("example");
  };

  const getSectionTitle = (section: SectionType): string => {
    switch (section) {
      case "point": return "Point";
      case "explanation": return "Explanation";
      case "example": return "Example";
      case "link": return "Link";
    }
  };

  const getSectionContent = (section: SectionType): string => {
    switch (section) {
      case "point": return mockAnswer.point;
      case "explanation": return mockAnswer.explanation;
      case "example": return mockAnswer.example;
      case "link": return mockAnswer.link;
    }
  };

  const getSectionColor = (section: SectionType): string => {
    switch (section) {
      case "point": return "blue";
      case "explanation": return "green";
      case "example": return "orange";
      case "link": return "purple";
    }
  };

  const processRecording = async () => {
    if (audioBlob) {
      setIsProcessing(true);
      try {
        // In a real implementation, the API would return the scored words
        // For now, we'll simulate this with random scoring
        const text = await processAudioTranscription(audioBlob);
        
        // Simulate word scoring (in a real application, this would come from the API)
        const words = getSectionContent(currentSection).split(' ');
        const scoredWordsForSection = words.map(word => ({
          word,
          score: ["good", "fair", "poor"][Math.floor(Math.random() * 3)] as "good" | "fair" | "poor"
        }));
        
        setScoredWords(prev => ({
          ...prev,
          [currentSection]: scoredWordsForSection
        }));
        
        setShowScoreModal(true);
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

  const getScoreColor = (score: "good" | "fair" | "poor"): string => {
    switch (score) {
      case "good": return "text-green-600";
      case "fair": return "text-orange-500";
      case "poor": return "text-red-500";
    }
  };

  const renderScoredContent = (section: SectionType) => {
    const sectionWords = scoredWords[section];
    if (!sectionWords || sectionWords.length === 0) {
      return getSectionContent(section);
    }

    return (
      <div>
        {sectionWords.map((scoredWord, index) => (
          <span 
            key={index} 
            className={`${getScoreColor(scoredWord.score)} inline-block mr-1`}
          >
            {scoredWord.word}
          </span>
        ))}
      </div>
    );
  };

  const renderRevisedAnswer = () => {
    const allSections = ["point", "explanation", "example", "link"] as SectionType[];
    const revisedContent = allSections.map(section => {
      const sectionContent = getSectionContent(section);
      return sectionContent;
    }).join(" ");
    
    return revisedContent;
  };

  // Sidebar navigation for sections
  const renderSectionNav = () => {
    const sections: SectionType[] = ["point", "explanation", "example", "link"];
    
    return (
      <div className="mb-6 flex flex-row justify-center gap-2">
        {sections.map((section) => (
          <Button
            key={section}
            variant={currentSection === section ? "default" : "outline"}
            className={`flex flex-col items-center py-3 ${
              currentSection === section 
                ? `bg-${getSectionColor(section)}-600` 
                : `border-${getSectionColor(section)}-200 text-${getSectionColor(section)}-700`
            }`}
            onClick={() => setCurrentSection(section)}
          >
            <span className="text-xs">{getSectionTitle(section)}</span>
          </Button>
        ))}
      </div>
    );
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
            <div className="mt-4">
              {renderSectionNav()}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-4">
                <div className={`border-l-4 border-${getSectionColor(currentSection)}-200 pl-3 py-2`}>
                  <h3 className={`font-medium text-${getSectionColor(currentSection)}-600 mb-2 flex items-center`}>
                    <BookOpen className={`h-5 w-5 mr-2 text-${getSectionColor(currentSection)}-500`} />
                    {getSectionTitle(currentSection)}
                  </h3>
                  <div className="text-lg leading-relaxed">
                    {renderScoredContent(currentSection)}
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={handlePreviousSection}
                    disabled={currentSection === "point"}
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" /> Previous
                  </Button>
                  
                  <div className="flex gap-3">
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
                      <div className="flex flex-col gap-3 w-full">
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
                  
                  <Button
                    variant="outline"
                    onClick={handleNextSection}
                    disabled={currentSection === "link"}
                  >
                    Next <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Button 
          onClick={() => setShowRevisionModal(true)} 
          className="w-full mt-4"
          disabled={Object.values(scoredWords).every(section => section.length === 0)}
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Practice Full Answer
        </Button>
      </div>
      
      {/* Score Modal */}
      <AlertDialog open={showScoreModal} onOpenChange={setShowScoreModal}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Reading Score</AlertDialogTitle>
            <AlertDialogDescription>
              Here's how you did on reading the {getSectionTitle(currentSection)}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="py-4">
            <div className="bg-white/70 p-4 rounded-lg border border-gray-200 text-neutral-800 leading-relaxed">
              {renderScoredContent(currentSection)}
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-green-600 font-bold text-lg">Good</div>
                <div className="text-sm text-gray-600">Words pronounced well</div>
              </div>
              <div>
                <div className="text-orange-500 font-bold text-lg">Fair</div>
                <div className="text-sm text-gray-600">Words to improve</div>
              </div>
              <div>
                <div className="text-red-500 font-bold text-lg">Poor</div>
                <div className="text-sm text-gray-600">Words to practice</div>
              </div>
            </div>
          </div>
          
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => {
                setShowScoreModal(false);
                resetRecording();
              }}
            >
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Revision Modal */}
      <RevisionModal 
        isOpen={showRevisionModal} 
        onClose={() => setShowRevisionModal(false)}
        revisedAnswer={renderRevisedAnswer()}
      />
    </div>
  );
};

export default ReviseAnswer;
