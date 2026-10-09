import { describe, expect, it } from 'vitest';
import { consultationPolicy, productStatus } from '@/lib/consultation-content';

describe('Sprint 03 consultation and product boundaries', () => {
  it('does not confirm operational service availability', () => {
    expect(consultationPolicy.availabilityConfirmed).toBe(false);
  });
  it('does not enable inquiry submissions', () => {
    expect(consultationPolicy.inquirySubmissionEnabled).toBe(false);
  });
  it('requires explicit authorization for security assessments', () => {
    expect(consultationPolicy.securityAssessmentRequiresAuthorization).toBe(true);
  });
  it('requires human review for AI', () => {
    expect(consultationPolicy.aiRequiresHumanReview).toBe(true);
  });
  it('does not confirm mobile application delivery', () => {
    expect(consultationPolicy.mobileAppDeliveryConfirmed).toBe(false);
  });
  it('does not present future products as launched', () => {
    expect(productStatus.futureProductsLaunched).toBe(false);
  });
  it('does not confirm ICK Opportunities ownership', () => {
    expect(productStatus.opportunitiesOwnershipConfirmed).toBe(false);
  });
  it('does not confirm ICK Opportunities live status', () => {
    expect(productStatus.opportunitiesLiveStatusConfirmed).toBe(false);
  });
  it('keeps ICK Opportunities integration disabled', () => {
    expect(productStatus.opportunitiesIntegrationEnabled).toBe(false);
  });
  it('withholds an unapproved external product link', () => {
    expect(productStatus.opportunitiesExternalLinkApproved).toBe(false);
  });
});