export interface NavbarConfig {
  logo: {
    fullName: string;
    initials: string;
    href: string;
  };
}
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSocial {
  label: string;
  href: string;
  icon: string;
}

export interface FooterConfig {
  name: string;
  initials: string;
  tagline: string;
  copyright: string;
  quickLinks: FooterLink[];
  socials: FooterSocial[];
}
