export interface ServiceItem {
  id: string;
  name: string;
  tags: string[];
  image: string;
  shortDesc: string;
  fullDesc: string;
  keyBenefits: string[];
  suitableFor: string;
}

export interface PathfinderSelection {
  yearGroup: string;
  struggleArea: string;
  mode: string;
}

export interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  yearGroup: string;
  struggleArea: string;
  mode: string;
  message: string;
}
