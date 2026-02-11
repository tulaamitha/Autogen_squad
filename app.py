from flask import Flask, render_template, request
import requests
import json

app = Flask(__name__)

# 🔴 PASTE YOUR OPENROUTER API KEY HERE
OPENROUTER_API_KEY = "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"

@app.route("/", methods=["GET", "POST"])
def index():
    result = None

    if request.method == "POST":
        course = request.form["course"]
        level = request.form["level"]
        duration = request.form["duration"]

        prompt = f"""
Generate a structured {duration}-week syllabus for {course} at {level} level.

Return STRICT JSON format:
{{
    "modules": [],
    "learning_outcomes": [],
    "assessments": []
}}
"""

        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "openai/gpt-3.5-turbo",
                "messages": [
                    {"role": "user", "content": prompt}
                ]
            }
        )

        data = response.json()

        if "choices" in data:
            try:
                content = data["choices"][0]["message"]["content"]
                result = json.loads(content)
            except:
                result = {"error": "Model did not return proper JSON"}
        else:
            result = {"error": "API Error", "details": data}

    return render_template("index.html", result=result)

if __name__ == "__main__":
    app.run(debug=True)
