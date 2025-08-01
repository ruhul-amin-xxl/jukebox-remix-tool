import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const InfoSections = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    general: true,
    alsToFlp: false,
    flpToAls: false,
    alsDowngrade: false,
    zipFiles: false,
    audioUnit: false,
    serum: false,
    fscMidi: false,
    updates: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    {
      id: "general",
      title: "General Info",
      content: (
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>There is a file size limit of 6mb for free users.</p>
          <p>The converter will create an Ableton Live 9.7/10.1 or FL Studio 12.5 project file. They should open fine in newer versions of the DAW.</p>
          <p>The <strong>"Relative Path"</strong> option will look for samples in the same folder as the newly generated file, instead of using the existing filepaths. Only for ALS→FLP already does this by default.</p>
          <p>There is currently no support for instrument/effect racks or Patcher. If you have a native synth (like Operator or 3xOsc) in your project, it will default to a Operator/3xOsc synth.</p>
          <p>Ironically, you currently can't convert from a jukeblocks template/converted file, because they are minimized versions of a full project file. If you save the project at least once in the DAW, it will convert fine afterwards.</p>
        </div>
      )
    },
    {
      id: "alsToFlp",
      title: "ALS → FLP",
      content: (
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>If warping is creating clicks, I recommend making sure warpmarkers are placed on the quiet part of a waveform (before a transient), as the warpmarker is where a cut will be made in FL, which is where a click can happen.</p>
          <p>This converter was made with Ableton 10 and 11 in mind and doesn't work when converting from Live 8 or lower.</p>
        </div>
      )
    },
    {
      id: "flpToAls",
      title: "FLP → ALS",
      content: (
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>FLPs don't store the bpm of samples, so when converting to Ableton, they will be imported at whatever tempo they are. If your sample is chopped or timestreched in FL, it will sound wrong in the converted Ableton file.</p>
          <p>To get the best results, before converting, make sure your samples are either:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>At the same tempo as your project</li>
            <li>Bounced/rendered to audio if they've been timestretched</li>
          </ul>
        </div>
      )
    },
    {
      id: "alsDowngrade",
      title: "ALS → ALS (Downgrading)",
      content: (
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>When downgrading Ableton files, newer features will be lost or converted to compatible alternatives. This includes:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Newer devices and effects</li>
            <li>Advanced automation features</li>
            <li>Max for Live devices</li>
          </ul>
        </div>
      )
    },
    {
      id: "zipFiles",
      title: "Using Zip Files",
      content: (
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>You can upload zip files containing your project and samples. The converter will automatically:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Extract the project file</li>
            <li>Maintain relative paths to samples</li>
            <li>Include all necessary assets in the output</li>
          </ul>
        </div>
      )
    },
    {
      id: "audioUnit",
      title: "Audio Unit → VST2",
      content: (
        <div className="space-y-3 text-sm text-muted-foreground">
          <p><strong>Beta Feature:</strong> Converts Audio Unit plugins to VST2 equivalents where possible.</p>
          <p>Note: This feature is experimental and may not work with all plugins. Some settings may not transfer perfectly.</p>
        </div>
      )
    },
    {
      id: "serum",
      title: "Downgrade Serum Presets",
      content: (
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>Converts newer Serum presets to be compatible with older versions of Serum.</p>
          <p>This is useful when sharing projects with collaborators who have older Serum versions.</p>
        </div>
      )
    },
    {
      id: "fscMidi",
      title: "FSC → MIDI",
      content: (
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>Converts FL Studio score files (.fsc) to standard MIDI files (.mid).</p>
          <p>This allows you to use FL Studio compositions in other DAWs or MIDI-compatible software.</p>
        </div>
      )
    },
    {
      id: "updates",
      title: "Updates",
      content: (
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>Recent improvements and features:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Enhanced Ableton Live 11 support</li>
            <li>Improved sample path handling</li>
            <li>Better plugin compatibility</li>
            <li>Performance optimizations</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-6">
        Convert or downgrade between multiple formats. Please read below to see how to achieve the best results.
      </p>

      <div className="space-y-2">
        {sections.map((section) => (
          <Card key={section.id} className="shadow-sm">
            <Collapsible
              open={openSections[section.id]}
              onOpenChange={() => toggleSection(section.id)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors py-3">
                  <CardTitle className="flex items-center justify-between text-base">
                    {section.title}
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform ${
                        openSections[section.id] ? 'rotate-180' : ''
                      }`} 
                    />
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  {section.content}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  );
};