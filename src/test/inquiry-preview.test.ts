import { describe, expect, it } from "vitest";
import { inquiryPreviewPolicy, validateInquiryField, maxLengths } from "@/lib/inquiry-preview";

describe("Sprint 04 inquiry preview boundaries", () => {
  it("does not enable submission, backend or persistence", () => {
    expect(inquiryPreviewPolicy).toEqual({
      submissionEnabled: false,
      backendEnabled: false,
      persistenceEnabled: false,
    });
  });
  it("validates required name, email, category, description and acknowledgment", () => {
    expect(validateInquiryField("fullName", " ")).toBeTruthy();
    expect(validateInquiryField("email", "invalid")).toBeTruthy();
    expect(validateInquiryField("serviceCategory", "")).toBeTruthy();
    expect(validateInquiryField("description", " ")).toBeTruthy();
    expect(validateInquiryField("consent", "")).toBeTruthy();
  });
  it("accepts valid values", () => {
    expect(validateInquiryField("fullName", "A Person")).toBeUndefined();
    expect(validateInquiryField("email", "person@example.org")).toBeUndefined();
    expect(validateInquiryField("serviceCategory", "Artificial Intelligence")).toBeUndefined();
    expect(validateInquiryField("description", "An accessible website concept")).toBeUndefined();
    expect(validateInquiryField("consent", "yes")).toBeUndefined();
  });
  it("enforces maximum lengths and optional choices", () => {
    expect(validateInquiryField("fullName", "x".repeat(maxLengths.fullName + 1))).toBeTruthy();
    expect(
      validateInquiryField("organization", "x".repeat(maxLengths.organization + 1)),
    ).toBeTruthy();
    expect(validateInquiryField("budget", "")).toBeUndefined();
    expect(validateInquiryField("timeline", "invalid")).toBeTruthy();
  });
});
