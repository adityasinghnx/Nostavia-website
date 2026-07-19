import os

with open('build_docs.py', 'r') as f:
    content = f.read()

# Emojis to remove
replacements = {
    "🚀 ": "",
    "✨ ": "",
    "🌍 ": "",
    "📖 ": "",
    "🧩 ": "",
    "🏗️ ": "",
    "📚 ": "",
    "9+": "8+",
    "Apple Health, Oura, Whoop, and Garmin": "Apple Health, Oura, and Whoop",
    "                    <tr><td>Garmin</td><td>Cloud API</td><td>Sleep, Activity, Workouts, Stress, Body Battery</td><td>Webhook-heavy (push vs pull model)</td></tr>\n": "",
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open('build_docs.py', 'w') as f:
    f.write(content)
print("Cleaned build_docs.py")
