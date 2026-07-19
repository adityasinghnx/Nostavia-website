import os

def create_docs():
    with open("index.html", "r") as f:
        index_html = f.read()

    top_end = index_html.find('<!-- 2. Hero Section -->')
    top_html = index_html[:top_end]

    footer_start = index_html.find('<!-- 11. Footer -->')
    footer_html = index_html[footer_start:]

    sidebar_html = """
    <div class="docs-sidebar">
        <h4>Getting Started</h4>
        <ul>
            <li><a href="documentation.html">Overview & Quickstart</a></li>
            <li><a href="documentation.html#authentication">Authentication</a></li>
            <li><a href="documentation.html#environments">Environments</a></li>
            <li><a href="documentation.html#webhooks">Webhooks & Events</a></li>
        </ul>
        <h4>SDKs</h4>
        <ul>
            <li><a href="docs-wearables.html">Wearables SDK</a></li>
        </ul>
        <h4>API Reference</h4>
        <ul>
            <li><a href="api-reference.html">Endpoints Overview</a></li>
            <li><a href="api-reference.html#parse">Intelligence Parse</a></li>
            <li><a href="api-reference.html#wearables">Wearables Sync</a></li>
            <li><a href="api-reference.html#errors">Errors & Rate Limits</a></li>
        </ul>
        <h4>Resources</h4>
        <ul>
            <li><a href="github-examples.html">GitHub Boilerplates</a></li>
            <li><a href="github-examples.html#nextjs">Next.js Dashboard</a></li>
            <li><a href="github-examples.html#python">Python LIS Node</a></li>
            <li><a href="#">Postman Collection</a></li>
        </ul>
    </div>
    """

    docs = {
        "documentation.html": """
            <h1>Developer Documentation</h1>
            <p>Welcome to the Nostavia API. Our infrastructure provides a unified, typed GraphQL and REST interface for ingesting raw clinical data (PDFs, LIS HL7 feeds, wearable telemetry) and extracting structured clinical intelligence via the SOMA Dual-Brain architecture.</p>
            
            <h2 id="authentication">Authentication</h2>
            <p>The Nostavia API uses API keys to authenticate requests. You can view and manage your API keys in the Nostavia Dashboard.</p>
            <p>Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.</p>
            
            <h3>Bearer Token Auth</h3>
            <p>Authentication to the API is performed via HTTP Bearer Auth. Provide your API key as the bearer token value in the <code>Authorization</code> header.</p>
            
            <pre><code>curl -X GET https://api.nostavia.com/v1/users \\
  -H "Authorization: Bearer nostavia_sk_test_51Mz..."</code></pre>

            <h2 id="environments">Environments</h2>
            <p>We provide two distinct environments to ensure safe development without risking PHI exposure.</p>
            <ul>
                <li><strong>Sandbox (<code>api.sandbox.nostavia.com</code>)</strong>: Uses synthetic data models. Any PDFs uploaded here are piped to a deterministic mock engine that returns predictable dummy data. Keys start with <code>nostavia_sk_test_</code>.</li>
                <li><strong>Production (<code>api.nostavia.com</code>)</strong>: The live SOMA engine. Requires signed BAAs (Business Associate Agreements). Keys start with <code>nostavia_sk_prod_</code>.</li>
            </ul>

            <h2 id="webhooks">Webhooks & Events</h2>
            <p>Because clinical interpretation of large 50-page PDF lab reports can take up to 2.5 seconds, we highly recommend using asynchronous processing with Webhooks rather than holding HTTP connections open.</p>

            <h3>Verifying Webhook Signatures</h3>
            <p>Nostavia signs the webhook events it sends to your endpoints by including a signature in each event's <code>Nostavia-Signature</code> header. This allows you to verify that the events were sent by Nostavia, not by a third party.</p>
            <p>We use HMAC SHA-256 for the signature. Here is a complete Node.js example to verify the incoming payload:</p>

            <pre><code>import crypto from 'crypto';
import express from 'express';

const app = express();
const endpointSecret = 'whsec_9b83b...';

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['nostavia-signature'];
  const timestamp = request.headers['nostavia-timestamp'];
  
  // 1. Recreate the signed payload
  const signedPayload = `${timestamp}.${request.body.toString()}`;
  
  // 2. Compute HMAC
  const hmac = crypto.createHmac('sha256', endpointSecret);
  const expectedSig = hmac.update(signedPayload).digest('hex');
  
  // 3. Compare securely to prevent timing attacks
  if (crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) {
    console.log("Webhook verified!", JSON.parse(request.body));
    response.send();
  } else {
    response.status(400).send('Webhook Error: Invalid Signature');
  }
});</code></pre>
        """,
        "api-reference.html": """
            <h1>API Reference</h1>
            <p>The Nostavia API is organized around REST. Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes.</p>
            
            <h2 id="parse">Intelligence Parse</h2>
            <h3><span class="endpoint-badge badge-post">POST</span> /v1/intelligence/parse</h3>
            <p>This is the core endpoint of the platform. Submit a raw lab report PDF or a standard JSON LIS payload. The SOMA engine will decode the unstructured data, extract all biomarkers, classify them against current clinical guidelines, and return a structured intelligence object.</p>
            
            <h4>Request Payload</h4>
            <pre><code>{
  "file_url": "https://secure-bucket.s3.amazonaws.com/lab-report-smith.pdf",
  "patient_id": "usr_9983421",
  "options": {
    "include_clinical_notes": true,
    "target_guideline": "aha_2024",
    "async": false
  }
}</code></pre>

            <h4>Massive JSON Response (Success 200 OK)</h4>
            <pre><code>{
  "id": "rpt_x8291A9f",
  "object": "intelligence_report",
  "created": 1678892314,
  "patient_id": "usr_9983421",
  "biomarkers": [
    {
      "loinc_code": "4548-4",
      "name": "Hemoglobin A1c",
      "value": 6.8,
      "unit": "%",
      "reference_range": "< 5.7",
      "classification": "high",
      "clinical_flags": ["diabetic_range", "action_required"]
    },
    {
      "loinc_code": "2089-1",
      "name": "LDL Cholesterol",
      "value": 142,
      "unit": "mg/dL",
      "reference_range": "< 100",
      "classification": "elevated",
      "clinical_flags": ["borderline_high_risk"]
    }
  ],
  "soma_interpretation": {
    "summary": "Patient exhibits diabetic-range HbA1c (6.8%) alongside elevated LDL-C (142 mg/dL), indicating high risk for metabolic syndrome and early-stage atherosclerosis.",
    "recommended_actions": [
      "Schedule follow-up for fasting glucose and lipid panel in 3 months.",
      "Consider initiation of statin therapy per AHA 2024 guidelines.",
      "Recommend dietary intervention prioritizing low glycemic index foods."
    ],
    "confidence_score": 0.992
  }
}</code></pre>

            <h2 id="wearables">Wearables Sync</h2>
            <h3><span class="endpoint-badge badge-get">GET</span> /v1/wearables/sync</h3>
            <p>Fetch normalized telemetry data for a specific user across a date range. This endpoint unifies Apple Health, Oura, and Whoop into a single, standardized schema.</p>
            
            <h4>Query Parameters</h4>
            <ul>
                <li><code>user_id</code> (required): The Nostavia user ID.</li>
                <li><code>start_date</code> (required): ISO 8601 timestamp.</li>
                <li><code>end_date</code> (required): ISO 8601 timestamp.</li>
                <li><code>metrics[]</code> (optional): Array of metrics (e.g., <code>hrv</code>, <code>rhr</code>, <code>sleep_stages</code>).</li>
            </ul>

            <h4>JSON Response</h4>
            <pre><code>{
  "object": "list",
  "data": [
    {
      "metric": "hrv_rmssd",
      "date": "2023-10-14",
      "value": 42.5,
      "unit": "ms",
      "source": "oura_ring_gen3"
    },
    {
      "metric": "rhr",
      "date": "2023-10-14",
      "value": 54,
      "unit": "bpm",
      "source": "apple_watch_s8"
    }
  ],
  "has_more": false
}</code></pre>

            <h2 id="errors">Errors & Rate Limits</h2>
            <p>Nostavia uses standard HTTP status codes to indicate the success or failure of an API request. In general:</p>
            <ul>
                <li><strong>2xx</strong> indicate success.</li>
                <li><strong>4xx</strong> indicate an error that failed given the information provided (e.g., a required parameter was omitted).</li>
                <li><strong>5xx</strong> indicate an error with Nostavia's servers (these are rare).</li>
            </ul>

            <h4>Error Response Schema</h4>
            <pre><code>{
  "error": {
    "type": "invalid_request_error",
    "code": "parameter_missing",
    "message": "The 'file_url' parameter is required for the Intelligence Parse endpoint.",
    "param": "file_url"
  }
}</code></pre>
        """,
        "github-examples.html": """
            <h1>GitHub Boilerplates</h1>
            <p>Don't start from scratch. Our engineering team maintains production-ready open-source boilerplates. Clone them, add your keys, and have a working healthcare integration in minutes.</p>
            
            <h2 id="nextjs">Next.js Health Dashboard</h2>
            <p>A complete React frontend demonstrating how to render Nostavia's lab interpretations and wearable telemetry into beautiful Recharts graphs. Includes NextAuth for JWT authentication and TailwindCSS for styling.</p>
            
            <h3>Repository Structure</h3>
            <pre><code>nostavia-nextjs-dashboard/
├── .env.example
├── package.json
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/           # NextAuth route handlers
│   │   │   └── webhooks/       # HMAC webhook listeners
│   │   ├── dashboard/          # Protected dashboard routes
│   │   └── layout.tsx
│   ├── components/
│   │   ├── BiomarkerChart.tsx  # Recharts implementation
│   │   └── SOMAChatbox.tsx     # AI Concierge UI
│   └── lib/
│       └── nostaviaClient.ts   # SDK Initialization
└── tailwind.config.js</code></pre>

            <h3>Local Setup</h3>
            <pre><code>git clone https://github.com/nostavia/nextjs-dashboard.git
cd nextjs-dashboard
cp .env.example .env.local
npm install
npm run dev</code></pre>

            <h4><code>.env.local</code> Configuration</h4>
            <pre><code># Nostavia Sandbox Keys
NOSTAVIA_SECRET_KEY=nostavia_sk_test_51Mz...
NOSTAVIA_WEBHOOK_SECRET=whsec_9b83b...

# NextAuth Config
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_a_random_jwt_secret_here</code></pre>

            <h2 id="python">Python LIS Integration Node</h2>
            <p>A lightweight FastAPI server designed to sit behind an enterprise firewall. It securely accepts incoming HL7/FHIR payloads from an on-premise LIS (Laboratory Information System), strips all PII (names, SSNs), and pipes the completely anonymous data into the Nostavia Intelligence cloud.</p>
            
            <h3>Repository Structure</h3>
            <pre><code>nostavia-fastapi-lis/
├── .env
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
└── app/
    ├── main.py                 # FastAPI application
    ├── anonymizer.py           # Regex-based PII stripper
    ├── hl7_parser.py           # HL7 to JSON converter
    └── nostavia_router.py      # HTTPX client for SOMA engine</code></pre>

            <h3>Local Setup via Docker</h3>
            <pre><code>git clone https://github.com/nostavia/fastapi-lis.git
cd fastapi-lis
cp .env.example .env

# Build and run the isolated container
docker-compose up --build</code></pre>
            <p>The server will expose a local endpoint at <code>http://localhost:8000/hl7-ingest</code> ready to accept local hospital network traffic.</p>
        """,
        "docs-wearables.html": """
            <h1>Nostavia Wearables SDK</h1>
            <p>Welcome to the Nostavia Wearables SDK, a unified integration layer for 8+ leading wearables and health platforms.</p>
            <p>The Nostavia Wearables SDK simplifies health and fitness data integration by providing a single, normalized API to connect with multiple wearables. It abstracts away complex provider-specific logic, handling both on-device connections and cloud-to-cloud integrations. This empowers developers to build powerful health applications without worrying about wearable fragmentation.</p>

            <h2>Key Features</h2>
            <ul>
                <li><strong>Hybrid Architecture:</strong> Interfaces directly with on-device SDKs (Apple HealthKit, Google Health Connect) and cloud APIs (Oura, WHOOP, Fitbit, etc.) via the Nostavia Backend.</li>
                <li><strong>Unified Data Model:</strong> Receive normalized data across all providers (e.g., Sleep, Heart Rate, Activity, SpO2, Glucose) through a consistent, strongly-typed interface.</li>
                <li><strong>Multi-Source Resolution Engine:</strong> Smartly merges and deduplicates data based on device priority (e.g., favoring Oura > Apple Watch for Sleep) while giving developers full override control.</li>
                <li><strong>Real-Time Streaming:</strong> Live streaming of supported health metrics where available.</li>
                <li><strong>Cross-Platform:</strong> Native support for both Flutter (Dart) and React Native (TypeScript) out of the box.</li>
            </ul>

            <h2>Supported Providers</h2>
            <p>The SDK harmonizes data from 8+ leading health and fitness platforms:</p>
            <table>
                <thead>
                    <tr>
                        <th>Provider</th>
                        <th>Architecture</th>
                        <th>Supported Data</th>
                        <th>Quirks / Notes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Apple HealthKit</td><td>On-device</td><td>Sleep, HR, HRV, SpO2, Activity, Workouts, Body, Glucose</td><td>Needs iOS permissions, queries when unlocked</td></tr>
                    <tr><td>Google Health Connect</td><td>On-device</td><td>Sleep, HR, SpO2, Activity, Body, Glucose</td><td>Requires Android permissions</td></tr>
                    <tr><td>Oura Ring</td><td>Cloud API</td><td>Sleep, Readiness, Activity, HR, HRV, Temp</td><td>Rich sleep staging. Limits: 5k requests/day</td></tr>
                    <tr><td>WHOOP</td><td>Cloud API</td><td>Sleep, Recovery, Strain, Workouts, HRV</td><td>Relies on proprietary physiological cycles</td></tr>
                    <tr><td>Fitbit / Google Health</td><td>Cloud API</td><td>Sleep, Activity, HR, SpO2, HRV</td><td>150 req/hr limit. Strict token expiration</td></tr>
                    <tr><td>Withings</td><td>Cloud API</td><td>Sleep, HR, BP, Weight, ECG</td><td>Strict granular scopes, custom auth flow</td></tr>
                    <tr><td>Polar</td><td>Cloud API</td><td>Sleep, Activity, HR, Workouts</td><td>Transaction model (requires commit after pull)</td></tr>
                    <tr><td>Dexcom</td><td>Cloud API</td><td>Glucose (CGM), Meals, Insulin</td><td>Polling limits. Delayed data unless medical tier</td></tr>
                </tbody>
            </table>

            <h2>Quickstart</h2>
            <p>Get up and running with Nostavia in minutes.</p>

            <h3>React Native Integration</h3>
            <h4>Install Dependencies</h4>
            <pre><code>npm install @nostavia/react-native @nostavia/core
cd ios && pod install</code></pre>

            <h4>Initialize the SDK</h4>
            <pre><code>import { Nostavia } from '@nostavia/react-native';
Nostavia.init({
  apiKey: 'YOUR_NOSTAVIA_API_KEY',
  environment: 'sandbox', // or 'production'
});</code></pre>

            <h4>Connect a Provider</h4>
            <pre><code>import { Provider } from '@nostavia/react-native';
const connectDevice = async () => {
  try {
    await Nostavia.connect(Provider.OURA);
    console.log('Successfully connected to Oura!');
  } catch (error) {
    console.error('Connection failed:', error);
  }
};</code></pre>

            <h3>Flutter Integration</h3>
            <h4>Install Dependencies</h4>
            <p>Add to <code>pubspec.yaml</code>:</p>
            <pre><code>dependencies:
  nostavia_flutter: ^1.0.0</code></pre>
            <p>Run <code>flutter pub get</code>.</p>

            <h4>Initialize the SDK</h4>
            <pre><code>import 'package:nostavia_flutter/nostavia_flutter.dart';
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  await Nostavia.init(
    apiKey: 'YOUR_NOSTAVIA_API_KEY',
    environment: NostaviaEnvironment.sandbox,
  );
  
  runApp(MyApp());
}</code></pre>

            <h4>Connect a Provider</h4>
            <pre><code>Future&lt;void&gt; connectDevice() async {
  try {
    await Nostavia.connect(Provider.oura);
    print('Successfully connected to Oura!');
  } catch (error) {
    print('Connection failed: $error');
  }
}</code></pre>

            <h2>API Reference</h2>
            <h3>Data Fetching</h3>
            <p>Once connected, fetch normalized data across any provider using a unified API.</p>
            <pre><code>// Example: Fetching Sleep Data in React Native
const fetchSleepData = async () => {
  const startDate = new Date('2023-10-01T00:00:00Z');
  const endDate = new Date('2023-10-07T00:00:00Z');
  
  const sleepSessions = await Nostavia.getSleep(startDate, endDate);
  console.log(sleepSessions);
};</code></pre>

            <h4>Core Methods</h4>
            <ul>
                <li><code>Nostavia.getSleep(startDate, endDate)</code>: Returns <code>Promise&lt;Array&lt;SleepSession&gt;&gt;</code></li>
                <li><code>Nostavia.getHeartRate(startDate, endDate)</code>: Returns <code>Promise&lt;Array&lt;HeartRateSample&gt;&gt;</code></li>
                <li><code>Nostavia.getWorkouts(startDate, endDate)</code>: Returns <code>Promise&lt;Array&lt;Workout&gt;&gt;</code></li>
                <li><code>Nostavia.getBloodGlucose(startDate, endDate)</code>: Returns <code>Promise&lt;Array&lt;BloodGlucoseSample&gt;&gt;</code></li>
            </ul>

            <h2>Normalized Data Models</h2>
            <p>The SDK maps all provider-specific payloads into strict, unified models.</p>

            <h3>SleepSession</h3>
            <table>
                <thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
                <tbody>
                    <tr><td>id</td><td>String</td><td>Unique identifier.</td></tr>
                    <tr><td>provider</td><td>Provider</td><td>Data source (e.g., OURA, HEALTH_CONNECT).</td></tr>
                    <tr><td>startTime</td><td>Date</td><td>Start timestamp.</td></tr>
                    <tr><td>endTime</td><td>Date</td><td>End timestamp.</td></tr>
                    <tr><td>durationMs</td><td>Number</td><td>Total sleep duration.</td></tr>
                    <tr><td>efficiency</td><td>Number</td><td>Sleep efficiency score (0.0 to 1.0).</td></tr>
                    <tr><td>stages</td><td>Array&lt;SleepStage&gt;</td><td>Breakdown of AWAKE, LIGHT, DEEP, REM.</td></tr>
                </tbody>
            </table>

            <h3>HeartRateSample</h3>
            <table>
                <thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
                <tbody>
                    <tr><td>id</td><td>String</td><td>Unique identifier.</td></tr>
                    <tr><td>timestamp</td><td>Date</td><td>Time of the reading.</td></tr>
                    <tr><td>bpm</td><td>Number</td><td>Beats per minute.</td></tr>
                    <tr><td>context</td><td>Enum</td><td>RESTING, ACTIVE, SLEEP, WORKOUT.</td></tr>
                </tbody>
            </table>

            <h3>Workout</h3>
            <table>
                <thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
                <tbody>
                    <tr><td>type</td><td>String</td><td>Normalized activity type (RUNNING, CYCLING, etc.).</td></tr>
                    <tr><td>startTime</td><td>Date</td><td>Session start.</td></tr>
                    <tr><td>endTime</td><td>Date</td><td>Session end.</td></tr>
                    <tr><td>caloriesBurned</td><td>Number</td><td>Total active calories burned.</td></tr>
                    <tr><td>distanceMeters</td><td>Number</td><td>Distance covered.</td></tr>
                </tbody>
            </table>

            <h2>System Architecture</h2>
            <p>Nostavia utilizes a robust architecture to harmonize on-device and cloud capabilities seamlessly.</p>
            
            <div class="mermaid">
graph LR
    A[Client App] --> B(Nostavia SDK)
    B -->|On-Device| C[Apple HealthKit]
    B -->|On-Device| D[Google Health Connect]
    B -->|Cloud| E[Nostavia Backend]
    E --> F[Oura API]
    E --> G[Whoop API]
    E --> H[Fitbit API]
            </div>

            <h3>Multi-Source Resolution Engine</h3>
            <p>When a user connects multiple wearables (e.g., an Oura Ring and an Apple Watch), Nostavia intelligently merges the data using a strict priority queue and deduplicates overlaps.</p>
            <ul>
                <li><strong>Deduplication:</strong> Prevents double-counting when an external app (like Oura) writes to Apple HealthKit.</li>
                <li><strong>Smart Priority:</strong> Leverages the best device for specific metrics (e.g., Oura for Sleep, Apple Watch for Heart Rate).</li>
                <li><strong>Overrides:</strong> Fully customizable via <code>Nostavia.setSourcePriority(DataType, [Providers])</code>.</li>
            </ul>
        """
    }

    for filename, content in docs.items():
        # Inject an active class into the sidebar for the current page
        active_sidebar = sidebar_html.replace(f'href="{filename}"', f'href="{filename}" class="active"')
        
        full_html = f"""
{top_html}

<div class="docs-layout">
    {active_sidebar}
    <div class="docs-main">
        {content}
    </div>
</div>

{footer_html}
<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
<script>
    mermaid.initialize({{ startOnLoad: true }});
</script>
"""
        with open(filename, "w") as f:
            f.write(full_html)
        print(f"Generated {filename} with Ultra-Realistic Documentation Layout")

if __name__ == "__main__":
    create_docs()
