
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SectionType } from "@/types/peel";

interface UseTextToSpeechProps {
  getSectionContent: (section: SectionType) => string;
}

export const useTextToSpeech = ({ getSectionContent }: UseTextToSpeechProps) => {
  const { toast } = useToast();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSpeakingSection, setCurrentSpeakingSection] = useState<SectionType | null>(null);

  const readAloudSection = (section: SectionType) => {
    // Cancel any ongoing speech
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    
    const text = getSectionContent(section);
    
    if ('speechSynthesis' in window && text) {
      setCurrentSpeakingSection(section);
      setIsSpeaking(true);
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      utterance.onend = () => {
        setIsSpeaking(false);
        setCurrentSpeakingSection(null);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
        setCurrentSpeakingSection(null);
        toast({
          title: "Speech Error",
          description: "There was an error with the text-to-speech functionality.",
          variant: "destructive",
        });
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };
  
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentSpeakingSection(null);
    }
  };

  return {
    isSpeaking,
    currentSpeakingSection,
    readAloudSection,
    stopSpeaking,
  };
};
