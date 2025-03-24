
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface VocabularyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VocabularyModal: React.FC<VocabularyModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-700">
            Helpful Vocabulary & Quotations
          </DialogTitle>
          <DialogDescription>
            Use these words and phrases to enhance your response
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="mt-4">
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="general">General Vocabulary</TabsTrigger>
            <TabsTrigger value="quotations">Quotations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-700 mb-3">Basic Vocabulary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <VocabPill word="important" />
                <VocabPill word="beneficial" />
                <VocabPill word="significant" />
                <VocabPill word="consider" />
                <VocabPill word="furthermore" />
                <VocabPill word="therefore" />
                <VocabPill word="consequently" />
                <VocabPill word="evidently" />
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-700 mb-3">Intermediate Vocabulary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <VocabPill word="substantial" />
                <VocabPill word="imperative" />
                <VocabPill word="versatile" />
                <VocabPill word="meticulous" />
                <VocabPill word="facilitate" />
                <VocabPill word="nevertheless" />
                <VocabPill word="subsequently" />
                <VocabPill word="analogous" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="quotations" className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-700 mb-3">Basic Quotations</h3>
              <div className="grid grid-cols-1 gap-3">
                <QuoteCard 
                  quote="Practice makes perfect." 
                  usage="When discussing the importance of regular practice."
                />
                <QuoteCard 
                  quote="Knowledge is power." 
                  usage="When explaining the benefits of learning."
                />
                <QuoteCard 
                  quote="Actions speak louder than words." 
                  usage="When emphasizing the importance of behavior over talk."
                />
                <QuoteCard 
                  quote="Two heads are better than one." 
                  usage="When discussing teamwork and collaboration."
                />
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-700 mb-3">Intermediate Quotations</h3>
              <div className="grid grid-cols-1 gap-3">
                <QuoteCard 
                  quote="The journey of a thousand miles begins with a single step." 
                  usage="When discussing starting something challenging."
                />
                <QuoteCard 
                  quote="It is not enough to have knowledge; one must apply it." 
                  usage="When discussing the practical application of learning."
                />
                <QuoteCard 
                  quote="Perseverance is not a long race; it is many short races one after the other." 
                  usage="When discussing the importance of persistence."
                />
                <QuoteCard 
                  quote="Education is the passport to the future, for tomorrow belongs to those who prepare for it today." 
                  usage="When emphasizing the importance of education."
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogClose asChild>
          <Button variant="outline" className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

const VocabPill = ({ word }: { word: string }) => (
  <div className="bg-white py-2 px-3 rounded-full border border-blue-200 text-center">
    <span className="font-medium text-blue-700">{word}</span>
  </div>
);

const QuoteCard = ({ quote, usage }: { quote: string; usage: string }) => (
  <div className="bg-white p-3 rounded border border-blue-200">
    <div className="font-medium text-blue-700 italic">"{quote}"</div>
    <div className="text-sm text-neutral-600 mt-1">
      <span className="font-medium">Usage:</span> {usage}
    </div>
  </div>
);

export default VocabularyModal;

