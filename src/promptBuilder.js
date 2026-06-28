/* Builds a plain-language, copy-ready prompt from a saved order (lead).
 * The admin opens an order, hits "Generate prompt", and pastes the result
 * into Claude Code to rebuild that exact website.
 *
 * Written so a class-10 reader understands every line: the short feature
 * codes stored on the order (countdown, freeShipping, stickyCTA, …) are
 * expanded into their human title + one-line description, pulled from the
 * same catalog the customer picked from (SITE_TYPES in data/content.js).
 */

import { getType } from './data/content.js';

/* Service add-ons live in SERVICE_ADDONS, not in SITE_TYPES.extras, so they
   don't carry a description there — give them plain labels here. */
const ADDON_LABELS = {
  domain:       'A custom domain name (like yourshop.com)',
  hosting:      'Web hosting so the site stays online 24/7',
  database:     'A database to save orders, leads and bookings',
  ssl:          'An SSL certificate — the padlock that makes the site https / secure',
  logo:         'A logo designed for the business',
  paymentSetup: 'Mobile-payment setup (bKash, Nagad, Rocket, Upay)',
  rush:         'Rush delivery — build it faster than usual',
  analytics:    'Visitor analytics to see how many people visit and what they do',
};

const RULE = '========================================';

export function buildOrderPrompt(lead = {}) {
  const type = getType(lead.type);
  const siteKind = `${type.name_en} (${type.tagline_en})`;
  const language = lead.lang === 'en' ? 'English' : 'Bangla (Bengali)';
  const business = (lead.business || '').trim();

  // Must-have sections for this site type.
  const essentials = (type.essentials || []).map((e) => e.label_en);

  // Map each selected feature code -> { title, desc } from the catalog.
  const extrasByKey = {};
  (type.extras || []).forEach((x) => { extrasByKey[x.key] = x; });
  const features = (lead.features || []).map((key) => {
    const x = extrasByKey[key];
    return x ? { title: x.title_en, desc: x.desc_en } : { title: key, desc: '' };
  });

  const addons = (lead.addons || []).map((k) => ADDON_LABELS[k] || k);

  const out = [];
  out.push('Build a complete, mobile-first website for a small business in Bangladesh.');
  out.push('Keep it simple, modern and fast. Build the sections in the order below.');
  out.push('');

  out.push(RULE);
  out.push('1) WHAT KIND OF WEBSITE');
  out.push(RULE);
  out.push(`- Website type: ${siteKind}`);
  out.push(`- Business name: ${business || '(not given — use a friendly placeholder name)'}`);
  out.push(`- Website language: write all the text people see in ${language}.`);
  out.push('');

  out.push(RULE);
  out.push('2) SECTIONS THAT MUST ALWAYS BE THERE');
  out.push(RULE);
  if (essentials.length) essentials.forEach((e) => out.push(`- ${e}`));
  else out.push('- A hero/header, the main content, and a footer with contact info.');
  out.push('');

  out.push(RULE);
  out.push('3) EXTRA FEATURES THE CUSTOMER CHOSE (build every single one)');
  out.push(RULE);
  if (features.length) {
    features.forEach((f, i) => out.push(`${i + 1}. ${f.title}${f.desc ? ` — ${f.desc}` : ''}`));
  } else {
    out.push('(No extra features were picked — keep it to the must-have sections above.)');
  }
  out.push('');

  if (addons.length) {
    out.push(RULE);
    out.push('4) SETUP / SERVICE THE CUSTOMER PAID FOR');
    out.push(RULE);
    addons.forEach((a) => out.push(`- ${a}`));
    out.push('');
  }

  out.push(RULE);
  out.push('5) RULES FOR HOW TO BUILD IT');
  out.push(RULE);
  out.push('- Mobile-first: most visitors are on phones, so it must look great on a small screen.');
  out.push('- Use a clean, modern, trustworthy design with good spacing and easy-to-read fonts.');
  out.push('- Bangladeshi customers pay with bKash, Nagad, Rocket and Upay — show these wherever payment happens.');
  out.push('- Cash on delivery (COD) is common here; support it where it makes sense.');
  out.push('- Where real photos or text are missing, use nice placeholder/demo content that is easy to swap later.');
  out.push('- Make sure every button and link works, the page loads fast, and nothing looks broken.');
  out.push('');

  if ((lead.note || '').trim()) {
    out.push(RULE);
    out.push('6) THE CUSTOMER’S OWN NOTE (read this carefully)');
    out.push(RULE);
    out.push(`"${lead.note.trim()}"`);
    out.push('');
  }

  out.push('----------------------------------------');
  const ref = [];
  if (lead.ref_id) ref.push(`Order ref: ${lead.ref_id}`);
  if (lead.duration) ref.push(`Service plan: ${lead.duration} months of upkeep after launch`);
  if (ref.length) out.push(ref.join('  |  '));
  out.push('Goal: when you finish, the owner should be able to open the site and start taking orders.');

  return out.join('\n');
}
