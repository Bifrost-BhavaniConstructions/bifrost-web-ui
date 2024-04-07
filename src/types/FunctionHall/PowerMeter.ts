export interface PowerMeter {
  name: string;
}

export interface PowerMeterStatus {
  name: string;
  reading: number;
  markedAt: Date;
  initialReading?: number;
  finalReading?: number;
}
