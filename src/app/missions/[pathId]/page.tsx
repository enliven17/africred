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
  ChevronRight
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
              question: 'What is the value of x in the equation 2x + 5 = 13?',
              options: ['3', '4', '5', '6'],
              correct: 1
            },
            {
              question: 'Simplify: 3(x + 2) - 2x',
              options: ['x + 6', 'x + 2', '3x + 6', 'x + 4'],
              correct: 0
            }
          ]
        },
        // ... diğer adımlar
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
                        <div className="font-semibold text-gray-900">{step.reward} credits</div>
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