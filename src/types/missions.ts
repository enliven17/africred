export interface MissionProgress {
  missionId: number;
  isCompleted: boolean;
  currentStep: number;
  totalSteps: number;
  score: number;
  maxScore: number;
  timeSpent: number; // in minutes
  startedAt: string;
  completedAt?: string;
  answers: Record<string, any>;
  certificates: Certificate[];
}

export interface Certificate {
  id: string;
  missionId: number;
  missionTitle: string;
  issuedAt: string;
  score: number;
  maxScore: number;
  percentage: number;
  txHash?: string; // EduChain transaction hash
  nftTokenId?: string; // NFT certificate token ID
}

export interface UserProgress {
  userId: string;
  totalMissions: number;
  completedMissions: number;
  totalScore: number;
  totalPoints: number;
  level: number;
  experience: number;
  certificates: Certificate[];
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  points: number;
}

export interface QuizAnswer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
}

export interface MissionSubmission {
  missionId: number;
  answers: QuizAnswer[];
  essayContent?: string;
  codeSubmission?: string;
  audioRecordings?: string[];
  attachments?: string[];
  totalTime: number;
  score: number;
} 