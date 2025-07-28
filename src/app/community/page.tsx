'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Send, 
  TrendingUp,
  Award,
  Star,
  UserPlus,
  Globe,
  BookOpen,
  Zap,
  Calendar,
  Wallet,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';
import { getWalletState } from '@/lib/educhain';
import { useEffect } from 'react';

export default function CommunityPage() {
  const [newPost, setNewPost] = useState('');
  const [selectedTab, setSelectedTab] = useState('discussions');
  const [walletConnected, setWalletConnected] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null);
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: 'Sarah M.',
        avatar: '/api/placeholder/40/40',
        level: 5,
        country: 'Kenya'
      },
      content: 'Just completed the Blockchain Basics lesson! The smart contract exercise was challenging but very rewarding. Anyone else working on this?',
      likes: 24,
      comments: 8,
      timeAgo: '2 hours ago',
      tags: ['blockchain', 'technology', 'learning']
    },
    {
      id: 2,
      author: {
        name: 'Kwame A.',
        avatar: '/api/placeholder/40/40',
        level: 3,
        country: 'Ghana'
      },
      content: 'The African History Quiz was amazing! Learned so much about our rich cultural heritage. Highly recommend to everyone!',
      likes: 31,
      comments: 12,
      timeAgo: '4 hours ago',
      tags: ['history', 'culture', 'africa']
    },
    {
      id: 3,
      author: {
        name: 'Fatima Z.',
        avatar: '/api/placeholder/40/40',
        level: 7,
        country: 'Morocco'
      },
      content: 'Looking for study partners for the Entrepreneurship Fundamentals lesson. Anyone interested in forming a study group?',
      likes: 18,
      comments: 15,
      timeAgo: '6 hours ago',
      tags: ['entrepreneurship', 'study-group', 'collaboration']
    }
  ]);

  useEffect(() => {
    const checkWallet = async () => {
      const walletState = await getWalletState();
      setWalletConnected(walletState.isConnected);
    };
    
    checkWallet();
  }, []);

  const tabs = [
    { id: 'discussions', label: 'Discussions', icon: MessageCircle },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'leaderboard', label: 'Leaderboard', icon: TrendingUp },
    { id: 'events', label: 'Events', icon: Calendar },
  ];



  const achievements = [
    {
      id: 1,
      user: 'Sarah M.',
      achievement: 'Blockchain Pioneer',
      description: 'Completed 5 technology lessons',
      reward: 100,
      timeAgo: '1 hour ago'
    },
    {
      id: 2,
      user: 'Kwame A.',
      achievement: 'History Scholar',
      description: 'Completed 3 history lessons',
      reward: 75,
      timeAgo: '3 hours ago'
    },
    {
      id: 3,
      user: 'Fatima Z.',
      achievement: 'Language Master',
      description: 'Completed 4 language lessons',
      reward: 80,
      timeAgo: '5 hours ago'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah M.', level: 8, points: 1250, country: 'Kenya' },
    { rank: 2, name: 'Kwame A.', level: 7, points: 1180, country: 'Ghana' },
    { rank: 3, name: 'Fatima Z.', level: 6, points: 1050, country: 'Morocco' },
    { rank: 4, name: 'Aisha B.', level: 5, points: 920, country: 'Nigeria' },
    { rank: 5, name: 'David K.', level: 5, points: 890, country: 'Uganda' }
  ];

  const stats = [
    { label: 'Active Members', value: '2,847', icon: Users, color: 'text-blue-500' },
    { label: 'Total Posts', value: '15,692', icon: MessageCircle, color: 'text-green-500' },
    { label: 'Countries', value: '32', icon: Globe, color: 'text-purple-500' },
    { label: 'Study Groups', value: '156', icon: UserPlus, color: 'text-blue-500' },
  ];

    // Wallet connection check for posting
  const handlePost = () => {
    if (!walletConnected) {
      setNotification({ type: 'error', message: 'Please connect your wallet to post messages in the community.' });
      setTimeout(() => setNotification(null), 4000);
      return;
    }
    
    if (!newPost.trim()) {
      setNotification({ type: 'error', message: 'Please enter a message to post.' });
      setTimeout(() => setNotification(null), 4000);
      return;
    }

    // Create new post
    const newPostObj = {
      id: posts.length + 1,
      author: {
        name: 'You',
        avatar: '/api/placeholder/40/40',
        level: 1,
        country: 'Your Country'
      },
      content: newPost,
      likes: 0,
      comments: 0,
      timeAgo: 'Just now',
      tags: []
    };

    // Add new post to the beginning of the list
    setPosts([newPostObj, ...posts]);
    setNewPost('');
    
    // Show success message
    setNotification({ type: 'success', message: 'Post shared successfully! 🎉' });
    setTimeout(() => setNotification(null), 4000);
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
              AfriCred Community
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Connect with learners across Africa, share your achievements, and grow together
            </p>
          </motion.div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-4 right-4 z-50 max-w-sm p-4 rounded-lg shadow-lg border-l-4 ${
            notification.type === 'success' 
              ? 'bg-green-50 border-green-400 text-green-800' 
              : notification.type === 'error'
              ? 'bg-red-50 border-red-400 text-red-800'
              : 'bg-blue-50 border-blue-400 text-blue-800'
          }`}
        >
          <div className="flex items-center gap-3">
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : notification.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-red-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-blue-600" />
            )}
            <div className="flex-1">
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

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

      {/* Create Post */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Your Learning Journey</h3>
            <div className="flex gap-4">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">U</span>
              </div>
              <div className="flex-1">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What have you learned today? Share your achievements, ask questions, or connect with other learners..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
                <div className="flex items-center justify-between mt-3">
                  <div className="flex gap-2">
                    <button className="text-gray-500 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50">
                      <BookOpen className="w-4 h-4" />
                    </button>
                    <button className="text-gray-500 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50">
                      <Award className="w-4 h-4" />
                    </button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePost}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                      walletConnected 
                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!walletConnected}
                  >
                    <Send className="w-4 h-4" />
                    {walletConnected ? 'Post' : 'Connect Wallet'}
                  </motion.button>
                </div>
              </div>
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
          {selectedTab === 'discussions' && (
            <div className="space-y-6">
              {posts.map((discussion, index) => (
                <motion.div
                  key={discussion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {discussion.author.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{discussion.author.name}</h4>
                        <span className="text-sm text-gray-500">Level {discussion.author.level}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{discussion.author.country}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{discussion.timeAgo}</span>
                      </div>
                      <p className="text-gray-700 mb-3">{discussion.content}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <button className="flex items-center gap-1 text-gray-500 hover:text-red-500">
                            <Heart className="w-4 h-4" />
                            {discussion.likes}
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500">
                            <MessageCircle className="w-4 h-4" />
                            {discussion.comments}
                          </button>
                        </div>
                        <button className="text-gray-500 hover:text-green-500">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex gap-2 mt-3">
                        {discussion.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
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
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{achievement.user}</h4>
                      <p className="text-sm text-gray-500">{achievement.timeAgo}</p>
                    </div>
                  </div>
                  <h5 className="font-medium text-gray-900 mb-2">{achievement.achievement}</h5>
                  <p className="text-gray-600 mb-3">{achievement.description}</p>
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-green-500" />
                                            <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                          <span>{achievement.reward}</span>
                          <span>EDU</span>
                          <span>earned</span>
                        </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {selectedTab === 'leaderboard' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Top Learners</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {leaderboard.map((user, index) => (
                  <motion.div
                    key={user.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="flex items-center justify-between p-6 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        user.rank === 1 ? 'bg-yellow-500' :
                        user.rank === 2 ? 'bg-gray-400' :
                        user.rank === 3 ? 'bg-blue-500' : 'bg-gray-300'
                      }`}>
                        {user.rank}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{user.name}</h4>
                        <p className="text-sm text-gray-500">{user.country} • Level {user.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{user.points} points</div>
                      <div className="text-sm text-gray-500">#{user.rank} rank</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'events' && (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon!</h3>
              <p className="text-gray-600">Community events and meetups will be available soon.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 