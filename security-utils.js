(function (global) {
  "use strict";

  function stripNulls(s) {
    return String(s).replace(/\u0000/g, "");
  }

  /** Plain text: trim length, remove angle brackets to reduce XSS if data is ever reflected as HTML. */
  function sanitizePlainText(value, maxLen) {
    var t = stripNulls(value == null ? "" : value).trim();
    if (maxLen > 0 && t.length > maxLen) t = t.slice(0, maxLen);
    return t.replace(/[<>]/g, "");
  }

  /** Message body: same + allow newlines; strip other control chars except \n \r \t. */
  function sanitizeMultiline(value, maxLen) {
    var t = sanitizePlainText(value, maxLen);
    return t.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, function (ch) {
      return ch === "\n" || ch === "\r" || ch === "\t" ? ch : "";
    });
  }

  /** Allow typical phone characters only (client-side; server must still validate). */
  function sanitizePhone(value, maxLen) {
    var t = stripNulls(value == null ? "" : value).trim();
    if (maxLen > 0 && t.length > maxLen) t = t.slice(0, maxLen);
    return t.replace(/[^\d+\-().\s]/g, "");
  }

  function validateLeadForm(form) {
    var name = form.querySelector('[name="name"]');
    var phone = form.querySelector('[name="phone"]');
    var message = form.querySelector('[name="message"]');
    var errors = [];
    var nameV = name ? sanitizePlainText(name.value, 120) : "";
    var phoneV = phone ? sanitizePhone(phone.value, 32) : "";
    var msgV = message ? sanitizeMultiline(message.value, 4000) : "";
    if (name) name.value = nameV;
    if (phone) phone.value = phoneV;
    if (message) message.value = msgV;
    if (!nameV) errors.push("name");
    if (!phoneV) errors.push("phone");
    return { ok: errors.length === 0, errors: errors, name: nameV, phone: phoneV, message: msgV };
  }

  global.LedVisionSecurity = {
    sanitizePlainText: sanitizePlainText,
    sanitizeMultiline: sanitizeMultiline,
    sanitizePhone: sanitizePhone,
    validateLeadForm: validateLeadForm,
  };
})(typeof window !== "undefined" ? window : this);
