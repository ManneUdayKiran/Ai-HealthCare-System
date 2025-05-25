
export interface DetectionResult {
  prediction: string;
  confidence: number;
  timestamp: Date;
}

export type ImageFile = File & {
  preview: string;
};
