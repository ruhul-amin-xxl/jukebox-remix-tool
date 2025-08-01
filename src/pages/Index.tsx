import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { FileUpload } from "@/components/FileUpload";
import { ConversionOptions, ConversionSettings } from "@/components/ConversionOptions";
import { ConversionProgress } from "@/components/ConversionProgress";
import { InfoSections } from "@/components/InfoSections";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [conversionStatus, setConversionStatus] = useState("");

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
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
    toast({
      title: "Conversion Complete!",
      description: `Successfully converted ${selectedFile.name} to ${options.outputFormat}`,
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
