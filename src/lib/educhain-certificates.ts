import Web3 from 'web3';
import { EDUCHAIN_TESTNET } from './educhain';

// EduChain Certificate NFT Smart Contract ABI
const CERTIFICATE_NFT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "uri",
        "type": "string"
      }
    ],
    "name": "mintCertificate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Certificate contract address on EduChain testnet
const CERTIFICATE_CONTRACT_ADDRESS = "0x1234567890123456789012345678901234567890"; // Replace with actual deployed contract

export interface CertificateData {
  studentAddress: string;
  missionTitle: string;
  missionId: string;
  score: number;
  maxScore: number;
  completionDate: number;
  educatorAddress: string;
  certificateHash: string;
  tokenId?: string;
  transactionHash?: string;
}

export interface EducatorCertificate {
  educatorAddress: string;
  background: string;
  experience: string;
  expertise: string[];
  bio: string;
  verificationDate: number;
  certificateHash: string;
  tokenId?: string;
  transactionHash?: string;
}

export class EduChainCertificateService {
  private web3: Web3;
  private contract: any;
  private privateKey?: string;

  constructor(privateKey?: string) {
    // Initialize Web3 with EduChain testnet
    this.web3 = new Web3(EDUCHAIN_TESTNET.rpcUrls[0]);
    this.privateKey = privateKey;
    
    // Initialize contract
    this.contract = new this.web3.eth.Contract(CERTIFICATE_NFT_ABI, CERTIFICATE_CONTRACT_ADDRESS);
  }

  // Set private key for transactions
  setPrivateKey(privateKey: string) {
    this.privateKey = privateKey;
  }

  // Get account from private key
  private getAccountFromPrivateKey(): string {
    if (!this.privateKey) {
      throw new Error('Private key not set');
    }
    return this.web3.eth.accounts.privateKeyToAccount(this.privateKey).address;
  }

