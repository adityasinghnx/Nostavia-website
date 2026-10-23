# Website structure

Working brief for the new site on branch `hive-redesign`.
Sources: *Nostavia: Company Description and Website Source* (23 Oct 2026) for copy and guardrails, with the owner's direction of 24 Oct on positioning, which overrides it where they differ.

## 1. The story

**The products are Human OS and Studio. Hive is how you use them.**

| | What it is | One line |
|---|---|---|
| **Human OS** | Product: ready-made | Health AI modules, ready to switch on |
| **Studio** | Product: built for you | The product you need, built in your brand |
| **Hive** | How you use them | One workspace where AI Bees run the routine work; your team talks, delegates and approves |
| API / SDK Portal | The other way to use Human OS | Call any module from your own app |

"Superintelligence" appears only in the hero headline and page title. It is not a product, a menu item or a page.

## 2. Menu

**Human OS · Studio · Hive · Customers · Developers** [Book a demo]

Human OS has a dropdown with its five families.

## 3. Pages

| Route | What is on it |
|---|---|
| `/` | Hero ("Health AI, ready-made or built for you") · What we offer (Human OS and Studio cards with product visuals, the Hive band, the API line) · The problem · Human OS explorer · Studio (doctor portal and patient app) · Hive (workspace, the Bees, Talk / Delegate / Supervise) · Principles · Who we work with · Closing CTA |
| `/human-os` | Report preview · two groups · five families with module names · three ways to use it |
| `/studio` | Device visual · what we build · five steps · promise line |
| `/hive` | Chat-first workspace · meadow group shot of the Bees · Talk / Delegate / Supervise · choose your starting team · you stay in control · a Bee at work · getting started |
| `/customers` | Labs, clinics, health apps, hospitals: what we help with and the Bees that usually start |
| `/developers` | SDK Portal, illustrative code |
| `/demo` | Show us where the time goes |

Old URLs (`/superintelligence`, `/platform`, `/company`, `/security`, `/clinical`, `/human-os/*`, `/industries/*`, `/solutions/*`, `/pricing`) redirect.

## 4. Human OS families

Reports and lab insight · Everyday health · Body systems and life stages · Devices · Care pathways. Module names are shown with one-line descriptions. **No status labels and no counts.** `FLAGS.SHOW_MODULE_NAMES` in `src/content/site.ts` hides the names (families only) until Anushka confirms which modules can be shown. The family-to-group mapping (for your customers / for your care team) is also to confirm.

## 5. Bee artwork

Seven Bees named only by job: Reports, Re-tests, Patient questions, Bookings, Portal work, Intake briefs, Front desk. Files in `public/bees/` carry job names only. The meadow scene is used as the group shot on `/hive`, with the owner's OK; the README notes it was made with an AI image tool, so check that tool's terms before commercial launch.

## 6. Motion

Calm by rule: the hero honeycomb breathes and parts around the pointer; job labels fade in beside it. No fast travelling dots anywhere. Lines in the problem figure draw once. Everything respects reduced motion.

## 7. Guardrails

No status labels or dates, EHR or LIS, module counts, prices, customer names or logos, certifications, internal Hive words, Bee character names, comparisons to other AI. Every product view carries "Sample data" (or "Sample brand") inside the image. Nothing implies clinical judgement.

## 8. Open items

1. One-liner (draft in `src/content/site.ts`). The hero headline is "Healthcare’s superintelligence, ready-made or built for you." (24 Oct 2026); "superintelligence" is used in the headline only.
2. Studio name (one constant).
3. Which Human OS modules can be shown, and their groups (Anushka).
4. Demo reply time ("within one working day" is still [TO CONFIRM]).
5. SDK Portal URL: buttons go to the demo form until it exists.
6. Terms page: left out of the footer until drafted.
7. Meadow image: AI-tool licence check before launch.
