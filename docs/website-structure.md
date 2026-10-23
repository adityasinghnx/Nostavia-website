# Website structure from the 23 Oct 2026 company structure

Working brief for the new site on branch `hive-redesign`. Source: *Nostavia — Company Structure (Final, 23 Oct 2026)*.

## 1. What changes

The current site sells **delivery modes** (Custom Build, White Label, SDK), a **Human OS** catalogue, eight **industry** pages and a dozen **solution** pages with code names (Gravity, Comet, StoryHealth, Atlas…). A buyer has to work out how those pieces fit together.

The new structure has one story with one diagram:

```
                    HIVE
   One place. Your Bees run everything you have with Nostavia.
        ┌──────────────────┬──────────────────┐
     Human OS            Studio          (EHR, LIS: internal, not on the site)
  What we've built   What we build for you
```

So the website stops leading with modules and starts leading with **Hive**: the one place the customer works, where Bees do the work. Human OS and Studio are the two ways work gets into Hive. They are peers, never drawn as a chain.

| Current site | New site |
|---|---|
| "AI health products under your brand", hero about modules | Hero about Hive: one place, Bees do the work |
| Custom Build | **Studio** |
| SDK | **Developers** (SDK Portal and docs) |
| White Label | No line of its own. A branded app is either Human OS modules delivered through the SDK Portal or a Studio build |
| Human OS: Person ring / Team ring | Human OS: **For your customers** / **For your care team** |
| "Partner Portal" | **SDK Portal** |
| Industries (8 pages) | **Customers**: one page, by type of health business |
| Solutions with code names (12 pages) | Retired. Their substance lives in Human OS modules or Studio. 301 redirects |
| Pricing (calculator) | Not in the menu. Dropped from this version; pricing is handled in the demo call |
| Security, Clinical, Company | Footer |

## 2. Site map

Menu: **Hive · Human OS · Studio · Customers · Developers** [Book a demo]

| Route | Page | Job |
|---|---|---|
| `/` | Home | Explain the structure in one scroll: Hive on top, Human OS and Studio underneath |
| `/hive` | Hive | What it is like to work in Hive; what Bees do; where humans stay in control |
| `/human-os` | Human OS | The modules, grouped *for your customers* and *for your care team*; how to get them (SDK Portal) |
| `/human-os/:system` | System pages | One page per system (Health Decoder, Digital Twin, …) |
| `/studio` | Studio | How we listen, build, hand over into Hive and stay on |
| `/customers` | Customers | Who we work with, by type of business, and what each one usually starts with |
| `/developers` | Developers | SDK Portal, API keys, docs, code |
| `/company` | Company | Founders, clinical advisory bench, where we are |
| `/security` | Security | How we handle health data. Practices only, no certifications |
| `/demo` | Book a demo | Form + calendar |

## 3. Homepage narrative

1. **Hero.** Your health business, run from one place. Hive + Bees in one line. Live Hive window under the fold.
2. **Client logos.** (See open question 3.)
3. **The structure.** Scroll-driven diagram: Hive → Human OS → Studio, one step at a time. The "simple way to say it" from section 7 of the structure doc.
4. **Inside Hive.** What a Bee does in a day: reports out, calls answered, follow-ups sent, anything clinical waiting for a human.
5. **Human OS.** Two categories, explorable, modules by system.
6. **Studio.** Listen → build → run in Hive → stay on.
7. **Customers.** Labs, clinics, hospitals, wellness apps, insurers.
8. **Developers.** SDK Portal and a code sample.
9. **How we handle health data.** Practices, no compliance claims.
10. **Book a demo.**

## 4. Words

| Say outside | Keep inside |
|---|---|
| Hive, Bees | Report Bee or any other Bee name (until Anushka confirms) |
| For your customers / For your care team | Person ring / Team ring |
| SDK Portal | Partner Portal |
| What we've built / What we build for you | "feeds into", "layer below", any chain language |
| We stay on after launch | Retainer |
| — | EHR, LIS |

Never on the site: EHR or LIS; ISO, HIPAA, GDPR, SOC 2 or any wording that suggests Nostavia holds a certification; revenue, traction or the module totals (43 / ~20 live) until verified.

## 5. Redirects (added to `vercel.json`)

| Old | New |
|---|---|
| `/platform` | `/hive` |
| `/industries/*` | `/customers` |
| `/solutions/engineering`, `/solutions/supplements` | `/studio` |
| `/solutions/gravity` | `/developers` |
| `/solutions/storyhealth` | `/human-os` |
| `/solutions/front-desk`, `/solutions/ai-agents`, `/solutions/voice-agents` | `/human-os/agent-workforce` |
| `/solutions/hospitals`, `/solutions/hospitals-front-door` | `/customers` |
| other `/solutions/*` | `/human-os` |
| `/pricing` | `/demo` |
| `/clinical` | `/company` |

## 6. Open questions

1. **Bees vs "Agent Workforce".** Human OS has a system called Agent Workforce (AI Voice Agent, Chat Agent, Follow-Up Agent…). Next to Bees, buyers will see two kinds of AI worker. Suggest renaming the system (for example *Front Desk*) or presenting those modules as work the Bees run. The new site keeps the current names for now.
2. **Module statuses.** Live / Next labels come from `src/content/human-os.ts`. The new site shows them per module but never prints totals. One flag (`SHOW_MODULE_STATUS`) hides them until Anushka confirms.
3. **Client logos.** The guardrail says no customer names in material built from the structure, but the menu has a Customers page and the current logo bar is well liked. The new site keeps the logos behind one flag (`SHOW_CLIENT_LOGOS`). Suggest written OK from each client before launch.
4. **Compliance lines on the current site.** "DPDP Act 2023 aligned", "ABDM and ABHA ready" and "Built on SOC 2 Type II certified infrastructure" read as compliance claims. The new site drops them and lists practices only.
5. **App Store / Google Play badges.** We sell to businesses, not the public, so the new site drops the download badges. Privacy, data-deletion and delete-account pages stay in the footer.
6. **Pricing.** Not in the new menu. Dropped from this version. Decide whether Hive gets public pricing later.
7. **One-liner and the Studio name** are both drafts for Aditya to approve. Studio is a single constant in `src/content/site.ts`, so a rename touches one line.
8. **Funding banner** (₹50 Lakh) is left off the new version.
