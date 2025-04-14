export interface Topic {
  id: number;
  title: string;
  imageSrc: string;
}

export interface Question {
  id: number;
  topicId: number;
  type: 1 | 2 | 3; // 1: Picture-based, 2: Personal experience, 3: Opinion/suggestion
  text: string;
  imageSrc?: string; // Only for type 1
}

export interface PeelResponse {
  point: string;
  explanation: string;
  example: string;
  link: string;
}

export interface Feedback {
  originalAnswer: string; // Added this property
  peel: {
    point: string;
    explanation: string;
    example: string;
    link: string;
  };
  language: {
    vocabulary: string[];
    grammar: string[];
    sentenceStructure: string[];
    pronunciation?: string[]; // Only for audio submissions
  };
  revisedAnswer: string;
}

export const topics: Topic[] = [
  { id: 1, title: "School Life", imageSrc: "/placeholder.svg" },
  { id: 2, title: "Family & Friends", imageSrc: "/placeholder.svg" },
  { id: 3, title: "Hobbies & Interests", imageSrc: "/placeholder.svg" },
  { id: 4, title: "Technology", imageSrc: "/placeholder.svg" },
  { id: 5, title: "Environment", imageSrc: "/placeholder.svg" },
  { id: 6, title: "Health & Wellness", imageSrc: "/placeholder.svg" },
  { id: 7, title: "Celebrations", imageSrc: "/placeholder.svg" },
  { id: 8, title: "Sports & Games", imageSrc: "/placeholder.svg" },
  { id: 9, title: "Food & Nutrition", imageSrc: "/placeholder.svg" },
  { id: 10, title: "Community", imageSrc: "/placeholder.svg" },
  { id: 11, title: "Travel", imageSrc: "/placeholder.svg" },
  { id: 12, title: "Books & Reading", imageSrc: "/placeholder.svg" },
];

export const questions: Question[] = [
  // School Life
  {
    id: 1,
    topicId: 1,
    type: 1,
    text: "How are the students feeling in this picture? Why do you think they feel this way?",
    imageSrc: "/placeholder.svg",
  },
  {
    id: 2,
    topicId: 1,
    type: 2,
    text: "Tell me about a time when you felt proud of your achievements in school.",
  },
  {
    id: 3,
    topicId: 1,
    type: 3,
    text: "What changes would you suggest to make school more enjoyable for students?",
  },
  
  // Family & Friends
  {
    id: 4,
    topicId: 2,
    type: 1,
    text: "How are the family members interacting in this picture? What might they be celebrating?",
    imageSrc: "/placeholder.svg",
  },
  {
    id: 5,
    topicId: 2,
    type: 2,
    text: "Share an experience where a friend or family member helped you during a difficult time.",
  },
  {
    id: 6,
    topicId: 2,
    type: 3,
    text: "What are some ways families can spend quality time together in today's busy world?",
  },
  
  // Adding similar patterns for other topics
  // Each topic has 3 questions - one of each type
  
  // Just adding a few more examples - in a real application, you would have all 36 questions (12 topics × 3 questions)
  
  // Hobbies & Interests
  {
    id: 7,
    topicId: 3,
    type: 1,
    text: "What activities do you see in the picture? Which one would you most enjoy?",
    imageSrc: "/placeholder.svg",
  },
  {
    id: 8,
    topicId: 3,
    type: 2,
    text: "Describe a hobby you enjoy and explain how you became interested in it.",
  },
  {
    id: 9,
    topicId: 3,
    type: 3,
    text: "What hobby do you think every student should try? Why would it be beneficial?",
  },
];

