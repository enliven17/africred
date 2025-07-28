'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Save, 
  X, 
  Trophy, 
  Star, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Award, 
  Download, 
  Share2,
  CheckCircle,
  Clock,
  Users,
  Globe,
  GraduationCap,
  Upload
} from 'lucide-react';
import { ProgressManager, PointsSystem } from '@/lib/certificates';
import { MissionProgress, Certificate } from '@/types/missions';
import { getWalletState, verifyEducator } from '@/lib/educhain';
import { certificateService, CertificateData, EducatorCertificate } from '@/lib/educhain-certificates';
import Link from 'next/link';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [userProgress, setUserProgress] = useState<Record<string, MissionProgress>>({});
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [walletConnected, setWalletConnected] = useState(false);
  const [userRole, setUserRole] = useState<'student' | 'educator'>('student');
  const [isVerifiedEducator, setIsVerifiedEducator] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [certificateStatus, setCertificateStatus] = useState('');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'educator', label: 'Educator', icon: Award },
    { id: 'settings', label: 'Settings', icon: Edit },
  ];

  const user = {
    name: 'Atlas Doruk Aykar',
    email: 'atlas.aykar@africred.com',
    phone: '+234 123 456 7890',
    location: 'Lagos, Nigeria',
    joinDate: 'January 2024',
    level: 5,
    experience: 1250,
    totalMissions: 12,
    completedMissions: 8,
    totalScore: 850,
    totalPoints: 1200,
  };

  const achievements = [
    { id: 1, title: 'First Mission', description: 'Completed your first learning mission', icon: Trophy, unlocked: true },
    { id: 2, title: 'Quick Learner', description: 'Completed 5 missions in a week', icon: Star, unlocked: true },
    { id: 3, title: 'Perfect Score', description: 'Achieved 100% on a mission', icon: Target, unlocked: false },
    { id: 4, title: 'Community Helper', description: 'Helped 10 other learners', icon: Users, unlocked: false },
  ];

  useEffect(() => {
    const fetchCertificates = async () => {
      const walletState = await getWalletState();
      setWalletConnected(walletState.isConnected);
      
      // Demo sertifika ekle
      const certs: any[] = [
        {
          id: '1',
          tokenId: '1',
          missionId: 'demo-1',
          missionTitle: 'AfriCred Blockchain Education Certificate',
          issuedAt: new Date().toISOString(),
          percentage: 95,
          score: 95,
          maxScore: 100,
          metadata: {
            name: 'AfriCred Blockchain Education Certificate',
            description: 'Certificate of completion for Blockchain Fundamentals and Smart Contract Development course on AfriCred platform.',
            image: '/ctf.avif',
            attributes: [
              { trait_type: 'Course', value: 'Blockchain Fundamentals & Smart Contract Development' },
              { trait_type: 'Institution', value: 'AfriCred Education Platform' },
              { trait_type: 'Score', value: '95/100' },
              { trait_type: 'Completion Date', value: '2024-01-15' },
              { trait_type: 'Duration', value: '8 weeks' },
              { trait_type: 'Level', value: 'Intermediate' },
              { trait_type: 'Blockchain', value: 'Ethereum/EDUChain' },
              { trait_type: 'Skills', value: 'Solidity, Web3.js, Smart Contracts, DApp Development' }
            ],
            external_url: 'https://africred.xyz/certificate/blockchain-fundamentals',
          },
        }
      ];
      
      setCertificates(certs);
    };
    
    fetchCertificates();
    
    // Progress data'yı da yükle
    const progress = ProgressManager.getAllProgress();
    setUserProgress(progress);
  }, []);

  const getLevelProgress = () => {
    const { current, next, percentage } = PointsSystem.getLevelProgress(user.experience);
    return { current, next, percentage };
  };

  const levelProgress = getLevelProgress();

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
              My Profile
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Track your learning journey, achievements, and blockchain-verified certificates
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Profile Info */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                    <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium text-gray-900">{user.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-900">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium text-gray-900">{user.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium text-gray-900">{user.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Joined</p>
                        <p className="font-medium text-gray-900">{user.joinDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Trophy className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Level</p>
                        <p className="font-medium text-gray-900">{user.level}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900">{user.totalMissions}</div>
                    <div className="text-sm text-gray-600">Total Missions</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">{user.completedMissions}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">{user.totalScore}</div>
                    <div className="text-sm text-gray-600">Total Score</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600">{certificates.length}</div>
                    <div className="text-sm text-gray-600">Certificates</div>
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-xl border-2 ${
                          achievement.unlocked
                            ? 'border-green-200 bg-green-50'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            achievement.unlocked ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                          }`}>
                            <achievement.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{achievement.title}</div>
                            <div className="text-sm text-gray-600">{achievement.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Mission Progress</h3>
                <div className="space-y-4">
                  {Object.entries(userProgress).map(([missionId, progress]: [string, any]) => {
                    // Mission adlarını belirle
                    const getMissionName = (id: string) => {
                      switch (id) {
                        case '1': return 'Mathematics Fundamentals';
                        case '2': return 'Blockchain Basics';
                        case '3': return 'Smart Contract Development';
                        case '4': return 'Web3 Integration';
                        case '5': return 'DeFi Fundamentals';
                        default: return `Mission ${id}`;
                      }
                    };
                    
                    return (
                      <div key={missionId} className="p-4 border border-gray-200 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-medium text-gray-900">{getMissionName(progress.missionId)}</span>
                            {progress.missionTitle && progress.missionTitle !== getMissionName(progress.missionId) && (
                              <p className="text-sm text-gray-500 mt-1">{progress.missionTitle}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-gray-600">
                              {progress.score}/{progress.maxScore}
                            </span>
                            {progress.completed && (
                              <div className="flex items-center gap-1 mt-1">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                <span className="text-xs text-green-600">Completed</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(progress.score / progress.maxScore) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="text-2xl font-bold text-gray-900">{user.totalMissions}</div>
                      <div className="text-sm text-gray-600">Total Missions</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">{user.completedMissions}</div>
                      <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">{user.totalScore}</div>
                      <div className="text-sm text-gray-600">Total Score</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600">{certificates.length}</div>
                      <div className="text-sm text-gray-600">Certificates</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'certificates' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certificates.map((certificate, index) => {
                    const tokenId = (certificate as any).tokenId || certificate.nftTokenId;
                    const metadata = (certificate as any).metadata;
                    return (
                      <motion.div
                        key={certificate.id || tokenId || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow"
                      >
                        {/* NFT görseli */}
                        {metadata?.image && (
                          <img
                            src={metadata.image}
                            alt={metadata.name || 'Certificate NFT'}
                            className="w-full h-48 object-contain rounded-lg mb-4 bg-gray-50 border"
                          />
                        )}
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-semibold text-gray-900">{metadata?.name || certificate.missionTitle}</h4>
                            <p className="text-sm text-gray-600">
                              {metadata?.description || `Issued on ${certificate.issuedAt ? new Date(certificate.issuedAt).toLocaleDateString() : ''}`}
                            </p>
                          </div>
                          <div className="text-right">
                            {certificate.percentage && (
                              <div className="text-2xl font-bold text-blue-600">{certificate.percentage}%</div>
                            )}
                            {certificate.score && certificate.maxScore && (
                              <div className="text-sm text-gray-600">{certificate.score}/{certificate.maxScore}</div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-3">
                          <div className="text-sm text-gray-600">
                            Token ID: {tokenId}
                          </div>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                              <Share2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                window.open(`https://edu-chain-testnet.blockscout.com/address/0x6F40A56250fbB57F5a17C815BE66A36804590669`, '_blank');
                              }}
                              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                            >
                              🔍 View on Explorer
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'educator' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Educator Profile</h3>
                
                {/* Role Selection */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Your Role</h4>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setUserRole('student')}
                      className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                        userRole === 'student'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <GraduationCap className="w-8 h-8 mx-auto mb-2" />
                        <div className="font-medium">Student</div>
                        <div className="text-sm text-gray-600">Learn and earn rewards</div>
                      </div>
                    </button>
                    <button
                      onClick={() => setUserRole('educator')}
                      className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                        userRole === 'educator'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <Award className="w-8 h-8 mx-auto mb-2" />
                        <div className="font-medium">Educator</div>
                        <div className="text-sm text-gray-600">Create and teach</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Educator Verification */}
                {userRole === 'educator' && (
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">Educator Verification</h4>
                      {isVerifiedEducator && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          <CheckCircle className="w-4 h-4" />
                          Verified
                        </span>
                      )}
                    </div>
                    
                    {!isVerifiedEducator ? (
                      <div className="text-center py-8">
                        <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h5 className="text-lg font-medium text-gray-900 mb-2">Become a Verified Educator</h5>
                        <p className="text-gray-600 mb-6">
                          Get verified on EduChain to create missions and earn from your educational content.
                        </p>
                        <button
                          onClick={() => setShowVerificationModal(true)}
                          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          Start Verification
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                          <div>
                            <div className="font-medium text-green-900">Verified Educator</div>
                            <div className="text-sm text-green-700">You can create missions and earn rewards</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">5</div>
                            <div className="text-sm text-blue-700">Missions Created</div>
                          </div>
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">1,250</div>
                            <div className="text-sm text-green-700">EDU Earned</div>
                          </div>
                        </div>
                        <Link href="/create-mission">
                          <button className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                            Create New Mission
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue={user.phone}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      defaultValue={user.location}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 