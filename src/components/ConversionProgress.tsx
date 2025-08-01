import { Progress } from "@/components/ui/progress";

interface ConversionProgressProps {
  progress: number;
  status: string;
  isVisible: boolean;
}

export const ConversionProgress = ({ progress, status, isVisible }: ConversionProgressProps) => {
  if (!isVisible) return null;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{status}</span>
        <span className="text-sm text-muted-foreground">{progress}%</span>
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  );
};