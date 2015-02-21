var config = {
  github:{
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'https://brainstormideation.herokuapp.com/auth/github/callback'
  },
  facebook:{
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: 'https://brainstormideation.herokuapp.com/auth/facebook/callback'
  },  
  google:{
    returnURL: "https://brainstormideation.herokuapp.com/auth/google/return",
    realm: "https://brainstormideation.herokuapp.com/"    
  }  
};
module.exports = config;