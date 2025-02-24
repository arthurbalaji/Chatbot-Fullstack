from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, origins=["*"])

API_KEY = "b01549077022aad0fe3f040b5bd456a819fa4e0b5e793a9b0f1e48020591fc21"  
URL = "https://api.together.xyz/v1/chat/completions"
HEADERS = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}

@app.route("/chat", methods=["POST"])
def chat_with_togetherai():
    data = request.get_json()
    user_input = data.get("message")
    
    if not user_input:
        return jsonify({"error": "No message provided"}), 400
    
    payload = {
        "model": "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo-128K",
        "messages": [{"role": "user", "content": user_input}]
    }
    
    response = requests.post(URL, headers=HEADERS, json=payload)
    response_data = response.json()
    bot_reply = response_data["choices"][0]["message"]["content"]
    
    return jsonify({"response": bot_reply})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
