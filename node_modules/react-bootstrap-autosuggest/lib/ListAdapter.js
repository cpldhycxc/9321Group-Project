'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ItemAdapter = require('./ItemAdapter');

var _ItemAdapter2 = _interopRequireDefault(_ItemAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ListAdapter = function () {
  function ListAdapter() {
    _classCallCheck(this, ListAdapter);
  }

  _createClass(ListAdapter, [{
    key: 'receiveProps',
    value: function receiveProps(props, itemAdapter) {
      this.props = props;
      this.itemAdapter = itemAdapter;
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty(list) {
      return !this.getLength(list);
    }
  }, {
    key: 'filter',
    value: function filter(list, predicate) {
      return this.toArray(list).filter(predicate);
    }
  }, {
    key: 'find',
    value: function find(list, predicate) {
      return this.toArray(list).find(predicate);
    }
  }, {
    key: 'findMatching',
    value: function findMatching(list, inputValue) {
      var _this = this;

      var foldedValue = this.itemAdapter.foldValue(inputValue);
      return this.find(list, function (item) {
        return _this.itemAdapter.itemMatchesInput(item, foldedValue);
      });
    }
  }]);

  return ListAdapter;
}();

exports['default'] = ListAdapter;