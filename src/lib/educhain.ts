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
  blockExplorerUrls: ['https://testnet-explorer.edu-chain.raas.gelato.cloud'],
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