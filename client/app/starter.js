var React = require("react");
var BrainstormApp = require("./components/BrainstormApp");
var About = require("./components/AboutView/About");
var IndexView = require("./components/IndexView/IndexView");
var RoomsView = require("./components/RoomsView/RoomsView");
var IdeaRoomView = require("./components/IdeaRoomView/IdeaRoomView");
var Brainswarm = require("./components/BrainswarmView/Brainswarm");
var NotFoundView = require("./components/NotFoundView/NotFoundView");
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var NotFoundRoute = Router.NotFoundRoute;

var routes = (
  <Route name="brainstormApp" path="/" handler={BrainstormApp}>
    <Route name="about" path="/about" handler={About}/>
    <Route name="roomsView" path="/rooms" handler={RoomsView} />
    <Route name="ideaRoomView" path="/rooms/:roomId" handler={IdeaRoomView}/>
    <Route name="brainswarm" path="/brainswarms/:brainswarmId" handler={Brainswarm}/>
    <DefaultRoute  handler={IndexView}/>
    <NotFoundRoute handler={NotFoundView} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('main'));
});
