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
  XCircle,
  ArrowRight,
  Video,
  FileText,
  Code,
  Calculator,
  Globe,
  Palette,
  Building,
  Save,
  Download,
  Share2,
  Eye,
  EyeOff,
  Timer,
  BarChart3
} from 'lucide-react';
import { ProgressManager, PointsSystem, CertificateService } from '@/lib/certificates';
import { MissionProgress, QuizAnswer, MissionSubmission } from '@/types/missions';

export default function MissionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedMission, setSelectedMission] = useState<any>(null);
  const [showMissionModal, setShowMissionModal] = useState(false);
  const [userProgress, setUserProgress] = useState<Record<number, MissionProgress>>({});
  const [currentAnswers, setCurrentAnswers] = useState<Record<string, number>>({});
  const [essayContent, setEssayContent] = useState('');
  const [codeSubmission, setCodeSubmission] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [missionResults, setMissionResults] = useState<any>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const categories = ['All', 'Mathematics', 'History', 'Technology', 'Science', 'Language', 'Arts', 'Business'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const missions = [
    {
      id: 1,
      title: 'Learn Basic Mathematics',
      description: 'Master fundamental mathematical concepts through interactive exercises and real-world applications',
      reward: 50,
      difficulty: 'Easy',
      participants: 150,
      category: 'Mathematics',
      timeEstimate: '15 min',
      requirements: ['Basic math knowledge'],
      steps: ['Solve 5 algebra problems', 'Complete 3 geometry exercises', 'Answer 2 arithmetic questions'],
      isCompleted: false,
      color: 'bg-blue-500',
      content: {
        videos: [
          { title: 'Introduction to Algebra', duration: '5:30', url: '#' },
          { title: 'Basic Geometry Concepts', duration: '4:15', url: '#' },
          { title: 'Arithmetic Operations', duration: '3:45', url: '#' }
        ],
        readings: [
          { title: 'Algebra Fundamentals', pages: 8, url: '#' },
          { title: 'Geometry Basics', pages: 6, url: '#' },
          { title: 'Arithmetic Review', pages: 4, url: '#' }
        ],
        exercises: [
          {
            type: 'quiz',
            title: 'Algebra Quiz',
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
              },
              {
                question: 'Solve for y: 4y - 8 = 12',
                options: ['3', '4', '5', '6'],
                correct: 2
              }
            ]
          },
          {
            type: 'problem',
            title: 'Geometry Problem',
            description: 'Calculate the area of a rectangle with length 8 units and width 6 units.',
            answer: '48 square units',
            steps: ['Use the formula: Area = length × width', 'Substitute: Area = 8 × 6', 'Calculate: Area = 48']
          }
        ]
      }
    },
    {
      id: 2,
      title: 'African History Quiz',
      description: 'Explore the rich history and cultural heritage of Africa through interactive learning',
      reward: 75,
      difficulty: 'Medium',
      participants: 89,
      category: 'History',
      timeEstimate: '25 min',
      requirements: ['Interest in history'],
      steps: ['Read historical materials', 'Answer 20 questions', 'Submit essay'],
      isCompleted: false,
      color: 'bg-green-500',
      content: {
        videos: [
          { title: 'Ancient African Civilizations', duration: '7:20', url: '#' },
          { title: 'The Great Empires of Africa', duration: '6:45', url: '#' },
          { title: 'Modern African History', duration: '5:30', url: '#' }
        ],
        readings: [
          { title: 'The Kingdom of Mali', pages: 12, url: '#' },
          { title: 'Ancient Egypt and Nubia', pages: 10, url: '#' },
          { title: 'Colonial Period in Africa', pages: 8, url: '#' }
        ],
        exercises: [
          {
            type: 'quiz',
            title: 'African History Quiz',
            questions: [
              {
                question: 'Which African empire was known for its wealth in gold?',
                options: ['Ghana Empire', 'Mali Empire', 'Songhai Empire', 'All of the above'],
                correct: 3
              },
              {
                question: 'Who was the famous ruler of Mali known for his pilgrimage to Mecca?',
                options: ['Sundiata Keita', 'Mansa Musa', 'Askia Muhammad', 'Sonni Ali'],
                correct: 1
              },
              {
                question: 'Which ancient African civilization built the pyramids?',
                options: ['Nubia', 'Egypt', 'Kush', 'Axum'],
                correct: 1
              }
            ]
          },
          {
            type: 'essay',
            title: 'Historical Analysis',
            description: 'Write a 300-word essay about the impact of trade routes on African civilizations.',
            requirements: ['Minimum 300 words', 'Include specific examples', 'Cite historical facts']
          }
        ]
      }
    },
    {
      id: 3,
      title: 'Blockchain Basics',
      description: 'Introduction to blockchain technology, cryptocurrency, and smart contracts',
      reward: 100,
      difficulty: 'Hard',
      participants: 234,
      category: 'Technology',
      timeEstimate: '45 min',
      requirements: ['Basic computer knowledge'],
      steps: ['Watch tutorial videos', 'Complete coding exercises', 'Build simple smart contract'],
      isCompleted: false,
      color: 'bg-purple-500',
      content: {
        videos: [
          { title: 'What is Blockchain?', duration: '8:15', url: '#' },
          { title: 'Cryptocurrency Fundamentals', duration: '6:30', url: '#' },
          { title: 'Smart Contracts Explained', duration: '7:45', url: '#' }
        ],
        readings: [
          { title: 'Blockchain Technology Guide', pages: 15, url: '#' },
          { title: 'Cryptocurrency Basics', pages: 12, url: '#' },
          { title: 'Smart Contract Development', pages: 18, url: '#' }
        ],
        exercises: [
          {
            type: 'quiz',
            title: 'Blockchain Fundamentals',
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
              },
              {
                question: 'What is a smart contract?',
                options: ['A legal document', 'Self-executing code', 'A cryptocurrency', 'A blockchain'],
                correct: 1
              }
            ]
          },
          {
            type: 'coding',
            title: 'Simple Smart Contract',
            description: 'Write a simple smart contract that stores and retrieves a number.',
            code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private storedData;
    
    function set(uint256 x) public {
        storedData = x;
    }
    
    function get() public view returns (uint256) {
        return storedData;
    }
}`,
            requirements: ['Deploy the contract', 'Test set and get functions', 'Explain the code']
          }
        ]
      }
    },
    {
      id: 4,
      title: 'Swahili Language Learning',
      description: 'Learn basic Swahili phrases, greetings, and cultural expressions',
      reward: 60,
      difficulty: 'Easy',
      participants: 120,
      category: 'Language',
      timeEstimate: '20 min',
      requirements: ['No prior knowledge needed'],
      steps: ['Learn 10 basic phrases', 'Practice pronunciation', 'Record audio response'],
      isCompleted: false,
      color: 'bg-yellow-500',
      content: {
        videos: [
          { title: 'Swahili Greetings', duration: '4:30', url: '#' },
          { title: 'Basic Phrases', duration: '5:15', url: '#' },
          { title: 'Pronunciation Guide', duration: '3:45', url: '#' }
        ],
        readings: [
          { title: 'Swahili Grammar Basics', pages: 6, url: '#' },
          { title: 'Common Phrases', pages: 4, url: '#' },
          { title: 'Cultural Context', pages: 5, url: '#' }
        ],
        exercises: [
          {
            type: 'quiz',
            title: 'Swahili Vocabulary',
            questions: [
              {
                question: 'What does "Jambo" mean?',
                options: ['Goodbye', 'Hello', 'Thank you', 'Please'],
                correct: 1
              },
              {
                question: 'How do you say "Thank you" in Swahili?',
                options: ['Asante', 'Karibu', 'Tafadhali', 'Kwaheri'],
                correct: 0
              },
              {
                question: 'What is "Habari" used for?',
                options: ['Greeting', 'Farewell', 'Apology', 'Congratulations'],
                correct: 0
              }
            ]
          },
          {
            type: 'audio',
            title: 'Pronunciation Practice',
            description: 'Record yourself saying 5 basic Swahili phrases.',
            phrases: ['Jambo', 'Asante', 'Karibu', 'Tafadhali', 'Kwaheri']
          }
        ]
      }
    },
    {
      id: 5,
      title: 'African Art Appreciation',
      description: 'Explore traditional and modern African art forms and their cultural significance',
      reward: 80,
      difficulty: 'Medium',
      participants: 67,
      category: 'Arts',
      timeEstimate: '30 min',
      requirements: ['Creative mindset'],
      steps: ['Study art history', 'Analyze artworks', 'Create your own piece'],
      isCompleted: false,
      color: 'bg-pink-500',
      content: {
        videos: [
          { title: 'Traditional African Art', duration: '6:20', url: '#' },
          { title: 'Modern African Artists', duration: '5:45', url: '#' },
          { title: 'Art Techniques and Materials', duration: '4:30', url: '#' }
        ],
        readings: [
          { title: 'African Art History', pages: 10, url: '#' },
          { title: 'Contemporary African Art', pages: 8, url: '#' },
          { title: 'Art and Culture', pages: 6, url: '#' }
        ],
        exercises: [
          {
            type: 'quiz',
            title: 'African Art Knowledge',
            questions: [
              {
                question: 'Which art form is famous in West Africa?',
                options: ['Cave paintings', 'Wood carving', 'Digital art', 'Sculpture'],
                correct: 1
              },
              {
                question: 'What material is commonly used in traditional African masks?',
                options: ['Metal', 'Wood', 'Stone', 'Clay'],
                correct: 1
              },
              {
                question: 'Which country is known for its beadwork art?',
                options: ['Nigeria', 'Kenya', 'South Africa', 'Ghana'],
                correct: 2
              }
            ]
          },
          {
            type: 'creative',
            title: 'Art Creation',
            description: 'Create a piece of art inspired by African traditional patterns.',
            requirements: ['Use traditional patterns', 'Explain your inspiration', 'Share your artwork']
          }
        ]
      }
    },
    {
      id: 6,
      title: 'Entrepreneurship Fundamentals',
      description: 'Learn the basics of starting and running a business in Africa',
      reward: 90,
      difficulty: 'Hard',
      participants: 156,
      category: 'Business',
      timeEstimate: '40 min',
      requirements: ['Basic business interest'],
      steps: ['Study business models', 'Create business plan', 'Pitch your idea'],
      isCompleted: false,
      color: 'bg-indigo-500',
      content: {
        videos: [
          { title: 'Business Model Canvas', duration: '8:45', url: '#' },
          { title: 'Market Research Methods', duration: '6:20', url: '#' },
          { title: 'Pitching Your Idea', duration: '5:30', url: '#' }
        ],
        readings: [
          { title: 'Business Plan Writing', pages: 12, url: '#' },
          { title: 'African Market Analysis', pages: 10, url: '#' },
          { title: 'Funding Strategies', pages: 8, url: '#' }
        ],
        exercises: [
          {
            type: 'quiz',
            title: 'Business Fundamentals',
            questions: [
              {
                question: 'What is a business model canvas?',
                options: ['A painting', 'A strategic management tool', 'A financial statement', 'A marketing plan'],
                correct: 1
              },
              {
                question: 'Which is NOT a component of a business plan?',
                options: ['Executive Summary', 'Market Analysis', 'Personal Biography', 'Financial Projections'],
                correct: 2
              },
              {
                question: 'What is market research?',
                options: ['Selling products', 'Studying competitors', 'Analyzing customer needs', 'All of the above'],
                correct: 3
              }
            ]
          },
          {
            type: 'project',
            title: 'Business Plan Development',
            description: 'Create a basic business plan for a local business idea.',
            requirements: ['Executive summary', 'Market analysis', 'Financial projections', 'Implementation plan']
          }
        ]
      }
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

  // Load user progress on component mount
  useEffect(() => {
    const progress = ProgressManager.getAllProgress();
    setUserProgress(progress);
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

  const startMission = (mission: any) => {
    setSelectedMission(mission);
    setShowMissionModal(true);
    setStartTime(Date.now());
    setElapsedTime(0);
    setCurrentAnswers({});
    setEssayContent('');
    setCodeSubmission('');
    setShowResults(false);
    setMissionResults(null);
  };

  const handleAnswerChange = (questionId: string, answer: number) => {
    setCurrentAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleEssayChange = (content: string) => {
    setEssayContent(content);
  };

  const handleCodeChange = (code: string) => {
    setCodeSubmission(code);
  };

  const submitMission = async () => {
    if (!selectedMission) return;

    setIsSubmitting(true);
    try {
      const totalTime = Math.floor((Date.now() - startTime) / 1000 / 60); // minutes
      
      // Calculate quiz answers
      const quizAnswers: QuizAnswer[] = [];
      let totalScore = 0;
      let maxScore = 0;

      selectedMission.content.exercises.forEach((exercise: any, exerciseIndex: number) => {
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
      const points = PointsSystem.calculatePoints(finalScore, totalTime, selectedMission.difficulty);

      // Create submission
      const submission: MissionSubmission = {
        missionId: selectedMission.id,
        answers: quizAnswers,
        essayContent: essayContent,
        codeSubmission: codeSubmission,
        totalTime,
        score: finalScore
      };

      // Save progress
      const progress: MissionProgress = {
        missionId: selectedMission.id,
        isCompleted: true,
        currentStep: selectedMission.content.exercises.length,
        totalSteps: selectedMission.content.exercises.length,
        score: finalScore,
        maxScore,
        timeSpent: totalTime,
        startedAt: new Date(startTime).toISOString(),
        completedAt: new Date().toISOString(),
        answers: currentAnswers,
        certificates: []
      };

      ProgressManager.saveProgress(selectedMission.id, progress);
      setUserProgress(prev => ({ ...prev, [selectedMission.id]: progress }));

      // Issue certificate on EduChain
      const certificateService = CertificateService.getInstance();
      const certificateResult = await certificateService.issueCertificate(
        '0x1234...5678', // Mock wallet address
        selectedMission.title,
        finalScore,
        maxScore
      );

      // Update progress with certificate
      progress.certificates.push({
        id: certificateResult.tokenId,
        missionId: selectedMission.id,
        missionTitle: selectedMission.title,
        issuedAt: new Date().toISOString(),
        score: finalScore,
        maxScore,
        percentage: Math.round((finalScore / maxScore) * 100),
        txHash: certificateResult.txHash,
        nftTokenId: certificateResult.tokenId
      });

      ProgressManager.saveProgress(selectedMission.id, progress);

      // Set results
      setMissionResults({
        score: finalScore,
        maxScore,
        points,
        timeSpent: totalTime,
        certificate: progress.certificates[0],
        answers: quizAnswers
      });

      setShowResults(true);
    } catch (error) {
      console.error('Failed to submit mission:', error);
      alert('Failed to submit mission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMissionProgress = (missionId: number) => {
    return userProgress[missionId];
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mathematics': return <Calculator className="w-5 h-5" />;
      case 'History': return <Globe className="w-5 h-5" />;
      case 'Technology': return <Code className="w-5 h-5" />;
      case 'Language': return <BookOpen className="w-5 h-5" />;
      case 'Arts': return <Palette className="w-5 h-5" />;
      case 'Business': return <Building className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
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
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(mission.category)}
                        <span className="text-sm font-medium text-gray-500">{mission.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          mission.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                          mission.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {mission.difficulty}
                        </span>
                        {getMissionProgress(mission.id) && (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-green-600 font-medium">
                              {getMissionProgress(mission.id)?.score}/{getMissionProgress(mission.id)?.maxScore}
                            </span>
                          </div>
                        )}
                      </div>
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
                      onClick={() => startMission(mission)}
                      className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Start Mission
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Mission Modal */}
      {showMissionModal && selectedMission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{selectedMission.title}</h2>
                <button
                  onClick={() => setShowMissionModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <p className="text-gray-600 mt-2">{selectedMission.description}</p>
            </div>

            <div className="p-6">
              {/* Timer and Progress */}
              <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Timer className="w-5 h-5 text-orange-500" />
                    <span className="font-medium text-gray-900">Time: {formatTime(elapsedTime)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-500" />
                    <span className="font-medium text-gray-900">
                      Progress: {Object.keys(currentAnswers).length} / {selectedMission.content.exercises.reduce((acc: number, ex: any) => acc + (ex.questions?.length || 1), 0)} completed
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => ProgressManager.saveProgress(selectedMission.id, { currentAnswers, essayContent, codeSubmission })}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Progress
                </button>
              </div>

              {!showResults ? (
                <>
                  {/* Mission Content */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Videos */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Video className="w-5 h-5" />
                        Learning Videos
                      </h3>
                      <div className="space-y-3">
                        {selectedMission.content.videos.map((video: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium text-gray-900">{video.title}</div>
                              <div className="text-sm text-gray-500">{video.duration}</div>
                            </div>
                            <button className="text-orange-600 hover:text-orange-700">
                              <Play className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Readings */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Reading Materials
                      </h3>
                      <div className="space-y-3">
                        {selectedMission.content.readings.map((reading: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium text-gray-900">{reading.title}</div>
                              <div className="text-sm text-gray-500">{reading.pages} pages</div>
                            </div>
                            <button className="text-orange-600 hover:text-orange-700">
                              <ArrowRight className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Exercises */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercises & Assessments</h3>
                    <div className="space-y-4">
                      {selectedMission.content.exercises.map((exercise: any, exerciseIndex: number) => (
                        <div key={exerciseIndex} className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">{exercise.title}</h4>
                          <p className="text-gray-600 mb-3">{exercise.description}</p>
                          
                          {exercise.type === 'quiz' && exercise.questions && (
                            <div className="space-y-3">
                              {exercise.questions.map((q: any, qIndex: number) => {
                                const questionId = `${exerciseIndex}-${qIndex}`;
                                return (
                                  <div key={qIndex} className="bg-gray-50 p-3 rounded-lg">
                                    <div className="font-medium text-gray-900 mb-2">{q.question}</div>
                                    <div className="space-y-2">
                                      {q.options.map((option: string, oIndex: number) => (
                                        <label key={oIndex} className="flex items-center gap-2 cursor-pointer">
                                          <input 
                                            type="radio" 
                                            name={questionId}
                                            value={oIndex}
                                            checked={currentAnswers[questionId] === oIndex}
                                            onChange={() => handleAnswerChange(questionId, oIndex)}
                                            className="text-orange-500" 
                                          />
                                          <span className="text-sm text-gray-700">{option}</span>
                                        </label>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {exercise.type === 'coding' && (
                            <div>
                              <textarea
                                value={codeSubmission}
                                onChange={(e) => handleCodeChange(e.target.value)}
                                placeholder="Write your code here..."
                                className="w-full h-32 p-3 border border-gray-300 rounded-lg font-mono text-sm resize-none"
                              />
                              <div className="mt-2 text-sm text-gray-500">
                                Original code for reference:
                              </div>
                              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                                <pre>{exercise.code}</pre>
                              </div>
                            </div>
                          )}

                          {exercise.type === 'essay' && (
                            <div>
                              <textarea
                                value={essayContent}
                                onChange={(e) => handleEssayChange(e.target.value)}
                                placeholder="Write your essay here..."
                                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none"
                              />
                              <div className="mt-2 text-sm text-gray-500">
                                Requirements: {exercise.requirements?.join(', ')}
                              </div>
                            </div>
                          )}

                          {exercise.type === 'audio' && (
                            <div className="space-y-2">
                              {exercise.phrases.map((phrase: string, pIndex: number) => (
                                <div key={pIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                  <span className="font-medium">{phrase}</span>
                                  <button className="text-orange-600 hover:text-orange-700">
                                    <Play className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={submitMission}
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Submit Mission
                        </>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                /* Results Section */
                <div className="text-center">
                  <div className="mb-6">
                    <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Mission Completed!</h3>
                    <p className="text-gray-600">Congratulations on completing this mission!</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 mb-1">{missionResults.score}/{missionResults.maxScore}</div>
                      <div className="text-sm text-green-700">Final Score</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{missionResults.points}</div>
                      <div className="text-sm text-blue-700">Points Earned</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 mb-1">{missionResults.timeSpent}m</div>
                      <div className="text-sm text-purple-700">Time Spent</div>
                    </div>
                  </div>

                  {/* Certificate */}
                  <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-6 rounded-lg mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">🎓 Certificate Issued on EduChain</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-left">
                      <div>
                        <div className="text-sm text-gray-600">Token ID</div>
                        <div className="font-mono text-sm">{missionResults.certificate.nftTokenId}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Transaction Hash</div>
                        <div className="font-mono text-sm">{missionResults.certificate.txHash}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Percentage</div>
                        <div className="font-semibold">{missionResults.certificate.percentage}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Issued At</div>
                        <div className="font-semibold">{new Date(missionResults.certificate.issuedAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                        <Download className="w-4 h-4" />
                        Download Certificate
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        <Share2 className="w-4 h-4" />
                        Share Achievement
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowMissionModal(false)}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 