export const peelExplanation = {
  title: "PEEL Structure for Oral Responses",
  description: "The PEEL structure helps you organize your thoughts clearly and provide comprehensive answers.",
  sections: [
    {
      name: "Point",
      description: "Start with a clear main point or statement that directly answers the question.",
      example: "I believe the students in the picture are feeling excited and proud.",
      tips: "Keep it concise (under 20 words) and directly related to the question."
    },
    {
      name: "Explanation",
      description: "Explain your point by giving reasons or clarifying your thinking.",
      example: "They are likely feeling this way because they appear to be receiving awards or recognition for their hard work and achievements at what seems to be a school ceremony.",
      tips: "Use connecting words like 'because', 'since', or 'as' to link to your point."
    },
    {
      name: "Example",
      description: "Provide a specific example that supports your explanation.",
      example: "For instance, the student in the center is holding a trophy and has a wide smile, while her classmates are applauding enthusiastically.",
      tips: "Use phrases like 'for example', 'for instance', or 'such as' to introduce your example."
    },
    {
      name: "Link",
      description: "Connect back to the original question or extend your answer to a broader context.",
      example: "These moments of recognition are important as they motivate students to continue working hard and can create lasting positive memories of their school experience.",
      tips: "Consider the wider implications or significance of your answer."
    }
  ]
};

// Mock feedback generator
export const generateMockFeedback = (response: PeelResponse, isAudio: boolean): Feedback => {
  // Create a mock original answer from the response
  const originalAnswer = `I ${response.point.length > 0 ? response.point : "have an opinion about this"}. ${response.explanation.length > 0 ? response.explanation : "Let me explain my reasoning."} ${response.example.length > 0 ? response.example : "For instance, this is an example."} ${response.link.length > 0 ? response.link : "In conclusion, this is important."}`;

  return {
    originalAnswer, // Add this property to the returned object
    peel: {
      point: response.point.length > 5 
        ? "Good effort in stating your main point. Try to make it even more concise and focused."
        : "Your point needs to be more clearly stated. Aim for a direct statement that answers the question.",
      explanation: response.explanation.length > 20
        ? "You've provided a good explanation. Consider using more precise language to strengthen your reasoning."
        : "Your explanation needs more detail. Try to elaborate on why you think this way.",
      example: response.example.length > 20
        ? "Great example! It supports your explanation well. Consider adding more specific details next time."
        : "Your example needs to be more specific to support your explanation.",
      link: response.link.length > 20
        ? "Good job connecting back to the main question. Your link adds value to your response."
        : "Try to make a stronger connection to the original question or broader context.",
    },
    language: {
      vocabulary: [
        "Good use of descriptive words like 'enthusiastic'",
        "Consider using more varied adjectives to describe emotions",
        "Try including topic-specific vocabulary in your next response"
      ],
      grammar: [
        "Your sentence structures are generally correct",
        "Pay attention to subject-verb agreement in complex sentences",
        "Consider varying your sentence beginnings for more engaging responses"
      ],
      sentenceStructure: [
        "Good mix of simple and compound sentences",
        "Try incorporating more complex sentences with subordinate clauses",
        "Practice transitioning between ideas more smoothly"
      ],
      pronunciation: isAudio ? [
        "Clear pronunciation of most words",
        "Work on emphasizing key words to enhance meaning",
        "Practice the pronunciation of longer, multi-syllable words"
      ] : undefined,
    },
    revisedAnswer: `I believe the students in the picture are feeling excited and proud because they are receiving recognition for their hard work at what appears to be a school award ceremony. For instance, the student in the center is holding a trophy with a beaming smile, while her classmates are applauding enthusiastically around her. These moments of recognition are significant as they not only boost students' confidence but also create lasting positive memories of their educational journey.`,
  };
};