  // Issue mission completion certificate
  async issueMissionCertificate(certificateData: CertificateData): Promise<{
    success: boolean;
    tokenId?: string;
    transactionHash?: string;
    error?: string;
  }> {
    try {
      if (!this.privateKey) {
        throw new Error('Private key required for issuing certificates');
      }

      const fromAddress = this.getAccountFromPrivateKey();
      
      // Create certificate metadata URI (in real implementation, this would be IPFS)
      const metadataUri = this.createCertificateMetadata(certificateData);
      
      // Estimate gas
      const gasEstimate = await this.contract.methods
        .mintCertificate(certificateData.studentAddress, metadataUri)
        .estimateGas({ from: fromAddress });

      // Sign and send transaction
      const transaction = this.contract.methods
        .mintCertificate(certificateData.studentAddress, metadataUri);

      const gasPrice = await this.web3.eth.getGasPrice();
      
      const txData = {
        from: fromAddress,
        gas: Math.floor(gasEstimate * 1.2), // Add 20% buffer
        gasPrice: gasPrice,
        data: transaction.encodeABI()
      };

      // Sign transaction
      const signedTx = await this.web3.eth.accounts.signTransaction(txData, this.privateKey);
      
      // Send transaction
      const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction!);

      // Get token ID from event (you might need to adjust based on your contract events)
      const tokenId = receipt.events?.Transfer?.returnValues?.tokenId || '0';

      return {
        success: true,
        tokenId,
        transactionHash: receipt.transactionHash
      };

    } catch (error) {
      console.error('Failed to issue mission certificate:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Issue educator verification certificate
  async issueEducatorCertificate(educatorData: EducatorCertificate): Promise<{
    success: boolean;
    tokenId?: string;
    transactionHash?: string;
    error?: string;
  }> {
    try {
      if (!this.privateKey) {
        throw new Error('Private key required for issuing certificates');
      }

      const fromAddress = this.getAccountFromPrivateKey();
      
      // Create educator certificate metadata
      const metadataUri = this.createEducatorMetadata(educatorData);
      
      // Estimate gas
      const gasEstimate = await this.contract.methods
        .mintCertificate(educatorData.educatorAddress, metadataUri)
        .estimateGas({ from: fromAddress });

      // Sign and send transaction
      const transaction = this.contract.methods
        .mintCertificate(educatorData.educatorAddress, metadataUri);

      const gasPrice = await this.web3.eth.getGasPrice();
      
      const txData = {
        from: fromAddress,
        gas: Math.floor(gasEstimate * 1.2),
        gasPrice: gasPrice,
        data: transaction.encodeABI()
      };

      // Sign transaction
      const signedTx = await this.web3.eth.accounts.signTransaction(txData, this.privateKey);
      
      // Send transaction
      const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction!);

      const tokenId = receipt.events?.Transfer?.returnValues?.tokenId || '0';

      return {
        success: true,
        tokenId,
        transactionHash: receipt.transactionHash
      };

    } catch (error) {
      console.error('Failed to issue educator certificate:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Get certificates for an address
  async getCertificates(address: string): Promise<{
    success: boolean;
    certificates?: any[];
    error?: string;
  }> {
    try {
      const balance = await this.contract.methods.balanceOf(address).call();
      const certificates = [];

      for (let i = 0; i < balance; i++) {
        const tokenId = await this.contract.methods.tokenOfOwnerByIndex(address, i).call();
        const tokenUri = await this.contract.methods.tokenURI(tokenId).call();
        
        // In real implementation, you would fetch metadata from IPFS
        const metadata = await this.fetchMetadata(tokenUri);
        
        certificates.push({
          tokenId,
          tokenUri,
          metadata
        });
      }

      return {
        success: true,
        certificates
      };

    } catch (error) {
      console.error('Failed to get certificates:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Verify certificate exists
  async verifyCertificate(tokenId: string): Promise<{
    success: boolean;
    exists?: boolean;
    metadata?: any;
    error?: string;
  }> {
    try {
      const tokenUri = await this.contract.methods.tokenURI(tokenId).call();
      const metadata = await this.fetchMetadata(tokenUri);

      return {
        success: true,
        exists: true,
        metadata
      };

    } catch (error) {
      console.error('Failed to verify certificate:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Create certificate metadata (mock implementation)
  private createCertificateMetadata(data: CertificateData): string {
    const metadata = {
      name: `AfriCred Certificate - ${data.missionTitle}`,
      description: `Certificate of completion for ${data.missionTitle}`,
      image: "https://ipfs.io/ipfs/QmYourImageHash", // Replace with actual IPFS hash
      attributes: [
        {
          trait_type: "Mission",
          value: data.missionTitle
        },
        {
          trait_type: "Score",
          value: `${data.score}/${data.maxScore}`
        },
        {
          trait_type: "Completion Date",
          value: new Date(data.completionDate).toISOString()
        },
        {
          trait_type: "Educator",
          value: data.educatorAddress
        }
      ],
      external_url: `https://africred.xyz/certificate/${data.certificateHash}`
    };

    // In real implementation, upload to IPFS and return hash
    return `ipfs://${Math.random().toString(16).substr(2, 32)}`;
  }

  // Create educator certificate metadata
  private createEducatorMetadata(data: EducatorCertificate): string {
    const metadata = {
      name: "AfriCred Educator Certificate",
      description: "Verified educator on AfriCred platform",
      image: "https://ipfs.io/ipfs/QmYourEducatorImageHash",
      attributes: [
        {
          trait_type: "Background",
          value: data.background
        },
        {
          trait_type: "Experience",
          value: data.experience
        },
        {
          trait_type: "Expertise",
          value: data.expertise.join(", ")
        },
        {
          trait_type: "Verification Date",
          value: new Date(data.verificationDate).toISOString()
        }
      ],
      external_url: `https://africred.xyz/educator/${data.educatorAddress}`
    };

    return `ipfs://${Math.random().toString(16).substr(2, 32)}`;
  }

  // Fetch metadata from URI (mock implementation)
  private async fetchMetadata(uri: string): Promise<any> {
    // In real implementation, fetch from IPFS
    return {
      name: "Sample Certificate",
      description: "This is a sample certificate metadata",
      image: "https://via.placeholder.com/400x300",
      attributes: []
    };
  }

  // Get EDU balance for an address
  async getBalance(address: string): Promise<string> {
    try {
      const balance = await this.web3.eth.getBalance(address);
      return this.web3.utils.fromWei(balance, 'ether');
    } catch (error) {
      console.error('Failed to get balance:', error);
      return '0';
    }
  }

  // Send EDU tokens
  async sendEDU(toAddress: string, amount: string): Promise<{
    success: boolean;
    transactionHash?: string;
    error?: string;
  }> {
    try {
      if (!this.privateKey) {
        throw new Error('Private key required for sending EDU');
      }

      const fromAddress = this.getAccountFromPrivateKey();
      const amountWei = this.web3.utils.toWei(amount, 'ether');
      
      const gasPrice = await this.web3.eth.getGasPrice();
      
      const txData = {
        from: fromAddress,
        to: toAddress,
        value: amountWei,
        gas: 21000,
        gasPrice: gasPrice
      };

      const signedTx = await this.web3.eth.accounts.signTransaction(txData, this.privateKey);
      const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction!);

      return {
        success: true,
        transactionHash: receipt.transactionHash
      };

    } catch (error) {
      console.error('Failed to send EDU:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// Export singleton instance
export const certificateService = new EduChainCertificateService(); 