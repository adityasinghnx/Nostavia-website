import os

pages = {
    "labs.html": {
        "title": "Diagnostic Labs",
        "headline": "Smart Report as a Service.",
        "subtitle": "Turn standard reports into daily relationships. Generate personalized interpretations, historical trend lines, and automated re-test prompts for every routine panel.",
        "metrics": [
            ("100+", "Biomarkers Decoded"),
            ("20 mins", "Saved per Report"),
            ("0", "Marginal Headcount")
        ],
        "problem": {
            "title": "The Diagnostic Blind Spot",
            "desc": "Diagnostic laboratories own the most valuable data in healthcare, but not the intelligence layer on top of it. You process thousands of panels a day, but the end product is a static PDF. Patients take those PDFs to a clinician, or worse, Google them. Your laboratory loses the relationship the moment the report is delivered, forfeiting the lifetime value of the patient."
        },
        "bento": [
            {
                "span": "span-8",
                "icon": "file-text",
                "title": "Smart Report as a Service",
                "desc": "Instead of handing patients a table of numbers and \"normal\" reference ranges, deliver a beautifully formatted, consumer-friendly Smart Report. Nostavia automatically ingests the raw data from your LIS, classifies biomarkers against optimal ranges for long-term health (not just disease absence), builds historical trend lines for returning patients, and flags early deterioration. This is the exact interpretation a longevity clinician would spend twenty minutes writing, generated in under 50 milliseconds and delivered entirely under your laboratory's brand."
            },
            {
                "span": "span-4",
                "icon": "clock",
                "title": "Clinical Intake Briefs",
                "desc": "Arm your partner physicians with superpowers. Nostavia parses years of a patient's LIS history, flags critical outliers, and summarizes biological drift into a single-page brief generated the moment the patient checks in for a consult. Save doctors time, and they will route more testing volume to your lab."
            },
            {
                "span": "span-12",
                "icon": "refresh-cw",
                "title": "Re-Test Recall Campaigns",
                "desc": "Reactivate dormant patients automatically. Nostavia's intelligence engine constantly sweeps your laboratory's historical database to identify who is due for a re-test and exactly why. If a patient's HbA1c was borderline six months ago, Nostavia triggers a personalized, medically-grounded email or SMS prompt under your lab's name, explaining the clinical value of re-testing today. Turn your archive of dead PDFs into a recurring revenue engine."
            }
        ],
        "how_it_works": [
            {
                "title": "Data Ingestion via API or LIS Integration",
                "desc": "Connect your Laboratory Information System (LIS) directly to Nostavia's secure ingestion API. We support HL7, FHIR, and custom JSON payloads. Data never rests in our cloud; it is processed entirely in memory."
            },
            {
                "title": "Biomarker Decoding & Normalization",
                "desc": "The SOMA engine maps your lab's specific assay codes and reference ranges to our universal biomarker ontology, standardizing over 100+ unique metabolic, hormonal, and cardiovascular markers."
            },
            {
                "title": "Intelligence & Interpretation Generation",
                "desc": "Our clinical rules engine evaluates the normalized data against optimal longevity ranges, cross-references historical tests to calculate drift, and generates a personalized, plain-English interpretation of the patient's biological state."
            },
            {
                "title": "White-Label Delivery",
                "desc": "The final Smart Report is pushed back to your LIS or patient portal as a structured JSON object or a rendered, branded PDF, completely invisible to the end user."
            }
        ],
        "faqs": [
            ("How long does integration take?", "Standard API integration takes less than two weeks. If you prefer not to write any code, you can use our secure drag-and-drop web portal to upload batches of LIS exports directly."),
            ("Is patient data stored on Nostavia's servers?", "No. We operate a zero-retention architecture for LIS payloads. Personally Identifiable Information (PII) is stripped at the edge. We process the anonymous biomarker payload in memory, return the interpretation, and instantly destroy the payload."),
            ("How do you handle different reference ranges across labs?", "Nostavia's ontology maps your specific reference ranges alongside our 'Optimal' ranges. The generated reports will always respect the clinical bounds set by your specific assay machinery while providing the 'Optimal' context as an overlay."),
            ("What is the pricing model?", "We operate on a pure usage-based model. You are charged a fractional fee per Smart Report generated. There are no massive upfront licensing fees or restrictive annual contracts.")
        ]
    },
    "clinics.html": {
        "title": "Longevity Clinics",
        "headline": "Intelligence for Longevity.",
        "subtitle": "Close the gap between healthspan and revenue. Deploy continuous, adaptive protocols powered by the world's most advanced biological reasoning engine.",
        "metrics": [
            ("24/7", "AI Companion"),
            ("100+", "Biomarker Correlation"),
            ("1", "Integration")
        ],
        "problem": {
            "title": "The Data Problem in Longevity",
            "desc": "Precision medicine and longevity clinics generate massive amounts of multi-omics, biomarker, and wearable data. Yet, the work to correlate these findings and deliver continuous protocols to the patient is highly manual, unscalable, and episodic. Your clients buy one expensive panel, get an incredible consultation, and then go dark for a year because you lack the software to manage their biology continuously."
        },
        "bento": [
            {
                "span": "span-6",
                "icon": "activity",
                "title": "Whole-Body Correlation",
                "desc": "Stop looking at biomarkers in isolation. Nostavia's engine understands how one system in the body responds to changes in another. By fusing medical records, continuous wearable data (Oura, Apple Watch, WHOOP), and daily nutrition logs, we build a complete, interacting digital twin of your patient's metabolism. If their sleep architecture degrades, the engine immediately cross-references their recent cortisol and glucose markers to pinpoint the root cause."
            },
            {
                "span": "span-6",
                "icon": "cpu",
                "title": "SOMA Dual-Brain Architecture",
                "desc": "Consumer LLMs hallucinate; standard rule-engines are too rigid. Nostavia solves this with the SOMA Dual-Brain Architecture. A deterministic clinical-rules layer handles all high-risk medical logic and biomarker classification, ensuring zero hallucinations. A 70B-class reasoning model then translates those strict clinical outputs into empathetic, conversational insights tailored perfectly to the patient's literacy level."
            },
            {
                "span": "span-12",
                "icon": "clipboard-list",
                "title": "Adaptive, Continuous Protocols",
                "desc": "Deliver value 365 days a year, not just on consultation day. Nostavia returns continuous, adaptive protocols tailored to the individual's changing biology. As the patient's wearable data syncs overnight, the engine automatically adjusts their daily macros, supplementation timing, and zone-2 cardio requirements. Launch this capability directly inside a white-labeled mobile app carrying your clinic's premium branding."
            }
        ],
        "how_it_works": [
            {
                "title": "Baseline Establishment",
                "desc": "The patient completes their initial blood panel, DEXA scan, and onboarding questionnaire at your clinic. This data is ingested into the Nostavia engine to establish their baseline biological age and metabolic profile."
            },
            {
                "title": "Wearable Synchronization",
                "desc": "The patient connects their preferred wearables (Oura, Apple Watch) via your branded app. Nostavia begins streaming continuous HRV, resting heart rate, and sleep staging data."
            },
            {
                "title": "Dynamic Protocol Generation",
                "desc": "The engine synthesizes the static lab baseline with the dynamic wearable data to generate a daily protocol covering nutrition, supplementation, and movement."
            },
            {
                "title": "Continuous Re-Calibration",
                "desc": "As the patient follows (or breaks) the protocol, the wearable data reflects the biological impact. The engine automatically re-calibrates the protocol and alerts your clinical staff if intervention is required."
            }
        ],
        "faqs": [
            ("Does Nostavia replace my clinicians?", "Absolutely not. Nostavia is decision-support infrastructure. It automates the tedious data-correlation and patient follow-up, allowing your clinicians to practice at the top of their license and handle 10x the patient load."),
            ("Can we customize the protocols?", "Yes. The SOMA engine allows clinics to inject their own proprietary clinical philosophy. If your clinic strongly prefers specific supplementation brands or dietary frameworks (e.g., Keto over Paleo), the engine will bias protocol generation to match your clinical voice."),
            ("How do you handle patient data privacy?", "We are aligned with global healthcare data standards. All data is encrypted at rest and in transit. The application operates strictly on a consent-driven model, and patients retain full control over their data streams."),
            ("Can we launch a branded app?", "Yes. We offer a completely white-labeled iOS and Android application. Your patients download 'Your Clinic App' from the App Store. Nostavia operates the entire intelligence engine invisibly in the background.")
        ]
    },
    "wellness.html": {
        "title": "Fitness & Sports",
        "headline": "Biological Context.",
        "subtitle": "Understand the true impact of movement and nutrition on the whole body. Transform raw activity tracking into metabolic intelligence.",
        "metrics": [
            ("4+", "Wearable Brands Supported"),
            ("Real-Time", "Data Ingestion"),
            ("100%", "White-Labelled")
        ],
        "problem": {
            "title": "Beyond Activity Tracking",
            "desc": "Modern wellness products stop at activity tracking and generic diet plans. A massive sector of the health economy shares a single blind spot: everyone collects health data, but nobody converts it into continuous, adapting intelligence. Telling a user they ran 5 miles is a commodity; telling them how that run impacted their insulin sensitivity is a superpower."
        },
        "bento": [
            {
                "span": "span-4",
                "icon": "apple",
                "title": "Food Bio-Impact Engine",
                "desc": "Model the true metabolic impact of nutrition directly within your application. Users log their meals, and the engine calculates the anticipated glycemic load, hormonal response, and circadian alignment based on their unique biological profile. Move beyond simple calorie counting to true metabolic optimization."
            },
            {
                "span": "span-8",
                "icon": "watch",
                "title": "Wearable Signal Fusion",
                "desc": "Don't force users to look at six different apps to understand their body. Nostavia fuses heart-rate variability, sleep staging, recovery scores, and stress signals from Apple Watch, Oura, WHOOP, and Fitbit with your platform's lifestyle logs. We build a complete, unified biological picture and return actionable insights (e.g., 'Your HRV is down 12% today; swap your HIIT session for Zone 2 cardio')."
            }
        ],
        "how_it_works": [
            {
                "title": "SDK Integration",
                "desc": "Embed the Nostavia Wearables SDK and Intelligence SDK directly into your existing React Native, iOS, or Android application using our streamlined drop-in components."
            },
            {
                "title": "OAuth & Consent",
                "desc": "Your users authenticate their wearable devices through our unified, white-labeled OAuth flow, granting your application access to their physiological streams."
            },
            {
                "title": "Continuous Synchronization",
                "desc": "Nostavia handles all webhook management, rate-limiting, and token refreshes, streaming clean, normalized JSON payloads to your backend."
            },
            {
                "title": "Insight Rendering",
                "desc": "Query the Intelligence API to retrieve personalized insights, recovery scores, and metabolic impact metrics to display beautifully within your UI."
            }
        ],
        "faqs": [
            ("Which wearables do you support?", "We currently support Apple Health (Apple Watch), Google Health Connect, Oura, WHOOP, Garmin, and Fitbit. We continuously add new providers, and you get access to all of them through a single unified API."),
            ("Do we have to design the UI for the insights?", "You can use our headless API to design your own completely custom UI, or you can use our drop-in UI components (available for React and React Native) to launch beautifully designed insight cards instantly."),
            ("How fast is the API?", "The Intelligence API operates with sub-50ms latency for all standard queries, ensuring your application feels lightning fast and native to the user."),
            ("Can we use this for corporate wellness?", "Yes. The platform includes powerful anonymized aggregation tools, allowing you to build leaderboards, health-score averages, and corporate wellness reports without compromising individual employee privacy.")
        ]
    },
    "insurers.html": {
        "title": "Health Insurers",
        "headline": "Risk Scoring from Biomarkers.",
        "subtitle": "Move from static actuarial tables to real-time biological data and predictive digital-twin simulation.",
        "metrics": [
            ("74%", "Deaths from Lifestyle Disease"),
            ("100+", "Biomarkers"),
            ("Predictive", "Modeling")
        ],
        "problem": {
            "title": "Continuous Risk Assessment",
            "desc": "Approximately 74% of deaths worldwide are now caused by non-communicable, lifestyle-driven diseases — conditions that take decades to develop and are continuously monitorable. Yet, insurers currently rely on lagging indicators, annual questionnaires, and demographic averages. The risk model is fundamentally broken because it lacks real-time biological resolution."
        },
        "bento": [
            {
                "span": "span-12",
                "icon": "brain-circuit",
                "title": "Digital-Twin Simulation & Predictive Modeling",
                "desc": "Nostavia introduces real-time actuarial science. By utilizing opt-in streams of decoded lab data and continuous wearable signals (HRV, resting heart rate, sleep architecture), we construct a metabolic digital twin of the policyholder. Our predictive models can forecast the onset of metabolic syndrome, type 2 diabetes, and cardiovascular events years before they manifest clinically. This allows insurers to transition from passively paying out claims to actively incentivizing health, dynamically pricing premiums based on real-time biological improvement rather than demographic averages."
            }
        ],
        "how_it_works": [
            {
                "title": "Policyholder Opt-In",
                "desc": "Insurers offer premium discounts or wellness incentives in exchange for policyholders opting into continuous data sharing via the Nostavia-powered white-label app."
            },
            {
                "title": "Biomarker & Telemetry Ingestion",
                "desc": "The engine ingests historical claims data, annual blood panel results, and continuous telemetry from the policyholder's wearables."
            },
            {
                "title": "Risk Stratification",
                "desc": "Nostavia's models segment the population into dynamic risk cohorts, flagging individuals whose biological trajectory indicates an impending high-cost health event."
            },
            {
                "title": "Proactive Intervention",
                "desc": "The platform automatically deploys targeted, medically-validated lifestyle interventions to at-risk individuals, steering them away from chronic disease and drastically reducing long-term claims costs."
            }
        ],
        "faqs": [
            ("Is this compliant with insurance regulations?", "Yes. The platform operates on a strict, explicit opt-in consent model. Data is never used for punitive pricing or coverage denial (where prohibited by law), but rather for underwriting discounts, wellness rewards, and proactive care management."),
            ("How accurate is the predictive modeling?", "Our models are trained on massive, proprietary datasets of longitudinal multi-omics data. They achieve state-of-the-art AUC scores for predicting metabolic syndrome and early-stage cardiovascular risk, significantly outperforming traditional demographic models."),
            ("Can we integrate this with our existing underwriting engine?", "Yes. The Nostavia Risk API can pipe real-time biological risk scores directly into your existing actuarial and underwriting systems via secure webhooks."),
            ("Do you provide the consumer app for policyholders?", "Yes. We can deploy a fully white-labeled version of our application, allowing your policyholders to track their health, sync their wearables, and earn their insurance rewards all within a premium, branded environment.")
        ]
    },
    "sdk.html": {
        "title": "Intelligence SDK",
        "headline": "The Intelligence SDK.",
        "subtitle": "Embed the world's most advanced health intelligence engine into your existing application in days, not years.",
        "metrics": [
            ("< 50ms", "API Latency"),
            ("REST", "and GraphQL API"),
            ("12-18mo", "Saved Engineering Time")
        ],
        "problem": {
            "title": "The Cost of Building In-House",
            "desc": "Ambitious consumer health brands routinely waste 12 to 18 months and millions of dollars trying to build interpretation loops in-house. Standard data APIs simply move raw signals between devices, but they never observe clinical outcomes. Building a clinical rules engine, training a medical LLM, and maintaining hardware integrations is a massive distraction from your core product. The intelligence layer is missing."
        },
        "bento": [
            {
                "span": "span-6",
                "icon": "file-search",
                "title": "100+ Biomarker Decoding Engine",
                "desc": "Drop in our PDF parsing API to instantly understand any lab report in the world. We handle native PDF extraction, OCR for scans, digital-signature validation, and the complex classification of over 100 markers. Returns clean, structured JSON classifying every value as optimal, in-range, or outlier."
            },
            {
                "span": "span-6",
                "icon": "message-square",
                "title": "AI Concierge & Conversational Interface",
                "desc": "Embed continuous intelligence that actually learns what works for a specific body. The AI Concierge acts as a biological analyst that knows the individual's history, wearable data, and lab results. Users can ask 'Why is my recovery low today?' and receive an answer grounded in their actual physiology, not generic advice."
            }
        ],
        "how_it_works": [
            {
                "title": "API Authentication",
                "desc": "Authenticate via standard OAuth 2.0. Issue scoped JWTs to your frontend clients to interact directly with the Nostavia edge."
            },
            {
                "title": "Data Payload Submission",
                "desc": "Submit unstructured lab PDFs, raw LIS JSON, or manual biomarker entries to the `/v1/intelligence/parse` endpoint."
            },
            {
                "title": "Synchronous Processing",
                "desc": "The engine decodes, classifies, and generates interpretations synchronously, returning a massive, structured intelligence payload in under 500ms."
            },
            {
                "title": "UI Rendering",
                "desc": "Use the structured JSON to power your own bespoke UI, or utilize our React SDK components to render beautiful graphs and insight cards instantly."
            }
        ],
        "faqs": [
            ("Do you offer a GraphQL API?", "Yes. In addition to our REST endpoints, we offer a fully featured GraphQL API, allowing your frontend clients to request exactly the biological data shapes they need, minimizing over-fetching."),
            ("How do you prevent the AI Concierge from giving dangerous medical advice?", "The Concierge operates strictly within a 'wellness and optimization' guardrail system. It utilizes RAG (Retrieval-Augmented Generation) against a vetted clinical database and refuses to diagnose conditions or prescribe medication, always deferring to a physician for acute issues."),
            ("What is the uptime SLA?", "Enterprise SDK contracts include a 99.99% uptime SLA, backed by multi-region redundancy on AWS, and dedicated Slack support channels with our core engineering team."),
            ("Is the SDK available for mobile?", "Yes. The Intelligence SDK is available natively for iOS (Swift), Android (Kotlin), and cross-platform frameworks (React Native, Flutter).")
        ]
    },
    "wearables.html": {
        "title": "Wearables SDK",
        "headline": "The Wearables SDK.",
        "subtitle": "One unified integration for Apple Watch, Oura, WHOOP, Fitbit, and Garmin. Stop maintaining hardware APIs.",
        "metrics": [
            ("1", "Unified SDK"),
            ("4+", "Major Devices"),
            ("Real-Time", "Data Sync")
        ],
        "problem": {
            "title": "Fragmented Device Ecosystems",
            "desc": "The wearable market is a fragmented nightmare of competing standards. Engineering teams waste months maintaining a dozen separate provider integrations, wrestling with custom OAuth flows, undocumented API changes, and writing bespoke parsing logic for every new piece of hardware that hits the market. It is an endless maintenance sinkhole."
        },
        "bento": [
            {
                "span": "span-12",
                "icon": "activity",
                "title": "Universal Normalisation & Real-Time Sync",
                "desc": "Write code once. A single integration with the Nostavia Wearables SDK normalises every major device on the market into a single, elegant schema. We handle the OAuth handshakes, token refreshes, rate-limiting, and webhook ingestion invisibly. We ingest heart-rate variability, sleep staging, recovery scores, SpO2, and stress signals, cleaning and structuring the data instantly. When WHOOP updates their API, our engineers fix it—your code never breaks."
            }
        ],
        "how_it_works": [
            {
                "title": "Drop-In Authentication UI",
                "desc": "Launch the Nostavia `DeviceManager` component in your app. It provides a beautiful, white-labeled UI for users to select and authenticate their preferred wearable device."
            },
            {
                "title": "Background Synchronization",
                "desc": "Once authorized, Nostavia establishes background webhook connections with the provider (e.g., Oura Cloud). Data syncs automatically as the user wears the device."
            },
            {
                "title": "Universal Schema Transformation",
                "desc": "Nostavia transforms proprietary data shapes (like WHOOP's 'Recovery Score' vs Garmin's 'Body Battery') into a unified, predictable `NormalizedTelemetry` schema."
            },
            {
                "title": "Webhook Delivery",
                "desc": "Clean, normalized JSON payloads are pushed directly to your backend servers via secure webhooks the moment new data is available."
            }
        ],
        "faqs": [
            ("Do users need to create a Nostavia account?", "No. The integration is completely white-labeled. The OAuth consent screens will display your company's name and logo. The user never knows Nostavia exists."),
            ("Can I request historical data?", "Yes. Upon initial connection, you can configure the SDK to backfill up to 3 years of historical telemetry data from the provider (subject to the provider's API limits)."),
            ("What happens if a provider's API goes down?", "Nostavia acts as a resilient buffer. We automatically queue webhook retries, handle exponential backoff, and provide detailed dashboard analytics on provider uptime and sync status."),
            ("Is the data stored on Nostavia servers?", "You have the option to use Nostavia purely as a passthrough pipe (zero retention) or to utilize our managed datastore for faster querying and historical aggregations.")
        ]
    },
    "white-label.html": {
        "title": "White-Label App",
        "headline": "Your Brand, Our Engine.",
        "subtitle": "Launch a complete, premium health intelligence platform in weeks. Zero engineering required.",
        "metrics": [
            ("0", "Engineering Required"),
            ("iOS/Android", "Native Apps"),
            ("100%", "Branded")
        ],
        "problem": {
            "title": "The Application Gap",
            "desc": "Diagnostic labs, preventive clinics, and enterprise wellness brands often lack a modern consumer application. But building a native app from scratch requires hiring a dedicated product, design, and engineering team, distracting entirely from your core clinical operations. You need digital presence, but you shouldn't have to become a software company to get it."
        },
        "bento": [
            {
                "span": "span-8",
                "icon": "smartphone",
                "title": "The Complete Digital Platform",
                "desc": "Deploy a world-class iOS and Android application without writing a single line of code. We deliver a fully compiled, App Store-ready application carrying your exact brand colors, typography, and logos. The app includes biometric tracking, wearable syncing, lab report uploading, and the AI concierge—all powered by the Nostavia engine running invisibly in the background. Your users experience a flawless, premium digital extension of your brand."
            },
            {
                "span": "span-4",
                "icon": "eye-off",
                "title": "Invisible Infrastructure",
                "desc": "We are the plumbing; you are the brand. Nostavia operates entirely behind the scenes. We manage the App Store submissions, handle iOS/Android updates, and maintain the cloud infrastructure. Your users only ever interact with your company."
            }
        ],
        "how_it_works": [
            {
                "title": "Brand Configuration",
                "desc": "Provide our deployment team with your brand guidelines, logos, typography, and primary color palette. We configure the application theme to match your identity perfectly."
            },
            {
                "title": "Feature Toggling",
                "desc": "Select which Nostavia modules you want active. Turn on the Lab Decoder, disable the Food Scanner, or enable Wearable Syncing based on your specific business model."
            },
            {
                "title": "App Store Submission",
                "desc": "We compile the native binaries and manage the entire Apple App Store and Google Play Store review process on your behalf, publishing under your developer account."
            },
            {
                "title": "Managed Operations",
                "desc": "As iOS and Android release new operating systems, our engineering team continuously updates the underlying codebase, ensuring your app never breaks or feels outdated."
            }
        ],
        "faqs": [
            ("Can we integrate the app with our existing patient portal or EMR?", "Yes. The white-label application includes Single Sign-On (SSO) capabilities and can securely pull/push data to your existing EMR or CRM systems via API."),
            ("How long does it take to launch?", "From signing the contract to being live in the App Store, standard deployments take between 3 to 5 weeks, depending largely on Apple's review times."),
            ("Who owns the user data?", "You do. Nostavia acts purely as a data processor. You retain 100% ownership and control over your users' data, and can export it at any time."),
            ("Can we add custom features later?", "Yes. If you outgrow the white-label app, you can seamlessly transition to using our SDKs to build your own custom application, while preserving all historical user data in the Nostavia engine.")
        ]
    },
    "about.html": {
        "title": "About Us",
        "headline": "The Stripe for Metabolic Health.",
        "subtitle": "We are building the intelligence layer that the health economy is fundamentally missing.",
        "metrics": [
            ("B2B", "Infrastructure"),
            ("Lucknow", "Headquarters"),
            ("Global", "Ambition")
        ],
        "problem": {
            "title": "The Sensors Have Shipped",
            "desc": "The hardware revolution is over; the sensors have shipped. The data rails to move that information exist. What has never shipped is the layer that actually interprets the result. Nostavia's core thesis is that building that intelligence layer once, and licensing it to every health company in the world, is a larger, more durable, and more important business than building one more consumer health application."
        },
        "bento": [
            {
                "span": "span-6",
                "icon": "user",
                "title": "Aditya Singh, CEO",
                "desc": "Aditya leads product vision, go-to-market strategy, and the clinical-data pipeline architecture. Prior to founding Nostavia, he co-built the live production AI stack that powers the platform's core reasoning engine. He holds a B.Tech in Biotechnology from MNNIT Allahabad, blending deep domain expertise with scalable software product execution."
            },
            {
                "span": "span-6",
                "icon": "terminal",
                "title": "Anushka Gupta, CTO",
                "desc": "Anushka leads model architecture, infrastructure training, and MLOps. She is the architect behind the SOMA Dual-Brain stack currently running in production, solving the critical hallucination problems inherent in medical AI. She holds a B.Tech in Biotechnology from MNNIT Allahabad and specializes in high-performance computing for biological datasets."
            },
            {
                "span": "span-12",
                "icon": "stethoscope",
                "title": "Clinical Advisory Bench",
                "desc": "Software moves fast; medicine requires rigor. Every protocol output, biomarker classification, and heuristic generated by the SOMA engine is rigorously validated against a licensed clinical advisory bench. Our board includes leading metabolic researchers from IISc Bangalore, clinical experts from UCL, and practicing registered medical practitioners. We operate at the highest standard of clinical safety."
            }
        ],
        "how_it_works": [],
        "faqs": []
    },
    "careers.html": {
        "title": "Careers",
        "headline": "Build the Future of Health.",
        "subtitle": "Join our founding team in Lucknow. We are tackling the hardest engineering problems in biological data and LLM infrastructure.",
        "metrics": [
            ("3", "Open Roles"),
            ("On-Site", "Lucknow HQ"),
            ("Seed", "Funded")
        ],
        "problem": {
            "title": "A Generational Opportunity",
            "desc": "We are currently building our founding engineering team. We are not building another CRUD app; we are building the infrastructure that will power the next decade of preventative medicine. If you are deeply passionate about health data, low-latency infrastructure, and pushing the boundaries of applied LLMs in production, we want to talk."
        },
        "bento": [
            {
                "span": "span-4",
                "icon": "brain",
                "title": "Senior ML Engineer",
                "desc": "Take ownership of the SOMA-1B model. You will be responsible for fine-tuning our reasoning engine on massive proprietary healthcare datasets, optimizing inference latency, and building robust evaluation pipelines to guarantee zero clinical hallucinations."
            },
            {
                "span": "span-4",
                "icon": "code",
                "title": "Full Stack Engineer (Founding Team)",
                "desc": "Build the scalable infrastructure that handles millions of webhook payloads a day. You will work extensively with Node.js, React, and scalable cloud architecture to build the APIs and SDKs that our enterprise partners rely on."
            },
            {
                "span": "span-4",
                "icon": "rocket",
                "title": "Solutions & Deployment Engineer",
                "desc": "Be the bridge between our engineering and our enterprise clients. You will lead partner deployments, manage complex SDK integrations, architect custom data pipelines for massive diagnostic labs, and ensure flawless technical execution."
            }
        ],
        "how_it_works": [
            {
                "title": "1. Technical Screen",
                "desc": "A 45-minute deep dive into your past engineering challenges and architectural decisions."
            },
            {
                "title": "2. Take-Home Project",
                "desc": "A highly relevant, time-boxed (4 hours) technical challenge reflecting the actual work you will do at Nostavia."
            },
            {
                "title": "3. Architecture System Design",
                "desc": "A whiteboard session with the founders focusing on scalable infrastructure and data modeling."
            },
            {
                "title": "4. Cultural Fit & Offer",
                "desc": "Final alignment on vision, values, and an immediate offer extension."
            }
        ],
        "faqs": [
            ("Is this role remote?", "No. We believe the earliest stages of company building require the bandwidth and velocity of in-person collaboration. All founding roles are strictly on-site at our headquarters in Lucknow, India."),
            ("What is the tech stack?", "Our core backend is built on Node.js/TypeScript and Python (for ML pipelines). We use React/Next.js for the frontend, React Native for mobile SDKs, and deploy heavily on AWS utilizing containerized serverless architecture."),
            ("Do you offer equity?", "Yes. Every member of the founding team receives a significant, meaningful equity package. We want you to own a piece of the infrastructure you are building."),
            ("How do I apply?", "Send your resume, GitHub profile, and a brief note about why you want to build at Nostavia to careers@nostaviahealth.com.")
        ]
    },
    "contact.html": {
        "title": "Contact Us",
        "headline": "Let's Talk.",
        "subtitle": "We're here to help you integrate health intelligence. Reach out for enterprise licensing, technical support, or partnership inquiries.",
        "metrics": [
            ("India", "and UAE"),
            ("24/7", "Support Available"),
            ("Enterprise", "SLAs")
        ],
        "problem": {
            "title": "Global Presence, Local Compliance",
            "desc": "We are actively serving high-growth markets across India and the UAE. Our platform is architected from the ground up to respect localized data sovereignty, aligning strictly with India's DPDP Act and the Dubai health-data Law No. 17 of 2026 framework."
        },
        "bento": [
            {
                "span": "span-6",
                "icon": "map-pin",
                "title": "Global Headquarters",
                "desc": "Nostavia Technologies Pvt. Ltd.<br>Lucknow, Uttar Pradesh, India<br><br><em>Our engineering and operations hub driving the future of health infrastructure.</em>"
            },
            {
                "span": "span-6",
                "icon": "mail",
                "title": "Direct Communication",
                "desc": "<strong>Enterprise Sales & Partnerships:</strong><br>contact@nostaviahealth.com<br><br><strong>Direct Line:</strong><br>+91 95983 20558"
            }
        ],
        "how_it_works": [],
        "faqs": []
    },
    "security.html": {
        "title": "Security & Privacy",
        "headline": "Private by Design.",
        "subtitle": "Built from the ground up for the world's most sensitive health data. Zero compromise on security.",
        "metrics": [
            ("DPDP", "Aligned"),
            ("Zero", "PII on Cloud"),
            ("Law No. 17", "UAE Ready")
        ],
        "problem": {
            "title": "Privacy at the Edge",
            "desc": "The biggest barrier to AI in healthcare is data sovereignty and privacy. Nostavia solves this architecturally. Personally identifiable information (PII) is stripped on-device before any cloud inference ever occurs. Our SOMA-1B domain brain is designed to operate on anonymous biological payloads, keeping personal identity completely segregated from biological processing."
        },
        "bento": [
            {
                "span": "span-6",
                "icon": "lock",
                "title": "DPDP-Aligned by Design",
                "desc": "We are fully aligned with India's Digital Personal Data Protection (DPDP) Act, 2023. Principles of explicit user consent, strict purpose limitation, and absolute data minimisation are hardcoded into our data pipeline. We process only what is necessary, for exactly the purpose consented to."
            },
            {
                "span": "span-6",
                "icon": "globe",
                "title": "UAE Law No. 17 Readiness",
                "desc": "For our partners in the Middle East, Nostavia aligns strictly to Dubai health-data rules and the overarching Law No. 17 of 2026 framework. We offer localized, in-region data handling and processing instances to ensure health data never crosses restricted borders."
            },
            {
                "span": "span-12",
                "icon": "shield-check",
                "title": "Clinical Governance & Auditability",
                "desc": "AI in healthcare cannot be a black box. Protocol outputs are constantly validated against a licensed clinical advisory bench. We operate as clinician-supervised decision support infrastructure. Every inference, classification, and protocol generation step is logged and fully auditable, allowing your compliance teams total transparency into how the engine reached a specific conclusion."
            }
        ],
        "how_it_works": [
            {
                "title": "Edge Anonymization",
                "desc": "Before data leaves your servers or the user's mobile device, all PII (names, emails, SSNs) is stripped. Data is tagged with a meaningless UUID."
            },
            {
                "title": "Encrypted Transit & Processing",
                "desc": "The anonymous payload is transmitted via TLS 1.3 and processed entirely in-memory within our secure VPC enclaves."
            },
            {
                "title": "Zero-Retention Inference",
                "desc": "Once the SOMA engine generates the interpretation or protocol, the result is returned to your servers, and the biological payload is instantly destroyed from our working memory."
            },
            {
                "title": "Re-Identification at Source",
                "desc": "Your internal systems match the returned UUID back to the patient profile. Nostavia never knows who the patient actually is."
            }
        ],
        "faqs": [
            ("Are you HIPAA compliant?", "Our architecture is designed to exceed HIPAA security and privacy standards. We sign Business Associate Agreements (BAAs) with all US-based enterprise partners."),
            ("Do you sell user data?", "Never. We are an infrastructure company, not a data broker. Our business model is licensing software. We do not sell, rent, or monetize your users' biological data in any capacity."),
            ("Do you use our data to train your AI?", "By default, no. We train our foundational models on massive, anonymized, proprietary datasets acquired legally and ethically. Enterprise partners can opt-in to federated learning loops if they wish to improve their own specific model performance, but it is never mandatory."),
            ("How often do you undergo security audits?", "We undergo rigorous, independent third-party penetration testing and security audits bi-annually, and make these compliance reports available to enterprise partners under NDA.")
        ]
    },
    "documentation.html": {
        "title": "Developer Documentation",
        "headline": "Build with Nostavia.",
        "subtitle": "Integrate the health intelligence layer into your application. Comprehensive guides, architecture diagrams, and quickstarts.",
        "metrics": [
            ("5 mins", "To First API Call"),
            ("Node/Python", "Official SDKs"),
            ("OAuth 2.0", "Authentication")
        ],
        "problem": {
            "title": "Built for Developers",
            "desc": "We believe health infrastructure should be as easy to integrate as a payment gateway. No massive XML payloads, no archaic SOAP APIs, and no manual connection negotiations. Nostavia provides modern, fully typed REST and GraphQL interfaces designed specifically for developer velocity."
        },
        "bento": [
            {
                "span": "span-6",
                "icon": "key",
                "title": "Authentication & Scopes",
                "desc": "Secure your integrations using standard OAuth 2.0 flows. We provide granular scoping, allowing you to restrict API keys to specific endpoints—for example, granting read-only access to wearable telemetry while isolating lab ingestion to a separate service."
            },
            {
                "span": "span-6",
                "icon": "box",
                "title": "Sandbox Environment",
                "desc": "Start building immediately without touching real PHI. Our dedicated Sandbox environment generates synthetic patient profiles, simulated wearable telemetry streams, and fake lab PDFs so you can test your entire application flow safely."
            },
            {
                "span": "span-12",
                "icon": "webhook",
                "title": "Webhook Architecture",
                "desc": "Don't poll our servers. Register secure webhooks to receive real-time push notifications the moment a patient connects a new wearable, a lab report finishes decoding, or a new insight protocol is generated by the SOMA engine. We support automatic retries and exponential backoff."
            }
        ],
        "how_it_works": [
            {
                "title": "1. Get API Keys",
                "desc": "Generate your Sandbox API keys from the Developer Dashboard."
            },
            {
                "title": "2. Install SDK",
                "desc": "Run `npm install @nostavia/node` or `pip install nostavia-python`."
            },
            {
                "title": "3. Initialize Client",
                "desc": "Initialize the SDK client with your secret key to establish a secure connection."
            },
            {
                "title": "4. Make First Call",
                "desc": "Send a test payload to `/v1/intelligence/ping` to verify connectivity."
            }
        ],
        "faqs": [
            ("Are there rate limits?", "Yes. Sandbox environments are limited to 100 requests per minute. Production limits scale automatically based on your enterprise tier, up to 10,000 RPM."),
            ("Where can I find the Postman collection?", "You can download the complete, pre-configured Postman workspace directly from your developer dashboard to test endpoints instantly."),
            ("Do you support TypeScript?", "Yes! Our Node.js SDK is written entirely in TypeScript and exports strict types for all JSON payloads and API responses.")
        ]
    },
    "api-reference.html": {
        "title": "API Reference",
        "headline": "API Reference.",
        "subtitle": "Detailed endpoint specifications, JSON payload structures, and error code definitions for the Nostavia platform.",
        "metrics": [
            ("REST", "JSON Endpoints"),
            ("GraphQL", "Support"),
            ("99.99%", "Uptime SLA")
        ],
        "problem": {
            "title": "Predictable, Typed Endpoints",
            "desc": "Our API is designed around predictability. We utilize standard HTTP verbs, return standard status codes, and guarantee backwards compatibility for all v1 endpoints. Every response is strictly typed and documented."
        },
        "bento": [
            {
                "span": "span-12",
                "icon": "server",
                "title": "POST /v1/intelligence/parse",
                "desc": "Submit a raw lab report PDF or LIS JSON payload for immediate decoding. Returns a `Report` object containing the parsed biomarkers, their classifications (optimal/outlier), and the SOMA-generated clinical interpretation."
            },
            {
                "span": "span-6",
                "icon": "activity",
                "title": "GET /v1/wearables/sync",
                "desc": "Fetch normalized telemetry data for a specific user across a date range. Supports filtering by metric type (HRV, sleep, glucose)."
            },
            {
                "span": "span-6",
                "icon": "users",
                "title": "POST /v1/users/create",
                "desc": "Provision a new anonymous user profile in the Nostavia engine. Returns a `user_id` token used to scope subsequent data uploads."
            }
        ],
        "how_it_works": [],
        "faqs": [
            ("What happens if an endpoint fails?", "We return standard HTTP 4xx and 5xx error codes, accompanied by a JSON body containing a specific error `code` and a human-readable `message` to aid debugging."),
            ("How do you handle API versioning?", "We version our API in the URL (e.g., `/v1/`). We only increment the major version for breaking changes, ensuring your integrations remain stable.")
        ]
    },
    "github-examples.html": {
        "title": "GitHub Examples",
        "headline": "Open Source Boilerplates.",
        "subtitle": "Don't start from scratch. Clone our production-ready boilerplate applications and have a working integration in 5 minutes.",
        "metrics": [
            ("Next.js", "App Router"),
            ("React Native", "Expo App"),
            ("Python", "FastAPI")
        ],
        "problem": {
            "title": "Accelerating Integration",
            "desc": "Reading documentation takes time. We believe the fastest way to understand an API is to run a working example. Our engineering team maintains a suite of open-source boilerplate repositories on GitHub covering the most common integration patterns."
        },
        "bento": [
            {
                "span": "span-4",
                "icon": "layout-dashboard",
                "title": "Next.js Health Dashboard",
                "desc": "A complete React frontend demonstrating how to render Nostavia's lab interpretations and wearable telemetry into beautiful Recharts graphs. Includes NextAuth for authentication."
            },
            {
                "span": "span-4",
                "icon": "smartphone",
                "title": "React Native Mobile App",
                "desc": "An Expo-based mobile boilerplate showing how to implement the OAuth flow for wearables and display the AI Concierge chat interface natively on iOS and Android."
            },
            {
                "span": "span-4",
                "icon": "file-code-2",
                "title": "Python LIS Integration",
                "desc": "A lightweight FastAPI server demonstrating how to securely accept incoming HL7/FHIR payloads, strip PII, and pipe the anonymous data into the Nostavia Intelligence engine."
            }
        ],
        "how_it_works": [
            {
                "title": "1. Clone Repository",
                "desc": "Run `git clone https://github.com/nostavia/nextjs-boilerplate`."
            },
            {
                "title": "2. Configure Environment",
                "desc": "Rename `.env.example` to `.env` and paste in your Nostavia Sandbox API keys."
            },
            {
                "title": "3. Install Dependencies",
                "desc": "Run `npm install` to fetch all required UI components and the Nostavia SDK."
            },
            {
                "title": "4. Deploy to Vercel",
                "desc": "Push the repository to your own GitHub and connect it to Vercel for instant deployment."
            }
        ],
        "faqs": [
            ("Are these repos MIT licensed?", "Yes. All our boilerplate repositories are released under the permissive MIT license. You can fork them and use the code directly in your proprietary commercial products without restriction.")
        ]
    }
}

