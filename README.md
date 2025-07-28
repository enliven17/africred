# 🚀 AfriCred - Earn-to-Learn Platform

> **Where AI meets Education meets Blockchain**

## 🎯 Project Overview

AfriCred is an "Earn-to-Learn" platform built on EduChain, designed for African students and educators. The platform combines gamification, blockchain technology, and AI to create an educational ecosystem where students can earn rewards while learning.

**Note: This is a demo application showcasing the platform's capabilities. Supabase integration will be implemented in future versions for full backend functionality. Currently deployed on Vercel.**

## 💰 EDU Token & Reward System

### 🎯 **EDU Token Overview**
- **Token Name**: EDU Token
- **Network**: EduChain Testnet (Chain ID: 656476)
- **Purpose**: Educational rewards and platform governance
- **Current Status**: Demo/Testnet tokens (no real monetary value)

### 🏆 **Reward System Design**
The platform implements a comprehensive reward system where students earn EDU tokens through various educational activities:

#### **Lesson Completion Rewards**
- **Easy Lessons**: 25-50 EDU tokens
- **Medium Lessons**: 50-100 EDU tokens  
- **Hard Lessons**: 100-200 EDU tokens
- **Bonus Rewards**: Additional tokens for perfect scores and fast completion

#### **Achievement System**
- **First Lesson**: 25 EDU bonus
- **Streak Bonuses**: 10-50 EDU for consecutive completions
- **Special Achievements**: 100-500 EDU for milestone accomplishments
- **Community Contributions**: 25-100 EDU for helping other students

#### **Educator Rewards**
- **Content Creation**: 100-500 EDU per approved lesson
- **Student Engagement**: 10-25 EDU per student completion
- **Quality Bonuses**: 200-1000 EDU for highly-rated content

### ⚠️ **Important Notice: Demo Values**
**All EDU token amounts shown in this demo are representative and have no real monetary value. These are demonstration values to showcase the platform's reward mechanics and user experience.**

### 🔄 **Points-to-EDU Conversion System**
The platform features a dual-token system for enhanced user experience:

#### **Learning Points (LP)**
- **Earned through**: Mission completion, quizzes, assignments
- **Conversion Rate**: 100 LP = 1 EDU token
- **Purpose**: Immediate feedback and progress tracking
- **Features**: 
  - Instant earning and display
  - No blockchain transaction fees
  - Real-time updates

#### **EDU Token Distribution**
- **Conversion Process**: LP automatically convert to EDU tokens
- **Batch Processing**: Daily/weekly conversion to minimize gas fees
- **Smart Contract Integration**: Automated token distribution
- **Transparency**: All conversions visible on blockchain explorer

### 🎮 **Gamification Elements**
- **Level System**: Higher levels unlock more rewarding lessons
- **Leaderboards**: Competitive rankings with EDU rewards
- **Daily Challenges**: Bonus tokens for consistent participation
- **Seasonal Events**: Special lessons with increased rewards

## 🌍 Platform Features

### For Students:
- **Earn while you learn** - Complete lessons and earn crypto rewards
- **Blockchain-verified certificates** - NFT-based educational credentials
- **Progress tracking** - Monitor learning achievements and statistics
- **Community engagement** - Connect with peers and educators
- **Points accumulation** - Build learning points that convert to EDU tokens

### For Educators:
- **Content creation** - Create educational lessons and courses
- **Blockchain credentials** - Issue verifiable certificates to students
- **Monetization** - Earn rewards from student engagement
- **Profile management** - Manage educator verification and statistics
- **Reward distribution** - Automated EDU token distribution system

## 🏗️ Technical Architecture

### Frontend (Next.js)
- **Web interface** - Built with Next.js and TypeScript
- **Responsive design** - Works on desktop and mobile devices
- **Real-time updates** - Live progress tracking and notifications
- **Blockchain integration** - Direct interaction with EduChain contracts
- **Points system** - Real-time learning points calculation and display

