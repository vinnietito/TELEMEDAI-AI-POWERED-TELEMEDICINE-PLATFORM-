from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load mock model
with open('model.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/api/symptoms', methods=['POST'])
def predict_symptom():
    data = request.json
    symptoms = data.get('symptoms')  # e.g. ['fever', 'cough']
    
    if not symptoms:
        return jsonify({'error': 'Symptoms required'}), 400

    # Map to model input format
    symptom_dict = {'fever': 0, 'cough': 1, 'fatigue': 2, 'headache': 3}
    input_vector = [0] * len(symptom_dict)
    for s in symptoms:
        if s in symptom_dict:
            input_vector[symptom_dict[s]] = 1

    prediction = model.predict([input_vector])[0]

    return jsonify({'diagnosis': prediction})

if __name__ == '__main__':
    app.run(port=5001)
