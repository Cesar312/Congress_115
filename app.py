from flask import Flask, render_template, redirect, url_for
import pymongo
import congress_scrape
from http.server import SimpleHTTPRequestHandler, HTTPServer

app = Flask(__name__)

conn = "mongodb://localhost:27017/congress_db"
client = pymongo.MongoClient(conn)
client.congress.congress.drop()


@app.route("/")
def home():
    global congress
    try:    
   
        congress = client.congress.congress
        congress_data = congress_scrape.scrape_info()
        congress.update({}, congress_data, upsert=True)

        congress = client.congress.congress.find_one()

        return render_template("index.html", congress=congress)
    except:
        pass


@app.route("/members")
def members():

    return render_template("members.html")

@app.route("/map")
def map():
  return render_template("map.html")


@app.route("/insight")
def insight():
  return render_template("insight.html")


@app.route("/home")
def home_index():
    congress1=congress
    return render_template("index2.html", congress=congress1)




if __name__ == "__main__":
    app.run(debug=True)