### Backend & Database
- **Vercel deployment** - Current demo uses browser storage
- **Supabase integration** - Planned for future versions (database and authentication)
- **File management** - Storage for educational content
- **User management** - Profile and progress tracking
- **Lesson system** - Educational content and progress management
- **Points tracking** - Learning points accumulation and conversion logic

### Blockchain (EduChain)
- **Smart contracts** - Automated certificate issuance and verification
- **NFT credentials** - Verifiable educational certificates
- **Token economics** - Reward distribution system with points-to-EDU conversion
- **Decentralized storage** - Metadata and certificate storage
- **Automated rewards** - Smart contract-based EDU token distribution

## 🎮 Core Features

### 1. Lesson System
- **Educational lessons** - Structured learning content
- **Progress tracking** - Real-time completion monitoring
- **Scoring system** - Performance-based evaluation with points
- **Achievement badges** - Recognition for completed tasks
- **Reward calculation** - Dynamic EDU token rewards based on performance

### 2. Points & Reward System
- **Learning Points (LP)** - Immediate reward feedback system
- **Conversion mechanism** - Automated LP to EDU token conversion
- **Reward tiers** - Different reward levels based on lesson difficulty
- **Bonus systems** - Streak bonuses, perfect scores, and special achievements
- **Real-time updates** - Instant points display and conversion tracking

### 3. Certificate Management
- **NFT certificates** - Blockchain-verified educational credentials
- **Metadata support** - Rich certificate information and images
- **Explorer integration** - View certificates on blockchain explorer
- **Download and sharing** - Export and share achievements
- **Reward integration** - Certificates include EDU token reward information

### 4. User Profiles
- **Comprehensive profiles** - Personal information and statistics
- **Progress visualization** - Learning journey and achievements
- **Role management** - Student and educator profiles
- **Settings customization** - Profile and preference management
- **Reward history** - Complete EDU token earning and spending history

### 5. Blockchain Integration
- **EduChain deployment** - Smart contracts on educational blockchain
- **Certificate minting** - Automated NFT creation for achievements
- **Metadata management** - IPFS and local storage integration
- **Explorer connectivity** - Direct links to blockchain transactions
- **Token distribution** - Automated EDU token rewards and conversion

## 🛠️ Tech Stack

### Frontend
- **Next.js** - React framework for web development
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Web3.js** - Blockchain interaction and token management

### Backend & Database
- **Vercel Deployment** - Browser-based data persistence (current demo)
- **Supabase** - Backend-as-a-Service platform (planned)
- **PostgreSQL** - Relational database (planned)
- **Real-time subscriptions** - Live data updates (planned)
- **Authentication** - User management and security (planned)
- **Points system** - Learning points calculation and conversion (planned)

### Blockchain
- **EduChain** - Educational blockchain platform
- **Solidity** - Smart contract development
- **Hardhat** - Ethereum development environment
- **OpenZeppelin** - Secure smart contract libraries
- **Token contracts** - EDU token distribution and conversion smart contracts

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- EduChain testnet access
- Supabase account (for future backend integration)
- MetaMask wallet for EDU token interactions

### Security Setup
1. Copy `.env.example` to `.env.local`
2. Fill in your private keys and API credentials
3. Never commit `.env.local` to version control
4. Use strong, unique passwords for all accounts
5. Enable 2FA where possible
6. Secure your MetaMask wallet for EDU token transactions

### Installation
```bash
# Clone the repository
git clone https://github.com/your-team/africred.git
cd africred

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start the development server
npm run dev
```

### Smart Contract Deployment
```bash
# Compile contracts
npx hardhat compile

# Deploy to EduChain testnet
npx hardhat run scripts/deploy.js --network edu-chain-testnet

# Deploy EDU token contract
npx hardhat run scripts/deploy-edu-token.js --network edu-chain-testnet

# Mint demo certificate
npx hardhat run scripts/mint-demo-certificate.js --network edu-chain-testnet
```

## 📱 Current Implementation

