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
  Play
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {

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
    { title: 'Start Learning', icon: Play, color: 'bg-blue-500', href: '/missions' },
    { title: 'View Missions', icon: BookOpen, color: 'bg-indigo-500', href: '/missions' },
    { title: 'Check Wallet', icon: Wallet, color: 'bg-green-500', href: '/wallet' },
    { title: 'Join Community', icon: Users, color: 'bg-purple-500', href: '/community' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">


      {/* Header */}
      <header className="relative overflow-hidden gradient-bg text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Welcome to <span className="gradient-text">AfriCred</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Africa's First Earn-to-Learn Platform on EduChain
            </p>
            <p className="text-lg mb-12 text-blue-200 max-w-4xl mx-auto leading-relaxed">
              Learn, earn, and grow with Africa's revolutionary educational platform built on blockchain. 
              Complete missions, earn crypto rewards, and build your future with verifiable credentials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/missions">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
                >
                  <Play className="w-5 h-5" />
                  Start Learning
                </motion.div>
              </Link>
              <Link href="/missions">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
                >
                  Explore Missions
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
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
              <Link key={action.title} href={action.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="card-modern p-6 text-center cursor-pointer"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${action.color} mb-4`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{action.title}</h3>
                </motion.div>
              </Link>
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
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
                className="card-modern overflow-hidden"
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
                  <Link href="/missions">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full btn-primary text-center"
                    >
                      Start Mission
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Join thousands of learners across Africa who are already earning while they learn
            </p>
            <Link href="/missions">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
              >
                Get Started Now
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
