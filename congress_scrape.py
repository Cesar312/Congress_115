from splinter import Browser
from bs4 import BeautifulSoup
import pandas as pd 
from selenium import webdriver


#def init_browser():
executable_path = {'executable_path': '/usr/local/bin/chromedriver'}
browser = Browser('chrome', **executable_path, headless=False)

def scrape_info():

    news_title, news_snippet, news_image = congress_news(browser)

    scraped_data = {
            "tweet": congress_tweet(browser),
            "news_title" : news_title,
            "news_snippet" : f"https:{news_snippet}",
            "news_image": f"https:{news_image}" ,

        }
    browser.quit()
    return scraped_data

def congress_tweet(browser):

    url = 'https://twitter.com/congressdotgov?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor'
    browser.visit(url)

    html = browser.html
    twitter_soup = BeautifulSoup(html, 'html.parser')

    congress_tweet = twitter_soup.find('p', class_='TweetTextSize').text

    browser.quit()
    return congress_tweet

def congress_news(browser):
    
    url = 'https://www.cnn.com/search/?q=congress'
    browser.visit(url)

    html = browser.html
    news_soup = BeautifulSoup(html, "html.parser")

    news_title = news_soup.find('h3', class_='cnn-search__result-headline').text
    news_snippet = news_soup.find('div', class_='cnn-search__results-list').find('a').attrs['href']
    news_image = news_soup.find('div', class_='cnn-search__result-thumbnail').find('img').attrs['src']


    return news_title, news_snippet, news_image

