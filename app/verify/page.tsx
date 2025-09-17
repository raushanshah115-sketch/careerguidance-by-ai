"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Brain,
  Upload,
  Shield,
  CheckCircle,
  AlertCircle,
  FileText,
  QrCode,
  ArrowLeft,
  Download,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

interface UploadedDocument {
  id: string
  name: string
  type: string
  size: number
  uploadDate: Date
  status: "uploading" | "processing" | "verified" | "failed"
  ipfsHash?: string
  blockchainTx?: string
  qrCode?: string
}

export default function VerifyPage() {
  const [documents, setDocuments] = useState<UploadedDocument[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return

    Array.from(files).forEach((file) => {
      const newDoc: UploadedDocument = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        uploadDate: new Date(),
        status: "uploading",
      }

      setDocuments((prev) => [...prev, newDoc])

      // Simulate upload and verification process
      setTimeout(() => {
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
      }, 1000)

      setTimeout(() => {
        setDocuments((prev) =>
          prev.map((doc) =>
            doc.id === newDoc.id
              ? {
                  ...doc,
                  status: "verified",
                  ipfsHash: "QmX" + Math.random().toString(36).substr(2, 44),
                  blockchainTx: "0x" + Math.random().toString(16).substr(2, 64),
                  qrCode: "https://verify.careerai.com/" + Math.random().toString(36).substr(2, 12),
                }
              : doc,
          ),
        )
      }, 4000)
    })
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getStatusIcon = (status: UploadedDocument["status"]) => {
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

  const getStatusText = (status: UploadedDocument["status"]) => {
    switch (status) {
      case "uploading":
        return "Uploading..."
      case "processing":
        return "Verifying on blockchain..."
      case "verified":
        return "Verified"
      case "failed":
        return "Verification failed"
    }
  }

  const mockVerificationResult = {
    valid: true,
    document: "Bachelor of Science in Computer Science",
    institution: "Stanford University",
    issueDate: "May 2023",
    verifiedDate: new Date(),
    blockchainTx: "0x742d35cc6e7c5c4b8b4c8b4c8b4c8b4c8b4c8b4c8b4c8b4c8b4c8b4c8b4c8b4c",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">CareerAI</span>
          </Link>
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            <Shield className="h-3 w-3 mr-1" />
            Blockchain Verified
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Document Verification</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Secure your credentials with blockchain-powered verification. Upload certificates and generate tamper-proof
            verification codes.
          </p>
        </div>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload & Verify
            </TabsTrigger>
            <TabsTrigger value="verify" className="flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              Verify Document
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Upload Area */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Documents</CardTitle>
                    <CardDescription>
                      Upload your certificates, diplomas, or other credentials for blockchain verification
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        dragActive
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Drop files here or click to upload
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Supports PDF, JPG, PNG files up to 10MB each
                      </p>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="hidden"
                        id="file-upload"
                      />
                      <Label htmlFor="file-upload">
                        <Button className="cursor-pointer">Choose Files</Button>
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                {/* Uploaded Documents */}
                {documents.length > 0 && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Uploaded Documents</CardTitle>
                      <CardDescription>Track the verification status of your documents</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {documents.map((doc) => (
                          <div key={doc.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-gray-500" />
                                <div>
                                  <p className="font-medium text-sm">{doc.name}</p>
                                  <p className="text-xs text-gray-500">
                                    {formatFileSize(doc.size)} • {doc.uploadDate.toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {getStatusIcon(doc.status)}
                                <span className="text-sm font-medium">{getStatusText(doc.status)}</span>
                              </div>
                            </div>

                            {doc.status === "processing" && (
                              <div className="mt-3">
                                <Progress value={65} className="h-2" />
                                <p className="text-xs text-gray-500 mt-1">
                                  Uploading to IPFS and registering on blockchain...
                                </p>
                              </div>
                            )}

                            {doc.status === "verified" && (
                              <div className="mt-3 space-y-2">
                                <Alert>
                                  <CheckCircle className="h-4 w-4" />
                                  <AlertDescription>
                                    Document successfully verified and registered on blockchain
                                  </AlertDescription>
                                </Alert>
                                <div className="grid grid-cols-2 gap-4 text-xs">
                                  <div>
                                    <Label className="text-xs font-medium">IPFS Hash</Label>
                                    <p className="font-mono text-xs text-gray-600 dark:text-gray-400 truncate">
                                      {doc.ipfsHash}
                                    </p>
                                  </div>
                                  <div>
                                    <Label className="text-xs font-medium">Blockchain TX</Label>
                                    <p className="font-mono text-xs text-gray-600 dark:text-gray-400 truncate">
                                      {doc.blockchainTx}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex gap-2 mt-3">
                                  <Button size="sm" variant="outline">
                                    <QrCode className="h-3 w-3 mr-1" />
                                    Generate QR
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Download className="h-3 w-3 mr-1" />
                                    Download Certificate
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    View on Blockchain
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Info Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How It Works</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-blue-600 dark:text-blue-400">1</span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">Upload Document</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Upload your certificate or credential
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-blue-600 dark:text-blue-400">2</span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">IPFS Storage</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Document is stored on decentralized IPFS
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-blue-600 dark:text-blue-400">3</span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">Blockchain Registry</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Hash registered on Polygon blockchain
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Verification Ready</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Generate QR codes for instant verification
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Security Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Tamper-proof blockchain storage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Decentralized IPFS hosting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Cryptographic hash verification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Instant verification via QR codes</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="verify" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Verify Document Authenticity</CardTitle>
                  <CardDescription>
                    Enter a verification code or scan a QR code to check document authenticity
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="verification-code">Verification Code</Label>
                    <div className="flex gap-2">
                      <Input
                        id="verification-code"
                        placeholder="Enter verification code or document hash"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                      />
                      <Button>Verify</Button>
                    </div>
                  </div>

                  {verificationCode && (
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="space-y-2">
                          <p className="font-medium">Document Verified Successfully</p>
                          <div className="text-sm space-y-1">
                            <p>
                              <strong>Document:</strong> {mockVerificationResult.document}
                            </p>
                            <p>
                              <strong>Institution:</strong> {mockVerificationResult.institution}
                            </p>
                            <p>
                              <strong>Issue Date:</strong> {mockVerificationResult.issueDate}
                            </p>
                            <p>
                              <strong>Verified:</strong> {mockVerificationResult.verifiedDate.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                    <QrCode className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-300">Or scan QR code with your camera</p>
                    <Button variant="outline" className="mt-4 bg-transparent">
                      Open Camera Scanner
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
