import os
import random, requests
from flask import Flask, current_app, request, send_from_directory
import pandas as pd
from openpyxl import load_workbook
import numpy as np

app = Flask(__name__)

@app.route('/chess', methods=['GET'])
def get_games():
    archives = get_archives() # helper function
    with requests.Session() as session:
        games = []
        fen_list = []
        for url in archives:  # parse the GET request
            response = session.get(url)
            response = response.json()
            games.extend(response["games"])
        for game in games:
            try:
                if game["fen"][-1] != '-': # gets a game not in opening position
                    fen = game["fen"]
                    fen_list.append(fen)
            except:
                pass
    # gets two different objects in the list
    fen_list = [*set(fen_list)] # removes duplicates
    copy_fen_list = fen_list[:]
    random.shuffle(copy_fen_list)
    first_fen = copy_fen_list.pop()
    #print(first_fen)
    return {'first': fen_list} # return JSON for JavaScript

def get_archives():
    try: # GET request to chess-web-api
        response = requests.get(f"https://api.chess.com/pub/player/goofyman2/games/archives")
        response.raise_for_status()
    except: 
        return None
    try: # change to JSON and then return an array
        archives = response.json()
        return archives["archives"]
    except:
        return None

# global lists prevent excel from overwritting existing data
num_list = []
fen_list = []
lich_url = []
@app.route('/api/query', methods=['GET', 'POST'])
def get_react_query():
    data = request.get_json() or {} # get data from front-end (bypassing CORS)
    print("DATA: ", data)
    num = data['data'][0] # random number selected
    fen = data['data'][1] # fen of game selected
    url = 'https://lichess.org/analysis/' + fen.replace(" ", "_") # lichess url of fen
    num_list.append(num)
    fen_list.append(fen)
    lich_url.append(url)
    print(num_list, '\n', fen_list)
    # Prepare excel for writing
    df = pd.DataFrame({
        'Random num': num_list,
        'Fen of game': fen_list,
        'Lichess urls': lich_url
    })
    # Writes to an Excel spreadsheet
    with pd.ExcelWriter('Book.xlsx',mode='a', engine='openpyxl',
    if_sheet_exists='replace',
    ) as writer:
        df.to_excel(writer, sheet_name='Sheet1', index=False)
    return send_from_directory(app.config[''])
