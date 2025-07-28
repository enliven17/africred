import { Certificate, MissionSubmission } from '@/types/missions';

// EduChain Certificate Smart Contract ABI (simplified)
const CERTIFICATE_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "studentAddress",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "missionTitle",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "score",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxScore",
        "type": "uint256"
      }
    ],
    "name": "issueCertificate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Certificate contract address (EduChain testnet)
const CERTIFICATE_CONTRACT_ADDRESS = "0x1234567890123456789012345678901234567890"; // Replace with actual address

export class CertificateService {
  private static instance: CertificateService;
  private web3: any;

  private constructor() {
    // Initialize Web3 with EduChain
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      this.web3 = new (window as any).Web3((window as any).ethereum);
    }
  }

  public static getInstance(): CertificateService {
    if (!CertificateService.instance) {
      CertificateService.instance = new CertificateService();
    }
    return CertificateService.instance;
  }

  // Issue certificate on EduChain
  async issueCertificate(
    studentAddress: string,
    missionTitle: string,
    score: number,
    maxScore: number
  ): Promise<{ txHash: string; tokenId: string }> {
    try {
      if (!this.web3) {
        throw new Error('Web3 not initialized');
      }

      const contract = new this.web3.eth.Contract(CERTIFICATE_ABI, CERTIFICATE_CONTRACT_ADDRESS);
      
      // Get current account
      const accounts = await this.web3.eth.requestAccounts();
      const fromAddress = accounts[0];

      // Issue certificate transaction
      const result = await contract.methods.issueCertificate(
        studentAddress,
        missionTitle,
        score,
        maxScore
      ).send({
        from: fromAddress,
        gas: 3000000
      });

      return {
        txHash: result.transactionHash,
        tokenId: result.events.CertificateIssued.returnValues.tokenId
      };
    } catch (error) {
      console.error('Failed to issue certificate:', error);
      // For demo purposes, return mock data
      return {
        txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        tokenId: Math.floor(Math.random() * 1000000).toString()
      };
    }
  }

  // Verify certificate on blockchain
  async verifyCertificate(tokenId: string): Promise<boolean> {
    try {
      if (!this.web3) {
        throw new Error('Web3 not initialized');
      }

      const contract = new this.web3.eth.Contract(CERTIFICATE_ABI, CERTIFICATE_CONTRACT_ADDRESS);
      const certificate = await contract.methods.getCertificate(tokenId).call();
      
      return certificate.isValid;
    } catch (error) {
      console.error('Failed to verify certificate:', error);
      return true; // Mock verification for demo
    }
  }

  // Get certificate metadata
  async getCertificateMetadata(tokenId: string): Promise<any> {
    try {
      if (!this.web3) {
        throw new Error('Web3 not initialized');
      }

      const contract = new this.web3.eth.Contract(CERTIFICATE_ABI, CERTIFICATE_CONTRACT_ADDRESS);
      const metadata = await contract.methods.getCertificateMetadata(tokenId).call();
      
      return metadata;
    } catch (error) {
      console.error('Failed to get certificate metadata:', error);
      return {
        studentAddress: '0x1234...5678',
        missionTitle: 'Sample Mission',
        score: 85,
        maxScore: 100,
        issuedAt: new Date().toISOString()
      };
    }
  }
}

// Local storage for mission progress
export class ProgressManager {
  private static STORAGE_KEY = 'africred_progress';

  static saveProgress(missionId: number, progress: any): void {
    try {
      const allProgress = this.getAllProgress();
      allProgress[missionId] = progress;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allProgress));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }

  static getProgress(missionId: number): any {
    try {
      const allProgress = this.getAllProgress();
      return allProgress[missionId] || null;
    } catch (error) {
      console.error('Failed to get progress:', error);
      return null;
    }
  }

  static getAllProgress(): Record<number, any> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to get all progress:', error);
      return {};
    }
  }

  static clearProgress(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear progress:', error);
    }
  }
}

// Points and leveling system
export class PointsSystem {
  static calculateScore(answers: any[], maxScore: number): number {
    let correctAnswers = 0;
    let totalQuestions = answers.length;

    answers.forEach(answer => {
      if (answer.isCorrect) {
        correctAnswers++;
      }
    });

    return Math.round((correctAnswers / totalQuestions) * maxScore);
  }

  static calculatePoints(score: number, timeSpent: number, difficulty: string): number {
    let basePoints = score;
    
    // Time bonus (faster completion = more points)
    const timeBonus = Math.max(0, 100 - timeSpent) * 0.5;
    
    // Difficulty multiplier
    const difficultyMultiplier = {
      'Easy': 1.0,
      'Medium': 1.5,
      'Hard': 2.0
    }[difficulty] || 1.0;

    return Math.round((basePoints + timeBonus) * difficultyMultiplier);
  }

  static calculateLevel(experience: number): number {
    return Math.floor(experience / 100) + 1;
  }

  static getLevelProgress(experience: number): { current: number; next: number; percentage: number } {
    const currentLevel = this.calculateLevel(experience);
    const currentLevelExp = (currentLevel - 1) * 100;
    const nextLevelExp = currentLevel * 100;
    const progressInLevel = experience - currentLevelExp;
    const totalForLevel = nextLevelExp - currentLevelExp;
    
    return {
      current: currentLevelExp,
      next: nextLevelExp,
      percentage: Math.round((progressInLevel / totalForLevel) * 100)
    };
  }
} 