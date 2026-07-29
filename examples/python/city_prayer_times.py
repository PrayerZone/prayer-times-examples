import json
import sys
import urllib.parse
import urllib.request

city = sys.argv[1] if len(sys.argv) > 1 else "paris"
language = sys.argv[2] if len(sys.argv) > 2 else "en"
path = f"/api/public/cities/{urllib.parse.quote(city, safe='')}/prayer-times"
query = urllib.parse.urlencode({"lang": language})
request = urllib.request.Request(
    f"https://pray.zone{path}?{query}",
    headers={
        "Accept": "application/json",
        "User-Agent": "PrayerZoneExamples/1.0 (+https://pray.zone)",
    },
)

with urllib.request.urlopen(request, timeout=15) as response:
    payload = json.load(response)

print(f"{payload['city']['name']} · {payload['data']['date']}")
for prayer in payload["data"]["prayerTimes"]:
    marker = "→" if prayer["isNext"] else " "
    print(f"{marker} {prayer['name']:<10} {prayer['time']}")
