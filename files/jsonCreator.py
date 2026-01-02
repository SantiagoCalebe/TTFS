import os
import json

def format_name(filename):
    name = os.path.splitext(filename)[0]
    name = name.lstrip("0123456789-_. ")
    name = name.replace("_", " ").replace("-", " ")
    name = " ".join(word.capitalize() for word in name.split())
    return name

def get_audio_files(directory):
    audio_list = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.lower().endswith('.mp3'):
                full_path = os.path.join(root, file)
                formatted_name = format_name(file)
                audio_list.append({
                    "name": formatted_name,
                    "path": full_path.replace("\\", "/")
                })
    return audio_list

if __name__ == "__main__":
    folder = "./songs"
    result = get_audio_files(folder)

    for i, item in enumerate(result, start=1):
        item['ind'] = i

    with open("songs.json", "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    for item in result:
        print(f"-- {item['ind']} --")
        print(f"name: {item['name']}")
        print(f"ind: {item['ind']}")
        print(f"path: {item['path']}\n")

    print(f"Done.")