export const getWalletConnectionHelp = (error: string): string => {
  const errorLower = error.toLowerCase();
  
  if (errorLower.includes('metamask is not installed')) {
    return 'Please install MetaMask browser extension from https://metamask.io/';
  }
  
  if (errorLower.includes('user rejected')) {
    return 'Please approve the connection request in MetaMask popup.';
  }
  
  if (errorLower.includes('already pending')) {
    return 'A connection request is already pending. Please check MetaMask and approve the connection.';
  }
  
  if (errorLower.includes('unlock metamask')) {
    return 'Please unlock MetaMask by entering your password.';
  }
  
  if (errorLower.includes('network')) {
    return 'Please make sure you\'re connected to the correct network (EduChain Testnet).';
  }
  
  if (errorLower.includes('chain id')) {
    return 'There was an issue with the network configuration. Please try refreshing the page.';
  }
  
  return 'Please try again. If the problem persists, refresh the page and try connecting again.';
};

export const validateWalletConnection = async (): Promise<{
  isValid: boolean;
  issues: string[];
  suggestions: string[];
}> => {
  const issues: string[] = [];
  const suggestions: string[] = [];
  
  // Check if MetaMask is installed
  if (typeof (window as any).ethereum === 'undefined') {
    issues.push('MetaMask is not installed');
    suggestions.push('Install MetaMask browser extension');
    return { isValid: false, issues, suggestions };
  }
  
  try {
    // Check if MetaMask is unlocked
    const accounts = await (window as any).ethereum.request({
      method: 'eth_accounts',
    });
    
    if (!accounts || accounts.length === 0) {
      issues.push('MetaMask is locked or no accounts available');
      suggestions.push('Unlock MetaMask and ensure you have at least one account');
    }
    
    // Check current network
    const chainId = await (window as any).ethereum.request({
      method: 'eth_chainId',
    });
    
    const expectedChainId = '0xA0A4C'; // EduChain Testnet
    if (chainId !== expectedChainId) {
      issues.push('Connected to wrong network');
      suggestions.push('Switch to EduChain Testnet (Chain ID: 656476)');
    }
    
    return {
      isValid: issues.length === 0,
      issues,
      suggestions
    };
  } catch (error) {
    issues.push('Unable to check wallet status');
    suggestions.push('Refresh the page and try again');
    return { isValid: false, issues, suggestions };
  }
};

export const getNetworkInfo = () => {
  return {
    name: 'EduChain Testnet',
    chainId: '0xA0A4C',
    chainIdDecimal: 656476,
    rpcUrl: 'https://rpc.open-campus-codex.gelato.digital',
    explorer: 'https://edu-chain-testnet.blockscout.com',
    faucet: 'https://drpc.org/faucet/open-campus-codex'
  };
}; 