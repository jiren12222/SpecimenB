from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import json
import os
import random

app = Flask(__name__)
CORS(app)

DATA_FILE = 'data.json'

DEFAULT_DATA = {
    "user": {
        "points": 3000,
        "referral_code": "USER6E1SE7",
        "invited": 0,
        "joined": 0,
        "earned_from_ref": 0
    },
    "milestones": [
        {"name": "Starter", "points": 1500, "desc": "Beginner badge unlocked", "unlocked": True},
        {"name": "Explorer", "points": 5000, "desc": "Early access badge", "unlocked": False},
        {"name": "Champion", "points": 10000, "desc": "Priority support", "unlocked": False},
        {"name": "Elite", "points": 50000, "desc": "Exclusive rewards", "unlocked": False},
        {"name": "Legend", "points": 500000, "desc": "VIP status", "unlocked": False}
    ],
    "quests": [
        {"name": "Follow X Account", "desc": "Follow official X account", "reward": 1500, "completed": True, "icon": "X"},
        {"name": "Join Discord", "desc": "Join the community Discord server", "reward": 500, "completed": False, "icon": "D"},
        {"name": "Share on X", "desc": "Tweet about SpecimenB with hashtag", "reward": 1000, "completed": False, "icon": "S"},
        {"name": "Connect Wallet", "desc": "Link your Solana wallet", "reward": 800, "completed": False, "icon": "W"},
        {"name": "First Distribution", "desc": "Complete your first token distribution", "reward": 2000, "completed": False, "icon": "T"}
    ],
    "activities": [
        {"text": "Completed quest: Follow X Account", "time": "2h ago", "points": 1500},
        {"text": "Milestone unlocked: Starter", "time": "2h ago", "points": 0},
        {"text": "Account created", "time": "1d ago", "points": 100}
    ]
}

def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            return json.load(f)
    return DEFAULT_DATA.copy()

def save_data(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=2)

if not os.path.exists(DATA_FILE):
    save_data(DEFAULT_DATA)

@app.route('/api/points')
def get_points():
    data = load_data()
    return jsonify(data)

@app.route('/api/complete-quest', methods=['POST'])
def complete_quest():
    data = load_data()
    quest_name = request.json.get('quest')
    for quest in data['quests']:
        if quest['name'] == quest_name and not quest['completed']:
            quest['completed'] = True
            data['user']['points'] += quest['reward']
            data['activities'].insert(0, {
                "text": f"Completed quest: {quest_name}",
                "time": "Just now",
                "points": quest['reward']
            })
            for m in data['milestones']:
                if not m['unlocked'] and data['user']['points'] >= m['points']:
                    m['unlocked'] = True
                    data['activities'].insert(0, {
                        "text": f"Milestone unlocked: {m['name']}",
                        "time": "Just now",
                        "points": 0
                    })
            if len(data['activities']) > 20:
                data['activities'] = data['activities'][:20]
            save_data(data)
            return jsonify({"success": True, "points": data['user']['points']})
    return jsonify({"success": False})

@app.route('/api/referral', methods=['POST'])
def track_referral():
    data = load_data()
    data['user']['invited'] += 1
    data['user']['joined'] += 1
    data['user']['earned_from_ref'] += 100
    data['user']['points'] += 100
    data['activities'].insert(0, {
        "text": "New referral joined",
        "time": "Just now",
        "points": 100
    })
    if len(data['activities']) > 20:
        data['activities'] = data['activities'][:20]
    save_data(data)
    return jsonify({"success": True})

@app.route('/api/simulate')
def simulate_activity():
    data = load_data()
    add = random.randint(10, 100)
    data['user']['points'] += add
    data['activities'].insert(0, {
        "text": "Points earned from activity",
        "time": "Just now",
        "points": add
    })
    if len(data['activities']) > 20:
        data['activities'] = data['activities'][:20]
    save_data(data)
    return jsonify({"added": add, "total": data['user']['points']})

@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

@app.route('/points')
def points_page():
    return send_from_directory('.', 'points.html')

@app.route('/quests')
def quests_page():
    return send_from_directory('.', 'points.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
