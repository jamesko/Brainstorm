jest.autoMockOff();
describe('Test Reflux', function () {
  it('Actions should integrate with Stores', function () {
    var Reflux = require('../../../node_modules/reflux/index');
    var action = Reflux.createAction('action');
    var mockFn = jest.genMockFn();
    var store = Reflux.createStore({
      init: function () {
        this.listenTo(action, this.onAction);
      },
      onAction: function () {
        mockFn();
      }
    });
    action('Hello World');
    jest.runAllTimers();
    expect(mockFn).toBeCalled();
  });
});