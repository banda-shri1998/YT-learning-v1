from dotenv import load_dotenv
from pprint import pprint
import requests
import os

load_dotenv()


def get_current_weather(city):
    request_url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&APPID={os.getenv('API_KEY')}&units=metric"
    weather_data = requests.get(request_url).json()
    return weather_data
    # return f'\nCurrent weather for <strong>{weather_data["name"]}</strong>:<br>The temp is {weather_data["main"]["temp"]:.1f}°\n{weather_data["weather"][0]["description"].capitalize()} and feels like <strong>{weather_data["main"]["feels_like"]:.1f}°</strong>'


if __name__ == "__main__":
    print("\n")
    city = input("Please enter City name:")
    weather_data = get_current_weather(city)
    pprint(weather_data)
