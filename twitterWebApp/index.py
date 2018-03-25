
from flask import Flask

import json
import os
import requests
import twitter

from flask import Flask, jsonify, send_file
from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
from requests_oauthlib import OAuth1

CONSUMER_KEY = 'afYnwWSyis3cz6W8I7AtK4IGi'
CONSUMER_SECRET = 'aroOzNR1f1176mKwLk0fMvfsBOEjpiQxEzqOMq1qEAw1x3Sgxm'
ACCESS_TOKEN = '2680945535-uYr3M0nVc0fRWlbWt4n36Maqtmc8fnJA2W56Oz2'
ACCESS_TOKEN_SECRET = 'SFU5DFq0uGNaE6BSOJv8x682K8pU8UMvuKtBbiGFMeqi6'

app = Flask(__name__)      
 
@app.route('/')
def test():
	return jsonify({'message' : 'It works!'})



# @app.route('/<string:word>')

class listener(StreamListener):
      def on_data(self, word):
        print(word)
        
        return(True)


      def on_error(self, status):
          print status


auth = OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)

twitterStream = Stream(auth, listener())
results = twitterStream.filter(track=["shooting"],locations=[(-122.75,36.8,-121.75,37.8)],languages=["en"])
 


if __name__ == '__main__':
  app.run(debug=True, port=8080)
