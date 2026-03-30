from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv("API_KEY")

@app.route("/")
def home():
    return send_from_directory(".", "index.html")

@app.route("/style.css")
def style():
    return send_from_directory(".", "style.css")

@app.route("/script.js")
def script():
    return send_from_directory(".", "script.js")

@app.route("/resolve", methods=["POST"])
def resolve():
    data = request.json
    user_input = data.get("input", "")

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "meta-llama/Meta-Llama-3.1-8B-Instruct",
        "messages": [
            {
                "role": "system",
                "content": "You are an AI conflict resolver. Analyze conflicting requirements and give the best balanced recommendation with a short explanation."
            },
            {
                "role": "user",
                "content": user_input
            }
        ],
        "temperature": 0.7
    }

    try:
        response = requests.post(
            "https://api.featherless.ai/v1/chat/completions",
            headers=headers,
            json=payload
        )

        result = response.json()

        if "choices" in result:
            return jsonify({
                "reply": result["choices"][0]["message"]["content"]
            })
        else:
            return jsonify({
                "reply": f"API Error: {result}"
            })

    except Exception as e:
        return jsonify({
            "reply": f"Server Error: {str(e)}"
        })

if __name__ == "__main__":
    app.run(debug=True)