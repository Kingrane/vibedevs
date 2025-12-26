export enum CategoryType {
  WebDesign = "Web Design",
  WebProgramming = "Web Programming",
  Shaders = "Shaders",
  Python = "Python Programming",
  JavaScript = "JavaScript",
  MachineLearning = "Machine Learning",
  GameDev = "Game Development",
  DataScience = "Data Science",
  MobileApps = "Mobile Apps",
  Cybersecurity = "Cybersecurity",
  DevOps = "DevOps",
  AITools = "AI Tools"
}

export interface Prompt {
  id: string;
  category: CategoryType;
  title: string;
  description: string;
  code: string;
  tags: string[];
}

export interface NavItem {
  name: CategoryType;
  icon: string;
}
