export interface Generator {
  name: string;
}

export interface GeneratorSession {
  from?: Date;
  to?: Date;
}

export interface GeneratorStatus {
  name: string;
  sessions: GeneratorSession[];
}
