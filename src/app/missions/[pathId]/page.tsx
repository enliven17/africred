'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  BookOpen,
  Target,
  Play,
  FileText,
  Code,
  Trophy,
  GraduationCap,
  Video,
  CheckCircle,
  Lock,
  Unlock,
  Clock,
  Star,
  Users,
  Award,
  ChevronRight,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ProgressManager } from '@/lib/certificates';

export default function LearningPathPage() {
  const params = useParams();
  const pathId = parseInt(params.pathId as string);
  const [userProgress, setUserProgress] = useState<Record<string, any>>({});

  // Learning path data (gerçek uygulamada API'den gelecek)
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
      icon: BookOpen,
      steps: [
        {
          id: 1,
          title: 'Introduction to Algebra',
          description: 'Learn basic algebraic concepts and operations',
          reward: 100,
          timeEstimate: '20 min',
          isCompleted: false,
          isLocked: false,
          type: 'lesson',
          content: {
            videos: [
              { title: 'What is Algebra?', duration: '5:30', url: '#' },
              { title: 'Basic Operations', duration: '4:15', url: '#' },
              { title: 'Solving Equations', duration: '6:45', url: '#' }
            ],
            readings: [
              { title: 'Algebra Fundamentals', pages: 8, url: '#' },
              { title: 'Practice Problems', pages: 6, url: '#' }
            ]
          }
        },
        {
          id: 2,
          title: 'Algebra Quiz',
          description: 'Test your understanding of algebraic concepts',
          reward: 150,
          timeEstimate: '15 min',
          isCompleted: false,
          isLocked: true,
          type: 'quiz',
          questions: [
            {
              question: 'Solve the quadratic equation: x² - 5x + 6 = 0',
              options: ['x = 2, x = 3', 'x = -2, x = -3', 'x = 1, x = 6', 'x = -1, x = -6'],
              correct: 0
            },
            {
              question: 'Find the derivative of f(x) = 3x³ - 2x² + 5x - 1',
              options: ['9x² - 4x + 5', '6x² - 4x + 5', '9x² - 2x + 5', '6x² - 2x + 5'],
              correct: 0
            },
            {
              question: 'What is the limit of (x² - 4)/(x - 2) as x approaches 2?',
              options: ['0', '2', '4', 'Undefined'],
              correct: 2
            },
            {
              question: 'Solve the system of equations: 2x + y = 7, 3x - 2y = 4',
              options: ['x = 3, y = 1', 'x = 2, y = 3', 'x = 1, y = 5', 'x = 4, y = -1'],
              correct: 0
            }
          ]
        },
        {
          id: 3,
          title: 'Geometry Basics',
          description: 'Explore fundamental geometric shapes and properties',
          reward: 120,
          timeEstimate: '25 min',
          isCompleted: false,
          isLocked: true,
          type: 'lesson',
          content: {
            videos: [
              { title: 'Introduction to Geometry', duration: '7:20', url: '#' },
              { title: 'Basic Shapes', duration: '5:45', url: '#' },
              { title: 'Angles and Lines', duration: '6:30', url: '#' }
            ],
            readings: [
              { title: 'Geometry Fundamentals', pages: 10, url: '#' },
              { title: 'Shape Properties', pages: 8, url: '#' }
            ]
          }
        },
        {
          id: 4,
          title: 'Geometry Practice',
          description: 'Apply geometric concepts to solve problems',
          reward: 180,
          timeEstimate: '20 min',
          isCompleted: false,
          isLocked: true,
          type: 'practice',
          content: {
            exercises: [
              { title: 'Calculate Area', description: 'Find the area of various shapes', difficulty: 'Easy' },
              { title: 'Perimeter Problems', description: 'Calculate perimeters of polygons', difficulty: 'Medium' },
              { title: 'Volume Calculations', description: 'Find volumes of 3D shapes', difficulty: 'Hard' }
            ]
          }
        },
        {
          id: 5,
          title: 'Arithmetic Operations',
          description: 'Master basic arithmetic and number theory',
          reward: 100,
          timeEstimate: '15 min',
          isCompleted: false,
          isLocked: true,
          type: 'lesson',
          content: {
            videos: [
              { title: 'Basic Arithmetic', duration: '4:15', url: '#' },
              { title: 'Number Theory', duration: '5:30', url: '#' }
            ],
            readings: [
              { title: 'Arithmetic Fundamentals', pages: 6, url: '#' }
            ]
          }
        },
        {
          id: 6,
          title: 'Final Assessment',
          description: 'Comprehensive test covering all mathematics topics',
          reward: 150,
          timeEstimate: '30 min',
          isCompleted: false,
          isLocked: true,
          type: 'assessment',
          questions: [
            {
              question: 'Find the integral of ∫(2x³ - 3x² + 4x - 1)dx',
              options: ['x⁴/2 - x³ + 2x² - x + C', 'x⁴ - x³ + 2x² - x + C', 'x⁴/2 - x³ + 4x² - x + C', 'x⁴ - x³ + 4x² - x + C'],
              correct: 0
            },
            {
              question: 'What is the volume of a sphere with radius 3?',
              options: ['27π', '36π', '108π', '144π'],
              correct: 1
            },
            {
              question: 'Solve the differential equation: dy/dx = 2x + 1, y(0) = 3',
              options: ['y = x² + x + 3', 'y = x² + x + 2', 'y = x² + 2x + 3', 'y = x² + 2x + 2'],
              correct: 0
            },
            {
              question: 'What is the probability of getting exactly 3 heads in 5 coin flips?',
              options: ['5/32', '10/32', '15/32', '20/32'],
              correct: 1
            },
            {
              question: 'Find the eigenvalues of the matrix [[2, 1], [1, 2]]',
              options: ['λ = 1, λ = 3', 'λ = 0, λ = 4', 'λ = 1, λ = 4', 'λ = 2, λ = 2'],
              correct: 0
            }
          ]
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
          type: 'lesson',
          content: {
            videos: [
              { title: 'Ancient Egypt', duration: '8:15', url: '#' },
              { title: 'Kingdom of Kush', duration: '6:30', url: '#' },
              { title: 'Great Zimbabwe', duration: '7:45', url: '#' }
            ],
            readings: [
              { title: 'African Civilizations', pages: 12, url: '#' },
              { title: 'Historical Timeline', pages: 8, url: '#' }
            ]
          }
        },
        {
          id: 2,
          title: 'Historical Timeline Quiz',
          description: 'Test your knowledge of African history',
          reward: 200,
          timeEstimate: '20 min',
          isCompleted: false,
          isLocked: true,
          type: 'quiz',
          questions: [
            {
              question: 'Which ancient African civilization built the pyramids?',
              options: ['Kush', 'Egypt', 'Zimbabwe', 'Mali'],
              correct: 1
            },
            {
              question: 'The Kingdom of Kush was located in modern-day:',
              options: ['Egypt', 'Sudan', 'Ethiopia', 'Nigeria'],
              correct: 1
            }
          ]
        },
        {
          id: 3,
          title: 'Cultural Traditions',
          description: 'Learn about diverse African cultural practices',
          reward: 150,
          timeEstimate: '25 min',
          isCompleted: false,
          isLocked: true,
          type: 'lesson',
          content: {
            videos: [
              { title: 'Traditional Music', duration: '5:20', url: '#' },
              { title: 'Art and Crafts', duration: '6:15', url: '#' },
              { title: 'Festivals and Celebrations', duration: '7:30', url: '#' }
            ],
            readings: [
              { title: 'Cultural Heritage', pages: 10, url: '#' }
            ]
          }
        },
        {
          id: 4,
          title: 'Cultural Analysis Essay',
          description: 'Write about African cultural influences',
          reward: 200,
          timeEstimate: '40 min',
          isCompleted: false,
          isLocked: true,
          type: 'essay',
          content: {
            prompt: 'Analyze the impact of African cultural traditions on modern society. Consider music, art, and social practices.',
            requirements: 'Minimum 500 words, include examples from at least 3 different regions'
          }
        },
        {
          id: 5,
          title: 'History Final Project',
          description: 'Create a comprehensive project on African history',
          reward: 50,
          timeEstimate: '45 min',
          isCompleted: false,
          isLocked: true,
          type: 'project',
          content: {
            projectType: 'Presentation',
            description: 'Create a presentation about an African civilization of your choice',
            requirements: 'Include timeline, achievements, and cultural impact'
          }
        }
      ]
    },
    {
      id: 3,
      title: 'Web Development Fundamentals',
      description: 'Learn modern web development with HTML, CSS, and JavaScript',
      category: 'Programming',
      difficulty: 'Medium',
      totalSteps: 4,
      maxReward: 600,
      estimatedTime: '3-4 hours',
      color: 'from-purple-500 to-purple-600',
      icon: Code,
      steps: [
        {
          id: 1,
          title: 'HTML Basics',
          description: 'Learn the fundamentals of HTML markup',
          reward: 150,
          timeEstimate: '30 min',
          isCompleted: false,
          isLocked: false,
          type: 'lesson',
          content: {
            videos: [
              { title: 'HTML Structure', duration: '6:15', url: '#' },
              { title: 'HTML Elements', duration: '8:30', url: '#' },
              { title: 'Forms and Inputs', duration: '7:45', url: '#' }
            ],
            readings: [
              { title: 'HTML Fundamentals', pages: 12, url: '#' },
              { title: 'Best Practices', pages: 8, url: '#' }
            ]
          }
        },
        {
          id: 2,
          title: 'CSS Styling',
          description: 'Master CSS for beautiful web design',
          reward: 200,
          timeEstimate: '45 min',
          isCompleted: false,
          isLocked: true,
          type: 'lesson',
          content: {
            videos: [
              { title: 'CSS Selectors', duration: '5:20', url: '#' },
              { title: 'Layout with Flexbox', duration: '9:15', url: '#' },
              { title: 'Responsive Design', duration: '8:30', url: '#' }
            ],
            readings: [
              { title: 'CSS Fundamentals', pages: 15, url: '#' }
            ]
          }
        },
        {
          id: 3,
          title: 'JavaScript Programming',
          description: 'Learn JavaScript for interactive web applications',
          reward: 200,
          timeEstimate: '60 min',
          isCompleted: false,
          isLocked: true,
          type: 'coding',
          content: {
            exercises: [
              { title: 'Variables and Functions', description: 'Basic JavaScript concepts', difficulty: 'Easy' },
              { title: 'DOM Manipulation', description: 'Working with web elements', difficulty: 'Medium' },
              { title: 'Event Handling', description: 'User interactions', difficulty: 'Hard' }
            ]
          }
        },
        {
          id: 4,
          title: 'Final Web Project',
          description: 'Build a complete website using all learned skills',
          reward: 50,
          timeEstimate: '90 min',
          isCompleted: false,
          isLocked: true,
          type: 'project',
          content: {
            projectType: 'Website',
            description: 'Create a personal portfolio website',
            requirements: 'Include HTML structure, CSS styling, and JavaScript functionality'
          }
        }
      ]
    },
    {
      id: 4,
      title: 'Blockchain & Cryptocurrency',
      description: 'Understand blockchain technology and cryptocurrency fundamentals',
      category: 'Technology',
      difficulty: 'Hard',
      totalSteps: 5,
      maxReward: 1000,
      estimatedTime: '4-5 hours',
      color: 'from-orange-500 to-orange-600',
      icon: Award,
      steps: [
        {
          id: 1,
          title: 'Blockchain Basics',
          description: 'Learn the fundamentals of blockchain technology',
          reward: 200,
          timeEstimate: '40 min',
          isCompleted: false,
          isLocked: false,
          type: 'lesson',
          content: {
            videos: [
              { title: 'What is Blockchain?', duration: '10:15', url: '#' },
              { title: 'How Blockchain Works', duration: '12:30', url: '#' },
              { title: 'Consensus Mechanisms', duration: '8:45', url: '#' }
            ],
            readings: [
              { title: 'Blockchain Fundamentals', pages: 18, url: '#' },
              { title: 'Cryptography Basics', pages: 12, url: '#' }
            ]
          }
        },
        {
          id: 2,
          title: 'Cryptocurrency Quiz',
          description: 'Test your understanding of blockchain concepts',
          reward: 250,
          timeEstimate: '25 min',
          isCompleted: false,
          isLocked: true,
          type: 'quiz',
          questions: [
            {
              question: 'What is a blockchain?',
              options: ['A type of cryptocurrency', 'A distributed ledger', 'A programming language', 'A database'],
              correct: 1
            },
            {
              question: 'Which consensus mechanism does Bitcoin use?',
              options: ['Proof of Stake', 'Proof of Work', 'Delegated Proof of Stake', 'Proof of Authority'],
              correct: 1
            }
          ]
        },
        {
          id: 3,
          title: 'Smart Contracts',
          description: 'Learn about smart contracts and their applications',
          reward: 300,
          timeEstimate: '50 min',
          isCompleted: false,
          isLocked: true,
          type: 'lesson',
          content: {
            videos: [
              { title: 'Smart Contract Basics', duration: '9:20', url: '#' },
              { title: 'Solidity Programming', duration: '15:30', url: '#' },
              { title: 'DeFi Applications', duration: '12:15', url: '#' }
            ],
            readings: [
              { title: 'Smart Contract Development', pages: 20, url: '#' }
            ]
          }
        },
        {
          id: 4,
          title: 'Coding Smart Contract',
          description: 'Write a simple smart contract',
          reward: 200,
          timeEstimate: '60 min',
          isCompleted: false,
          isLocked: true,
          type: 'coding',
          content: {
            exercises: [
              { title: 'Hello World Contract', description: 'Basic smart contract', difficulty: 'Easy' },
              { title: 'Token Contract', description: 'Create a simple token', difficulty: 'Medium' },
              { title: 'DeFi Contract', description: 'Lending protocol', difficulty: 'Hard' }
            ]
          }
        },
        {
          id: 5,
          title: 'Blockchain Final Assessment',
          description: 'Comprehensive test on blockchain and cryptocurrency',
          reward: 50,
          timeEstimate: '45 min',
          isCompleted: false,
          isLocked: true,
          type: 'assessment',
          questions: [
            {
              question: 'What is the main advantage of blockchain?',
              options: ['Speed', 'Decentralization', 'Cost', 'Simplicity'],
              correct: 1
            },
            {
              question: 'Which cryptocurrency was the first?',
              options: ['Ethereum', 'Bitcoin', 'Litecoin', 'Ripple'],
              correct: 1
            }
          ]
        }
      ]
    }
  ];

  const currentPath = learningPaths.find(path => path.id === pathId);

  useEffect(() => {
    const progress = ProgressManager.getAllProgress();
    setUserProgress(progress);
  }, []);

  const getStepStatus = (stepId: number) => {
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

  if (!currentPath) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Learning Path Not Found</h1>
          <Link href="/missions" className="btn-primary">
            Back to Missions
          </Link>
        </div>
      </div>
    );
  }

  const completedSteps = currentPath.steps.filter(step => getStepStatus(step.id) === 'completed').length;
  const progressPercentage = (completedSteps / currentPath.totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className={`bg-gradient-to-r ${currentPath.color} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/missions" className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Back to Learning Paths
            </Link>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <currentPath.icon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{currentPath.title}</h1>
              <p className="text-xl text-blue-100">{currentPath.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{currentPath.totalSteps}</div>
              <div className="text-blue-100">Total Steps</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{currentPath.maxReward}</div>
              <div className="text-blue-100">Max Rewards</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{currentPath.estimatedTime}</div>
              <div className="text-blue-100">Estimated Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{currentPath.difficulty}</div>
              <div className="text-blue-100">Difficulty</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-modern p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Your Progress</h2>
              <span className="text-sm text-gray-500">{completedSteps}/{currentPath.totalSteps} completed</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{Math.round(progressPercentage)}%</div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Learning Steps</h2>
          
          <div className="space-y-4">
            {currentPath.steps.map((step, index) => {
              const status = getStepStatus(step.id);
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`step-card ${status === 'completed' ? 'completed' : status === 'active' ? 'active' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100">
                        <span className="text-lg font-bold text-gray-600">{step.id}</span>
                      </div>
                      
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
                          <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(step.type)}`}>
                        {step.type}
                      </span>
                      
                      <div className="text-right">
                        <div className="font-semibold text-gray-900 flex items-center gap-1">
                          <span>{step.reward}</span>
                          <span>EDU</span>
                        </div>
                        <div className="text-sm text-gray-500">{step.timeEstimate}</div>
                      </div>
                      
                      {status !== 'locked' && (
                        <Link href={`/missions/${pathId}/step/${step.id}`}>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </motion.div>
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certificate Preview */}
      {completedSteps === currentPath.totalSteps && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="card-modern p-8 text-center">
              <Award className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Congratulations!</h2>
              <p className="text-gray-600 mb-6">You've completed the {currentPath.title} learning path!</p>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">EduChain Certificate</h3>
                <p className="text-gray-600 mb-4">Your blockchain-verified certificate is ready to be issued</p>
                <button className="btn-primary">
                  Issue Certificate
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
} 