// Add mock answers for each question (for the revise page)
export const getMockAnswer = (questionId: number): PeelResponse => {
  // Example mock answers for each question type
  const mockAnswers: Record<number, PeelResponse> = {
    // School Life questions
    1: {
      point: "The students in the picture appear excited and proud.",
      explanation: "They are likely feeling this way because they have just received recognition for their academic achievements at what seems to be a school award ceremony.",
      example: "For instance, several students are holding certificates and trophies, while their peers and teachers are clapping enthusiastically around them.",
      link: "These moments of recognition are important as they motivate students to continue working hard and create lasting positive memories of their educational experience."
    },
    2: {
      point: "I felt incredibly proud when I received the 'Most Improved Student' award in my mathematics class last year.",
      explanation: "This achievement was particularly meaningful to me because I had struggled with mathematics for years and had dedicated countless hours to improving my skills through extra practice and tutoring sessions.",
      example: "For example, I went from barely passing in the first term to scoring in the top 10% of the class by the final exam, which demonstrated my perseverance and growth mindset.",
      link: "This experience taught me that with determination and the right support, I could overcome academic challenges that once seemed insurmountable, a lesson I've applied to other areas of my life."
    },
    3: {
      point: "I believe schools could be more enjoyable by incorporating more interactive, real-world learning experiences into the curriculum.",
      explanation: "Traditional classroom settings often focus too heavily on memorization and standardized testing, which can diminish students' natural curiosity and enthusiasm for learning.",
      example: "For instance, replacing some theoretical lessons with hands-on projects, field trips, or community service initiatives would make learning more engaging and relevant.",
      link: "These changes would not only make school more enjoyable but also better prepare students for future careers by developing crucial skills like creativity, collaboration, and problem-solving."
    },
    // Family & Friends questions
    4: {
      point: "The family in the picture appears to be celebrating a significant milestone together.",
      explanation: "Their joyful expressions and the festive atmosphere suggest they are commemorating an important event that has brought them together from different generations.",
      example: "For example, the presence of decorated tables, formal attire, and what looks like a special cake indicates this might be a wedding anniversary, graduation, or birthday celebration.",
      link: "These family celebrations are crucial for maintaining bonds across generations and creating shared memories that strengthen family relationships for years to come."
    },
    5: {
      point: "My best friend provided invaluable support when my family moved to a new city during my final year of school.",
      explanation: "This was an especially challenging time as I was leaving behind familiar surroundings and friends while facing the pressure of important examinations.",
      example: "For instance, she called me every week, sent encouraging messages before my exams, and even visited me twice despite the long distance, which helped me feel less isolated.",
      link: "Her support taught me the importance of maintaining meaningful friendships even through major life changes and inspired me to be equally supportive to others facing difficult transitions."
    },
    6: {
      point: "Families can create quality time by establishing regular technology-free rituals.",
      explanation: "In today's digital world, meaningful connection is often hindered by constant notifications and screen time that fragment our attention and prevent deep conversations.",
      example: "For example, designating one evening per week for a family dinner where all devices are put away, followed by a shared activity like board games or cooking together, creates space for genuine interaction.",
      link: "These intentional rituals not only strengthen family bonds but also teach children valuable skills in relationship-building and present-moment awareness that benefit their social development."
    }
  };

  // Add default case for any other question
  const defaultAnswer: PeelResponse = {
    point: "Yes, I believe doing household chores is important.",
    explanation: "In view of the recent COVID-19 pandemic, it is ever more crucial to maintain a high standard of cleanliness and I believe that personal hygiene starts from our homes. Chores also help to teach us valuable life skills. Besides that, helping my parents to start off with the household chores is a gracious gesture of love I can show them as they usually come home late in the evening, exhausted from work and long hours of travelling.",
    example: "My parents are pleasantly surprised to come home to a clean and sweet-smelling environment as it is very welcoming to them and their mood is instantly uplifted. I love to see their smiling countenances as it is so rewarding for me. We are very hygiene conscious and feel proud to keep our home spick and span. Cleaning every nook and cranny of our homes will allow us to keep our homes looking presentable and pristine and appear inviting to guests. We learn personal responsibility by keeping our home clean and inviting. Doing household chores imbue us with life-skills like ironing and laundry that would prove valuable when I grow up into an adult and complete my own chores independently.",
    link: "These are the reasons why I believe doing chores is important."
  };

  return mockAnswers[questionId] || defaultAnswer;
};
