"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Upload,
  Shield,
  CheckCircle,
  AlertCircle,
  FileText,
  QrCode,
  Download,
  ExternalLink,
  Copy,
  Eye,
} from "lucide-react"
import {
  type BlockchainDocument,
  type DocumentMetadata,
  BlockchainVerificationService,
  validateDocumentType,
  extractDocumentMetadata,
  formatBlockchainAddress,
  getBlockchainExplorerUrl,
} from "@/lib/blockchain-verification"

interface BlockchainUploaderProps {
  onDocumentVerified?: (document: BlockchainDocument) => void
}

export function BlockchainUploader({ onDocumentVerified }: BlockchainUploaderProps) {
  const [documents, setDocuments] = useState<BlockchainDocument[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<BlockchainDocument | null>(null)
  const [showMetadataForm, setShowMetadataForm] = useState(false)
  const [metadata, setMetadata] = useState<Partial<DocumentMetadata>>({})

  const blockchainService = BlockchainVerificationService.getInstance()

  const handleFileUpload = useCallback(
    async (files: FileList | null) => {
      if (!files) return

      for (const file of Array.from(files)) {
        if (!validateDocumentType(file)) {
          alert(`File type ${file.type} is not supported. Please upload PDF, JPG, or PNG files.`)
          continue
        }

        if (file.size > 10 * 1024 * 1024) {
          alert(`File ${file.name} is too large. Maximum size is 10MB.`)
          continue
        }

        const newDoc: BlockchainDocument = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          type: file.type,
          size: file.size,
          uploadDate: new Date(),
          status: "uploading",
          metadata: extractDocumentMetadata(file),
        }

        setDocuments((prev) => [...prev, newDoc])

        try {
          // Step 1: Upload to IPFS
          setDocuments((prev) =>
            prev.map((doc) =>
              doc.id === newDoc.id
                ? {
                    ...doc,
                    status: "processing",
                  }
                : doc,
            ),
          )

          const ipfsHash = await blockchainService.uploadToIPFS(file)

          // Step 2: Register on blockchain
          const enhancedMetadata: DocumentMetadata = {
            title: newDoc.metadata?.title || file.name,
            issuer: "CareerAI Platform",
            recipient: "User", // In production, get from auth context
            issueDate: new Date().toISOString().split("T")[0],
            credentialType: newDoc.metadata?.credentialType || "Document",
            ...newDoc.metadata,
          }

          const blockchainTx = await blockchainService.registerOnBlockchain(ipfsHash, enhancedMetadata)

          // Step 3: Mint NFT (optional)
          const nftData = await blockchainService.mintNFT(ipfsHash, enhancedMetadata)

          // Step 4: Generate verification code
          const verificationCode = blockchainService.generateVerificationCode(ipfsHash, blockchainTx)

          const verifiedDoc: BlockchainDocument = {
            ...newDoc,
            status: "verified",
            ipfsHash,
            blockchainTx,
            contractAddress: nftData.contractAddress,
            tokenId: nftData.tokenId,
            verificationCode,
            metadata: enhancedMetadata,
          }

          setDocuments((prev) => prev.map((doc) => (doc.id === newDoc.id ? verifiedDoc : doc)))

          if (onDocumentVerified) {
            onDocumentVerified(verifiedDoc)
          }
        } catch (error) {
          console.error("Verification failed:", error)
          setDocuments((prev) =>
            prev.map((doc) =>
              doc.id === newDoc.id
                ? {
                    ...doc,
                    status: "failed",
                  }
                : doc,
            ),
          )
        }
      }
    },
    [blockchainService, onDocumentVerified],
  )

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      handleFileUpload(e.dataTransfer.files)
    },
    [handleFileUpload],
  )

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // In production, show a toast notification
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getStatusIcon = (status: BlockchainDocument["status"]) => {
    switch (status) {
      case "uploading":
        return <Upload className="h-4 w-4 text-blue-600 animate-pulse" />
      case "processing":
        return <Shield className="h-4 w-4 text-yellow-600 animate-spin" />
      case "verified":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />
    }
  }

  const getStatusText = (status: BlockchainDocument["status"]) => {
    switch (status) {
      case "uploading":
        return "Uploading to IPFS..."
      case "processing":
        return "Registering on blockchain..."
      case "verified":
        return "Blockchain Verified"
      case "failed":
        return "Verification Failed"
    }
  }

  const getProgressValue = (status: BlockchainDocument["status"]) => {
    switch (status) {
      case "uploading":
        return 25
      case "processing":
        return 75
      case "verified":
        return 100
      case "failed":
        return 0
    }
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Blockchain Document Upload
          </CardTitle>
          <CardDescription>
            Upload documents for tamper-proof blockchain verification with IPFS storage and NFT ownership
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              dragActive
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105"
                : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="relative">
              <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <Shield className="h-6 w-6 text-blue-600 absolute top-0 right-1/2 transform translate-x-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Secure Blockchain Upload</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Drop files here or click to upload • PDF, JPG, PNG up to 10MB
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <Badge variant="outline" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                IPFS Storage
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                Polygon Blockchain
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                NFT Ownership
              </Badge>
            </div>
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
              id="blockchain-file-upload"
            />
            <Label htmlFor="blockchain-file-upload">
              <Button className="cursor-pointer bg-blue-600 hover:bg-blue-700">
                <Upload className="mr-2 h-4 w-4" />
                Choose Files
              </Button>
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Document List */}
      {documents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Document Verification Status
            </CardTitle>
            <CardDescription>Track blockchain verification progress and manage your verified documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {documents.map((doc) => (
                <div key={doc.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <FileText className="h-8 w-8 text-gray-500 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg">{doc.metadata?.title || doc.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formatFileSize(doc.size)} • {doc.uploadDate.toLocaleDateString()} •{" "}
                          {doc.metadata?.credentialType}
                        </p>
                        {doc.metadata?.issuer && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">Issued by: {doc.metadata.issuer}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusIcon(doc.status)}
                      <div className="text-right">
                        <Badge
                          variant={
                            doc.status === "verified"
                              ? "default"
                              : doc.status === "failed"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {getStatusText(doc.status)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {(doc.status === "uploading" || doc.status === "processing") && (
                    <div className="mb-4">
                      <Progress value={getProgressValue(doc.status)} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>
                          {doc.status === "uploading" ? "Uploading to IPFS..." : "Registering on blockchain..."}
                        </span>
                        <span>{getProgressValue(doc.status)}%</span>
                      </div>
                    </div>
                  )}

                  {/* Verification Success */}
                  {doc.status === "verified" && (
                    <div className="space-y-4">
                      <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800 dark:text-green-200">
                          Document successfully verified and secured on blockchain with NFT ownership proof
                        </AlertDescription>
                      </Alert>

                      {/* Blockchain Details */}
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div>
                            <Label className="text-xs font-medium text-gray-500">IPFS Hash</Label>
                            <div className="flex items-center gap-2">
                              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                {formatBlockchainAddress(doc.ipfsHash!)}
                              </code>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(doc.ipfsHash!)}
                                className="h-6 w-6 p-0"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-500">Blockchain Transaction</Label>
                            <div className="flex items-center gap-2">
                              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                {formatBlockchainAddress(doc.blockchainTx!)}
                              </code>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(doc.blockchainTx!)}
                                className="h-6 w-6 p-0"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <Label className="text-xs font-medium text-gray-500">NFT Contract</Label>
                            <div className="flex items-center gap-2">
                              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                {formatBlockchainAddress(doc.contractAddress!)}
                              </code>
                              <Badge variant="outline" className="text-xs">
                                #{doc.tokenId}
                              </Badge>
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-500">Verification Code</Label>
                            <div className="flex items-center gap-2">
                              <code className="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded font-bold">
                                {doc.verificationCode}
                              </code>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(doc.verificationCode!)}
                                className="h-6 w-6 p-0"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" onClick={() => setSelectedDocument(doc)}>
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <QrCode className="h-3 w-3 mr-1" />
                          Generate QR Code
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Download Certificate
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(getBlockchainExplorerUrl(doc.blockchainTx!), "_blank")}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View on Explorer
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Verification Failed */}
                  {doc.status === "failed" && (
                    <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800 dark:text-red-200">
                        Document verification failed. Please try uploading again or contact support.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Document Details Modal (simplified for this example) */}
      {selectedDocument && (
        <Card className="border-2 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Document Details</span>
              <Button variant="ghost" size="sm" onClick={() => setSelectedDocument(null)}>
                ×
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium">Document Title</Label>
                  <p className="text-sm">{selectedDocument.metadata?.title}</p>
                </div>
                <div>
                  <Label className="font-medium">Credential Type</Label>
                  <p className="text-sm">{selectedDocument.metadata?.credentialType}</p>
                </div>
                <div>
                  <Label className="font-medium">Issuer</Label>
                  <p className="text-sm">{selectedDocument.metadata?.issuer}</p>
                </div>
                <div>
                  <Label className="font-medium">Issue Date</Label>
                  <p className="text-sm">{selectedDocument.metadata?.issueDate}</p>
                </div>
              </div>
              {selectedDocument.metadata?.skills && (
                <div>
                  <Label className="font-medium">Skills/Competencies</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedDocument.metadata.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
