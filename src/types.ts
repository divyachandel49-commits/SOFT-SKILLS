export type CommunicationStyle = 'Assertive' | 'Passive' | 'Aggressive' | 'Passive-Aggressive';

export interface ModuleItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Vocal' | 'Listening' | 'Body Language' | 'Writing' | 'Collaboration';
  icon: string;
  description: string;
  benefits: string[];
  principles: {
    title: string;
    description: string;
    exampleGood: string;
    exampleBad: string;
  }[];
  quickTips: string[];
}

export interface Choice {
  id: string;
  text: string;
  nextNodeId: string | 'END';
  scoreChange: {
    empathy: number;
    clarity: number;
    professionalism: number;
  };
  feedback: string;
  analysis: string;
}

export interface RolePlayNode {
  id: string;
  characterResponse: string;
  choices: Choice[];
}

export interface RolePlayScenario {
  id: string;
  title: string;
  description: string;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  character: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
  startNodeId: string;
  nodes: Record<string, RolePlayNode>;
  expectedOutcome: string;
}

export interface AssessmentQuestion {
  id: number;
  scenario: string;
  context: string;
  options: {
    id: string;
    text: string;
    style: CommunicationStyle;
    points: number;
    feedback: string;
  }[];
}

export interface PhrasePair {
  id: string;
  casual: string;
  polished: string;
  context: string;
  whyItWorks: string;
}

export interface TeleprompterScript {
  id: string;
  title: string;
  category: string;
  text: string;
  targetWpm: number;
  pacingHints: { wordIndex: number; hint: string }[];
}
