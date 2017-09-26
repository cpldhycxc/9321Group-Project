'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ListAdapter2 = require('./ListAdapter');

var _ListAdapter3 = _interopRequireDefault(_ListAdapter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArrayListAdapter = function (_ListAdapter) {
  _inherits(ArrayListAdapter, _ListAdapter);

  function ArrayListAdapter() {
    _classCallCheck(this, ArrayListAdapter);

    return _possibleConstructorReturn(this, (ArrayListAdapter.__proto__ || Object.getPrototypeOf(ArrayListAdapter)).apply(this, arguments));
  }

  _createClass(ArrayListAdapter, [{
    key: 'getLength',
    value: function getLength(list) {
      return list.length;
    }
  }, {
    key: 'filter',
    value: function filter(list, predicate) {
      return list.filter(predicate);
    }
  }, {
    key: 'find',
    value: function find(list, predicate) {
      return list.find(predicate);
    }
  }, {
    key: 'toArray',
    value: function toArray(list) {
      return list.slice();
    }
  }]);

  return ArrayListAdapter;
}(_ListAdapter3['default']);

exports['default'] = ArrayListAdapter;