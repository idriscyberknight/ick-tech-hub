import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { ChangeEvent, FocusEvent, FormEvent } from "react";
import { PageIntro } from "@/components/site/page-intro";
import { pageHead } from "@/lib/site-content";
import {
  budgetRanges,
  initialInquiryValues,
  maxLengths,
  serviceCategories,
  timelineOptions,
  validateInquiryField,
} from "@/lib/inquiry-preview";
import type { InquiryField, InquiryValues } from "@/lib/inquiry-preview";

export const Route = createFileRoute("/discuss-project")({
  head: () =>
    pageHead(
      "Discuss a project",
      "Preview the future ICK Technologies project inquiry experience. Submissions are not available.",
    ),
  component: Page,
});

type TextField = "fullName" | "email" | "organization";
const fieldLabels: Record<TextField, string> = {
  fullName: "Full name",
  email: "Email address",
  organization: "Organization name",
};

function Page() {
  const [values, setValues] = useState<InquiryValues>({ ...initialInquiryValues });
  const [touched, setTouched] = useState<Partial<Record<InquiryField, boolean>>>({});
  const change = (field: InquiryField, value: string) =>
    setValues((current) => ({ ...current, [field]: value }));
  const blur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const field = event.currentTarget.name as InquiryField;
    setTouched((current) => ({ ...current, [field]: true }));
  };
  const errorFor = (field: InquiryField) =>
    touched[field] ? validateInquiryField(field, values[field]) : undefined;
  const preventSubmission = (event: FormEvent<HTMLFormElement>) => event.preventDefault();
  const renderText = (field: TextField, required: boolean, type: "text" | "email" = "text") => {
    const error = errorFor(field);
    return (
      <div className="space-y-2" key={field}>
        <label className="inquiry-label" htmlFor={field}>
          {fieldLabels[field]}{" "}
          {required ? (
            <span aria-hidden="true">*</span>
          ) : (
            <span className="text-muted-foreground font-normal">(optional)</span>
          )}
        </label>
        <input
          id={field}
          name={field}
          type={type}
          autoComplete={
            field === "fullName" ? "name" : field === "email" ? "email" : "organization"
          }
          className="inquiry-control"
          value={values[field]}
          maxLength={maxLengths[field]}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${field}-error` : undefined}
          onChange={(event: ChangeEvent<HTMLInputElement>) => change(field, event.target.value)}
          onBlur={blur}
        />
        {error && (
          <p className="inquiry-error" id={`${field}-error`} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  };
  const renderSelect = (
    field: "serviceCategory" | "budget" | "timeline",
    label: string,
    options: readonly string[],
    required = false,
  ) => {
    const error = errorFor(field);
    return (
      <div className="space-y-2">
        <label className="inquiry-label" htmlFor={field}>
          {label}{" "}
          {required ? (
            <span aria-hidden="true">*</span>
          ) : (
            <span className="text-muted-foreground font-normal">(optional)</span>
          )}
        </label>
        <select
          className="inquiry-control"
          id={field}
          name={field}
          value={values[field]}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${field}-error` : undefined}
          onChange={(event) => change(field, event.target.value)}
          onBlur={blur}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error && (
          <p className="inquiry-error" id={`${field}-error`} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  };
  const descriptionError = errorFor("description");
  const consentError = errorFor("consent");
  return (
    <>
      <PageIntro
        title="Let's start with your idea."
        description="A preview of a future way to discuss technology projects with ICK Technologies."
      />
      <section className="section-band" aria-labelledby="inquiry-heading">
        <div className="site-container">
          <div className="max-w-3xl">
            <div className="inquiry-notice" role="status" aria-live="polite">
              <h2 className="text-lg font-semibold">Preview only — inquiries are not open</h2>
              <p className="mt-2 text-sm leading-7">
                This form is a preview only. ICK Technologies is not currently accepting project
                inquiries through this website. Information entered here will not be submitted or
                saved. Please do not enter sensitive or confidential information.
              </p>
            </div>
            <div className="mt-10 mb-7">
              <p className="eyebrow text-primary">Project discovery</p>
              <h2 id="inquiry-heading" className="section-heading mt-4">
                Tell us about your project
              </h2>
              <p className="body-copy mt-3">
                Explore the questions a future inquiry process may ask. Required fields are marked
                with an asterisk. This preview does not confirm service availability, pricing, or
                timelines.
              </p>
            </div>
            <form
              className="inquiry-panel space-y-7"
              noValidate
              onSubmit={preventSubmission}
              aria-label="Non-operational project inquiry preview"
            >
              <div className="grid gap-6 md:grid-cols-2">
                {renderText("fullName", true)}
                {renderText("email", true, "email")}
              </div>
              {renderText("organization", false)}
              {renderSelect("serviceCategory", "Service category", serviceCategories, true)}
              <div className="space-y-2">
                <label className="inquiry-label" htmlFor="description">
                  Project description <span aria-hidden="true">*</span>
                </label>
                <textarea
                  className="inquiry-control min-h-40 resize-y"
                  id="description"
                  name="description"
                  required
                  maxLength={maxLengths.description}
                  value={values.description}
                  aria-invalid={Boolean(descriptionError)}
                  aria-describedby={descriptionError ? "description-error" : "description-hint"}
                  onChange={(event) => change("description", event.target.value)}
                  onBlur={blur}
                />
                <p className="text-xs text-muted-foreground" id="description-hint">
                  A general overview is enough. Avoid confidential details.{" "}
                  {values.description.length}/{maxLengths.description} characters.
                </p>
                {descriptionError && (
                  <p className="inquiry-error" id="description-error" role="alert">
                    {descriptionError}
                  </p>
                )}
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {renderSelect("budget", "Exploratory budget range", budgetRanges)}
                {renderSelect("timeline", "Expected timeline", timelineOptions)}
              </div>
              <div className="rounded-md border border-border bg-secondary/40 p-5">
                <div className="flex items-start gap-3">
                  <input
                    className="mt-1 h-5 w-5 shrink-0 accent-primary"
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={values.consent === "yes"}
                    required
                    aria-invalid={Boolean(consentError)}
                    aria-describedby={consentError ? "consent-error" : "consent-help"}
                    onChange={(event) => change("consent", event.target.checked ? "yes" : "")}
                    onBlur={blur}
                  />
                  <label htmlFor="consent" className="text-sm leading-7">
                    I understand that this is a non-operational preview. No inquiry will be
                    submitted or saved. <span aria-hidden="true">*</span>
                  </label>
                </div>
                <p id="consent-help" className="mt-2 text-xs text-muted-foreground">
                  This acknowledgment is for the preview only; it is not consent to actual data
                  processing.
                </p>
                {consentError && (
                  <p className="inquiry-error" id="consent-error" role="alert">
                    {consentError}
                  </p>
                )}
              </div>
              <button
                className="inquiry-disabled-button"
                type="submit"
                disabled
                aria-disabled="true"
              >
                Submissions Not Yet Available
              </button>
              <p className="text-sm text-muted-foreground">
                No submission endpoint, email delivery, browser storage, or database connection is
                used by this form.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
