from flask import Flask, render_template,request,jsonify
from messaging import getResponse

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    text = request.get_json().get("message")
    reply = getResponse(text)
    return jsonify({"answer": reply})

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(host="192.168.0.13", debug=True)


# Flask, OpenAI GPT3.5, LangChain