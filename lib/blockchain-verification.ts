// Blockchain verification utilities and smart contract interactions
export interface BlockchainDocument {
  id: string
  name: string
  type: string
  size: number
  uploadDate: Date
  status: "uploading" | "processing" | "verified" | "failed"
  ipfsHash?: string
  blockchainTx?: string
  contractAddress?: string
  tokenId?: string
  verificationCode?: string
  metadata?: DocumentMetadata
}

export interface DocumentMetadata {
  title: string
  issuer: string
  recipient: string
  issueDate: string
  expiryDate?: string
  credentialType: string
  skills?: string[]
  grade?: string
  institution?: string
}

export interface VerificationResult {
  valid: boolean
  document?: DocumentMetadata
  blockchainTx?: string
  ipfsHash?: string
  verifiedDate: Date
  issuerVerified: boolean
  tamperProof: boolean
  error?: string
}

// Simulated blockchain operations (in production, these would interact with actual blockchain)
export class BlockchainVerificationService {
  private static instance: BlockchainVerificationService
  private documents: Map<string, BlockchainDocument> = new Map()

  static getInstance(): BlockchainVerificationService {
    if (!BlockchainVerificationService.instance) {
      BlockchainVerificationService.instance = new BlockchainVerificationService()
    }
    return BlockchainVerificationService.instance
  }

  async uploadToIPFS(file: File): Promise<string> {
    // Simulate IPFS upload
    return new Promise((resolve) => {
      setTimeout(() => {
        const hash = "Qm" + Math.random().toString(36).substr(2, 44)
        resolve(hash)
      }, 2000)
    })
  }

  async registerOnBlockchain(ipfsHash: string, metadata: DocumentMetadata): Promise<string> {
    // Simulate blockchain transaction
    return new Promise((resolve) => {
      setTimeout(() => {
        const txHash = "0x" + Math.random().toString(16).substr(2, 64)
        resolve(txHash)
      }, 3000)
    })
  }

  async mintNFT(ipfsHash: string, metadata: DocumentMetadata): Promise<{ contractAddress: string; tokenId: string }> {
    // Simulate NFT minting for document ownership
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          contractAddress: "0x" + Math.random().toString(16).substr(2, 40),
          tokenId: Math.floor(Math.random() * 10000).toString(),
        })
      }, 2500)
    })
  }

  generateVerificationCode(ipfsHash: string, blockchainTx: string): string {
    // Generate a unique verification code
    const combined = ipfsHash + blockchainTx
    return btoa(combined).substr(0, 12).toUpperCase()
  }

  async verifyDocument(verificationCode: string): Promise<VerificationResult> {
    // Simulate document verification
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock verification results
        const mockResults: VerificationResult[] = [
          {
            valid: true,
            document: {
              title: "Bachelor of Science in Computer Science",
              issuer: "Stanford University",
              recipient: "John Doe",
              issueDate: "May 2023",
              credentialType: "Degree",
              institution: "Stanford University",
              skills: ["Programming", "Data Structures", "Algorithms", "Software Engineering"],
              grade: "Magna Cum Laude",
            },
            blockchainTx: "0x742d35cc6e7c5c4b8b4c8b4c8b4c8b4c8b4c8b4c8b4c8b4c8b4c8b4c8b4c8b4c",
            ipfsHash: "QmX7r2btC4KjPAiZ59RLNp6HgHN4t89qc3mx8spjdGiQh7",
            verifiedDate: new Date(),
            issuerVerified: true,
            tamperProof: true,
          },
          {
            valid: true,
            document: {
              title: "AWS Certified Solutions Architect",
              issuer: "Amazon Web Services",
              recipient: "Jane Smith",
              issueDate: "March 2024",
              expiryDate: "March 2027",
              credentialType: "Certification",
              skills: ["Cloud Architecture", "AWS Services", "Security", "Scalability"],
            },
            blockchainTx: "0x8a3f45bc7e9d2c1a5b6e8f4d3c2a1b9e8f7d6c5a4b3e2d1c9f8e7d6c5b4a3e2",
            ipfsHash: "QmY8s3ctD5LkQBjZ60SMOq7IhHO5u90rd4ny9spkeHjRi8",
            verifiedDate: new Date(),
            issuerVerified: true,
            tamperProof: true,
          },
          {
            valid: true,
            document: {
              title: "Google Data Analytics Professional Certificate",
              issuer: "Google Career Certificates",
              recipient: "Alex Johnson",
              issueDate: "January 2024",
              credentialType: "Professional Certificate",
              skills: ["Data Analysis", "SQL", "Tableau", "R Programming", "Data Visualization"],
            },
            blockchainTx: "0x9b4g56cd8f0e3d2b6c7f5e4d3c2b1a0f9e8d7c6b5a4c3f2e1d0c9b8a7f6e5d4",
            ipfsHash: "QmZ9t4duE6MlRCkA71TNPr8JiIP6v01se5oz0tllfIkSj9",
            verifiedDate: new Date(),
            issuerVerified: true,
            tamperProof: true,
          },
        ]

        const result = mockResults[Math.floor(Math.random() * mockResults.length)]
        resolve(result)
      }, 1500)
    })
  }

  async getDocumentHistory(verificationCode: string): Promise<any[]> {
    // Simulate blockchain transaction history
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            timestamp: new Date(Date.now() - 86400000 * 30),
            action: "Document Uploaded",
            txHash: "0x123...",
            details: "Document uploaded to IPFS",
          },
          {
            timestamp: new Date(Date.now() - 86400000 * 29),
            action: "Blockchain Registration",
            txHash: "0x456...",
            details: "Document hash registered on Polygon",
          },
          {
            timestamp: new Date(Date.now() - 86400000 * 29),
            action: "NFT Minted",
            txHash: "0x789...",
            details: "Document ownership NFT created",
          },
          {
            timestamp: new Date(),
            action: "Verification Check",
            txHash: "0xabc...",
            details: "Document authenticity verified",
          },
        ])
      }, 1000)
    })
  }
}

// Utility functions
export function generateQRCode(verificationCode: string): string {
  return `https://verify.careerai.com/${verificationCode}`
}

export function validateDocumentType(file: File): boolean {
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"]
  return allowedTypes.includes(file.type)
}

export function extractDocumentMetadata(file: File): Partial<DocumentMetadata> {
  // In production, this would use OCR or PDF parsing
  const fileName = file.name.toLowerCase()

  if (fileName.includes("degree") || fileName.includes("diploma")) {
    return {
      credentialType: "Degree",
      title: "Academic Degree",
    }
  }

  if (fileName.includes("certificate") || fileName.includes("cert")) {
    return {
      credentialType: "Certificate",
      title: "Professional Certificate",
    }
  }

  if (fileName.includes("aws") || fileName.includes("azure") || fileName.includes("gcp")) {
    return {
      credentialType: "Cloud Certification",
      title: "Cloud Platform Certification",
    }
  }

  return {
    credentialType: "Document",
    title: "Professional Document",
  }
}

export function formatBlockchainAddress(address: string): string {
  if (address.length <= 10) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function getBlockchainExplorerUrl(txHash: string, network = "polygon"): string {
  const explorers = {
    polygon: "https://polygonscan.com/tx/",
    ethereum: "https://etherscan.io/tx/",
    bsc: "https://bscscan.com/tx/",
  }

  return explorers[network as keyof typeof explorers] + txHash
}
