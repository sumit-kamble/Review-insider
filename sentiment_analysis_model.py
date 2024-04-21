import numpy as np 
import pandas as pd
import sys
import pickle
import re
import string
import nltk
from nltk.tokenize import word_tokenize
from nltk.stem import SnowballStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
import joblib
import json

# Load the saved model
# def load_model(model_path):
#     # with open(model_path, 'rb') as f:
#     #     model = pickle.load(f)
#     try:
#         model = joblib.load(model_path)
#     except FileNotFoundError:
#         print(f"Model file '{model_path}' not found.")
#     except Exception as e:
#         print(f"Error loading model file: {e}")
#     return model

# Perform sentiment analysis
# def sentiment_analysis(review, model):
#     # Placeholder implementation - replace with actual sentiment analysis code
#     return 'positive'  # Dummy implementation


def clean_text(text:str):
    """ Return cleaned text:
            - lowercase
            - remove whitespaces
            - remove HTML tags
            - replace digit with spaces
            - replace punctuations with spaces
            - remove extra spaces and tabs
        ------
        input: text (str)    
        output: cleaned text (str)
    """
    text = str(text)
    
    text = text.lower()
    text = text.strip()
    
    text = re.sub(' \d+', ' ', text)
    text = re.compile('<.*?>').sub('', text)
    text = re.compile('[%s]' % re.escape(string.punctuation)).sub(' ', text)
    text = re.sub('\s+', ' ', text)
    
    text = text.strip()
    return text

def remove_stopwords(text:str):
    """ Remove stopwords from text:
        ------
        input: text (str)    
        output: cleaned text (str)
    """
    text = str(text)
    filtered_sentence = []

    # Stop word lists can be adjusted for your problem
    stop_words = ["a", "an", "the", "this", "that", "is", "it", "to", "and"]

    # Tokenize the sentence
    words = word_tokenize(text)
    for w in words:
        if w not in stop_words:
            filtered_sentence.append(w)
    text = " ".join(filtered_sentence)
    
    return text

def stemm_text(text:str):
    """ Stemm text:
    ------
    input: text (str)    
    output: Stemmed text (str)
    """
    text = str(text)
    # Initialize the stemmer
    snow = SnowballStemmer('english')

    stemmed_sentence = []
    # Tokenize the sentence
    words = word_tokenize(text)
    for w in words:
        # Stem the word/token
        stemmed_sentence.append(snow.stem(w))
    text = " ".join(stemmed_sentence)
    
    return text

# review processing
def clean_and_remove_stopwords(review):
  """Cleans and removes stopwords from a review."""
  # Clean the text
  review = clean_text(review)

  # Remove stopwords
  review = remove_stopwords(review)

  # Stemming
  review = stemm_text(review)

  return review


# Main function to load model and perform sentiment analysis
if __name__ == '__main__':
    model_path = sys.argv[1]  # Path to the model file passed as command-line argument
    review = sys.argv[2]       # Review passed as command-line argument
    # print(model_path)
    # print("Input Review: ", review)
    # review processing
    cleaned_review = clean_and_remove_stopwords(review)
    # print("Cleaned Review", cleaned_review)

    data = pd.read_csv('cleaned_data.csv')
    # data.info()
    data[data['text'].isnull()]
    data.dropna(inplace=True)
    # fitting vectorizer
    vectorizer = TfidfVectorizer(max_features=700)
    vectorizer.fit(data['text'])
    data_features = vectorizer.transform(data['text'])
    # Convert the transformed review to a NumPy array
    features = data_features.toarray()
    # print(features)

    # Transform the input review
    review_tfidf = vectorizer.transform([cleaned_review])

    # Convert the transformed review to a NumPy array
    review_features = review_tfidf.toarray()
    # print(review_features)
    # Make predictions on the transformed review
    # y_pred = model.predict(review_features)

    # print(y_pred)
    # try:
    model = joblib.load(model_path)
    # except FileNotFoundError:
    #     print(f"Model file '{model_path}' not found.")
    # except Exception as e:
    #     print(f"Error loading model file: {e}")
    # print("Model loaded")
    model_predict = model.predict(review_features)
    # print(model_predict)
    sentiment = 'positive' if model_predict > 0 else 'negative' if model_predict == 0 else 'neutral'
    result = {'sentiment': sentiment}
    print(json.dumps(result))

