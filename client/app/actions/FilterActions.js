var AppDispatcher = require("../dispatcher/AppDispatcher");
var FilterConstants = require("../constants/FilterConstants");

var FilterActions = {
  filterName: function(name) {
    AppDispatcher.handleViewAction({
      actionType: FilterConstants.FILTER_NAME,
      name: name
      id: id
    });
  },

  unfilterName: function(name) {
    AppDispatcher.handleViewAction({
      actionType: FilterConstants.UNFILTER_NAME,
      name: name
      id: id
    });
  }

};

module.exports = FilterActions;
