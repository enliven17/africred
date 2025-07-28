import { EduChainConfig, WalletState } from '@/types/blockchain';

// EduChain Testnet Configuration
export const EDUCHAIN_TESTNET: EduChainConfig = {
  chainId: '0xA0A4C', // 656476 in hex
  chainName: 'EDU Chain Testnet',
  nativeCurrency: {
    name: 'EDU Token',
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
    name: 'EDU Token',
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

  // Validate network configuration
  if (!config.chainId || !config.chainName || !config.rpcUrls || config.rpcUrls.length === 0) {
    throw new Error('Invalid network configuration');
  }

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
          iconUrls: ['https://edu-chain-testnet.blockscout.com/favicon.ico'], // Add icon URL
        },
      ],
    });
    return true;
  } catch (error: any) {
    console.error('Failed to add EduChain to wallet:', error);
    
    // Handle specific error cases
    if (error.code === 4001) {
      throw new Error('User rejected the network addition request');
    } else if (error.code === -32602) {
      throw new Error('Invalid network parameters. Please try again.');
    } else if (error.code === -32603) {
      throw new Error('Network addition failed. Please try again.');
    } else {
      throw new Error(`Failed to add network: ${error.message || 'Unknown error'}`);
    }
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
      console.log('Network not found, attempting to add...');
      return await addEduChainToWallet(isTestnet);
    } else if (switchError.code === 4001) {
      throw new Error('User rejected the network switch request');
    } else if (switchError.code === -32603) {
      throw new Error('Network switch failed. Please try again.');
    } else {
      throw new Error(`Failed to switch network: ${switchError.message || 'Unknown error'}`);
    }
  }
};

// Global wallet state management
let globalWalletState: WalletState = {
  isConnected: false,
  address: null,
  balance: null,
  chainId: null,
  isCorrectNetwork: false,
};

let walletStateListeners: ((state: WalletState) => void)[] = [];

export const subscribeToWalletState = (listener: (state: WalletState) => void) => {
  walletStateListeners.push(listener);
  // Immediately call with current state
  listener(globalWalletState);
  
  return () => {
    walletStateListeners = walletStateListeners.filter(l => l !== listener);
  };
};

const updateGlobalWalletState = (newState: WalletState) => {
  globalWalletState = newState;
  walletStateListeners.forEach(listener => listener(newState));
};

export const getGlobalWalletState = (): WalletState => {
  return globalWalletState;
};

export const connectWallet = async (): Promise<WalletState> => {
  if (typeof (window as any).ethereum === 'undefined') {
    throw new Error('MetaMask is not installed. Please install MetaMask and try again.');
  }

  // Check if MetaMask is unlocked
  try {
    const accounts = await (window as any).ethereum.request({
      method: 'eth_accounts',
    });
    
    if (!accounts || accounts.length === 0) {
      // Request account access
      const requestedAccounts = await (window as any).ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (!requestedAccounts || requestedAccounts.length === 0) {
        throw new Error('No accounts found. Please unlock MetaMask and try again.');
      }
    }
  } catch (error: any) {
    if (error.code === 4001) {
      throw new Error('User rejected the connection request. Please approve the connection in MetaMask.');
    } else if (error.code === -32002) {
      throw new Error('Connection request already pending. Please check MetaMask and approve the connection.');
    } else {
      throw new Error(`Connection failed: ${error.message || 'Unknown error'}`);
    }
  }

  try {
    // Get current accounts
    const accounts = await (window as any).ethereum.request({
      method: 'eth_accounts',
    });

    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found. Please unlock MetaMask and try again.');
    }

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

    const walletState = {
      isConnected: true,
      address,
      balance: balance ? (parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4) : '0',
      chainId,
      isCorrectNetwork,
      explorerUrl: `${config.blockExplorerUrls[0]}/address/${address}`,
    };

    // Update global state
    updateGlobalWalletState(walletState);
    
    return walletState;
  } catch (error: any) {
    console.error('Failed to connect wallet:', error);
    
    if (error.code === 4001) {
      throw new Error('User rejected the connection request');
    } else if (error.code === -32002) {
      throw new Error('Connection request already pending. Please check MetaMask.');
    } else {
      throw new Error(`Connection failed: ${error.message || 'Unknown error'}`);
    }
  }
};

export const getWalletState = async (): Promise<WalletState> => {
  if (typeof (window as any).ethereum === 'undefined') {
    const disconnectedState = {
      isConnected: false,
      address: null,
      balance: null,
      chainId: null,
      isCorrectNetwork: false,
    };
    updateGlobalWalletState(disconnectedState);
    return disconnectedState;
  }

  try {
    const accounts = await (window as any).ethereum.request({
      method: 'eth_accounts',
    });

    if (accounts.length === 0) {
      const disconnectedState = {
        isConnected: false,
        address: null,
        balance: null,
        chainId: null,
        isCorrectNetwork: false,
      };
      updateGlobalWalletState(disconnectedState);
      return disconnectedState;
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

    const walletState = {
      isConnected: true,
      address,
      balance: balance ? (parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4) : '0',
      chainId,
      isCorrectNetwork,
      explorerUrl: `${config.blockExplorerUrls[0]}/address/${address}`,
    };

    // Update global state
    updateGlobalWalletState(walletState);
    
    return walletState;
  } catch (error) {
    console.error('Failed to get wallet state:', error);
    const errorState = {
      isConnected: false,
      address: null,
      balance: null,
      chainId: null,
      isCorrectNetwork: false,
    };
    updateGlobalWalletState(errorState);
    return errorState;
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
    console.log('❌ MetaMask not available in checkEducatorStatus');
    return { isVerified: false };
  }

  try {
    // TODO: Query EduChain smart contract for educator status
    // This would check if the address has a valid educator certificate NFT
    
    console.log('🔍 Checking educator status for address:', address);
    
    // For demo purposes, we'll use a deterministic check based on address
    // In real implementation, this would query the blockchain
    const addressLastChar = address.slice(-1).toLowerCase();
    const isVerified = ['a', 'b', 'c', 'd', 'e'].includes(addressLastChar); // 5/16 chance for demo
    
    console.log(`📊 Address ends with '${addressLastChar}', verification result: ${isVerified}`);
    
    if (isVerified) {
      const certificateHash = '0x' + address.slice(2, 10) + Math.random().toString(16).substr(2, 32);
      return {
        isVerified: true,
        certificateHash,
        verificationDate: Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000 // Random date within last 30 days
      };
    }
    
    console.log('❌ Educator not verified');
    return { isVerified: false };
  } catch (error) {
    console.error('❌ Failed to check educator status:', error);
    return { isVerified: false };
  }
}; 