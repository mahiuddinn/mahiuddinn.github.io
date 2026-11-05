/* ==========================================================================
   SITE CONFIG — the only file you need to edit before publishing.
   Everything here is injected into every page by assets/js/main.js.
   Keep the quotes. Use "" for anything you do not have yet: it will be
   hidden automatically instead of showing a broken link.
   ========================================================================== */
window.SITE_CONFIG = {
  /* --- Identity ---------------------------------------------------------- */
  name: "Mahiuddin Mahi",
  role: "SEO & Link Building Specialist",
  siteUrl: "https://mahiuddin.com",
  location: "Bangladesh",

  /* --- Contact ----------------------------------------------------------- */
  // CHANGE THIS: it powers every mailto: link, the contact page and the footer.
  email: "hello@mahiuddin.com",

  // CHANGE THIS: your Fiverr gig/profile URL. Example: https://www.fiverr.com/yourusername
  fiverrUrl: "",

  // Social profiles — leave "" for any you do not use; the icon disappears.
  linkedinUrl: "",
  twitterUrl: "",
  githubUrl: "",
  whatsappNumber: "", // international format, digits only, e.g. 8801XXXXXXXXX

  /* --- Form handling ----------------------------------------------------- */
  /*
   * This site has NO database, so a form submission is never stored here.
   * Leave formEndpoint as "" and the form honestly opens your email app with
   * the message pre-filled (mailto).
   *
   * To receive submissions in your inbox without a backend, sign up for a free
   * form service and paste its endpoint below, for example:
   *   Formspree : https://formspree.io/f/yourFormId
   *   FormSubmit: https://formsubmit.co/your@email.com
   *   Web3Forms : https://api.web3forms.com/submit   (also add accessKey below)
   * When an endpoint is set, main.js posts to it and reports the real result.
   */
  formEndpoint: "",
  formAccessKey: "", // Web3Forms only; otherwise keep ""
  formFallbackEmail: "", // "" = use the email above

  /* --- Blog defaults ----------------------------------------------------- */
  authorName: "Mahiuddin Mahi",
  defaultReadingWordsPerMinute: 200,

  /* --- Legal / notices --------------------------------------------------- */
  // Portfolio projects are demonstrations, not client work. Keep this true
  // until you replace a demo with a real, permission-granted case study.
  demoLabelsEnabled: true
};
