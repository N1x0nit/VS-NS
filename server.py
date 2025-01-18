from flask import Flask, render_template
import requests
from bs4 import BeautifulSoup

app = Flask(__name__, template_folder="Front_End")

def get_economic_calendar():
    url = "https://www.investing.com/economic-calendar/"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
    }

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return None

    soup = BeautifulSoup(response.content, "html.parser")
    calendar_data = []
    rows = soup.find_all("tr", class_="js-event-item")

    for row in rows:
        try:
            time = row.find("td", class_="time").text.strip()
            currency = row.find("td", class_="flagCur").text.strip()
            event = row.find("td", class_="event").text.strip()
            actual = row.find("td", class_="act").text.strip()
            forecast = row.find("td", class_="fore").text.strip() if row.find("td", class_="fore") else "N/A"
            previous = row.find("td", class_="prev").text.strip() if row.find("td", class_="prev") else "N/A"

            calendar_data.append({
                "time": time,
                "currency": currency,
                "event": event,
                "actual": actual,
                "forecast": forecast,
                "previous": previous,
            })
        except AttributeError:
            continue

    return calendar_data

@app.route("/")
def index():
    calendar_data = get_economic_calendar()
    if not calendar_data:
        return "Ошибка получения данных с Investing"
    return render_template("Front_End/index.html", calendar_data=calendar_data)

if __name__ == "__main__":
    app.run(debug=True)
