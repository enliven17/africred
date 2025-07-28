import { useState, useEffect } from 'react';
import { WalletState } from '@/types/blockchain';
import { getWalletState, subscribeToWalletState, getGlobalWalletState } from '@/lib/educhain';

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>(getGlobalWalletState());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial check
    const checkWallet = async () => {
      try {
        await getWalletState();
      } catch (error) {
        console.error('Initial wallet check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkWallet();

    // Subscribe to wallet state changes
    const unsubscribe = subscribeToWalletState((newState) => {
      setWalletState(newState);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const refreshWalletState = async () => {
    setIsLoading(true);
    try {
      await getWalletState();
    } catch (error) {
      console.error('Failed to refresh wallet state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    walletState,
    isLoading,
    refreshWalletState,
    isConnected: walletState.isConnected,
    address: walletState.address,
    balance: walletState.balance,
    isCorrectNetwork: walletState.isCorrectNetwork,
  };
}; 