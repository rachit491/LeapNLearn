# LeapNLearn

How to run it - 

1. export FLASK_APP=checkWord.py
2. python -m flask run

## Inspiration

We derived inspiration for this project by realizing the need for an intuitive and interactive gesture-based educational platform. Our research highlighted that games are the quickest form of learning tools, and what better than using Augmented Reality as a platform to enhance learning. We also loved the Leap Motion "playground" as a starting point to delve into Augmented Reality. We all loved Word Scramble and Crosswords and this project is also a tribute to such classic word games.

## How we built it

We built this web app using Javascript in the front end and Python in the backend. We also used the following Microsoft Cognitive Services API - 1) Microsoft Speech Recognition API 2) Microsoft Entity Search API

## Challenges we ran into

We spent a lot of time in handling events between javascript and python scripts. We were not able to pass variables between the js script and the python script and return it back to javascript. But at the end, we figured it out with the help of mentors. We also had some trouble in parsing the JSON output from the Microsoft Entity Search API.

## Accomplishments that we're proud of

As this was our first venture in Augmented Reality, we are really proud of exploring the many facets of Leap Motion controller. The possibilities are endless with this device. We were able to design an interactive game based on gestures on a ubiquitous platform like the web browser.

## What we learned

We learned that AR is a really cool platform to develop apps for learning. Integrating with API's we can add so many dimensions to a web app.

## What's next for LeapNLearn

Integration with the Oculus Rift, building VR based games.
Integration with Amazon Alexa for voice integration
