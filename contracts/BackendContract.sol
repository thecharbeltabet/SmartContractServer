// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract BackendContract {

    event CreateTweet(address recipient, uint uniqueID);
    
    event DeleteTweet(uint uniqueID, bool isRemoved);

// Implementing a structure or class named tweet that has 4 attributes : the tweet id , the walletID of the user,the text and the status if it is removed

    struct Tweet {
        uint id;
        address walletID;
        string tweetText;
        bool isRemoved;
    }

    Tweet[] private tweets;

    mapping(uint256 => address) tweetToOwner;


    // Implementing the create tweet method

    function createTweet(string memory tweetText, bool isRemoved) external {
        uint uniqueID = tweets.length;
        tweets.push(Tweet(uniqueID, msg.sender, tweetText, isRemoved));
        tweetToOwner[uniqueID] = msg.sender;
        emit CreateTweet(msg.sender, uniqueID);
    }



        // Implementing the get all tweets method to get the tweets of all the users


    function getAllTweets() external view returns (Tweet[] memory) {
        Tweet[] memory temporary = new Tweet[](tweets.length);
        uint counter = 0;
        for(uint i=0; i<tweets.length; i++) {
            if(tweets[i].isRemoved == false) {
                temporary[counter] = tweets[i];
                counter++;
            }
        }

        Tweet[] memory result = new Tweet[](counter);
        for(uint i=0; i<counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    // Implementing the get my tweets method to get the tweets of the currently logged user


    function getMyTweets() external view returns (Tweet[] memory) {
        Tweet[] memory temporary = new Tweet[](tweets.length);
        uint counter = 0;
        for(uint i=0; i<tweets.length; i++) {
            if(tweetToOwner[i] == msg.sender && tweets[i].isRemoved == false) {
                temporary[counter] = tweets[i];
                counter++;
            }
        }

        Tweet[] memory result = new Tweet[](counter);
        for(uint i=0; i<counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }


    // Implementing the update tweet method that allows the user to change the text in his tweet

    
    // function updateTweet(string memory tweetText) external {
    //     tweets.push(Tweet(uniqueID, msg.sender, tweetText, isRemoved));
    //      delete the previous one and add the edited one  
    //     tweetToOwner[uniqueID] = msg.sender;
    // }

    // Implementing the delete tweet method that lets the author of the tweet delete it


    function deleteTweet(uint uniqueID, bool isRemoved) external {
        if(tweetToOwner[uniqueID] == msg.sender) {

            tweets[uniqueID].isRemoved = isRemoved;

            emit DeleteTweet(uniqueID, isRemoved);
        }
    }

}