### Available Features
- **Smart Contracts** - AfriCredCertificates contract on EduChain testnet
- **Web Interface** - Next.js application with profile management
- **Certificate System** - NFT-based educational certificates with metadata
- **User Profiles** - User management and progress tracking (browser storage)
- **Blockchain Integration** - Direct interaction with EduChain contracts
- **Educational Content** - Mathematics, History, Web Development, and Blockchain courses
- **Points System** - Learning points calculation and display (demo)
- **Reward Mechanics** - EDU token reward structure and distribution logic

### Demo Certificate
- **Token ID**: 1
- **Contract Address**: 0x6F40A56250fbB57F5a17C815BE66A36804590669
- **Metadata**: Blockchain education certificate with custom image
- **Explorer Link**: Viewable on EduChain testnet explorer
- **Deployment**: Live on Vercel
- **Reward Integration**: Demo EDU token rewards for certificate completion

## 🏆 Platform Capabilities

### Educational Features
- Lesson creation and management
- Student progress tracking
- Achievement and reward systems
- Certificate issuance and verification
- Points-based learning progression
- Automated reward distribution

### Blockchain Features
- Smart contract deployment and interaction
- NFT certificate minting
- Metadata management and storage
- Explorer integration
- EDU token distribution and conversion
- Automated reward processing

### User Experience
- Web interface
- Progress updates
- Profile customization
- Role-based access control
- Real-time points tracking
- Reward history and statistics

## 🌟 Innovation Highlights

### 1. Dual-Token Reward System
- **Learning Points (LP)** - Immediate feedback and engagement
- **EDU Tokens** - Blockchain-verified rewards and governance
- **Conversion mechanism** - Seamless LP to EDU token conversion
- **Gamification** - Enhanced user engagement through points system

### 2. Blockchain Education
- **Verifiable credentials** - NFT-based certificates
- **Transparent achievements** - Public blockchain verification
- **Decentralized storage** - IPFS and local metadata management
- **Smart contract automation** - Automated certificate issuance and rewards

### 3. Web Architecture
- **Next.js framework** - Server-side rendering and optimization
- **TypeScript** - Type safety and developer experience
- **Responsive design** - Mobile-first approach
- **Real-time features** - Live updates and notifications
- **Points integration** - Real-time learning points calculation

### 4. Infrastructure
- **Supabase backend** - Database and authentication
- **Modular design** - Easy to extend and maintain
- **Performance optimized** - Fast loading and smooth experience
- **Developer friendly** - Clear code structure and documentation
- **Token economics** - Scalable reward distribution system

## 🔒 Security Features

### Implemented Security Measures
- **Security Headers** - XSS protection, content type validation, frame options
- **Content Security Policy** - Prevents code injection attacks
- **Input Validation** - Sanitizes user inputs and validates data formats
- **Rate Limiting** - Prevents abuse and DDoS attacks
- **Secure Storage** - Encrypted local storage for sensitive data
- **CORS Protection** - Cross-origin request validation
- **Environment Variables** - Secure configuration management
- **Wallet Security** - MetaMask integration with proper error handling

### Best Practices
- Private keys stored in environment variables
- Input sanitization for all user data
- HTTPS enforcement in production
- Regular security audits and updates
- Secure coding practices with ESLint rules
- Token distribution security and validation

## 🤝 Development Team

- **Full-stack Development** - Next.js, TypeScript, and blockchain integration
- **Smart Contract Development** - Solidity, Hardhat, and EduChain deployment
- **UI/UX Design** - Interface design
- **Blockchain Integration** - Web3.js and contract interaction
- **Token Economics** - EDU token distribution and points system design

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **EduChain** - Blockchain infrastructure and educational platform
- **Supabase** - Backend services and real-time features
- **OpenZeppelin** - Secure smart contract libraries
- **Next.js** - Modern React framework
- **MetaMask** - Wallet integration and user experience

---

**Built with ❤️ for Africa's educational future**

### 💡 **Future Roadmap**
- **Real EDU token implementation** - Production token with actual value
- **Advanced gamification** - More complex reward mechanics and challenges
- **Community governance** - EDU token holders participate in platform decisions
- **Cross-chain integration** - Support for multiple blockchain networks
- **AI-powered learning** - Personalized content and adaptive difficulty 