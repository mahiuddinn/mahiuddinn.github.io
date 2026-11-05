/* ==========================================================================
   main.js — progressive enhancement only.
   Every page is fully readable and navigable with JavaScript disabled.
   No libraries, no build step.
   ========================================================================== */
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};
  var LANG = (document.documentElement.getAttribute("lang") || "en").slice(0, 2);

  /* Anything this script writes into the page comes from here, so the Bengali
     pages never receive English button labels or form feedback. */
  var I18N = {
    en: {
      emailMissing: "Email not configured yet",
      enquirySubject: "Project enquiry from mahiuddin.com",
      copied: "Copied",
      pressCopy: "Press Ctrl+C",
      fillIn: "Please fill this in.",
      describeProject: "Please describe your project.",
      validEmail: "Please enter a valid email address.",
      fixFields: "Please correct the highlighted fields before sending.",
      subjectFallback: "Project enquiry from {name} (mahiuddin.com)",
      notGiven: "(not given)",
      sentFrom: "Sent from the contact form at",
      to: "To", labelName: "Name", labelEmail: "Email", labelSubject: "Subject", labelBudget: "Budget",
      formService: "the form service",
      sending: "Sending your message…",
      sent: "Your message was sent. I usually reply within one working day.",
      serviceError: "The form service replied with an error (status {status}). Please email {email} directly — the details above are ready to copy.",
      unreachable: "The form service could not be reached. Please email {email} directly — the details above are ready to copy.",
      mailtoNotice: "Your email app should now be open with the message ready to send. Nothing is stored on this website — if the app did not open, copy the text below and send it to {email}."
    },
    bn: {
      emailMissing: "এখনও ইমেইল ঠিকানা যোগ করা হয়নি",
      enquirySubject: "mahiuddin.com থেকে প্রজেক্ট সম্পর্কিত জিজ্ঞাসা",
      copied: "কপি হয়েছে",
      pressCopy: "Ctrl+C চাপুন",
      fillIn: "দয়া করে ঘরটি পূরণ করুন।",
      describeProject: "দয়া করে আপনার প্রজেক্টটি সম্পর্কে লিখুন।",
      validEmail: "দয়া করে একটি সঠিক ইমেইল ঠিকানা দিন।",
      fixFields: "পাঠানোর আগে চিহ্নিত ঘরগুলো ঠিক করুন।",
      subjectFallback: "{name}-এর প্রজেক্ট জিজ্ঞাসা (mahiuddin.com)",
      notGiven: "(দেওয়া নেই)",
      sentFrom: "যোগাযোগ ফর্ম থেকে পাঠানো:",
      to: "প্রাপক", labelName: "নাম", labelEmail: "ইমেইল", labelSubject: "বিষয়", labelBudget: "বাজেট",
      formService: "ফর্ম সার্ভিস",
      sending: "আপনার বার্তা পাঠানো হচ্ছে…",
      sent: "আপনার বার্তা পাঠানো হয়েছে। সাধারণত একটি কর্মদিবসের মধ্যে উত্তর দিই।",
      serviceError: "ফর্ম সার্ভিস ত্রুটি জানিয়েছে (status {status})। দয়া করে সরাসরি {email}-এ লিখুন — উপরের বিস্তারিত কপি করার জন্য প্রস্তুত।",
      unreachable: "ফর্ম সার্ভিসে পৌঁছানো যায়নি। দয়া করে সরাসরি {email}-এ লিখুন — উপরের বিস্তারিত কপি করার জন্য প্রস্তুত।",
      mailtoNotice: "আপনার ইমেইল অ্যাপ খুলে গেছে ও বার্তা পাঠানোর জন্য প্রস্তুত। এই ওয়েবসাইটে কিছুই সংরক্ষণ হয় না — অ্যাপ না খুললে নিচের লেখাটি কপি করে {email}-এ পাঠান।"
    }
  };
  var T = I18N[LANG] || I18N.en;

  function fmt(template, values) {
    return String(template).replace(/\{(\w+)\}/g, function (_, key) {
      return values && values[key] !== undefined ? values[key] : "";
    });
  }

  /* ---------------------------------------------------------------- helpers */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* When a link has no configured value, remove it — and its lone list item,
     so the footer and nav do not keep showing an empty row. */
  function removalTarget(el) {
    var wrapper = el.closest("[data-site-wrapper]") || el.closest("[data-social-wrapper]");
    if (wrapper) return wrapper;
    var parent = el.parentElement;
    if (parent && parent.tagName === "LI" && parent.children.length === 1) return parent;
    return el;
  }

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value);
  }

  /* ------------------------------------------------------------------ config
     Pages contain data-site="email" / data-site="fiverrUrl" markers. This
     replaces the placeholders written in the HTML with real values, and hides
     anything marked data-hide-if-empty that has no value configured. */
  function applyConfig() {
    $$("[data-site]").forEach(function (el) {
      var key = el.getAttribute("data-site");
      var value = CFG[key];

      if (key === "email") {
        var mailto = "mailto:" + (value || "") +
          "?subject=" + encodeURIComponent(T.enquirySubject);
        if (el.tagName === "A") el.setAttribute("href", mailto);
        if (el.getAttribute("data-site-text") !== "hidden" && el.textContent.trim() !== "") {
          el.textContent = value || T.emailMissing;
        }
      } else if (typeof value === "string" && /^(https?:|mailto:|tel:)/.test(value)) {
        if (el.tagName === "A") el.setAttribute("href", value);
      } else if (typeof value === "string" && el.getAttribute("data-site-text") !== null) {
        el.textContent = value;
      }

      var empty = !value || (typeof value === "string" && value.trim() === "");
      if (empty && el.hasAttribute("data-hide-if-empty")) {
        var target = removalTarget(el);
        target.parentNode && target.parentNode.removeChild(target);
      }
    });

    // Optional social icons living in the footer/nav.
    ["linkedinUrl", "twitterUrl", "githubUrl", "fiverrUrl", "whatsappNumber"].forEach(function (key) {
      var selector = '[data-social="' + key + '"]';
      if (!CFG[key]) {
        $$(selector).forEach(function (el) {
          var wrapper = removalTarget(el);
          wrapper.parentNode && wrapper.parentNode.removeChild(wrapper);
        });
      } else {
        $$(selector).forEach(function (el) {
          var href = CFG[key];
          if (key === "whatsappNumber") href = "https://wa.me/" + String(href).replace(/\D/g, "");
          el.setAttribute("href", href);
          el.setAttribute("rel", "noopener noreferrer nofollow");
          el.setAttribute("target", "_blank");
        });
      }
    });
  }

  /* ------------------------------------------------------------------ header */
  function initHeader() {
    var header = $(".site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* -------------------------------------------------------------- mobile nav */
  function initNav() {
    var toggle = $(".nav__toggle");
    var list = $(".nav__list");
    if (!toggle || !list) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      list.classList.toggle("is-open", open);
      document.body.style.overflow = open && window.innerWidth < 1000 ? "hidden" : "";
      if (!open) list.removeAttribute("hidden");
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    list.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1000) {
        setOpen(false);
        list.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ------------------------------------------------- table of contents spy */
  function initToc() {
    var links = $$(".toc a[href^='#']");
    if (links.length < 2 || !("IntersectionObserver" in window)) return;

    var map = new Map();
    links.forEach(function (a) {
      var target = document.getElementById(a.getAttribute("href").slice(1));
      if (target) map.set(target, a);
    });
    if (!map.size) return;

    var visible = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      var first = null;
      map.forEach(function (link, section) {
        if (visible.has(section) && !first) first = link;
      });
      if (!first) {
        // Above the first heading or between sections: keep the last passed one.
        var best = null, bestTop = -Infinity;
        map.forEach(function (link, section) {
          var top = section.getBoundingClientRect().top;
          if (top <= 120 && top > bestTop) { bestTop = top; best = link; }
        });
        first = best;
      }
      links.forEach(function (a) { a.classList.remove("is-active"); });
      if (first) first.classList.add("is-active");
    }, { rootMargin: "-88px 0px -62% 0px", threshold: 0 });

    map.forEach(function (link, section) { io.observe(section); });
  }

  /* --------------------------------------------------------------- copy url */
  function initCopy() {
    $$("[data-copy]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var text = btn.getAttribute("data-copy") || window.location.href;
        var done = function (ok) {
          var original = btn.getAttribute("data-label") || btn.textContent;
          btn.textContent = ok ? T.copied : T.pressCopy;
          window.setTimeout(function () {
            if (btn.tagName === "BUTTON") btn.textContent = original;
          }, 2000);
        };
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
        } else {
          var tmp = document.createElement("textarea");
          tmp.value = text;
          tmp.setAttribute("readonly", "readonly");
          tmp.style.position = "fixed";
          tmp.style.opacity = "0";
          document.body.appendChild(tmp);
          tmp.select();
          var ok = false;
          try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
          document.body.removeChild(tmp);
          done(ok);
        }
      });
    });
  }

  /* ------------------------------------------------------------------ form */
  function initForm() {
    var form = $("#contact-form");
    if (!form) return;

    var status = $(".form-status", form.parentNode);
    var preview = $(".composed", form.parentNode);
    var endpoint = (CFG.formEndpoint || "").trim();
    var mailTo = (CFG.formFallbackEmail || CFG.email || "").trim();

    function say(message, isError) {
      if (!status) return;
      status.textContent = message;
      status.classList.toggle("is-error", !!isError);
      status.classList.add("is-visible");
    }

    function fieldValue(name) {
      var el = form.elements[name];
      return el ? String(el.value).trim() : "";
    }

    function validate() {
      var problems = [];
      var required = ["name", "email", "details"];
      required.forEach(function (name) {
        var el = form.elements[name];
        if (!el) return;
        var field = el.closest(".field");
        var value = String(el.value).trim();
        var bad = !value || (name === "email" && !isEmail(value));
        if (field) {
          field.classList.toggle("is-invalid", bad);
          var msg = $(".field__error", field);
          if (msg) {
            msg.textContent = !value
              ? (name === "details" ? T.describeProject : T.fillIn)
              : T.validEmail;
          }
        }
        if (bad) problems.push(name);
      });
      return problems;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var problems = validate();
      if (problems.length) {
        say(T.fixFields, true);
        var first = form.elements[problems[0]];
        if (first) first.focus();
        return;
      }

      var subject = fieldValue("subject") ||
        fmt(T.subjectFallback, { name: fieldValue("name") });
      var pagePath = CFG.siteUrl || "";
      var body =
        fieldValue("details") +
        "\n\n—\n" + T.labelName + ": " + fieldValue("name") +
        "\n" + T.labelEmail + ": " + fieldValue("email") +
        "\n" + T.labelSubject + ": " + (fieldValue("subject") || T.notGiven) +
        "\n" + T.labelBudget + ": " + (fieldValue("budget") || T.notGiven) +
        "\n\n" + T.sentFrom + " " + pagePath + "/contact/";

      if (preview) {
        preview.textContent = T.to + ": " + (endpoint ? "the form service" : mailTo) +
          "\n" + T.labelSubject + ": " + subject + "\n\n" + body;
        preview.hidden = false;
      }

      if (endpoint) {
        say(T.sending);
        var payload = new URLSearchParams({
          name: fieldValue("name"),
          email: fieldValue("email"),
          subject: fieldValue("subject"),
          budget: fieldValue("budget"),
          message: fieldValue("details")
        });
        if (CFG.formAccessKey) payload.append("access_key", CFG.formAccessKey);

        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
          body: payload.toString()
        })
          .then(function (response) {
            if (response.ok) {
              say(T.sent);
              form.reset();
            } else {
              say(fmt(T.serviceError, { status: response.status, email: mailTo }), true);
            }
          })
          .catch(function () {
            say(fmt(T.unreachable, { email: mailTo }), true);
          });
        return;
      }

      /* No backend configured: be honest and hand the message to the email app. */
      var mailto = "mailto:" + mailTo +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
      say(fmt(T.mailtoNotice, { email: mailTo }));
      window.location.href = mailto;
    });

    $$(".field input, .field textarea", form).forEach(function (el) {
      el.addEventListener("input", function () {
        var field = el.closest(".field");
        if (field) field.classList.remove("is-invalid");
      });
    });
  }

  /* -------------------------------------------------------- footer year etc */
  function initMisc() {
    var year = new Date().getFullYear();
    $$("[data-year]").forEach(function (el) { el.textContent = year; });
  }

  /* ------------------------------------------------------------------- boot */
  function boot() {
    applyConfig();
    initHeader();
    initNav();
    initToc();
    initCopy();
    initForm();
    initMisc();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
