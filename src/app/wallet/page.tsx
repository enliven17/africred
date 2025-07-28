'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Send, 
  Download, 
  Upload,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Minus,
  Eye,
  EyeOff,
  Copy,
  ExternalLink
} from 'lucide-react';
import { getWalletState, formatAddress, getFaucetUrl } from '@/lib/educhain';
import { WalletState, Transaction } from '@/types/blockchain';

export default function WalletPage() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
    chainId: null,
    isCorrectNetwork: false,
  });
  const [showBalance, setShowBalance] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Wallet },
    { id: 'transactions', label: 'Transactions', icon: TrendingUp },
    { id: 'rewards', label: 'Rewards', icon: TrendingUp },
  ];

  const transactions: Transaction[] = [
    {
      hash: '0x1234567890abcdef...',
      from: '0x1234567890abcdef1234567890abcdef12345678',
      to: '0xabcdef1234567890abcdef1234567890abcdef12',
      value: '50',
      gasUsed: '21000',
      gasPrice: '20000000000',
      timestamp: Date.now() - 3600000, // 1 hour ago
      status: 'success'
    },
    {
      hash: '0xabcdef1234567890...',
      from: '0xabcdef1234567890abcdef1234567890abcdef12',
      to: '0x1234567890abcdef1234567890abcdef12345678',
      value: '25',
      gasUsed: '21000',
      gasPrice: '20000000000',
      timestamp: Date.now() - 7200000, // 2 hours ago
      status: 'success'
    },
    {
      hash: '0x9876543210fedcba...',
      from: '0x1234567890abcdef1234567890abcdef12345678',
      to: '0xabcdef1234567890abcdef1234567890abcdef12',
      value: '100',
      gasUsed: '21000',
      gasPrice: '20000000000',
      timestamp: Date.now() - 86400000, // 1 day ago
      status: 'pending'
    }
  ];

  const rewards = [
    {
      id: 1,
      mission: 'Learn Basic Mathematics',
      amount: 50,
      timestamp: Date.now() - 3600000,
      status: 'completed'
    },
    {
      id: 2,
      mission: 'African History Quiz',
      amount: 75,
      timestamp: Date.now() - 7200000,
      status: 'completed'
    },
    {
      id: 3,
      mission: 'Blockchain Basics',
      amount: 100,
      timestamp: Date.now() - 86400000,
      status: 'pending'
    }
  ];

  const stats = [
    { label: 'Total Balance', value: walletState.balance || '0', icon: Wallet, color: 'text-green-500' },
    { label: 'Total Earned', value: '₿ 455', icon: TrendingUp, color: 'text-blue-500' },
    { label: 'Pending Rewards', value: '₿ 125', icon: Clock, color: 'text-blue-500' },
    { label: 'Transactions', value: transactions.length.toString(), icon: TrendingDown, color: 'text-purple-500' },
  ];

  useEffect(() => {
    checkWalletState();
  }, []);

  const checkWalletState = async () => {
    try {
      const state = await getWalletState();
      setWalletState(state);
    } catch (error) {
      console.error('Failed to check wallet state:', error);
    }
  };

  const copyAddress = () => {
    if (walletState.address) {
      navigator.clipboard.writeText(walletState.address);
      // You could add a toast notification here
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    {/* Header */}
    <div className="gradient-bg text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-xl md:text-2xl font-bold mb-4">
              My Wallet
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Manage your EDU tokens, track transactions, and view your learning rewards
            </p>
          </motion.div>
        </div>
      </div>

      {/* Wallet Connection Status */}
      {!walletState.isConnected && (
        <section className="py-8 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
              <Wallet className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Wallet Not Connected</h3>
              <p className="text-blue-700 mb-4">Connect your wallet to view your balance and transactions</p>
              <a 
                href="/"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Connect Wallet
              </a>
            </div>
          </div>
        </section>
      )}

      {walletState.isConnected && (
        <>
          {/* Stats */}
          <section className="py-8 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Demo Statistics
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="text-center bg-gray-50 rounded-xl p-4"
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 mb-3 ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Wallet Address */}
          <section className="py-8 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Wallet Address</h3>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1 font-mono text-sm">
                    {showBalance ? formatAddress(walletState.address || '') : '••••••••••••••••'}
                  </div>
                  <button
                    onClick={copyAddress}
                    className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <a
                    href={walletState.explorerUrl || `https://edu-chain-testnet.blockscout.com/address/${walletState.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Connected to EduChain Testnet</span>
                  </div>
                  <a
                    href={getFaucetUrl(true)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Get Testnet Tokens →
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Tabs */}
          <section className="py-8 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap gap-2 mb-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedTab === tab.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {selectedTab === 'overview' && (
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Quick Actions */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Send className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-gray-900">Send EDU</div>
                            <div className="text-sm text-gray-500">Transfer tokens to another address</div>
                          </div>
                        </div>
                        <Plus className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Download className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-gray-900">Bridge Tokens</div>
                            <div className="text-sm text-gray-500">Move tokens between networks</div>
                          </div>
                        </div>
                        <Plus className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {transactions.slice(0, 3).map((tx, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            {getTransactionStatusIcon(tx.status)}
                            <div>
                              <div className="font-medium text-gray-900">
                                {tx.status === 'success' ? 'Received' : 'Pending'} {tx.value} EDU
                              </div>
                              <div className="text-sm text-gray-500">{formatDate(tx.timestamp)}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">+{tx.value} EDU</div>
                            <div className="text-xs text-gray-500">{tx.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'transactions' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {transactions.map((tx, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="flex items-center justify-between p-6 hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-4">
                          {getTransactionStatusIcon(tx.status)}
                          <div>
                            <div className="font-medium text-gray-900">
                              {tx.status === 'success' ? 'Transaction Successful' : 'Transaction Pending'}
                            </div>
                            <div className="text-sm text-gray-500">{formatDate(tx.timestamp)}</div>
                            <div className="text-xs text-gray-400 font-mono">{formatAddress(tx.hash)}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">{tx.value} EDU</div>
                          <div className="text-sm text-gray-500">{tx.status}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === 'rewards' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Learning Rewards</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {rewards.map((reward, index) => (
                      <motion.div
                        key={reward.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="flex items-center justify-between p-6 hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{reward.mission}</div>
                            <div className="text-sm text-gray-500">{formatDate(reward.timestamp)}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">+{reward.amount} EDU</div>
                          <div className="text-sm text-gray-500">{reward.status}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
} 