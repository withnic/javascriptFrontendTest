var assert = require('power-assert');
var lib = require('../sample.dev.js');

describe('Sample', function() {

  // It's fake
  var server;

  before(function(done) {
    done();
  });

  after(function(done) {
    done();
  });

  beforeEach(function(done) {
    // HTML Fixture
    document.body.innerHTML = window.__html__['test/fixtures/sample.html'];
    server = sinon.fakeServer.create();
    done();
  });

  afterEach(function(done) {
    document.body.innerHTML = '';
    server.restore();
    server = null;
    done();
  });

  describe('basic test', function() {
    it('insert contens at className container', function() {
        var l = new lib();
        l.setContent('container');
        assert(document.querySelector('.container').innerHTML, 'content');
    });
  });

  describe('fakeserver test', function() {
    it('get htmlcontent by ajax', function() {
      // reponse
      var response = window.__html__['test/fixtures/ajaxcontent.html'];
      var res = 200,
        head = {'Content-Type': 'application/json'},
        body = JSON.stringify({data:response});
      // set Server Response
      server.respondWith('post', '/path/to/api', [res, head, body]);
      var ajax = new lib();
      ajax.ajaxRequest('container');
      server.respond();
      assert(document.querySelector('.container').innerHTML === "<span>Hello World</span>");
    });
  });

});
