import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface ConversionOptionsProps {
  onConvert: (options: ConversionSettings) => void;
  disabled?: boolean;
}

export interface ConversionSettings {
  outputFormat: string;
  downgradeSerum: boolean;
  audioUnitToVst2: boolean;
  relativePath: boolean;
  addMidiPitcher: boolean;
  keepSameVersion: boolean;
  keepOriginalTempo: boolean;
  preservePluginAutomation: boolean;
  exportAsTemplate: boolean;
  includeSamplePack: boolean;
  normalizeAudioLevels: boolean;
  exportMidiOnly: boolean;
  compressOutput: boolean;
  backupOriginal: boolean;
}

export const ConversionOptions = ({ onConvert, disabled }: ConversionOptionsProps) => {
  const [outputFormat, setOutputFormat] = useState("FL Studio");
  const [downgradeSerum, setDowngradeSerum] = useState(false);
  const [audioUnitToVst2, setAudioUnitToVst2] = useState(false);
  const [relativePath, setRelativePath] = useState(false);
  const [addMidiPitcher, setAddMidiPitcher] = useState(false);
  const [keepSameVersion, setKeepSameVersion] = useState(false);
  const [keepOriginalTempo, setKeepOriginalTempo] = useState(true);
  const [preservePluginAutomation, setPreservePluginAutomation] = useState(true);
  const [exportAsTemplate, setExportAsTemplate] = useState(false);
  const [includeSamplePack, setIncludeSamplePack] = useState(false);
  const [normalizeAudioLevels, setNormalizeAudioLevels] = useState(false);
  const [exportMidiOnly, setExportMidiOnly] = useState(false);
  const [compressOutput, setCompressOutput] = useState(true);
  const [backupOriginal, setBackupOriginal] = useState(true);

  const handleConvert = () => {
    onConvert({
      outputFormat,
      downgradeSerum,
      audioUnitToVst2,
      relativePath,
      addMidiPitcher,
      keepSameVersion,
      keepOriginalTempo,
      preservePluginAutomation,
      exportAsTemplate,
      includeSamplePack,
      normalizeAudioLevels,
      exportMidiOnly,
      compressOutput,
      backupOriginal,
    });
  };

  return (
    <div className="space-y-6">
      {/* Output Format Selection */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <Select value={outputFormat} onValueChange={setOutputFormat}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="FL Studio">FL Studio</SelectItem>
            <SelectItem value="Ableton (10.1)">Ableton (10.1)</SelectItem>
            <SelectItem value="Ableton (9.7*)">Ableton (9.7*)</SelectItem>
          </SelectContent>
        </Select>
        
        <Button 
          onClick={handleConvert}
          disabled={disabled}
          className="bg-gray-800 hover:bg-gray-700 text-white px-8"
        >
          Convert Project File
        </Button>
      </div>

      {/* Conversion Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Primary Options */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="keep-version"
            checked={keepSameVersion}
            onCheckedChange={(checked) => setKeepSameVersion(checked as boolean)}
          />
          <Label htmlFor="keep-version" className="text-sm font-medium">
            Keep Same Version
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="relative-path"
            checked={relativePath}
            onCheckedChange={(checked) => setRelativePath(checked as boolean)}
          />
          <Label htmlFor="relative-path" className="text-sm">
            Relative Path
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="midi-pitcher"
            checked={addMidiPitcher}
            onCheckedChange={(checked) => setAddMidiPitcher(checked as boolean)}
          />
          <Label htmlFor="midi-pitcher" className="text-sm">
            Add MIDI Pitcher
          </Label>
        </div>

        {/* Plugin & Audio Options */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="downgrade-serum"
            checked={downgradeSerum}
            onCheckedChange={(checked) => setDowngradeSerum(checked as boolean)}
          />
          <Label htmlFor="downgrade-serum" className="text-sm">
            Downgrade Serum
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="audio-unit"
            checked={audioUnitToVst2}
            onCheckedChange={(checked) => setAudioUnitToVst2(checked as boolean)}
          />
          <Label htmlFor="audio-unit" className="text-sm flex items-center gap-1">
            Audio Unit to VST2
            <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-600">
              Beta
            </Badge>
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="preserve-automation"
            checked={preservePluginAutomation}
            onCheckedChange={(checked) => setPreservePluginAutomation(checked as boolean)}
          />
          <Label htmlFor="preserve-automation" className="text-sm">
            Preserve Plugin Automation
          </Label>
        </div>

        {/* Audio Processing Options */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="keep-tempo"
            checked={keepOriginalTempo}
            onCheckedChange={(checked) => setKeepOriginalTempo(checked as boolean)}
          />
          <Label htmlFor="keep-tempo" className="text-sm">
            Keep Original Tempo
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="normalize-audio"
            checked={normalizeAudioLevels}
            onCheckedChange={(checked) => setNormalizeAudioLevels(checked as boolean)}
          />
          <Label htmlFor="normalize-audio" className="text-sm">
            Normalize Audio Levels
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="compress-output"
            checked={compressOutput}
            onCheckedChange={(checked) => setCompressOutput(checked as boolean)}
          />
          <Label htmlFor="compress-output" className="text-sm">
            Compress Output
          </Label>
        </div>

        {/* Export Options */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="export-template"
            checked={exportAsTemplate}
            onCheckedChange={(checked) => setExportAsTemplate(checked as boolean)}
          />
          <Label htmlFor="export-template" className="text-sm">
            Export as Template
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="include-samples"
            checked={includeSamplePack}
            onCheckedChange={(checked) => setIncludeSamplePack(checked as boolean)}
          />
          <Label htmlFor="include-samples" className="text-sm">
            Include Sample Pack
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="midi-only"
            checked={exportMidiOnly}
            onCheckedChange={(checked) => setExportMidiOnly(checked as boolean)}
          />
          <Label htmlFor="midi-only" className="text-sm flex items-center gap-1">
            Export MIDI Only
            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-600">
              New
            </Badge>
          </Label>
        </div>

        {/* Backup & Safety */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="backup-original"
            checked={backupOriginal}
            onCheckedChange={(checked) => setBackupOriginal(checked as boolean)}
          />
          <Label htmlFor="backup-original" className="text-sm">
            Backup Original File
          </Label>
        </div>
      </div>
    </div>
  );
};