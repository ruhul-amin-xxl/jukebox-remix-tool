import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { FileUpload } from "@/components/FileUpload";
import { ConversionOptions, ConversionSettings } from "@/components/ConversionOptions";
import { ConversionProgress } from "@/components/ConversionProgress";
import { InfoSections } from "@/components/InfoSections";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [conversionStatus, setConversionStatus] = useState("");
  const [isConversionComplete, setIsConversionComplete] = useState(false);
  const [convertedFileName, setConvertedFileName] = useState("");

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setIsConversionComplete(false);
    setConvertedFileName("");
    toast({
      title: "File Selected",
      description: `${file.name} is ready for conversion`,
    });
  };

  const handleConvert = async (options: ConversionSettings) => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a file to convert",
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);
    setIsConversionComplete(false);
    setConversionProgress(0);
    setConversionStatus("Initializing conversion...");

    // Simulate conversion process
    const steps = [
      "Analyzing project file...",
      "Extracting audio samples...",
      "Converting MIDI data...",
      "Processing effects and instruments...",
      "Generating output file...",
      "Finalizing conversion..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setConversionStatus(steps[i]);
      setConversionProgress(Math.round(((i + 1) / steps.length) * 100));
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setIsConverting(false);
    setIsConversionComplete(true);
    
    // Generate converted filename
    const originalName = selectedFile.name.split('.')[0];
    const extension = options.outputFormat === "FL Studio" ? ".flp" : ".als";
    setConvertedFileName(`${originalName}_converted${extension}`);
    
    toast({
      title: "Conversion Complete!",
      description: `Successfully converted ${selectedFile.name} to ${options.outputFormat}`,
    });
  };

  const handleDownload = () => {
    if (!selectedFile || !convertedFileName) return;

    // Create a mock converted file for download
    const convertedContent = `Converted ${selectedFile.name} to ${convertedFileName}`;
    const blob = new Blob([convertedContent], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = convertedFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Download Started",
      description: `Downloading ${convertedFileName}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Main Conversion Card */}
        <Card className="bg-gradient-card backdrop-blur-sm border-white/20 shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-foreground">
              Convert a project file (FL Studio/Ableton)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* File Upload */}
            <FileUpload 
              onFileSelect={handleFileSelect}
              className="min-h-[200px]"
            />

            {/* Progress Bars */}
            <div className="space-y-4">
              <ConversionProgress 
                progress={conversionProgress}
                status={conversionStatus}
                isVisible={isConverting}
              />
            </div>

            {/* Download Section - appears after conversion is complete */}
            {isConversionComplete && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center space-y-4">
                <div className="flex items-center justify-center space-x-2 text-green-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-semibold">Conversion Complete!</span>
                </div>
                <p className="text-sm text-green-600 mb-4">
                  Your file has been successfully converted: <strong>{convertedFileName}</strong>
                </p>
                <Button 
                  onClick={handleDownload}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-2"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Converted File
                </Button>
              </div>
            )}

            {/* Conversion Options */}
            <ConversionOptions 
              onConvert={handleConvert}
              disabled={!selectedFile || isConverting}
            />
          </CardContent>
        </Card>

        {/* Information Sections */}
        <Card className="bg-gradient-card backdrop-blur-sm border-white/20 shadow-xl">
          <CardContent className="pt-6">
            <InfoSections />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
