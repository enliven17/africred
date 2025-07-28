export interface EduChainConfig {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
  faucetUrls: string[];
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  chainId: string | null;
  isCorrectNetwork: boolean;
  explorerUrl?: string;
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  gasUsed: string;
  gasPrice: string;
  timestamp: number;
  status: 'pending' | 'success' | 'failed';
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  reward: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  timeEstimate: string;
  participants: number;
  requirements: string[];
  steps: string[];
  isCompleted: boolean;
  completionDate?: number;
  transactionHash?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockDate?: number;
  reward: number;
}

export interface UserProfile {
  address: string;
  username: string;
  avatar: string;
  role: 'student' | 'educator';
  level: number;
  experience: number;
  totalRewards: number;
  completedMissions: number;
  createdMissions: number; // For educators
  achievements: Achievement[];
  joinDate: number;
  verifiedEducator: boolean; // EduChain verification
  educatorCertificate?: string; // NFT certificate hash
} 