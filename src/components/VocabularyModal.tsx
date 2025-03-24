
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <VocabCard word="important" example="This is an important issue that affects many students." />
                <VocabCard word="beneficial" example="Reading is beneficial for expanding your knowledge." />
                <VocabCard word="significant" example="There is a significant difference between the two approaches." />
                <VocabCard word="consider" example="We should consider all options before making a decision." />
                <VocabCard word="furthermore" example="The activity is fun; furthermore, it helps build teamwork." />
                <VocabCard word="therefore" example="He studied hard; therefore, he performed well on the test." />
                <VocabCard word="consequently" example="He didn't practice; consequently, he didn't improve." />
                <VocabCard word="evidently" example="Evidently, more practice leads to better results." />
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-700 mb-3">Intermediate Vocabulary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <VocabCard word="substantial" example="There is substantial evidence supporting this view." />
                <VocabCard word="imperative" example="It is imperative that we address this issue immediately." />
                <VocabCard word="versatile" example="Reading is a versatile skill that helps in many subjects." />
                <VocabCard word="meticulous" example="She was meticulous in her preparation for the exam." />
                <VocabCard word="facilitate" example="Good communication can facilitate better understanding." />
                <VocabCard word="nevertheless" example="It was difficult; nevertheless, they persevered." />
                <VocabCard word="subsequently" example="He made a mistake and subsequently corrected it." />
                <VocabCard word="analogous" example="This situation is analogous to what happened last year." />
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

const VocabCard = ({ word, example }: { word: string; example: string }) => (
  <div className="bg-white p-3 rounded border border-blue-200">
    <div className="font-medium text-blue-700">{word}</div>
    <div className="text-sm text-neutral-600 mt-1">{example}</div>
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
