
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface RevisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  revisedAnswer: string;
}

const RevisionModal: React.FC<RevisionModalProps> = ({ isOpen, onClose, revisedAnswer }) => {
  const [isReading, setIsReading] = useState(false);
  
  const startReading = () => {
    setIsReading(true);
    // In a real implementation, you might integrate with a speech synthesis API
    // For now, we'll just simulate the reading process
    setTimeout(() => {
      setIsReading(false);
    }, 5000);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] glass border-blue-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-blue-700">
            Practice Reading
          </DialogTitle>
          <DialogDescription className="text-neutral-600 mt-2">
            Practice reading the improved answer out loud to enhance your speaking skills.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="bg-white/70 p-5 rounded-lg border border-blue-100 text-neutral-800 leading-relaxed">
            {revisedAnswer}
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={startReading} 
            disabled={isReading}
            className="bg-blue-600 hover:bg-blue-700 transition-colors w-full sm:w-auto"
          >
            {isReading ? "Reading..." : "Read Aloud"}
          </Button>
          <Button 
            onClick={onClose} 
            variant="outline"
            className="border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors w-full sm:w-auto"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RevisionModal;
