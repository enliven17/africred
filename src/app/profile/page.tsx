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
  Globe
} from 'lucide-react';
import { ProgressManager, PointsSystem } from '@/lib/certificates';
import { MissionProgress, Certificate } from '@/types/missions';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [userProgress, setUserProgress] = useState<Record<string, MissionProgress>>({});
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'settings', label: 'Settings', icon: Edit },
  ];

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
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
    const progress = ProgressManager.getAllProgress();
    setUserProgress(progress);
    
    // Extract all certificates from progress
    const allCertificates: Certificate[] = [];
    Object.values(progress).forEach((missionProgress: any) => {
      if (missionProgress.certificates) {
        allCertificates.push(...missionProgress.certificates);
      }
    });
    setCertificates(allCertificates);
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
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              My Profile
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Track your learning journey, achievements, and blockchain-verified certificates
            </p>
          </motion.div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-blue-600">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h2>
                <p className="text-gray-600 mb-4">Level {user.level} Learner</p>
                
                {/* Level Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Level {levelProgress.current}</span>
                    <span>Level {levelProgress.next}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${levelProgress.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {user.experience} XP / {levelProgress.next * 200} XP
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 mx-auto px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {/* Profile Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{user.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{user.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">Joined {user.joinDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg mb-8">
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
                      {Object.entries(userProgress).map(([missionId, progress]: [string, any]) => (
                        <div key={missionId} className="p-4 border border-gray-200 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">Mission {progress.missionId}</span>
                            <span className="text-sm text-gray-600">
                              {progress.score}/{progress.maxScore}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${(progress.score / progress.maxScore) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
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
                    {certificates.length === 0 ? (
                      <div className="text-center py-12">
                        <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Certificates Yet</h3>
                        <p className="text-gray-600 mb-4">Complete your first learning mission to earn a blockchain-verified certificate!</p>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          Start Learning
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {certificates.map((certificate, index) => (
                          <motion.div
                            key={certificate.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h4 className="font-semibold text-gray-900">{certificate.missionTitle}</h4>
                                <p className="text-sm text-gray-600">Issued on {new Date(certificate.issuedAt).toLocaleDateString()}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-blue-600">{certificate.percentage}%</div>
                                <div className="text-sm text-gray-600">{certificate.score}/{certificate.maxScore}</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-600">
                                Token ID: {certificate.nftTokenId}
                              </div>
                              <div className="flex gap-2">
                                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                                  <Download className="w-4 h-4" />
                                </button>
                                <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                                  <Share2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
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
      </div>
    </div>
  );
} 