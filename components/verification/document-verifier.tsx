"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  AlertCircle,
  QrCode,
  Search,
  Shield,
  ExternalLink,
  Clock,
  User,
  Building,
  Calendar,
  Award,
} from "lucide-react"
import {
  type VerificationResult,
  BlockchainVerificationService,
  getBlockchainExplorerUrl,
} from "@/lib/blockchain-verification"

export function DocumentVerifier() {
  const [verificationCode, setVerificationCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null)
  const [documentHistory, setDocumentHistory] = useState<any[]>([])

  const blockchainService = BlockchainVerificationService.getInstance()

  const handleVerification = async () => {
    if (!verificationCode.trim()) return

    setIsVerifying(true)
    setVerificationResult(null)
    setDocumentHistory([])

    try {
      const result = await blockchainService.verifyDocument(verificationCode)
      setVerificationResult(result)

      if (result.valid) {
        const history = await blockchainService.getDocumentHistory(verificationCode)
        setDocumentHistory(history)
      }
    } catch (error) {
      console.error("Verification failed:", error)
      setVerificationResult({
        valid: false,
        error: "Verification failed. Please check the code and try again.",
        verifiedDate: new Date(),
        issuerVerified: false,
        tamperProof: false,
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleQRScan = () => {
    // In production, this would open camera for QR scanning
    alert("QR Scanner would open here. For demo, please enter a verification code manually.")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Document Verification
          </CardTitle>
          <CardDescription>
            Verify the authenticity of blockchain-secured documents using verification codes or QR codes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="code" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="code">Verification Code</TabsTrigger>
              <TabsTrigger value="qr">QR Code Scanner</TabsTrigger>
            </TabsList>

            <TabsContent value="code" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="verification-code">Enter Verification Code</Label>
                <div className="flex gap-2">
                  <Input
                    id="verification-code"
                    placeholder="Enter 12-character verification code (e.g., ABC123DEF456)"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.toUpperCase())}
                    className="font-mono"
                    maxLength={12}
                  />
                  <Button onClick={handleVerification} disabled={!verificationCode.trim() || isVerifying}>
                    {isVerifying ? (
                      <>
                        <Shield className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Verify
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Verification codes are 12 characters long and case-insensitive</p>
              </div>
            </TabsContent>

            <TabsContent value="qr" className="space-y-4">
              <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">QR Code Scanner</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Scan a QR code from a verified document to instantly check its authenticity
                </p>
                <Button onClick={handleQRScan} className="bg-blue-600 hover:bg-blue-700">
                  <QrCode className="mr-2 h-4 w-4" />
                  Open Camera Scanner
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Verification Results */}
      {verificationResult && (
        <Card className={verificationResult.valid ? "border-green-200" : "border-red-200"}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {verificationResult.valid ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              Verification Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            {verificationResult.valid ? (
              <div className="space-y-6">
                <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    <div className="space-y-2">
                      <p className="font-semibold">✅ Document Verified Successfully</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          <span>Blockchain Secured: {verificationResult.tamperProof ? "Yes" : "No"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          <span>Issuer Verified: {verificationResult.issuerVerified ? "Yes" : "No"}</span>
                        </div>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>

                {/* Document Details */}
                {verificationResult.document && (
                  <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <CardHeader>
                      <CardTitle className="text-lg">Document Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Award className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div>
                              <Label className="font-medium">Document Title</Label>
                              <p className="text-sm">{verificationResult.document.title}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Building className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div>
                              <Label className="font-medium">Issuing Institution</Label>
                              <p className="text-sm">{verificationResult.document.issuer}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <User className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div>
                              <Label className="font-medium">Recipient</Label>
                              <p className="text-sm">{verificationResult.document.recipient}</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div>
                              <Label className="font-medium">Issue Date</Label>
                              <p className="text-sm">{verificationResult.document.issueDate}</p>
                            </div>
                          </div>
                          {verificationResult.document.expiryDate && (
                            <div className="flex items-start gap-3">
                              <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                              <div>
                                <Label className="font-medium">Expiry Date</Label>
                                <p className="text-sm">{verificationResult.document.expiryDate}</p>
                              </div>
                            </div>
                          )}
                          <div className="flex items-start gap-3">
                            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div>
                              <Label className="font-medium">Credential Type</Label>
                              <Badge variant="secondary">{verificationResult.document.credentialType}</Badge>
                            </div>
                          </div>
                          {verificationResult.document.grade && (
                            <div className="flex items-start gap-3">
                              <Award className="h-5 w-5 text-blue-600 mt-0.5" />
                              <div>
                                <Label className="font-medium">Grade/Honor</Label>
                                <p className="text-sm">{verificationResult.document.grade}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Skills/Competencies */}
                      {verificationResult.document.skills && verificationResult.document.skills.length > 0 && (
                        <div className="mt-6">
                          <Label className="font-medium mb-2 block">Skills & Competencies</Label>
                          <div className="flex flex-wrap gap-2">
                            {verificationResult.document.skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Blockchain Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Blockchain Verification Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <Label className="font-medium">Blockchain Transaction</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            {verificationResult.blockchainTx?.slice(0, 20)}...
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              window.open(getBlockchainExplorerUrl(verificationResult.blockchainTx!), "_blank")
                            }
                            className="h-6 w-6 p-0"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label className="font-medium">IPFS Hash</Label>
                        <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded block mt-1">
                          {verificationResult.ipfsHash?.slice(0, 20)}...
                        </code>
                      </div>
                      <div>
                        <Label className="font-medium">Verification Date</Label>
                        <p className="text-sm mt-1">{verificationResult.verifiedDate.toLocaleString()}</p>
                      </div>
                      <div>
                        <Label className="font-medium">Security Status</Label>
                        <div className="flex gap-2 mt-1">
                          <Badge
                            variant={verificationResult.tamperProof ? "default" : "destructive"}
                            className="text-xs"
                          >
                            {verificationResult.tamperProof ? "Tamper-Proof" : "Compromised"}
                          </Badge>
                          <Badge
                            variant={verificationResult.issuerVerified ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {verificationResult.issuerVerified ? "Issuer Verified" : "Issuer Unverified"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Document History */}
                {documentHistory.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Blockchain Transaction History</CardTitle>
                      <CardDescription>Complete audit trail of document lifecycle on blockchain</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {documentHistory.map((event, index) => (
                          <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-b-0">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                              <Clock className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{event.action}</h4>
                                <span className="text-xs text-gray-500">
                                  {event.timestamp.toLocaleDateString()} {event.timestamp.toLocaleTimeString()}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{event.details}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                  {event.txHash}
                                </code>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => window.open(getBlockchainExplorerUrl(event.txHash), "_blank")}
                                  className="h-6 w-6 p-0"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800 dark:text-red-200">
                  <div className="space-y-2">
                    <p className="font-semibold">❌ Document Verification Failed</p>
                    <p className="text-sm">
                      {verificationResult.error ||
                        "The verification code is invalid or the document could not be found on the blockchain."}
                    </p>
                    <p className="text-sm">
                      Please check the verification code and try again, or contact the document issuer for assistance.
                    </p>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
