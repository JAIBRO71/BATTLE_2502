from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

API_KEY = "rc_e707ebd7230ae4145d20fa15dbf2b0f090707e47d8df7aa84046f77f452c43c6"

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

        print(result)

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