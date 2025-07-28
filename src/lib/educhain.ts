import { EduChainConfig, WalletState } from '@/types/blockchain';

// EduChain Testnet Configuration
export const EDUCHAIN_TESTNET: EduChainConfig = {
  chainId: '0xA0A4C', // 656476 in hex
  chainName: 'EDU Chain Testnet',
  nativeCurrency: {
    name: 'EDU',
    symbol: 'EDU',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.open-campus-codex.gelato.digital'],
  blockExplorerUrls: ['https://edu-chain-testnet.blockscout.com'],
  faucetUrls: [
    'https://drpc.org/faucet/open-campus-codex',
    'https://educhain-community-faucet.vercel.app/',
    'https://www.hackquest.io/faucets'
  ],
};

// EduChain Mainnet Configuration
export const EDUCHAIN_MAINNET: EduChainConfig = {
  chainId: '0xA3E3', // 41923 in hex
  chainName: 'EDU Chain',
  nativeCurrency: {
    name: 'EDU',
    symbol: 'EDU',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.edu-chain.raas.gelato.cloud'],
  blockExplorerUrls: ['https://explorer.edu-chain.raas.gelato.cloud'],
  faucetUrls: [],
};

export const getEduChainConfig = (isTestnet: boolean = true): EduChainConfig => {
  return isTestnet ? EDUCHAIN_TESTNET : EDUCHAIN_MAINNET;
};

export const addEduChainToWallet = async (isTestnet: boolean = true): Promise<boolean> => {
  if (typeof (window as any).ethereum === 'undefined') {
    throw new Error('MetaMask is not installed');
  }

  const config = getEduChainConfig(isTestnet);

  try {
    await (window as any).ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: config.chainId,
          chainName: config.chainName,
          nativeCurrency: config.nativeCurrency,
          rpcUrls: config.rpcUrls,
          blockExplorerUrls: config.blockExplorerUrls,
        },
      ],
    });
    return true;
  } catch (error) {
    console.error('Failed to add EduChain to wallet:', error);
    return false;
  }
};

export const switchToEduChain = async (isTestnet: boolean = true): Promise<boolean> => {
  if (typeof (window as any).ethereum === 'undefined') {
    throw new Error('MetaMask is not installed');
  }

  const config = getEduChainConfig(isTestnet);

  try {
    await (window as any).ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: config.chainId }],
    });
    return true;
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask
    if (switchError.code === 4902) {
      return await addEduChainToWallet(isTestnet);
    }
    throw switchError;
  }
};

export const connectWallet = async (): Promise<WalletState> => {
  if (typeof (window as any).ethereum === 'undefined') {
    throw new Error('MetaMask is not installed');
  }

  try {
    // Request account access
    const accounts = await (window as any).ethereum.request({
      method: 'eth_requestAccounts',
    });

    const address = accounts[0];
    const chainId = await (window as any).ethereum.request({
      method: 'eth_chainId',
    });

    const config = getEduChainConfig(true); // Using testnet
    const isCorrectNetwork = chainId === config.chainId;

    // Get balance
    const balance = await (window as any).ethereum.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    });

    return {
      isConnected: true,
      address,
      balance: balance ? (parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4) : '0',
      chainId,
      isCorrectNetwork,
      explorerUrl: `${config.blockExplorerUrls[0]}/address/${address}`,
    };
  } catch (error) {
    console.error('Failed to connect wallet:', error);
    throw error;
  }
};

