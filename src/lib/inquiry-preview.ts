/** Frontend-only preview. Never send or persist inquiry data. */
export const inquiryPreviewPolicy = {
  submissionEnabled: false,
  backendEnabled: false,
  persistenceEnabled: false,
} as const;

export const serviceCategories = [
  'Software Development',
  'Artificial Intelligence',
  'Cybersecurity & ICT',
  'General Inquiry',
] as const;

export const budgetRanges = [
  'Prefer not to disclose',
  'Not yet determined',
  'Under $1,000',
  '$1,000–$5,000',
  '$5,000–$20,000',
  'Above $20,000',
] as const;

export const timelineOptions = [
  'Not yet determined',
  'Within 1 month',
  '1–3 months',
  '3–6 months',
  'Flexible',
] as const;

export type InquiryField = 'fullName' | 'email' | 'organization' | 'serviceCategory' | 'description' | 'budget' | 'timeline' | 'consent';
export type InquiryValues = Record<InquiryField, string>;

export const initialInquiryValues: InquiryValues = {
  fullName: '', email: '', organization: '', serviceCategory: '', description: '', budget: '', timeline: '', consent: '',
};

export const maxLengths = { fullName: 120, email: 254, organization: 150, description: 3000 } as const;

export function validateInquiryField(field: InquiryField, value: string): string | undefined {
  const trimmed = value.trim();
  if (field === 'fullName') {
    if (!trimmed) return 'Enter your full name.';
    if (value.length > maxLengths.fullName) return `Use ${maxLengths.fullName} characters or fewer.`;
  }
  if (field === 'email') {
    if (!trimmed) return 'Enter your email address.';
    if (value.length > maxLengths.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'Enter a valid email address.';
  }
  if (field === 'organization' && value.length > maxLengths.organization) return `Use ${maxLengths.organization} characters or fewer.`;
  if (field === 'serviceCategory' && !serviceCategories.some(category => category === value)) return 'Choose a service category.';
  if (field === 'description') {
    if (!trimmed) return 'Describe your project.';
    if (value.length > maxLengths.description) return `Use ${maxLengths.description} characters or fewer.`;
  }
  if (field === 'budget' && value && !budgetRanges.some(option => option === value)) return 'Choose a listed budget range.';
  if (field === 'timeline' && value && !timelineOptions.some(option => option === value)) return 'Choose a listed timeline.';
  if (field === 'consent' && value !== 'yes') return 'Acknowledge that this is a non-operational preview.';
  return undefined;
}
