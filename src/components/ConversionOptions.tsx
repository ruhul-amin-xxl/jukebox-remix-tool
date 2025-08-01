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
}

export const ConversionOptions = ({ onConvert, disabled }: ConversionOptionsProps) => {
  const [outputFormat, setOutputFormat] = useState("FL Studio");
  const [downgradeSerum, setDowngradeSerum] = useState(false);
  const [audioUnitToVst2, setAudioUnitToVst2] = useState(false);
  const [relativePath, setRelativePath] = useState(false);
  const [addMidiPitcher, setAddMidiPitcher] = useState(false);
  const [keepSameVersion, setKeepSameVersion] = useState(false);

  const handleConvert = () => {
    onConvert({
      outputFormat,
      downgradeSerum,
      audioUnitToVst2,
      relativePath,
      addMidiPitcher,
      keepSameVersion,
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
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="keep-version"
            checked={keepSameVersion}
            onCheckedChange={(checked) => setKeepSameVersion(checked as boolean)}
          />
          <Label htmlFor="keep-version" className="text-sm">
            Keep Same Version
          </Label>
        </div>

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
      </div>
    </div>
  );
};