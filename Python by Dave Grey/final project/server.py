from ctypes import c_time_t
from email import message
from flask import Flask, render_template, request
from weather import get_current_weather
from waitress import serve

app = Flask(__name__)


@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html")


@app.route("/weather")
def getWeather():
    city = request.args.get("city")
    if not bool(city.strip()):
        weather_data = get_current_weather(city)
        if city == "":
            return render_template(
                "not_found_city.html", message="Please enter City Name"
            )
    else:
        weather_data = get_current_weather(city)
        if weather_data["cod"] == "400" or weather_data["cod"] == "404":
            return render_template(
                "not_found_city.html", message=weather_data["message"]
            )
        else:
            return render_template(
                # if(weather_data['name']=='None')
                "weather.html",
                title=weather_data["name"],
                temp=weather_data["main"]["temp"],
                feels_like=weather_data["main"]["feels_like"],
                status=weather_data["weather"][0]["main"],
            )


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000)
