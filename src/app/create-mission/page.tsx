'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus,
  BookOpen,
  Target,
  Clock,
  Award,
  Users,
  FileText,
  Video,
  Code,
  Play,
  Trophy,
  GraduationCap,
  Save,
  X,
  CheckCircle,
  AlertTriangle,
  Upload,
  Globe,
  Tag,
  Shield,
  Lock,
  Star,
  Zap
} from 'lucide-react';
import { getWalletState, checkEducatorStatus } from '@/lib/educhain';
import Link from 'next/link';

interface Step {
  id: number;
  title: string;
  description: string;
  type: 'lesson' | 'quiz' | 'practice' | 'essay' | 'coding' | 'project' | 'assessment' | 'audio';
  reward: number;
  timeEstimate: string;
  content?: any;
}

export default function CreateMissionPage() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [isEducator, setIsEducator] = useState(false);
  const [isVerifiedEducator, setIsVerifiedEducator] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  
  // Mission form state
  const [missionData, setMissionData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: 'Easy' as 'Easy' | 'Medium' | 'Hard',
    estimatedTime: '',
    maxReward: 0,
    totalSteps: 1,
    tags: [] as string[],
    requirements: [] as string[],
    steps: [] as Step[]
  });

  const [newTag, setNewTag] = useState('');
  const [newRequirement, setNewRequirement] = useState('');

  useEffect(() => {
    const checkAccess = async () => {
      console.log('=== CREATE MISSION ACCESS CHECK STARTED ===');
      setIsLoading(true);
      
      try {
        console.log('1. Checking if MetaMask is available...');
        if (typeof (window as any).ethereum === 'undefined') {
          console.log('❌ MetaMask not available');
          setWalletConnected(false);
          setIsVerifiedEducator(false);
          setIsEducator(false);
          setIsLoading(false);
          return;
        }
        
        console.log('2. MetaMask available, getting wallet state...');
        const walletState = await getWalletState();
        console.log('3. Wallet state received:', walletState);
        
        // Always set wallet connected state first
        setWalletConnected(walletState.isConnected);
        setWalletAddress(walletState.address);

        // If wallet is not connected, reset educator status immediately
        if (!walletState.isConnected || !walletState.address) {
          console.log('❌ Wallet not connected - resetting educator status');
          setIsVerifiedEducator(false);
          setIsEducator(false);
          setIsLoading(false);
          return;
        }

        // Only check educator status if wallet is connected
        console.log('✅ Wallet connected, checking educator status...');
        const educatorStatus = await checkEducatorStatus(walletState.address);
        console.log('4. Educator status received:', educatorStatus);
        setIsVerifiedEducator(educatorStatus.isVerified);
        setIsEducator(educatorStatus.isVerified);
        
        console.log('5. Final states set:', {
          walletConnected: walletState.isConnected,
          isVerifiedEducator: educatorStatus.isVerified,
          isEducator: educatorStatus.isVerified
        });
      } catch (error) {
        console.error('❌ Error checking access:', error);
        // Reset states on error
        setWalletConnected(false);
        setIsVerifiedEducator(false);
        setIsEducator(false);
      } finally {
        setIsLoading(false);
        console.log('=== CREATE MISSION ACCESS CHECK COMPLETED ===');
      }
    };
    
    // Initial check with a longer delay to ensure MetaMask is ready
    const timer = setTimeout(() => {
      checkAccess();
    }, 500);
    
    // Set up periodic checks to detect verification status changes
    const interval = setInterval(() => {
      if (walletConnected && walletAddress) {
        checkAccess();
      }
    }, 10000); // Check every 10 seconds
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [walletConnected, walletAddress]);

  const addStep = () => {
    const newStep: Step = {
      id: missionData.steps.length + 1,
      title: '',
      description: '',
      type: 'lesson',
      reward: 0,
      timeEstimate: ''
    };
    setMissionData(prev => ({
      ...prev,
      steps: [...prev.steps, newStep],
      totalSteps: prev.totalSteps + 1
    }));
  };

  const updateStep = (index: number, field: keyof Step, value: any) => {
    const updatedSteps = [...missionData.steps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setMissionData(prev => ({ ...prev, steps: updatedSteps }));
  };

  const removeStep = (index: number) => {
    const updatedSteps = missionData.steps.filter((_, i) => i !== index);
    setMissionData(prev => ({
      ...prev,
      steps: updatedSteps,
      totalSteps: updatedSteps.length
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !missionData.tags.includes(newTag.trim())) {
      setMissionData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setMissionData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const addRequirement = () => {
    if (newRequirement.trim() && !missionData.requirements.includes(newRequirement.trim())) {
      setMissionData(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const removeRequirement = (requirement: string) => {
    setMissionData(prev => ({
      ...prev,
      requirements: prev.requirements.filter(r => r !== requirement)
    }));
  };

  const handleSubmit = async () => {
    if (!walletConnected) {
      alert('Please connect your wallet to create a mission.');
      return;
    }

    if (!isVerifiedEducator) {
      alert('Only verified educators can create missions.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // TODO: Submit to EduChain smart contract
      console.log('Creating mission:', missionData);
      
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Mission created successfully! It will be reviewed and published soon.');
      // Reset form
      setMissionData({
        title: '',
        description: '',
        category: '',
        difficulty: 'Easy',
        estimatedTime: '',
        maxReward: 0,
        totalSteps: 1,
        tags: [],
        requirements: [],
        steps: []
      });
    } catch (error) {
      console.error('Failed to create mission:', error);
      alert('Failed to create mission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson': return <BookOpen className="w-4 h-4" />;
      case 'quiz': return <Target className="w-4 h-4" />;
      case 'practice': return <Play className="w-4 h-4" />;
      case 'essay': return <FileText className="w-4 h-4" />;
      case 'coding': return <Code className="w-4 h-4" />;
      case 'project': return <Trophy className="w-4 h-4" />;
      case 'assessment': return <GraduationCap className="w-4 h-4" />;
      case 'audio': return <Video className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
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

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Checking wallet connection...</p>
        </div>
      </div>
    );
  }

  // Wallet connection check
  if (!walletConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="card-modern p-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Wallet Required</h2>
            <p className="text-gray-600 mb-6">
              You need to connect your EduChain wallet to create educational missions.
            </p>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800">
                <strong>Status:</strong> Wallet not connected. Please connect your wallet first.
              </p>
              <p className="text-xs text-red-600 mt-2">
                Debug: walletConnected = {walletConnected.toString()}, address = {walletAddress || 'null'}
              </p>
            </div>

            <Link href="/" className="btn-primary">
              Connect Wallet
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Educator verification check
  if (!isVerifiedEducator) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          <div className="card-modern p-8">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Educator Verification Required</h2>
            <p className="text-gray-600 mb-6">
              Only verified educators can create missions on AfriCred. This ensures quality education for all students.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-6 text-left">
              <h3 className="font-semibold text-blue-900 mb-3">Why Educator Verification?</h3>
              <ul className="text-blue-800 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  Ensures quality educational content
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  Protects students from low-quality content
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  Builds trust in the AfriCred ecosystem
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  Enables earning from your educational content
                </li>
              </ul>
            </div>



            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/profile">
                <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Become Verified Educator
                </button>
              </Link>
              <Link href="/missions">
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Browse Missions
                </button>
              </Link>
            </div>
            
            {/* Debug Information */}
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <p className="text-xs text-gray-600">
                <strong>Debug Info:</strong><br/>
                Wallet Connected: {walletConnected.toString()}<br/>
                Address: {walletAddress || 'null'}<br/>
                Is Educator: {isEducator.toString()}<br/>
                Is Verified: {isVerifiedEducator.toString()}
              </p>
            </div>

            {/* Demo Button for Presentation */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-3">Demo Mode (For Presentation)</p>
              <button 
                onClick={(e) => {
                  e.preventDefault(); // Prevent any default behavior
                  e.stopPropagation(); // Stop event bubbling
                  
                  console.log('Demo button clicked - setting verified educator to true');
                  setIsVerifiedEducator(true);
                  
                  // Pre-fill demo data
                  const demoData = {
                    title: 'Introduction to Blockchain Technology',
                    description: 'Learn the fundamentals of blockchain technology and its applications in education.',
                    category: 'Technology',
                    difficulty: 'Medium' as const,
                    estimatedTime: '2-3 hours',
                    maxReward: 150,
                    totalSteps: 3,
                    tags: ['blockchain', 'technology', 'education'],
                    requirements: ['Basic computer knowledge', 'Interest in technology'],
                    steps: [
                      {
                        id: 1,
                        title: 'What is Blockchain?',
                        description: 'Understanding the basic concepts of blockchain technology',
                        type: 'lesson' as const,
                        reward: 50,
                        timeEstimate: '45 min'
                      },
                      {
                        id: 2,
                        title: 'Blockchain Quiz',
                        description: 'Test your knowledge with interactive questions',
                        type: 'quiz' as const,
                        reward: 50,
                        timeEstimate: '30 min'
                      },
                      {
                        id: 3,
                        title: 'Create Your First Smart Contract',
                        description: 'Hands-on practice with smart contract development',
                        type: 'coding' as const,
                        reward: 50,
                        timeEstimate: '60 min'
                      }
                    ]
                  };
                  
                  console.log('Setting demo data:', demoData);
                  setMissionData(demoData);
                  
                  // Show success message
                  alert('Demo mode activated! You can now create a mission.');
                }}
                type="button" // Explicitly set button type
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm flex items-center gap-2 mx-auto"
              >
                <Play className="w-3 h-3" />
                Create Demo Mission
              </button>
            </div>

            {walletAddress && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  Connected Wallet: <span className="font-mono text-xs">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="gradient-bg text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <Link href="/missions" className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors">
              <X className="w-5 h-5" />
              Back to Missions
            </Link>
            <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full">
              <CheckCircle className="w-4 h-4 text-green-300" />
              <span className="text-sm text-green-100">Verified Educator</span>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold mb-4">Create New Mission</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Share your expertise and create engaging learning experiences for students across Africa
            </p>
            
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2 text-blue-100">
                <Star className="w-4 h-4" />
                <span className="text-sm">Quality Content</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Zap className="w-4 h-4" />
                <span className="text-sm">Earn EDU Tokens</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Globe className="w-4 h-4" />
                <span className="text-sm">Global Reach</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card-modern p-8">
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            {/* Basic Information */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mission Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={missionData.title}
                    onChange={(e) => setMissionData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Introduction to Blockchain Technology"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={missionData.category}
                    onChange={(e) => setMissionData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    <option value="Technology">Technology</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="History">History</option>
                    <option value="Language">Language</option>
                    <option value="Science">Science</option>
                    <option value="Business">Business</option>
                    <option value="Arts">Arts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level *
                  </label>
                  <select
                    required
                    value={missionData.difficulty}
                    onChange={(e) => setMissionData(prev => ({ ...prev, difficulty: e.target.value as any }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Time *
                  </label>
                  <input
                    type="text"
                    required
                    value={missionData.estimatedTime}
                    onChange={(e) => setMissionData(prev => ({ ...prev, estimatedTime: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 2-3 hours"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Reward (EDU) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={missionData.maxReward}
                    onChange={(e) => setMissionData(prev => ({ ...prev, maxReward: parseInt(e.target.value) || 0 }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={missionData.description}
                  onChange={(e) => setMissionData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe what students will learn in this mission..."
                />
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <Tag className="w-3 h-3 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {missionData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add a tag..."
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Prerequisites</h3>
              </div>
              <div className="space-y-2 mb-4">
                {missionData.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="flex-1">{requirement}</span>
                    <button
                      type="button"
                      onClick={() => removeRequirement(requirement)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add a prerequisite..."
                />
                <button
                  type="button"
                  onClick={addRequirement}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <Target className="w-3 h-3 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Learning Steps</h3>
                </div>
                <button
                  type="button"
                  onClick={addStep}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <Plus className="w-4 h-4" />
                  Add Step
                </button>
              </div>

              <div className="space-y-6">
                {missionData.steps.map((step, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium text-gray-900">Step {step.id}</h4>
                      <button
                        type="button"
                        onClick={() => removeStep(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Step Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={step.title}
                          onChange={(e) => updateStep(index, 'title', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Introduction to Variables"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Step Type *
                        </label>
                        <select
                          required
                          value={step.type}
                          onChange={(e) => updateStep(index, 'type', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="lesson">Lesson</option>
                          <option value="quiz">Quiz</option>
                          <option value="practice">Practice</option>
                          <option value="essay">Essay</option>
                          <option value="coding">Coding</option>
                          <option value="project">Project</option>
                          <option value="assessment">Assessment</option>
                          <option value="audio">Audio</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Reward (EDU) *
                        </label>
                        <input
                          type="number"
                          required
                          min="0"
                          value={step.reward}
                          onChange={(e) => updateStep(index, 'reward', parseInt(e.target.value) || 0)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., 50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Time Estimate *
                        </label>
                        <input
                          type="text"
                          required
                          value={step.timeEstimate}
                          onChange={(e) => updateStep(index, 'timeEstimate', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., 30 min"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={step.description}
                        onChange={(e) => updateStep(index, 'description', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Describe what this step will teach..."
                      />
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getTypeColor(step.type)}`}>
                        {getTypeIcon(step.type)}
                        {step.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {missionData.steps.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No steps added yet. Click "Add Step" to start building your mission.</p>
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <Link href="/missions">
                <button
                  type="button"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                disabled={isSubmitting || missionData.steps.length === 0}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Create Mission
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 