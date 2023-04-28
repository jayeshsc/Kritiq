from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient('mongodb://localhost:27017/')
db = client['mydatabase']
collection = db['mycollection']

@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    collection.insert_one(data)
    return jsonify({'status': 'success', 'message': 'Data inserted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
