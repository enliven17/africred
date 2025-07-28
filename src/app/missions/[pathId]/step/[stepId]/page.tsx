'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Target,
  Play,
  FileText,
  Code,
  Trophy,
  GraduationCap,
  Video,
  CheckCircle,
  Clock,
  Star,
  Award,
  Save,
  Send,
  Download,
  Share2,
  Eye,
  EyeOff,
  Timer,
  BarChart3,
  XCircle
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ProgressManager, PointsSystem, CertificateService } from '@/lib/certificates';
import { MissionProgress, QuizAnswer, MissionSubmission } from '@/types/missions';
import { getWalletState } from '@/lib/educhain';

export default function StepPage() {
  const params = useParams();
  const router = useRouter();
  const pathId = parseInt(params.pathId as string);
  const stepId = parseInt(params.stepId as string);
  
  const [userProgress, setUserProgress] = useState<Record<string, any>>({});
  const [currentAnswers, setCurrentAnswers] = useState<Record<string, number>>({});
  const [essayContent, setEssayContent] = useState('');
  const [codeSubmission, setCodeSubmission] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [stepResults, setStepResults] = useState<any>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);

  // Step data (gerçek uygulamada API'den gelecek)
  const stepData = {
    id: stepId,
    title: 'Introduction to Algebra',
    description: 'Learn basic algebraic concepts and operations',
    type: 'lesson',
    reward: 100,
    timeEstimate: '20 min',
    content: {
      videos: [
        { title: 'What is Algebra?', duration: '5:30', url: '#' },
        { title: 'Basic Operations', duration: '4:15', url: '#' },
        { title: 'Solving Equations', duration: '6:45', url: '#' }
      ],
      readings: [
        { title: 'Algebra Fundamentals', pages: 8, url: '#' },
        { title: 'Practice Problems', pages: 6, url: '#' }
      ],
      exercises: [
        {
          type: 'quiz',
          title: 'Understanding Check',
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
        }
      ]
    }
  };

  useEffect(() => {
    const checkWallet = async () => {
      const walletState = await getWalletState();
      setWalletConnected(walletState.isConnected);
    };
    
    checkWallet();
    const progress = ProgressManager.getAllProgress();
    setUserProgress(progress);
    setStartTime(Date.now());
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (startTime > 0) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime]);

  const handleAnswerChange = (questionId: string, answer: number) => {
    setCurrentAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const submitStep = async () => {
    setIsSubmitting(true);
    try {
      const totalTime = Math.floor((Date.now() - startTime) / 1000 / 60); // minutes
      
      // Calculate quiz answers
      const quizAnswers: QuizAnswer[] = [];
      let totalScore = 0;
      let maxScore = 0;

      stepData.content.exercises.forEach((exercise: any, exerciseIndex: number) => {
        if (exercise.type === 'quiz') {
          exercise.questions.forEach((question: any, questionIndex: number) => {
            const questionId = `${exerciseIndex}-${questionIndex}`;
            const selectedAnswer = currentAnswers[questionId] || -1;
            const isCorrect = selectedAnswer === question.correct;
            
            quizAnswers.push({
              questionId,
              selectedAnswer,
              isCorrect,
              timeSpent: totalTime
            });

            if (isCorrect) totalScore += 10;
            maxScore += 10;
          });
        }
      });

      // Calculate final score
      const finalScore = PointsSystem.calculateScore(quizAnswers, maxScore);
      const points = PointsSystem.calculatePoints(finalScore, totalTime, 'Easy');

      // Save progress
      const progress: MissionProgress = {
        missionId: pathId,
        isCompleted: true,
        currentStep: stepId,
        totalSteps: 6, // Bu dinamik olmalı
        score: finalScore,
        maxScore,
        timeSpent: totalTime,
        startedAt: new Date(startTime).toISOString(),
        completedAt: new Date().toISOString(),
        answers: currentAnswers,
        certificates: []
      };

      ProgressManager.saveProgress(`${pathId}-${stepId}`, progress);
      setUserProgress(prev => ({ ...prev, [`${pathId}-${stepId}`]: progress }));

      // Set results
      setStepResults({
        score: finalScore,
        maxScore,
        points,
        timeSpent: totalTime,
        answers: quizAnswers
      });

      setShowResults(true);
    } catch (error) {
      console.error('Failed to submit step:', error);
      alert('Failed to submit step. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson': return <BookOpen className="w-6 h-6" />;
      case 'quiz': return <Target className="w-6 h-6" />;
      case 'practice': return <Play className="w-6 h-6" />;
      case 'essay': return <FileText className="w-6 h-6" />;
      case 'coding': return <Code className="w-6 h-6" />;
      case 'project': return <Trophy className="w-6 h-6" />;
      case 'assessment': return <GraduationCap className="w-6 h-6" />;
      case 'audio': return <Video className="w-6 h-6" />;
      default: return <BookOpen className="w-6 h-6" />;
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

  // Wallet connection check
  if (!walletConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="card-modern p-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Wallet Required</h2>
            <p className="text-gray-600 mb-6">
              You need to connect your EduChain wallet to access learning content and earn rewards.
            </p>
            <Link href="/" className="btn-primary">
              Connect Wallet
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="gradient-bg text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={`/missions/${pathId}`} className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
                Back to Learning Path
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <span className="font-medium">{formatTime(elapsedTime)}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(stepData.type)}`}>
                {stepData.type}
              </span>
            </div>
          </div>
          
          <div className="mt-6">
            <h1 className="text-3xl font-bold mb-2">{stepData.title}</h1>
            <p className="text-blue-100">{stepData.description}</p>
          </div>
        </div>
      </div>

      {!showResults ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Videos */}
              <div className="card-modern p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Learning Videos
                </h2>
                <div className="space-y-3">
                  {stepData.content.videos.map((video: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <div className="font-medium text-gray-900">{video.title}</div>
                        <div className="text-sm text-gray-500">{video.duration}</div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700">
                        <Play className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Readings */}
              <div className="card-modern p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Reading Materials
                </h2>
                <div className="space-y-3">
                  {stepData.content.readings.map((reading: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <div className="font-medium text-gray-900">{reading.title}</div>
                        <div className="text-sm text-gray-500">{reading.pages} pages</div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exercises */}
              <div className="card-modern p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Exercises & Assessment</h2>
                <div className="space-y-6">
                  {stepData.content.exercises.map((exercise: any, exerciseIndex: number) => (
                    <div key={exerciseIndex} className="border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">{exercise.title}</h3>
                      
                      {exercise.type === 'quiz' && exercise.questions && (
                        <div className="space-y-4">
                          {exercise.questions.map((q: any, qIndex: number) => {
                            const questionId = `${exerciseIndex}-${qIndex}`;
                            return (
                              <div key={qIndex} className="bg-gray-50 p-4 rounded-xl">
                                <div className="font-medium text-gray-900 mb-3">{q.question}</div>
                                <div className="space-y-2">
                                  {q.options.map((option: string, oIndex: number) => (
                                    <label key={oIndex} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-100">
                                      <input 
                                        type="radio" 
                                        name={questionId}
                                        value={oIndex}
                                        checked={currentAnswers[questionId] === oIndex}
                                        onChange={() => handleAnswerChange(questionId, oIndex)}
                                        className="text-blue-600" 
                                      />
                                      <span className="text-gray-700">{option}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Progress */}
              <div className="card-modern p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Step Progress</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Time Spent</span>
                    <span className="font-medium">{formatTime(elapsedTime)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Questions Answered</span>
                    <span className="font-medium">{Object.keys(currentAnswers).length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Reward</span>
                    <span className="font-medium text-green-600">{stepData.reward} credits</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="card-modern p-6">
                <div className="space-y-3">
                  <button
                    onClick={() => ProgressManager.saveProgress(`${pathId}-${stepId}`, { currentAnswers, startTime })}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save Progress
                  </button>
                  
                  <button
                    onClick={submitStep}
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Complete Step
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Results Section */
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="card-modern p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Step Completed!</h2>
              <p className="text-gray-600">Great job! You've successfully completed this step.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-green-600 mb-1">{stepResults.score}/{stepResults.maxScore}</div>
                <div className="text-sm text-green-700">Final Score</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 mb-1">{stepResults.points}</div>
                <div className="text-sm text-blue-700">Points Earned</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-purple-600 mb-1">{stepResults.timeSpent}m</div>
                <div className="text-sm text-purple-700">Time Spent</div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Link href={`/missions/${pathId}`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary"
                >
                  Continue Learning
                </motion.div>
              </Link>
              <Link href="/missions">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  View All Paths
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 