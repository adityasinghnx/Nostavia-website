# Website structure: Nostavia Superintelligence

Working brief for the new site on branch `hive-redesign`.
Source: *Nostavia: Company Description and Website Source* (23 Oct 2026), which replaces the Hive-on-top structure note from the same day.

## 1. The story

Nostavia is a healthcare superintelligence. Everything we sell is a part of it.

```
                 NOSTAVIA SUPERINTELLIGENCE
                 one intelligence at the centre
        ┌────────────────┬────────────────┬────────────────┐
     Human OS            Hive             Studio
   Understands          Works             Builds
 (what it reads)   (Bees do the work)  (what it builds for you)
        └──────── Private by design · People stay in charge · Never clinical judgement ────────┘
```

> Superintelligence is the intelligence. Human OS is what it understands. Hive is where it works. Studio is what it builds for you.

On the site the diagram is a honeycomb: the Superintelligence is the centre cell, the three parts are the cells around it (touching the centre, never each other), and the three promises sit underneath. EHR and LIS are not drawn.

## 2. What changed from the first version of this branch

| First version (Hive on top) | Now |
|---|---|
| Hero: "Your health business, run from one place." | Hero: "Healthcare's superintelligence. Your people stay in charge." (option 1 of 3) |
| Hive was the top layer | Superintelligence is the centre; Hive is one of three parts |
| Menu: Hive · Human OS · Studio · Customers · Developers | Menu: Superintelligence · Hive · Human OS · Studio · Customers · Developers |
| Hive shown as a dashboard | Hive shown as a chat-first workspace (Talk, Delegate, Supervise) |
| Human OS: 7 systems, module catalogue, Live / In development labels, a page per system | Human OS: five families, two groups in text, no catalogue, no status labels. System pages removed and redirected |
| Five customer types incl. insurers | Four: labs, clinics, wellness and health apps, hospitals |
| Client logo strip on | Off until each client gives written permission |
| Company and Security pages, clinical advisory bench | Removed. About lives in the footer; privacy is a section of the Superintelligence page. The bench is unconfirmed (Product Book conflict 7) |
| Encryption and "no keys on device" practices | Removed. Privacy is written only as design intent |

## 3. Site map

| Route | Page |
|---|---|
| `/` | Home: hero, Hive workspace, the problem ("your team is the glue"), how it works (pinned diagram), principles, the Bees, who we work with, closing CTA |
| `/superintelligence` | B2: one intelligence, three parts table, what makes it different, principles (`#private`) |
| `/hive` | B3: chat-first workspace, Talk / Delegate / Supervise, choose your starting team, you stay in control, a Bee at work, getting started |
| `/human-os` | B4: two groups, five families, docs and demo buttons |
| `/studio` | B5: what we build, five steps, promise line |
| `/customers` | B6: four business types, what it helps with, Bees that usually start |
| `/developers` | B7: SDK Portal (sign up, keys, docs, usage), illustrative code |
| `/demo` | B8: Show us where the time goes |

## 4. Bee artwork

Seven Bees from the Nostavia Hive pack are used, each named only by its job: Reports, Re-tests, Patient questions, Bookings, Portal work, Intake briefs, Front desk. Files live in `public/bees/` with job names, so no character name appears even in the page source.

Not used: the crowned Bee (Queen is an internal word), the coordinator, the later-release Bees (claims, procurement, collections, SDK setup, brand, module), and the three scenes (each includes the crowned Bee; the meadow was made with an AI image tool).

## 5. Guardrails applied

- Public words only: Superintelligence, Hive, Bees, Human OS, Studio.
- No status labels, dates, module counts, prices, customer names or logos, certifications, EHR or LIS, comparisons to other AI.
- Every product view carries "Sample data" inside the image.
- "Superintelligence" always sits next to a line that clinicians decide.

## 6. Open items

1. **Hero headline** – option 1 used. One constant (`HERO_HEADLINE` in `src/content/site.ts`).
2. **One-liner and mission** – draft used in meta and footer About.
3. **Studio name** – one constant (`STUDIO`).
4. **Demo reply time** – "We will reply within one working day" is the source copy, still [TO CONFIRM].
5. **SDK Portal links** – no public URL yet; "Get API keys" and "Read the API reference" go to the demo form tagged `interest=developers`.
6. **Terms page** – not drafted, so it is left out of the footer. Privacy policy stays. The old data-deletion and delete-account pages still exist at their URLs for the app stores.
7. **Bee job labels on the site** – shown as jobs ("Reports", "Re-tests"), never as names. Confirm this is fine before the trademark check finishes.