export const getWalletState = async (): Promise<WalletState> => {
  if (typeof (window as any).ethereum === 'undefined') {
    return {
      isConnected: false,
      address: null,
      balance: null,
      chainId: null,
      isCorrectNetwork: false,
    };
  }

  try {
    const accounts = await (window as any).ethereum.request({
      method: 'eth_accounts',
    });

    if (accounts.length === 0) {
      return {
        isConnected: false,
        address: null,
        balance: null,
        chainId: null,
        isCorrectNetwork: false,
      };
    }

    const address = accounts[0];
    const chainId = await (window as any).ethereum.request({
      method: 'eth_chainId',
    });

    const config = getEduChainConfig(true);
    const isCorrectNetwork = chainId === config.chainId;

    const balance = await (window as any).ethereum.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    });

    return {
      isConnected: true,
      address,
      balance: balance ? (parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4) : '0',
      chainId,
      isCorrectNetwork,
      explorerUrl: `${config.blockExplorerUrls[0]}/address/${address}`,
    };
  } catch (error) {
    console.error('Failed to get wallet state:', error);
    return {
      isConnected: false,
      address: null,
      balance: null,
      chainId: null,
      isCorrectNetwork: false,
    };
  }
};

export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const getFaucetUrl = (isTestnet: boolean = true): string => {
  const config = getEduChainConfig(isTestnet);
  return config.faucetUrls[0] || '';
};

// Educator verification functions
export const verifyEducator = async (educatorData: {
  background: string;
  experience: string;
  expertise: string[];
  bio: string;
  documents?: File[];
}): Promise<{ success: boolean; certificateHash?: string; error?: string }> => {
  if (typeof (window as any).ethereum === 'undefined') {
    throw new Error('MetaMask is not installed');
  }

  try {
    // TODO: Call EduChain smart contract for educator verification
    // This would typically involve:
    // 1. Uploading documents to IPFS
    // 2. Creating verification request on blockchain
    // 3. Waiting for approval from governance
    
    console.log('Verifying educator:', educatorData);
    
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock certificate hash
    const certificateHash = '0x' + Math.random().toString(16).substr(2, 40);
    
    return {
      success: true,
      certificateHash
    };
  } catch (error) {
    console.error('Failed to verify educator:', error);
    return {
      success: false,
      error: 'Failed to verify educator status'
    };
  }
};

// Mission creation functions
export const createMission = async (missionData: {
  title: string;
  description: string;
  category: string;
  difficulty: string;
  estimatedTime: string;
  maxReward: number;
  tags: string[];
  requirements: string[];
  steps: any[];
}): Promise<{ success: boolean; missionId?: string; transactionHash?: string; error?: string }> => {
  if (typeof (window as any).ethereum === 'undefined') {
    throw new Error('MetaMask is not installed');
  }

  try {
    // TODO: Call EduChain smart contract for mission creation
    // This would typically involve:
    // 1. Uploading mission content to IPFS
    // 2. Creating mission on blockchain
    // 3. Setting up reward distribution
    
    console.log('Creating mission:', missionData);
    
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock mission ID and transaction hash
    const missionId = 'mission_' + Math.random().toString(16).substr(2, 8);
    const transactionHash = '0x' + Math.random().toString(16).substr(2, 64);
    
    return {
      success: true,
      missionId,
      transactionHash
    };
  } catch (error) {
    console.error('Failed to create mission:', error);
    return {
      success: false,
      error: 'Failed to create mission'
    };
  }
};

// Check if user is verified educator
export const checkEducatorStatus = async (address: string): Promise<{
  isVerified: boolean;
  certificateHash?: string;
  verificationDate?: number;
}> => {
  if (typeof (window as any).ethereum === 'undefined') {
    return { isVerified: false };
  }

  try {
    // TODO: Query EduChain smart contract for educator status
    // This would check if the address has a valid educator certificate NFT
    
    console.log('Checking educator status for:', address);
    
    // Mock verification check
    const isVerified = Math.random() > 0.5; // 50% chance for demo
    
    if (isVerified) {
      return {
        isVerified: true,
        certificateHash: '0x' + Math.random().toString(16).substr(2, 40),
        verificationDate: Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000 // Random date within last 30 days
      };
    }
    
    return { isVerified: false };
  } catch (error) {
    console.error('Failed to check educator status:', error);
    return { isVerified: false };
  }
}; 