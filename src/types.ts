export interface SiteConfig {
  appName: string;
  tagline: string;
  shortDescription: string;
  badgeText: string;
  marketplaceUrl: string;
  documentationUrl?: string;
  domain: string;
  supportEmail: string;
  githubUrl?: string;
  logo: {
    url: string;
    alt: string;
    color: string;
    viewBox?: string;
  };
  stats: {
    templatesCount: string;
    cost: string;
    privacyRating: string;
    brandsCount: string;
  };
  theme: {
    primaryColor: string;
    primaryHover: string;
    brandLight: string;
  };
  features: {
    id: string;
    title: string;
    description: string;
    icon: string;
    badge?: string;
  }[];
  catalogs: {
    id: string;
    name: string;
    initial: string;
    color: string;
    sampleSkus: string[];
    description: string;
  }[];
  sampleTemplates: {
    id: string;
    sku: string;
    catalogId: string;
    brand: string;
    description: string;
    dimensions: string;
    perSheet: number;
    format: string;
    orientation: 'Portrait' | 'Landscape';
    category: string;
  }[];
  privacyGuarantees: {
    title: string;
    description: string;
    scopes: {
      scope: string;
      reason: string;
    }[];
    competitorComparison: {
      feature: string;
      averyLabelMerge: string;
      otherAddons: string;
    }[];
  };
  steps: {
    step: number;
    title: string;
    description: string;
    tip?: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  footer: {
    companyLogoUrl: string;
    copyrightOwner: string;
    links: {
      label: string;
      url: string;
      external?: boolean;
    }[];
  };
}
