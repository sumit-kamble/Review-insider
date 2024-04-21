from textblob import TextBlob
import sys
import json

# Read the review from command line arguments
review = sys.argv[1]

# Perform sentiment analysis using TextBlob
blob = TextBlob(review)
sentiment_score = blob.sentiment.polarity
sentiment = 'positive' if sentiment_score > 0 else 'negative' if sentiment_score < 0 else 'neutral'

# Output the sentiment analysis result as JSON
result = {'sentiment': sentiment}
print(json.dumps(result))
