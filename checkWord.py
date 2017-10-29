import enchant
import httplib, json
from six.moves.urllib.parse import urlparse
import urllib
from flask import Flask, request, jsonify, render_template
import json

ctr = 0
points = 0
subscriptionKey = "1b7f6770631348f8b0b87724a4b62fca" #  Microsoft Cognitive API key 
host = "api.cognitive.microsoft.com"
path = "/bing/v7.0/search"
term = "Microsoft Cognitive Services"

app = Flask(__name__)

@app.route('/_check')
def check():
    wordlist = request.args.get('wordlist')
    #print(wordlist)
    return jsonify(result=main(wordlist))

@app.route('/')
def index():
    return render_template('index.html')

def BingWebSearch(search):
    "Performs a Bing Web search and returns the results."
    global subscriptionKey
    headers = {'Ocp-Apim-Subscription-Key': subscriptionKey}
    conn = httplib.HTTPSConnection(host)
    query = urllib.pathname2url(search)
    conn.request("GET", path + "?q=" + query, headers=headers)
    response = conn.getresponse()
    headers = [k + ": " + v for (k, v) in response.getheaders()
                   if k.startswith("BingAPIs-") or k.startswith("X-MSEdge-")]
    return headers, response.read().decode("utf8")

    if len(subscriptionKey) == 32:

        print('Searching the Web for: ', search)
        headers, result = BingWebSearch(search)
        print("\nRelevant HTTP Headers:\n")
        print("\n".join(headers))
        print("\nJSON Response:\n")
        print(json.dumps(json.loads(result), indent=4))

    else:

        print("Invalid Bing Search API subscription key!")
        print("Please paste yours into the source code.")

def updatePoints(flag):
    global points
    if flag:
        points+=5
        print("Total Points: {}\n".format(points))
    return points

def checkValidWord(s):
    d = enchant.Dict("en_US")
    return (d.check(s.lower()))

def main(wordlist):
    #testWords = ["processing","exclaim","buisness","cofffeee"]
    #testWords = json.loads(params)
    global ctr
    ctr = 0
    point = 0
    testWords = wordlist.split(",")
    print(testWords)
    for i in range(len(testWords)):
        str = testWords[i].replace('"','')
        str = str.replace("[",'')
        str = str.replace("]",'')
        if len(str) > 2:
            dec = checkValidWord(str)
            print("String is {} and Result is {}".format(str, dec))
            point = updatePoints(dec)
        else:
            continue
    print("Kundu {}".format(point))
    return point

if __name__ == "__main__":
    app.run()
