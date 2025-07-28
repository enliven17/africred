'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Trophy, 
  Users, 
  Wallet, 
  TrendingUp, 
  Star,
  ArrowRight,
  Play,
  Link,
  ChevronDown,
  CheckCircle,
  Zap,
  AlertTriangle
} from 'lucide-react';
import { connectWallet, switchToEduChain, getWalletState, formatAddress, getFaucetUrl } from '@/lib/educhain';
import { WalletState } from '@/types/blockchain';

export default function Home() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
    chainId: null,
    isCorrectNetwork: false,
  });
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Check wallet state on component mount
    checkWalletState();
    
    // Listen for wallet changes
    if (typeof (window as any).ethereum !== 'undefined') {
      (window as any).ethereum.on('accountsChanged', checkWalletState);
      (window as any).ethereum.on('chainChanged', checkWalletState);
    }

    return () => {
      if (typeof (window as any).ethereum !== 'undefined') {
        (window as any).ethereum.removeListener('accountsChanged', checkWalletState);
        (window as any).ethereum.removeListener('chainChanged', checkWalletState);
      }
    };
  }, []);

  const checkWalletState = async () => {
    try {
      const state = await getWalletState();
      setWalletState(state);
    } catch (error) {
      console.error('Failed to check wallet state:', error);
    }
  };

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      const state = await connectWallet();
      setWalletState(state);
      
      if (!state.isCorrectNetwork) {
        await switchToEduChain(true); // Switch to testnet
        await checkWalletState(); // Refresh state
      }
      
      setShowWalletModal(false);
    } catch (error) {
      console.error('Wallet connection failed:', error);
      alert('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const stats = [
    { label: 'Active Learners', value: '2,847', icon: Users, color: 'text-blue-500', change: '+12%' },
    { label: 'Total Rewards', value: '₿ 1,234', icon: Wallet, color: 'text-green-500', change: '+8%' },
    { label: 'Completed Missions', value: '15,692', icon: Trophy, color: 'text-yellow-500', change: '+15%' },
    { label: 'Success Rate', value: '94%', icon: TrendingUp, color: 'text-purple-500', change: '+2%' },
  ];

  const featuredMissions = [
    {
      id: 1,
      title: 'Learn Basic Mathematics',
      description: 'Complete 10 math problems to earn credits',
      reward: 50,
      difficulty: 'Easy',
      participants: 150,
      category: 'Mathematics',
      color: 'bg-blue-500',
      timeEstimate: '15 min'
    },
    {
      id: 2,
      title: 'African History Quiz',
      description: 'Test your knowledge of African history',
      reward: 75,
      difficulty: 'Medium',
      participants: 89,
      category: 'History',
      color: 'bg-green-500',
      timeEstimate: '25 min'
    },
    {
      id: 3,
      title: 'Blockchain Basics',
      description: 'Introduction to blockchain technology',
      reward: 100,
      difficulty: 'Hard',
      participants: 234,
      category: 'Technology',
      color: 'bg-purple-500',
      timeEstimate: '45 min'
    }
  ];

  const quickActions = [
    { title: 'Start Learning', icon: Play, color: 'bg-orange-500', action: () => window.location.href = '/missions' },
    { title: 'View Missions', icon: BookOpen, color: 'bg-blue-500', action: () => window.location.href = '/missions' },
    { title: 'Check Wallet', icon: Wallet, color: 'bg-green-500', action: () => window.location.href = '/wallet' },
    { title: 'Join Community', icon: Users, color: 'bg-purple-500', action: () => window.location.href = '/community' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-orange-600">AfriCred</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.location.href = '/missions'}
                className="text-gray-600 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Missions
              </button>
              <button 
                onClick={() => window.location.href = '/community'}
                className="text-gray-600 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Community
              </button>
              <button 
                onClick={() => window.location.href = '/wallet'}
                className="text-gray-600 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Wallet
              </button>
              <button 
                onClick={() => window.location.href = '/profile'}
                className="text-gray-600 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Profile
              </button>
              {walletState.isConnected ? (
                <div className="flex items-center space-x-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">
                    {walletState.address ? formatAddress(walletState.address) : ''}
                  </span>
                  {walletState.balance && (
                    <span className="text-xs text-green-600">
                      {walletState.balance} EDU
                    </span>
                  )}
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowWalletModal(true)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors flex items-center gap-2"
                >
                  <Link className="w-4 h-4" />
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
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Link className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect to EduChain</h3>
              <p className="text-gray-600 mb-6">
                Connect your wallet to start earning rewards on Africa's first earn-to-learn platform
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
                  className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Zap className="w-5 h-5" />
                  {isConnecting ? 'Connecting...' : 'Connect with MetaMask'}
                </button>
                <button
                  onClick={() => setShowWalletModal(false)}
                  className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700 mb-2">
                  <strong>EduChain Testnet:</strong> Chain ID: 656476
                </p>
                <p className="text-xs text-blue-700 mb-2">
                  <strong>RPC:</strong> https://rpc.open-campus-codex.gelato.digital
                </p>
                <a 
                  href={getFaucetUrl(true)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-orange-600 hover:text-orange-700 underline"
                >
                  Get Testnet EDU Tokens →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Welcome to <span className="text-yellow-300">AfriCred</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              Africa's First Earn-to-Learn Platform on EduChain
            </p>
            <p className="text-lg mb-12 text-orange-200 max-w-4xl mx-auto leading-relaxed">
              Learn, earn, and grow with Africa's revolutionary educational platform built on blockchain. 
              Complete missions, earn crypto rewards, and build your future with verifiable credentials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/missions'}
                className="bg-yellow-400 text-orange-900 px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 hover:bg-yellow-300 transition-colors"
              >
                <Play className="w-5 h-5" />
                Start Learning
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/missions'}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 hover:bg-white hover:text-orange-600 transition-colors"
              >
                Explore Missions
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Quick Actions */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {quickActions.map((action, index) => (
              <motion.button
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={action.action}
                className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:border-orange-200"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${action.color} mb-4`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">{action.title}</h3>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Platform Statistics
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
              See how AfriCred is transforming education across Africa
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Demo Statistics
            </div>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 ${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 mb-2">{stat.label}</div>
                <div className="text-sm text-green-600 font-medium">{stat.change}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Missions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Missions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start your learning journey with these popular missions and earn rewards
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMissions.map((mission, index) => (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className={`h-2 ${mission.color}`}></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-500">{mission.category}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      mission.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      mission.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {mission.difficulty}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{mission.title}</h3>
                  <p className="text-gray-600 mb-4">{mission.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{mission.participants}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Wallet className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600">{mission.reward} credits</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{mission.timeEstimate}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
                  >
                    Start Mission
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl mb-8 text-orange-100 max-w-2xl mx-auto">
              Join thousands of learners across Africa who are already earning while they learn
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/missions'}
              className="bg-yellow-400 text-orange-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors"
            >
              Get Started Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
