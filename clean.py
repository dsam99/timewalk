import os
import json

data = None

with open('./here_data.json') as f:
    data = json.load(f)

final = []
last_lat = 0
last_long = 0

print(final)

for piece in data:
    if not (abs(piece["position"]["lat"] - last_lat) < .0002 and
            abs(piece["position"]["lng"] - last_long) < .0002):
        last_lat = piece["position"]["lat"]
        last_long = piece["position"]["lng"]

        temp = {
            "lat": piece["position"]["lat"],
            "long": piece["position"]["lng"],
            "timestamp": piece["timestamp"]
        }

        final.append(temp)


with open('./position_data_cleaned.json', 'w+') as f:
    json.dump(final, f)