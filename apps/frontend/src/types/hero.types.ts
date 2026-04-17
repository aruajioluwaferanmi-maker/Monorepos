export interface HeroProfile {
  name: string;
  role: string;
  image: string;
  badge: string;
  stats: {
    label: string;
    value: string;
  }[];
}

export interface FunFact {
  emoji: string;
  text: string;
}

export interface HeroCTA {
  label: string;
  type: string;
  id: string;
  variant: "primary" | "secondary";
}

export interface WorkModalConfig {
  title: string;
  subtitle: string;
  submitLabel: string;
  projectTypes: string[];
  budgets: string[];
}

export interface MentorModalConfig {
  title: string;
  subtitle: string;
  submitLabel: string;
  mentoringAreas: string[];
  availability: string[];
}

export interface CoffeeModalConfig {
  title: string;
  subtitle: string;
  submitLabel: string;
  topics: string[];
  preferredTimes: string[];
}

export interface HelpModalConfig {
  title: string;
  subtitle: string;
  submitLabel: string;
  helpTypes: string[];
  platforms: string[];
}

export interface ConnectModalConfig {
  title: string;
  subtitle: string;
  submitLabel: string;
  platforms: string[];
}

export interface ConnectModalFormData {
  name: string;
  email: string;
  platform: string;
  message: string;
}

export interface HeroConfig {
  heading: string;
  subheading: string;
  intro: string;
  profile: HeroProfile;
  funFacts: FunFact[];
  ctas: {
    workWithMe: HeroCTA;
    helpMeFree: HeroCTA;
  };
  modals: {
    deliverProject: WorkModalConfig;
    mentorMe: MentorModalConfig;
    coffeeWithMe: CoffeeModalConfig;
    fifteenMinChat: FifteenMinChatConfig;
    auditWebsite: AuditWebsiteConfig;
    techCatchUp: TechCatchUpConfig;
  };
}

export interface FifteenMinChatFormData {
  name: string;
  email: string;
  topic: string;
  availability: string;
  message: string;
}

export interface AuditWebsiteFormData {
  name: string;
  email: string;
  websiteUrl: string;
  websiteType: string;
  auditArea: string;
  message: string;
}

export interface TechCatchUpFormData {
  name: string;
  email: string;
  catchUpTopic: string;
  groupSize: string;
  message: string;
}

export interface WorkModalFormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

export interface MentorModalFormData {
  name: string;
  email: string;
  mentoringArea: string;
  availability: string;
  goals: string;
}

export interface CoffeeModalFormData {
  name: string;
  email: string;
  topic: string;
  preferredTime: string;
  message: string;
}

export interface HelpModalFormData {
  name: string;
  email: string;
  helpType: string;
  platform: string;
  message: string;
}

export interface ModalState {
  deliverProjectOpen: boolean;
  mentorMeOpen: boolean;
  coffeeWithMeOpen: boolean;
  helpMeFreeOpen: boolean;
}

export interface FifteenMinChatConfig {
  title: string;
  subtitle: string;
  submitLabel: string;
  topics: string[];
  availability: string[];
}

export interface AuditWebsiteConfig {
  title: string;
  subtitle: string;
  submitLabel: string;
  websiteTypes: string[];
  auditAreas: string[];
}

export interface TechCatchUpConfig {
  title: string;
  subtitle: string;
  submitLabel: string;
  catchUpTopics: string[];
  groupSizes: string[];
}
