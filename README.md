# 🚀 AfriCred - Earn-to-Learn Platform

> **Where AI meets Education meets Blockchain**

## 🎯 Project Overview

AfriCred is an "Earn-to-Learn" platform built on EduChain, designed for African students and educators. The platform combines gamification, blockchain technology, and AI to create an educational ecosystem where students can earn rewards while learning.

**Note: This is a demo application showcasing the platform's capabilities. Supabase integration will be implemented in future versions for full backend functionality. Currently deployed on Vercel.**

## 🌍 Platform Features

### For Students:
- **Earn while you learn** - Complete missions and earn crypto rewards
- **Blockchain-verified certificates** - NFT-based educational credentials
- **Progress tracking** - Monitor learning achievements and statistics
- **Community engagement** - Connect with peers and educators

### For Educators:
- **Content creation** - Create educational missions and courses
- **Blockchain credentials** - Issue verifiable certificates to students
- **Monetization** - Earn rewards from student engagement
- **Profile management** - Manage educator verification and statistics

## 🏗️ Technical Architecture

### Frontend (Next.js)
- **Web interface** - Built with Next.js and TypeScript
- **Responsive design** - Works on desktop and mobile devices
- **Real-time updates** - Live progress tracking and notifications
- **Blockchain integration** - Direct interaction with EduChain contracts

### Backend & Database
- **Vercel deployment** - Current demo uses browser storage
- **Supabase integration** - Planned for future versions (database and authentication)
- **File management** - Storage for educational content
- **User management** - Profile and progress tracking
- **Mission system** - Educational content and progress management

### Blockchain (EduChain)
- **Smart contracts** - Automated certificate issuance and verification
- **NFT credentials** - Verifiable educational certificates
- **Token economics** - Reward distribution system
- **Decentralized storage** - Metadata and certificate storage

## 🎮 Core Features

### 1. Mission System
- **Educational missions** - Structured learning content
- **Progress tracking** - Real-time completion monitoring
- **Scoring system** - Performance-based evaluation
- **Achievement badges** - Recognition for completed tasks

### 2. Certificate Management
- **NFT certificates** - Blockchain-verified educational credentials
- **Metadata support** - Rich certificate information and images
- **Explorer integration** - View certificates on blockchain explorer
- **Download and sharing** - Export and share achievements

### 3. User Profiles
- **Comprehensive profiles** - Personal information and statistics
- **Progress visualization** - Learning journey and achievements
- **Role management** - Student and educator profiles
- **Settings customization** - Profile and preference management

### 4. Blockchain Integration
- **EduChain deployment** - Smart contracts on educational blockchain
- **Certificate minting** - Automated NFT creation for achievements
- **Metadata management** - IPFS and local storage integration
- **Explorer connectivity** - Direct links to blockchain transactions

## 🛠️ Tech Stack

### Frontend
- **Next.js** - React framework for web development
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Backend & Database
- **Vercel Deployment** - Browser-based data persistence (current demo)
- **Supabase** - Backend-as-a-Service platform (planned)
- **PostgreSQL** - Relational database (planned)
- **Real-time subscriptions** - Live data updates (planned)
- **Authentication** - User management and security (planned)

### Blockchain
- **EduChain** - Educational blockchain platform
- **Solidity** - Smart contract development
- **Hardhat** - Ethereum development environment
- **OpenZeppelin** - Secure smart contract libraries

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- EduChain testnet access
- Supabase account (for future backend integration)

### Security Setup
1. Copy `.env.example` to `.env.local`
2. Fill in your private keys and API credentials
3. Never commit `.env.local` to version control
4. Use strong, unique passwords for all accounts
5. Enable 2FA where possible

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

### Demo Certificate
- **Token ID**: 1
- **Contract Address**: 0x6F40A56250fbB57F5a17C815BE66A36804590669
- **Metadata**: Blockchain education certificate with custom image
- **Explorer Link**: Viewable on EduChain testnet explorer
- **Deployment**: Live on Vercel

## 🏆 Platform Capabilities

### Educational Features
- Mission creation and management
- Student progress tracking
- Achievement and reward systems
- Certificate issuance and verification

### Blockchain Features
- Smart contract deployment and interaction
- NFT certificate minting
- Metadata management and storage
- Explorer integration

### User Experience
- Web interface
- Progress updates
- Profile customization
- Role-based access control

## 🌟 Innovation Highlights

### 1. Blockchain Education
- **Verifiable credentials** - NFT-based certificates
- **Transparent achievements** - Public blockchain verification
- **Decentralized storage** - IPFS and local metadata management
- **Smart contract automation** - Automated certificate issuance

### 2. Web Architecture
- **Next.js framework** - Server-side rendering and optimization
- **TypeScript** - Type safety and developer experience
- **Responsive design** - Mobile-first approach
- **Real-time features** - Live updates and notifications

### 3. Infrastructure
- **Supabase backend** - Database and authentication
- **Modular design** - Easy to extend and maintain
- **Performance optimized** - Fast loading and smooth experience
- **Developer friendly** - Clear code structure and documentation

## 🔒 Security Features

### Implemented Security Measures
- **Security Headers** - XSS protection, content type validation, frame options
- **Content Security Policy** - Prevents code injection attacks
- **Input Validation** - Sanitizes user inputs and validates data formats
- **Rate Limiting** - Prevents abuse and DDoS attacks
- **Secure Storage** - Encrypted local storage for sensitive data
- **CORS Protection** - Cross-origin request validation
- **Environment Variables** - Secure configuration management

### Best Practices
- Private keys stored in environment variables
- Input sanitization for all user data
- HTTPS enforcement in production
- Regular security audits and updates
- Secure coding practices with ESLint rules

## 🤝 Development Team

- **Full-stack Development** - Next.js, TypeScript, and blockchain integration
- **Smart Contract Development** - Solidity, Hardhat, and EduChain deployment
- **UI/UX Design** - Interface design
- **Blockchain Integration** - Web3.js and contract interaction

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **EduChain** - Blockchain infrastructure and educational platform
- **Supabase** - Backend services and real-time features
- **OpenZeppelin** - Secure smart contract libraries
- **Next.js** - Modern React framework

---

**Built with ❤️ for Africa's educational future** 