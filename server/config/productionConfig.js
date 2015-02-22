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
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://brainstormideation.herokuapp.com/auth/google/callback'
  }  
};
module.exports = config;