with open("index.html", "r") as f:
    index_html = f.read()

# Extract top
top_end = index_html.find('<!-- 2. Hero Section -->')
top_html = index_html[:top_end]

# Extract footer
footer_start = index_html.find('<!-- 11. Footer -->')
footer_html = index_html[footer_start:]

# Remove Health 360 Scroll Logic script from footer since it throws errors on pages without the diagram
scroll_logic_start = footer_html.find('// Health 360 Scroll Logic')
scroll_logic_end = footer_html.find('</script>', scroll_logic_start)
if scroll_logic_start != -1 and scroll_logic_end != -1:
    footer_html = footer_html[:scroll_logic_start] + footer_html[scroll_logic_end:]

for filename, page in pages.items():
    page_top = top_html.replace('<title>Nostavia | Health Intelligence Infrastructure</title>', f'<title>{page["title"]} | Nostavia</title>')
    
    # 1. Metrics HTML
    metrics_html = ""
    for m in page["metrics"]:
        metrics_html += f"""
                <div class="stat-item">
                    <span class="stat-value">{m[0]}</span>
                    <span class="stat-label">{m[1]}</span>
                </div>
        """
        
    # 2. Bento Grid HTML
    bento_html = ""
    for b in page["bento"]:
        bento_html += f"""
            <div class="segment-card {b['span']}">
                <div class="card-icon-wrapper"><i data-lucide="{b['icon']}"></i></div>
                <h3 style="font-size: 1.6rem; margin-bottom: 1rem;">{b['title']}</h3>
                <p class="segment-use-case" style="font-size: 1.1rem; line-height: 1.7;">{b['desc']}</p>
            </div>
        """
        
    # 3. How It Works HTML (Optional)
    how_it_works_html = ""
    if "how_it_works" in page and len(page["how_it_works"]) > 0:
        steps_html = ""
        for i, step in enumerate(page["how_it_works"]):
            steps_html += f"""
                <div class="flow-step">
                    <div class="flow-number">{i+1}</div>
                    <div class="flow-content">
                        <h3>{step['title']}</h3>
                        <p>{step['desc']}</p>
                    </div>
                </div>
            """
        how_it_works_html = f"""
    <!-- Architecture Flow Section -->
    <section class="flow-section">
        <div class="container" style="max-width: 900px;">
            <div class="section-header text-center">
                <h2>How it Works</h2>
                <p style="color: var(--text-slate); font-size: 1.2rem;">A look inside the data pipeline.</p>
            </div>
            <div class="flow-container">
                {steps_html}
            </div>
        </div>
    </section>
        """

    # 4. FAQ HTML (Optional)
    faq_html = ""
    if "faqs" in page and len(page["faqs"]) > 0:
        faq_items = ""
        for q, a in page["faqs"]:
            faq_items += f"""
                <div class="faq-item">
                    <button class="faq-question">{q} <i data-lucide="chevron-down"></i></button>
                    <div class="faq-answer">
                        <p>{a}</p>
                    </div>
                </div>
            """
        faq_html = f"""
    <!-- FAQ Section -->
    <section class="faq-section">
        <div class="container faq-container">
            <div class="faq-header">
                <h2>Frequently Asked Questions</h2>
            </div>
            <div class="faq-list">
                {faq_items}
            </div>
        </div>
    </section>
        """
        
    # Add FAQ script to footer_html for pages that have FAQs
    custom_footer = footer_html
    if "faqs" in page and len(page["faqs"]) > 0:
        faq_script = """
        <script>
        document.querySelectorAll('.faq-question').forEach(button => {
            button.addEventListener('click', () => {
                const answer = button.nextElementSibling;
                const icon = button.querySelector('i');
                const isOpen = answer.style.maxHeight;

                document.querySelectorAll('.faq-answer').forEach(ans => ans.style.maxHeight = null);
                document.querySelectorAll('.faq-question i').forEach(ic => ic.setAttribute('data-lucide', 'chevron-down'));

                if (!isOpen) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                    icon.setAttribute('data-lucide', 'chevron-up');
                }
                
                lucide.createIcons();
            });
        });
        </script>
        """
        custom_footer = footer_html.replace('</body>', faq_script + '\n</body>')
    
    parts = page["headline"].split(" ")
    last_word = parts[-1]
    first_part = " ".join(parts[:-1])
    
    html_content = f'''{page_top}
    <!-- Homepage-Parity Hero -->
    <header class="hero">
        <div class="hero-petals">
            <div class="petal petal-1"></div>
            <div class="petal petal-2"></div>
            <div class="petal petal-3"></div>
            <div class="petal petal-4"></div>
        </div>
        <div class="hero-container">
            <div class="hero-content">
                <div class="hero-pill">
                    <span class="hero-pill-badge">Overview</span>
                    <span class="hero-pill-text">{page["title"]}</span>
                </div>
                <h1 class="hero-headline">
                    {first_part}<br>
                    <span class="hero-accent">{last_word}</span>
                </h1>
                <p class="hero-subtitle">{page["subtitle"]}</p>
                <div class="hero-ctas">
                    <a href="javascript:void(0)" class="btn btn-hero open-demo-modal">Book a demo</a>
                </div>
            </div>
        </div>
    </header>

    <!-- Homepage-Parity Trust Strip -->
    <section class="trust-strip">
        <div class="container">
            <div class="trust-stats" style="justify-content: center; gap: 4rem;">
{metrics_html}
            </div>
        </div>
    </section>

    <!-- Problem Statement (Light Premium Box) -->
    <section class="security-section" style="padding-bottom: 4rem;">
        <div class="container">
            <div class="security-wall" style="display: block; max-width: 1000px; margin: 0 auto; text-align: center;">
                <div class="security-header" style="max-width: none;">
                    <h2>{page["problem"]["title"]}</h2>
                    <p style="font-size: 1.25rem; margin: 0 auto; max-width: 800px; color: var(--text-slate); line-height: 1.8;">{page["problem"]["desc"]}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Bento Features using Homepage Component -->
    <section class="segments-section" style="background: transparent; padding-top: 4rem;">
        <div class="container">
            <div class="section-header text-center">
                <h2>Capabilities</h2>
                <p style="color: var(--text-slate);">Everything you need to build the next generation of health products.</p>
            </div>
            <div class="ent-bento-grid">
                {bento_html}
            </div>
        </div>
    </section>
    
    {how_it_works_html}
    
    {faq_html}

{custom_footer}'''
    
    with open(filename, "w") as f:
        f.write(html_content)
    print(f"Generated {filename}")
