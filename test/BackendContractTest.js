const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Backend Contract", function () {
  let Twitter;
  let twitter;
  let user;

  // Giving random values

  const NumOfAllTweets = 9;
  const NumOfMyTweets = 5;

  let totalTweets;
  let totalMyTweets;

  beforeEach(async function () {
    Twitter = await ethers.getContractFactory("BackendContract");
    [user, addu1, addu2] = await ethers.getSigners();
    twitter = await Twitter.deploy();

    totalTweets = [];
    totalMyTweets = [];

    for (let i = 0; i < NumOfAllTweets; i++) {
      let tweet = {
        tweetText: "Random text with id:- " + i,
        walletID: addu1,
        isRemoved: false,
      };

      await twitter
        .connect(addu1)
        .createTweet(tweet.tweetText, tweet.isRemoved);
      totalTweets.push(tweet);
    }

    for (let i = 0; i < NumOfMyTweets; i++) {
      let tweet = {
        walletID: user,
        tweetText: "Random text with id:- " + (NumOfAllTweets + i),
        isRemoved: false,
      };

      await twitter.createTweet(tweet.tweetText, tweet.isRemoved);
      totalTweets.push(tweet);
      totalMyTweets.push(tweet);
    }
  });

  // Testing the create tweet method

  describe("Create Tweet", function () {
    it("should emit createTweet event", async function () {
      let tweet = {
        tweetText: "New Tweet",
        isRemoved: false,
      };

      await expect(await twitter.createTweet(tweet.tweetText, tweet.isRemoved))
        .to.emit(twitter, "CreateTweet")
        .withArgs(user.address, NumOfAllTweets + NumOfMyTweets);
    });
  });

  // Testing the get all tweets method

  describe("Get all Tweets", function () {
    it("should return the number of all the tweets created", async function () {
      const tweetsFromChain = await twitter.getAllTweets();
      expect(tweetsFromChain.length).to.equal(NumOfAllTweets + NumOfMyTweets);
    });

    it("should return the  number of all my tweets", async function () {
      const myTweetsFromChain = await twitter.getMyTweets();
      expect(myTweetsFromChain.length).to.equal(NumOfMyTweets);
    });
  });

  describe("Delete Tweet", function () {
    it("should emit delete tweet event", async function () {
      const TWEET_ID = 0;
      const TWEET_isRemoved = true;

      await expect(
        twitter.connect(addu1).deleteTweet(TWEET_ID, TWEET_isRemoved)
      )
        .to.emit(twitter, "DeleteTweet")
        .withArgs(TWEET_ID, TWEET_isRemoved);
    });
  });
});
