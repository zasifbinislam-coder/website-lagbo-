export const formatBDT = (n) => '৳' + n.toLocaleString('en-IN');

/* Validate Bangladesh mobile number.
   Accepts: 01XXXXXXXXX (11 digits starting 01[3-9])
   Or: +88 01XXXXXXXXX, 8801XXXXXXXXX, with spaces/hyphens — we strip them. */
export const validateBDPhone = (raw) => {
  if (!raw) return false;
  const digits = raw.replace(/[\s\-+]/g, '');
  // strip leading 88 country code if present
  const local = digits.startsWith('88') ? digits.slice(2) : digits;
  return /^01[3-9]\d{8}$/.test(local);
};

/* Validate email — basic but covers most real cases */
export const validateEmail = (raw) => {
  if (!raw) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw.trim());
};
