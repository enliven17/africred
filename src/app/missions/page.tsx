'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Users, 
  Wallet, 
  BookOpen,
  Trophy,
  Zap,
  TrendingUp,
  Target,
  Award
} from 'lucide-react';

export default function MissionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const categories = ['All', 'Mathematics', 'History', 'Technology', 'Science', 'Language', 'Arts', 'Business'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const missions = [
    {
      id: 1,
      title: 'Learn Basic Mathematics',
      description: 'Complete 10 math problems covering algebra, geometry, and arithmetic',
      reward: 50,
      difficulty: 'Easy',
      participants: 150,
      category: 'Mathematics',
      timeEstimate: '15 min',
      requirements: ['Basic math knowledge'],
      steps: ['Solve 5 algebra problems', 'Complete 3 geometry exercises', 'Answer 2 arithmetic questions'],
      isCompleted: false,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'African History Quiz',
      description: 'Test your knowledge of African history and culture',
      reward: 75,
      difficulty: 'Medium',
      participants: 89,
      category: 'History',
      timeEstimate: '25 min',
      requirements: ['Interest in history'],
      steps: ['Read historical materials', 'Answer 20 questions', 'Submit essay'],
      isCompleted: false,
      color: 'bg-green-500'
    },
    {
      id: 3,
      title: 'Blockchain Basics',
      description: 'Introduction to blockchain technology and cryptocurrency',
      reward: 100,
      difficulty: 'Hard',
      participants: 234,
      category: 'Technology',
      timeEstimate: '45 min',
      requirements: ['Basic computer knowledge'],
      steps: ['Watch tutorial videos', 'Complete coding exercises', 'Build simple smart contract'],
      isCompleted: false,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      title: 'Swahili Language Learning',
      description: 'Learn basic Swahili phrases and greetings',
      reward: 60,
      difficulty: 'Easy',
      participants: 120,
      category: 'Language',
      timeEstimate: '20 min',
      requirements: ['No prior knowledge needed'],
      steps: ['Learn 10 basic phrases', 'Practice pronunciation', 'Record audio response'],
      isCompleted: false,
      color: 'bg-yellow-500'
    },
    {
      id: 5,
      title: 'African Art Appreciation',
      description: 'Explore traditional and modern African art forms',
      reward: 80,
      difficulty: 'Medium',
      participants: 67,
      category: 'Arts',
      timeEstimate: '30 min',
      requirements: ['Creative mindset'],
      steps: ['Study art history', 'Analyze artworks', 'Create your own piece'],
      isCompleted: false,
      color: 'bg-pink-500'
    },
    {
      id: 6,
      title: 'Entrepreneurship Fundamentals',
      description: 'Learn the basics of starting and running a business',
      reward: 90,
      difficulty: 'Hard',
      participants: 156,
      category: 'Business',
      timeEstimate: '40 min',
      requirements: ['Basic business interest'],
      steps: ['Study business models', 'Create business plan', 'Pitch your idea'],
      isCompleted: false,
      color: 'bg-indigo-500'
    }
  ];

  const filteredMissions = missions.filter(mission => {
    const matchesSearch = mission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mission.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || mission.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || mission.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const stats = [
    { label: 'Total Missions', value: missions.length, icon: Target, color: 'text-blue-500' },
    { label: 'Completed', value: missions.filter(m => m.isCompleted).length, icon: Trophy, color: 'text-green-500' },
    { label: 'Total Rewards', value: '₿ 455', icon: Wallet, color: 'text-yellow-500' },
    { label: 'Active Learners', value: '2,847', icon: Users, color: 'text-purple-500' },
  ];

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
              Learning Missions
            </h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Complete missions, earn rewards, and build your skills on Africa's first earn-to-learn platform
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Filters */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              {/* Search */}
              <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search missions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Difficulty Filter */}
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>

            <div className="text-sm text-gray-600">
              {filteredMissions.length} missions found
            </div>
          </div>
        </div>
      </section>

      {/* Missions Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredMissions.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No missions found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMissions.map((mission, index) => (
                <motion.div
                  key={mission.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
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
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{mission.timeEstimate}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Wallet className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600">{mission.reward} credits</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {mission.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      Start Mission
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 