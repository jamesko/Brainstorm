jest.autoMockOff();

describe('UserAuth', function() {
  it('text renders to login', function() {
    var React = require('react/addons');
    var UserAuth = require('../../../client/app/components/UserAuth.js');
    var TestUtils = React.addons.TestUtils;
    var checkbox = TestUtils.renderIntoDocument(
      <UserAuth />
    );
    var label = TestUtils.findRenderedDOMComponentWithTag(checkbox, 'div');
    var text = label.getDOMNode().textContent.slice(0,5);
    expect(text).toEqual('Login');
  });

  it('text renders logout after logging in', function(){
    var React = require('react/addons');
    var UserStore = require('../../../client/app/stores/UserStore.js');
    var UserAuth = require('../../../client/app/components/UserAuth.js');
    var TestUtils = React.addons.TestUtils;
    UserStore.get = jest.genMockFunction().mockImplementation(function(){ return true;});
    var checkbox = TestUtils.renderIntoDocument(
      <UserAuth />
    );
    var label = TestUtils.findRenderedDOMComponentWithTag(checkbox, 'div');
    var text = label.getDOMNode().textContent.slice(0,6);
    expect(text).toEqual('Logout');
  })
});