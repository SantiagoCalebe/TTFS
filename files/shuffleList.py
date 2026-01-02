import random
import json
import os

def shuffleList(song_list):
    for _ in range(10):
        random.shuffle(song_list)

    for i, song in enumerate(song_list, start=1):
        song['ind'] = i

    return song_list

def loadJson(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        if isinstance(data, dict) and "songs" in data:
            data = data["songs"]
        return data

def saveJson(data, output_path):
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def init(input_file, output_file):
    songs = loadJson(input_file)
    if not isinstance(songs, list):
        print("Error: JSON must be a list of songs.")
        return

    shuffled_songs = shuffleList(songs)
    saveJson(shuffled_songs, output_file)
    print(f"Done.")

script_dir = os.path.dirname(os.path.abspath(__file__))
input_file = os.path.join(script_dir, 'songsOG.json')
output_file = os.path.join(script_dir, 'songs.json')

init(input_file, output_file)