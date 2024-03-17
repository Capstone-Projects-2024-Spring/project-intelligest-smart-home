from dotenv import load_dotenv
import requests
import os

load_dotenv()

api_key = os.environ.get("NEWS_API_KEY")

# Make request to News API for top headlines
url = f"https://newsapi.org/v2/top-headlines?country=us&apiKey={api_key}"
response = requests.get(url)
data = response.json()

# Check if request was successful
if response.status_code == 200:
    # Print the headlines
    for article in data['articles']:
        print(article['title']+"\n")
else:
    print("Failed to fetch top headlines:", data['message'])
