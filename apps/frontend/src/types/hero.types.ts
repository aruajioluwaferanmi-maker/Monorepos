export interface HeroProfile {
  name: string;
  role: string;
  image: string;
  badge: string;
}

export interface HeroCTA {
  label: string;
  type: string;
  id: string;
}

export interface HeroConfig {
  heading: string;
  subheading: string;
  intro: string;
  profile: HeroProfile;
  ctas: {
    work: HeroCTA;
    connect: HeroCTA;
  };
}

export interface WorkModalFormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

export interface ConnectModalFormData {
  name: string;
  email: string;
  platform: string;
  message: string;
}

export interface ModalState {
  workOpen: boolean;
  connectOpen: boolean;
}
