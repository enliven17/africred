'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Link as LinkIcon, // Renamed to avoid conflict with next/link
  ChevronDown,
  CheckCircle,
  Zap,
  AlertTriangle,
  X,
  Loader2
} from 'lucide-react';
import { connectWallet, switchToEduChain, formatAddress, getFaucetUrl } from '@/lib/educhain';
import { useWallet } from '@/hooks/useWallet';
import { getWalletConnectionHelp } from '@/utils/wallet-helpers';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const { walletState, refreshWalletState } = useWallet();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof (window as any).ethereum !== 'undefined') {
      const handleAccountsChanged = () => refreshWalletState();
      const handleChainChanged = () => refreshWalletState();
      
      (window as any).ethereum.on('accountsChanged', handleAccountsChanged);
      (window as any).ethereum.on('chainChanged', handleChainChanged);

      return () => {
        (window as any).ethereum.removeListener('accountsChanged', handleAccountsChanged);
        (window as any).ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [refreshWalletState]);

  // Auto-close modal when wallet is connected
  useEffect(() => {
    if (walletState.isConnected && showWalletModal) {
      setShowWalletModal(false);
      setConnectionError(null);
      setIsConnecting(false);
    }
  }, [walletState.isConnected, showWalletModal]);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    setConnectionError(null);
    
    try {
      const state = await connectWallet();
      
      // Check if we're on the correct network
      if (!state.isCorrectNetwork) {
        setConnectionError(
          'Wallet connected successfully! However, you need to switch to EduChain Testnet to use all features. ' +
          'The network switch should happen automatically, but if you see this message, please switch manually in MetaMask.'
        );
        // Don't close modal, let user see the message
        return;
      }
      
      // Close modal only if everything is successful
      setShowWalletModal(false);
      setConnectionError(null);
    } catch (error: any) {
      console.error('Wallet connection failed:', error);
      const helpMessage = getWalletConnectionHelp(error.message);
      setConnectionError(`${error.message} ${helpMessage}`);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleCloseModal = () => {
    setShowWalletModal(false);
    setConnectionError(null);
    setIsConnecting(false);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      <nav className="glass-effect border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <Image
                    src="/logo.png"
                    alt="AfriCred Logo"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                  <span className="text-2xl font-bold gradient-text">
                    AfriCred
                  </span>
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link 
                href="/missions"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive('/missions') 
                    ? 'text-blue-600 bg-blue-50 border border-blue-200' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                Lessons
              </Link>
              <Link 
                href="/community"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive('/community') 
                    ? 'text-blue-600 bg-blue-50 border border-blue-200' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                Community
              </Link>
              <Link 
                href="/create-lesson"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive('/create-lesson') 
                    ? 'text-blue-600 bg-blue-50 border border-blue-200' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                Create Lesson
              </Link>
              <Link 
                href="/wallet"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive('/wallet') 
                    ? 'text-blue-600 bg-blue-50 border border-blue-200' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                Wallet
              </Link>
              <Link 
                href="/profile"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive('/profile') 
                    ? 'text-blue-600 bg-blue-50 border border-blue-200' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                Profile
              </Link>
              {walletState.isConnected ? (
                <div className="flex items-center space-x-2 bg-green-50 border border-green-200 rounded-xl px-4 py-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">
                    {walletState.address ? formatAddress(walletState.address) : ''}
                  </span>
                  {walletState.balance && (
                    <span className="text-xs text-green-600 ml-2">
                      {walletState.balance} EDU
                    </span>
                  )}
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowWalletModal(true)}
                  className="btn-primary flex items-center gap-2 text-sm"
                >
                  <LinkIcon className="w-4 h-4" />
                  Connect Wallet
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Wallet Connection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LinkIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect to EduChain</h3>
              <p className="text-gray-600 mb-6">
                Connect your wallet to start earning rewards on Africa's first earn-to-learn platform
              </p>
              
              {/* Error Message */}
              {connectionError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{connectionError}</p>
                </div>
              )}
              
              <div className="space-y-3">
                <button
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
                  className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Connect with MetaMask
                    </>
                  )}
                </button>
                <button
                  onClick={handleCloseModal}
                  className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700 mb-2">
                  <strong>EduChain Testnet Network Details:</strong>
                </p>
                <div className="text-xs text-blue-600 space-y-1">
                  <p>• <strong>Chain ID:</strong> 656476 (0xA0A4C)</p>
                  <p>• <strong>Network Name:</strong> EDU Chain Testnet</p>
                  <p>• <strong>Currency:</strong> EDU Token</p>
                </div>
                <p className="text-xs text-blue-600 mt-2">
                  The network will be added to MetaMask automatically if not already present.
                </p>
                <a
                  href={getFaucetUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-700 underline mt-2 inline-block"
                >
                  Get test EDU tokens →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
} 