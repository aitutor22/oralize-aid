
import React from "react";
import { Card } from "@/components/ui/card";
import { topics } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface TopicSelectionProps {
  onSelectTopic: (topicId: number) => void;
}

const TopicSelection: React.FC<TopicSelectionProps> = ({ onSelectTopic }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 animate-fade-in">
      <div className="text-center mb-12">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-3">
          PSLE English
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4">
          Oral Skills Practice
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Select a topic to begin practicing your English oral skills.
          Each topic contains three question types to help you prepare for your PSLE.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <Card 
            key={topic.id}
            className={cn(
              "overflow-hidden hover-scale cursor-pointer transition-all duration-300",
              "border border-neutral-200 card-shadow"
            )}
            onClick={() => onSelectTopic(topic.id)}
          >
            <div className="h-40 overflow-hidden">
              <img 
                src={topic.imageSrc} 
                alt={topic.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-neutral-800">{topic.title}</h3>
              <p className="text-neutral-500 mt-2 text-sm">
                Practice oral skills related to {topic.title.toLowerCase()}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-blue-600 text-sm font-medium">3 question types</span>
                <span className="inline-block w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  →
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopicSelection;
