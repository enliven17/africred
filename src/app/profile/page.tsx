'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Settings, 
  LogOut, 
  Trophy, 
  Star, 
  TrendingUp,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Edit,
  Save,
  X,
  CheckCircle,
  Target,
  Zap
} from 'lucide-react';
import { getWalletState, formatAddress } from '@/lib/educhain';
import { WalletState, Achievement } from '@/types/blockchain';

export default function ProfilePage() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
    chainId: null,
    isCorrectNetwork: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const userProfile = {
    name: 'Sarah M.',
    email: 'sarah@example.com',
    phone: '+254 700 123 456',
    country: 'Kenya',
    city: 'Nairobi',
    joinDate: '2024-01-15',
    level: 5,
    experience: 1250,
    totalRewards: 455,
    completedMissions: 12,
    avatar: '/api/placeholder/100/100'
  };

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first mission',
      icon: '🎯',
      isUnlocked: true,
      unlockDate: Date.now() - 86400000 * 30,
      reward: 25
    },
    {
      id: '2',
      title: 'Mathematics Master',
      description: 'Complete 5 mathematics missions',
      icon: '📐',
      isUnlocked: true,
      unlockDate: Date.now() - 86400000 * 15,
      reward: 100
    },
    {
      id: '3',
      title: 'History Scholar',
      description: 'Complete 3 history missions',
      icon: '📚',
      isUnlocked: true,
      unlockDate: Date.now() - 86400000 * 7,
      reward: 75
    },
    {
      id: '4',
      title: 'Blockchain Pioneer',
      description: 'Complete 5 technology missions',
      icon: '⛓️',
      isUnlocked: false,
      reward: 150
    },
    {
      id: '5',
      title: 'Community Leader',
      description: 'Help 10 other learners',
      icon: '🤝',
      isUnlocked: false,
      reward: 200
    },
    {
      id: '6',
      title: 'Perfect Score',
      description: 'Get 100% on 3 missions',
      icon: '🏆',
      isUnlocked: false,
      reward: 300
    }
  ];

  const recentMissions = [
    {
      id: 1,
      title: 'Learn Basic Mathematics',
      completedDate: '2024-01-20',
      score: 95,
      reward: 50
    },
    {
      id: 2,
      title: 'African History Quiz',
      completedDate: '2024-01-18',
      score: 88,
      reward: 75
    },
    {
      id: 3,
      title: 'Swahili Language Learning',
      completedDate: '2024-01-15',
      score: 92,
      reward: 60
    }
  ];

  const stats = [
    { label: 'Level', value: userProfile.level, icon: Star, color: 'text-yellow-500' },
    { label: 'Experience', value: userProfile.experience, icon: TrendingUp, color: 'text-blue-500' },
    { label: 'Total Rewards', value: `₿ ${userProfile.totalRewards}`, icon: Award, color: 'text-green-500' },
    { label: 'Missions Completed', value: userProfile.completedMissions, icon: BookOpen, color: 'text-purple-500' },
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getProgressPercentage = () => {
    const currentLevel = userProfile.level;
    const currentExp = userProfile.experience;
    const expForNextLevel = currentLevel * 1000;
    const expForCurrentLevel = (currentLevel - 1) * 1000;
    const progress = ((currentExp - expForCurrentLevel) / (expForNextLevel - expForCurrentLevel)) * 100;
    return Math.min(progress, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              My Profile
            </h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Track your learning progress, achievements, and personal information
            </p>
          </motion.div>
        </div>
      </div>

      {/* Profile Header */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-orange-600">
                    {userProfile.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{userProfile.name}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {userProfile.city}, {userProfile.country}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Joined {formatDate(userProfile.joinDate)}
                    </span>
                  </div>
                  {walletState.address && (
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <span className="font-mono">{formatAddress(walletState.address)}</span>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {/* Level Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Level {userProfile.level}</span>
                <span className="text-sm text-gray-500">{userProfile.experience} / {userProfile.level * 1000} XP</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="text-center bg-gray-50 rounded-lg p-4"
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 mb-2 ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedTab === tab.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
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
              {/* Recent Missions */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Missions</h3>
                <div className="space-y-3">
                  {recentMissions.map((mission, index) => (
                    <motion.div
                      key={mission.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-gray-900">{mission.title}</div>
                        <div className="text-sm text-gray-500">{mission.completedDate}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{mission.score}%</div>
                        <div className="text-xs text-green-600">+{mission.reward} EDU</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Continue Learning</div>
                        <div className="text-sm text-gray-500">Pick up where you left off</div>
                      </div>
                    </div>
                    <Zap className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900">View Achievements</div>
                        <div className="text-sm text-gray-500">See your badges and rewards</div>
                      </div>
                    </div>
                    <Zap className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'achievements' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${
                    achievement.isUnlocked ? '' : 'opacity-60'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl ${
                      achievement.isUnlocked ? 'bg-yellow-100' : 'bg-gray-100'
                    }`}>
                      {achievement.icon}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{achievement.title}</h4>
                    <p className="text-gray-600 mb-3">{achievement.description}</p>
                    <div className="flex items-center justify-center gap-2">
                      <Award className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-600">{achievement.reward} credits</span>
                    </div>
                    {achievement.isUnlocked && (
                      <div className="mt-3 flex items-center justify-center gap-1 text-sm text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        Unlocked
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {selectedTab === 'progress' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Learning Progress</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Mission Categories</h4>
                  <div className="space-y-3">
                    {['Mathematics', 'History', 'Technology', 'Language', 'Arts', 'Business'].map((category, index) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-gray-700">{category}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-orange-500 h-2 rounded-full"
                              style={{ width: `${Math.random() * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-500 w-8 text-right">
                            {Math.floor(Math.random() * 5) + 1}/5
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Monthly Activity</h4>
                  <div className="space-y-3">
                    {['January', 'February', 'March', 'April', 'May', 'June'].map((month, index) => (
                      <div key={month} className="flex items-center justify-between">
                        <span className="text-gray-700">{month}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${Math.random() * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-500 w-12 text-right">
                            {Math.floor(Math.random() * 20) + 5} XP
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'settings' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Personal Information</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue={userProfile.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={userProfile.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        defaultValue={userProfile.phone}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <input
                        type="text"
                        defaultValue={userProfile.country}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 