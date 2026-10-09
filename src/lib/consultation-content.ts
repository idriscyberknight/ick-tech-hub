// Separate from Home/About content so this sprint cannot change their wording.
export const consultationPolicy = {
  availabilityConfirmed: false,
  inquirySubmissionEnabled: false,
  securityAssessmentRequiresAuthorization: true,
  aiRequiresHumanReview: true,
  mobileAppDeliveryConfirmed: false,
} as const;

export const discoverySteps = [
  { title: 'Understand the context', description: 'Explore the problem, the people affected, and the way work happens today.' },
  { title: 'Consider the options', description: 'Compare possible approaches, including whether simpler changes could meet the need.' },
  { title: 'Clarify the boundaries', description: 'Discuss data, permissions, accessibility, dependencies, and practical constraints.' },
  { title: 'Review feasibility', description: 'Any next step would require confirmed availability, an agreed scope, and clear responsibilities.' },
] as const;

export const consultationTopics = [
  {
    title: 'Software Development', label: 'Software & digital experiences',
    description: 'Explore how websites, web applications, and business software could support the people and processes behind an idea.',
    context: 'Start with the need, not the platform.',
    contextDescription: 'A useful software discussion begins with who will use it, what they need to accomplish, and the systems already in place. Building something new is one option—not always the right one.',
    useCases: [
      { title: 'Websites', description: 'Consider a clear, accessible place for company information, useful content, or a professional online presence.' },
      { title: 'Web applications', description: 'Explore browser-based tools for tasks such as internal workflows, information management, or customer self-service.' },
      { title: 'Business software', description: 'Discuss how existing or potential tools could support record keeping, reporting, and coordination across a business.' },
      { title: 'Possible mobile applications', description: 'Consider whether a mobile application is appropriate, or whether a mobile-friendly website would be a more practical starting point.' },
    ],
    considerations: [
      { title: 'People & accessibility', description: 'User needs, language, devices, connectivity, and assistive technology should inform the design.' },
      { title: 'Data & dependencies', description: 'Data handling, permissions, existing systems, and third-party requirements need review before defining a scope.' },
      { title: 'Long-term care', description: 'Hosting, maintenance, updates, ownership, and support responsibilities would need to be agreed.' },
    ],
    limit: 'These are possible consultation topics, not confirmed development services. Technology choices, mobile application feasibility, delivery timelines, and support arrangements remain subject to review.',
  },
  {
    title: 'Artificial Intelligence', label: 'AI & thoughtful automation',
    description: 'Explore assistants, workflow automation, and integrations with a careful view of data, human oversight, and whether AI is appropriate.',
    context: 'Use AI where it makes sense.',
    contextDescription: 'Not every problem needs artificial intelligence. A discussion should examine the task, the information involved, and the consequences of an incorrect result before considering a tool.',
    useCases: [
      { title: 'AI assistants', description: 'Explore assistance with finding information or preparing drafts, with clearly defined knowledge sources and human review.' },
      { title: 'Workflow automation', description: 'Consider repetitive steps such as organizing information or routing tasks, while retaining checks for exceptions and errors.' },
      { title: 'AI integrations', description: 'Discuss whether an AI tool could fit existing software, subject to access permissions, provider terms, and data requirements.' },
      { title: 'Responsible AI', description: 'Examine potential bias, transparency, privacy, and the role of human judgement before choosing an approach.' },
    ],
    considerations: [
      { title: 'Data suitability', description: 'Sensitive information, consent, retention, and provider data practices need careful review.' },
      { title: 'Human oversight', description: 'AI can produce inaccurate or biased results. People need an appropriate way to review, challenge, and correct outputs.' },
      { title: 'Practical constraints', description: 'Provider availability, usage costs, evaluation, and fallback processes would need to be considered.' },
    ],
    limit: 'No AI outcome, accuracy level, productivity gain, or operational deployment is promised. Any future scope would need evaluation and appropriate human oversight; AI is not a substitute for professional judgement.',
  },
  {
    title: 'Cybersecurity & ICT', label: 'Digital security & ICT',
    description: 'Explore security awareness, authorized assessments, ICT consultation, and technical support as topics for a considered discussion.',
    context: 'Understand risk before choosing a response.',
    contextDescription: 'Security and ICT discussions should begin with the systems involved, the people who rely on them, and the permissions and responsibilities around them. No single tool removes every risk.',
    useCases: [
      { title: 'Security awareness', description: 'Discuss practical topics such as phishing awareness, account hygiene, and safer everyday handling of information.' },
      { title: 'Authorized security assessments', description: 'Explore whether a scoped review is appropriate. Assessment activity requires explicit authorization from the responsible system owner.' },
      { title: 'ICT consultation', description: 'Consider technology needs, existing infrastructure, access arrangements, and options for a more manageable setup.' },
      { title: 'Technical support', description: 'Discuss a technical issue and the context needed to assess possible assistance, without assuming support availability or response times.' },
    ],
    considerations: [
      { title: 'Permission & scope', description: 'System ownership, explicit authorization, permitted activities, and boundaries must be established before any assessment.' },
      { title: 'Sensitive information', description: 'Access to systems and information should be limited to what is necessary, with handling responsibilities clarified.' },
      { title: 'Limits & escalation', description: 'Specialist needs, business disruption risks, and appropriate escalation paths should be considered.' },
    ],
    limit: 'These topics do not establish a security service, certification, compliance assurance, incident response capability, or guarantee of protection. No assessment activity is offered or performed through this website.',
  },
] as const;

export const productStatus = {
  futureProductsLaunched: false,
  opportunitiesOwnershipConfirmed: false,
  opportunitiesLiveStatusConfirmed: false,
  opportunitiesIntegrationEnabled: false,
  opportunitiesExternalLinkApproved: false,
} as const;