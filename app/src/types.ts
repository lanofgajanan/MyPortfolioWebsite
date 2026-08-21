export interface TelemetryData {
  coordsTopLeft: string;
  hexTopLeft: string;
  coordsTopRight: string;
  hexTopRight: string;
  coordsBottomLeft: string;
  hexBottomLeft: string;
  coordsBottomRight: string;
  versionTag: string;
  cpuLoad: number;
  memoryUsage: number;
  neuralSync: number;
  quantumIntegrity: number;
  uplinkRate: string;
  fps: number;
  uptimeSeconds: number;
}

export interface ProtocolLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'EXEC' | 'SUCCESS' | 'ALERT';
  module: string;
  message: string;
}

export interface BioProtocol {
  id: string;
  name: string;
  category: 'BIO_NEURAL' | 'QUANTUM_CORE' | 'SECURITY' | 'DIAGNOSTIC';
  description: string;
  status: 'READY' | 'RUNNING' | 'COMPLETED' | 'STANDBY';
  progress: number;
  executeTimeMs: number;
}

export interface HUDSettings {
  titleText: string;
  statusText: string;
  glitchIntensity: 'low' | 'medium' | 'high' | 'overdrive';
  enableCRT: boolean;
  enableScanlineSweep: boolean;
  enableAudio: boolean;
  soundVolume: number;
  accentColor: 'violet' | 'emerald' | 'cyan' | 'crimson';
  viewMode: 'hud' | 'terminal' | 'dossier' | 'matrix';
}
