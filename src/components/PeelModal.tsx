
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { peelExplanation } from "@/lib/mockData";

interface PeelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PeelModal: React.FC<PeelModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto glass border-blue-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-blue-700">
            {peelExplanation.title}
          </DialogTitle>
          <DialogDescription className="text-neutral-600 mt-2">
            {peelExplanation.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          {peelExplanation.sections.map((section) => (
            <div key={section.name} className="space-y-2 animate-fade-in">
              <h3 className="text-lg font-medium text-blue-600 flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-blue-700 font-semibold">
                  {section.name[0]}
                </div>
                {section.name}
              </h3>
              <p className="text-neutral-700 ml-10">{section.description}</p>
              <div className="bg-blue-50 p-3 rounded-md border border-blue-100 ml-10">
                <p className="text-neutral-700 italic">"{section.example}"</p>
              </div>
              <div className="ml-10 flex items-start mt-2">
                <span className="text-blue-500 font-medium mr-2 mt-0.5">Tip:</span>
                <p className="text-neutral-600 text-sm">{section.tips}</p>
              </div>
            </div>
          ))}
        </div>
        
        <DialogFooter>
          <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 transition-colors">
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PeelModal;
