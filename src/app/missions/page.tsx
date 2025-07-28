'use client';

import { useState, useEffect } from 'react';
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
  Award,
  Play,
  CheckCircle,
  Lock,
  Unlock,
  ArrowRight,
  Video,
  FileText,
  Code,
  Calculator,
  Globe,
  Palette,
  Building,
  ChevronRight,
  BookOpenCheck,
  GraduationCap
} from 'lucide-react';
import { ProgressManager, PointsSystem, CertificateService } from '@/lib/certificates';
import { MissionProgress, QuizAnswer, MissionSubmission } from '@/types/missions';
import Link from 'next/link';

export default function MissionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [userProgress, setUserProgress] = useState<Record<number, MissionProgress>>({});
  const [expandedPaths, setExpandedPaths] = useState<Record<number, boolean>>({});

  const categories = ['All', 'Mathematics', 'History', 'Technology', 'Science', 'Language', 'Arts', 'Business'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  // Basamaklı eğitim yapısı
  const learningPaths = [
    {
      id: 1,
      title: 'Mathematics Fundamentals',
      description: 'Master essential mathematical concepts through interactive learning',
      category: 'Mathematics',
      difficulty: 'Easy',
      totalSteps: 6,
      maxReward: 800,
      estimatedTime: '2-3 hours',
      color: 'from-blue-500 to-blue-600',
      icon: Calculator,
      steps: [
        {
          id: 1,
          title: 'Introduction to Algebra',
          description: 'Learn basic algebraic concepts and operations',
          reward: 100,
          timeEstimate: '20 min',
          isCompleted: false,
          isLocked: false,
          type: 'lesson'
        },
        {
          id: 2,
          title: 'Algebra Quiz',
          description: 'Test your understanding of algebraic concepts',
          reward: 150,
          timeEstimate: '15 min',
          isCompleted: false,
          isLocked: true,
          type: 'quiz'
        },
        {
          id: 3,
          title: 'Geometry Basics',
          description: 'Explore fundamental geometric shapes and properties',
          reward: 120,
          timeEstimate: '25 min',
          isCompleted: false,
          isLocked: true,
          type: 'lesson'
        },
        {
          id: 4,
          title: 'Geometry Practice',
          description: 'Apply geometric concepts to solve problems',
          reward: 180,
          timeEstimate: '20 min',
          isCompleted: false,
          isLocked: true,
          type: 'practice'
        },
        {
          id: 5,
          title: 'Arithmetic Operations',
          description: 'Master basic arithmetic and number theory',
          reward: 100,
          timeEstimate: '15 min',
          isCompleted: false,
          isLocked: true,
          type: 'lesson'
        },
        {
          id: 6,
          title: 'Final Assessment',
          description: 'Comprehensive test covering all mathematics topics',
          reward: 150,
          timeEstimate: '30 min',
          isCompleted: false,
          isLocked: true,
          type: 'assessment'
        }
      ]
    },
    {
      id: 2,
      title: 'African History & Culture',
      description: 'Explore the rich history and cultural heritage of Africa',
      category: 'History',
      difficulty: 'Medium',
      totalSteps: 5,
      maxReward: 750,
      estimatedTime: '2-2.5 hours',
      color: 'from-green-500 to-green-600',
      icon: Globe,
      steps: [
        {
          id: 1,
          title: 'Ancient African Civilizations',
          description: 'Discover the great empires and kingdoms of Africa',
          reward: 150,
          timeEstimate: '30 min',
          isCompleted: false,
          isLocked: false,
          type: 'lesson'
        },
        {
          id: 2,
          title: 'Historical Timeline Quiz',
          description: 'Test your knowledge of African history',
          reward: 200,
          timeEstimate: '20 min',
          isCompleted: false,
          isLocked: true,
          type: 'quiz'
        },
        {
          id: 3,
          title: 'Cultural Traditions',
          description: 'Learn about diverse African cultural practices',
          reward: 150,
          timeEstimate: '25 min',
          isCompleted: false,
          isLocked: true,
          type: 'lesson'
        },
        {
          id: 4,
          title: 'Cultural Analysis Essay',
          description: 'Write about the impact of African culture',
          reward: 200,
          timeEstimate: '40 min',
          isCompleted: false,
          isLocked: true,
          type: 'essay'
        },
        {
          id: 5,
          title: 'History Final Project',
          description: 'Create a presentation on African history',
          reward: 50,
          timeEstimate: '45 min',
          isCompleted: false,
          isLocked: true,
          type: 'project'
        }
      ]
    },
    {
      id: 3,
      title: 'Blockchain & Web3 Technology',
      description: 'Master blockchain technology and smart contract development',
      category: 'Technology',
      difficulty: 'Hard',
      totalSteps: 7,
      maxReward: 1000,
      estimatedTime: '3-4 hours',
      color: 'from-purple-500 to-purple-600',
      icon: Code,
      steps: [
        {
          id: 1,
          title: 'Blockchain Fundamentals',
          description: 'Understand the basics of blockchain technology',
          reward: 150,
          timeEstimate: '30 min',
          isCompleted: false,
          isLocked: false,
          type: 'lesson'
        },
        {
          id: 2,
          title: 'Cryptocurrency Basics',
          description: 'Learn about digital currencies and tokens',
          reward: 120,
          timeEstimate: '25 min',
          isCompleted: false,
          isLocked: true,
          type: 'lesson'
        },
        {
          id: 3,
          title: 'Smart Contract Introduction',
          description: 'Explore self-executing contracts on blockchain',
          reward: 180,
          timeEstimate: '35 min',
          isCompleted: false,
          isLocked: true,
          type: 'lesson'
        },
        {
          id: 4,
          title: 'Solidity Programming',
          description: 'Learn to write smart contracts in Solidity',
          reward: 200,
          timeEstimate: '45 min',
          isCompleted: false,
          isLocked: true,
          type: 'coding'
        },
        {
          id: 5,
          title: 'Smart Contract Development',
          description: 'Build and deploy your first smart contract',
          reward: 250,
          timeEstimate: '60 min',
          isCompleted: false,
          isLocked: true,
          type: 'project'
        },
        {
          id: 6,
          title: 'Web3 Integration',
          description: 'Connect your applications to blockchain',
          reward: 150,
          timeEstimate: '40 min',
          isCompleted: false,
          isLocked: true,
          type: 'lesson'
        },
        {
          id: 7,
          title: 'Final Blockchain Project',
          description: 'Create a complete blockchain application',
          reward: 100,
          timeEstimate: '90 min',
          isCompleted: false,
          isLocked: true,
          type: 'project'
        }
      ]
    },
    {
      id: 4,
      title: 'Swahili Language Learning',
      description: 'Master basic Swahili phrases and cultural expressions',
      category: 'Language',
      difficulty: 'Easy',
      totalSteps: 4,
      maxReward: 600,
      estimatedTime: '1.5-2 hours',
      color: 'from-yellow-500 to-yellow-600',
      icon: BookOpen,
      steps: [
        {
          id: 1,
          title: 'Basic Greetings',
          description: 'Learn essential Swahili greetings and introductions',
          reward: 150,
          timeEstimate: '20 min',
          isCompleted: false,
          isLocked: false,
          type: 'lesson'
        },
        {
          id: 2,
          title: 'Vocabulary Building',
          description: 'Expand your Swahili vocabulary with common words',
          reward: 200,
          timeEstimate: '25 min',
          isCompleted: false,
          isLocked: true,
          type: 'lesson'
        },
        {
          id: 3,
          title: 'Pronunciation Practice',
          description: 'Practice speaking Swahili with audio exercises',
          reward: 150,
          timeEstimate: '30 min',
          isCompleted: false,
          isLocked: true,
          type: 'audio'
        },
        {
          id: 4,
          title: 'Conversation Skills',
          description: 'Engage in basic Swahili conversations',
          reward: 100,
          timeEstimate: '35 min',
          isCompleted: false,
          isLocked: true,
          type: 'practice'
        }
      ]
    }
  ];

  const stats = [
    { label: 'Learning Paths', value: learningPaths.length, icon: Target, color: 'text-blue-500' },
    { label: 'Completed Steps', value: Object.values(userProgress).filter(p => p.isCompleted).length, icon: Trophy, color: 'text-green-500' },
    { label: 'Total Rewards', value: '₿ 2,150', icon: Wallet, color: 'text-yellow-500' },
    { label: 'Active Learners', value: '3,247', icon: Users, color: 'text-purple-500' },
  ];

  // Load user progress on component mount
  useEffect(() => {
    const progress = ProgressManager.getAllProgress();
    setUserProgress(progress);
  }, []);

  const getStepProgress = (pathId: number) => {
    const pathProgress = Object.values(userProgress).filter(p => p.missionId === pathId);
    return pathProgress.length;
  };

  const getStepStatus = (pathId: number, stepId: number) => {
    const progress = userProgress[`${pathId}-${stepId}`];
    if (progress?.isCompleted) return 'completed';
    if (stepId === 1) return 'active';
    const previousStep = userProgress[`${pathId}-${stepId - 1}`];
    if (previousStep?.isCompleted) return 'active';
    return 'locked';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson': return <BookOpen className="w-5 h-5" />;
      case 'quiz': return <Target className="w-5 h-5" />;
      case 'practice': return <Play className="w-5 h-5" />;
      case 'essay': return <FileText className="w-5 h-5" />;
      case 'coding': return <Code className="w-5 h-5" />;
      case 'project': return <Trophy className="w-5 h-5" />;
      case 'assessment': return <GraduationCap className="w-5 h-5" />;
      case 'audio': return <Video className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lesson': return 'bg-blue-100 text-blue-600';
      case 'quiz': return 'bg-green-100 text-green-600';
      case 'practice': return 'bg-yellow-100 text-yellow-600';
      case 'essay': return 'bg-purple-100 text-purple-600';
      case 'coding': return 'bg-blue-100 text-blue-600';
      case 'project': return 'bg-red-100 text-red-600';
      case 'assessment': return 'bg-indigo-100 text-indigo-600';
      case 'audio': return 'bg-pink-100 text-pink-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const togglePathExpansion = (pathId: number) => {
    setExpandedPaths(prev => ({
      ...prev,
      [pathId]: !prev[pathId]
    }));
  };

  const filteredPaths = learningPaths.filter(path => {
    const matchesSearch = path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         path.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || path.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || path.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

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
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              Learning Paths
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Follow structured learning paths, complete steps, and earn blockchain-verified certificates
            </p>
          </motion.div>
        </div>
      </div>

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
                className="text-center card-modern p-4"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 mb-3 ${stat.color}`}>
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
                  placeholder="Search learning paths..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-80 pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Difficulty Filter */}
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>

            <div className="text-sm text-gray-600">
              {filteredPaths.length} learning paths found
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPaths.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No learning paths found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {filteredPaths.map((path, index) => (
                <motion.div
                  key={path.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="card-modern"
                >
                  {/* Path Header */}
                  <div className={`bg-gradient-to-r ${path.color} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                          <path.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{path.title}</h3>
                          <p className="text-blue-100">{path.category} • {path.difficulty}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{path.maxReward}</div>
                        <div className="text-sm text-blue-100">Total Rewards</div>
                      </div>
                    </div>
                    <p className="text-blue-100 mb-4">{path.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span>{path.totalSteps} steps</span>
                      <span>{path.estimatedTime}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm text-gray-500">{getStepProgress(path.id)}/{path.totalSteps} completed</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(getStepProgress(path.id) / path.totalSteps) * 100}%` }}
                      ></div>
                    </div>

                    {/* Steps */}
                    <div className="mt-6 space-y-3">
                      {path.steps.map((step, stepIndex) => {
                        const status = getStepStatus(path.id, step.id);
                        return (
                          <Link 
                            key={step.id} 
                            href={status === 'locked' ? '#' : `/missions/${path.id}/step/${step.id}`}
                            className={`block step-card ${status === 'completed' ? 'completed' : status === 'active' ? 'active' : ''} ${
                              status === 'locked' ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:scale-105'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                  status === 'completed' ? 'bg-green-100 text-green-600' :
                                  status === 'active' ? 'bg-blue-100 text-blue-600' :
                                  'bg-gray-100 text-gray-400'
                                }`}>
                                  {status === 'completed' ? (
                                    <CheckCircle className="w-5 h-5" />
                                  ) : status === 'locked' ? (
                                    <Lock className="w-5 h-5" />
                                  ) : (
                                    getTypeIcon(step.type)
                                  )}
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900">{step.title}</h4>
                                  <p className="text-sm text-gray-600">{step.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(step.type)}`}>
                                  {step.type}
                                </span>
                                <div className="text-right">
                                  <div className="text-sm font-medium text-gray-900">{step.reward} credits</div>
                                  <div className="text-xs text-gray-500">{step.timeEstimate}</div>
                                </div>
                                {status !== 'locked' && (
                                  <ChevronRight className="w-5 h-5 text-gray-400" />
                                )}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Start Button */}
                    <div className="mt-6">
                      <Link href={`/missions/${path.id}`}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="btn-primary w-full text-center"
                        >
                          {getStepProgress(path.id) > 0 ? 'Continue Learning' : 'Start Learning Path'}
                        </motion.div>
                      </Link>
                    </div>
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