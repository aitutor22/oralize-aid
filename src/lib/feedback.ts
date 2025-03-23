
import { PeelResponse, Feedback, generateMockFeedback } from "./mockData";

// In a real application, this would connect to a backend service
// For now, we'll use the mock data generator
export const getFeedback = async (
  response: PeelResponse,
  isAudio: boolean,
  topicId: number,
  questionId: number
): Promise<Feedback> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockFeedback(response, isAudio));
    }, 2000);
  });
};

export const processAudioTranscription = async (audioBlob: Blob): Promise<string> => {
  // In a real application, this would send the audio to a transcription service
  // For now, we'll return a mock transcription after a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("I think the students in the picture are feeling happy and excited because they've just received their exam results and did well. For example, you can see them smiling and high-fiving each other. It's important for students to celebrate their achievements as it motivates them to keep working hard.");
    }, 3000);
  });
};
