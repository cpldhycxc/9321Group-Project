'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function toStringOrNumber(v) {
  return typeof v === 'number' ? v : v.toString();
}

var ItemAdapter = function () {
  function ItemAdapter() {
    _classCallCheck(this, ItemAdapter);
  }

  _createClass(ItemAdapter, [{
    key: 'receiveProps',
    value: function receiveProps(props) {
      this.props = props;
    }
  }, {
    key: 'getReactKey',
    value: function getReactKey(item) {
      var propName = this.props.itemReactKeyPropName;

      if (propName) {
        var value = item[propName];
        if (value != null) {
          return value;
        }
      }
      return toStringOrNumber(this.getRawValue(item));
    }
  }, {
    key: 'getSortKey',
    value: function getSortKey(item) {
      var propName = this.props.itemSortKeyPropName;

      if (propName) {
        var value = item[propName];
        if (value != null) {
          return value;
        }
      }
      return toStringOrNumber(this.getRawValue(item));
    }
  }, {
    key: 'getInputValue',
    value: function getInputValue(item) {
      return this.getRawValue(item).toString();
    }

    // protected

  }, {
    key: 'getRawValue',
    value: function getRawValue(item) {
      var propName = this.props.itemValuePropName;

      if (propName) {
        var value = item[propName];
        if (value != null) {
          return value;
        }
      }
      return item;
    }
  }, {
    key: 'getTextRepresentations',
    value: function getTextRepresentations(item) {
      return [this.foldValue(this.getInputValue(item))];
    }
  }, {
    key: 'foldValue',
    value: function foldValue(value) {
      // perform case folding by default; override for diacritic folding, etc.
      return value.toLowerCase();
    }
  }, {
    key: 'newFromValue',
    value: function newFromValue(value) {
      return value;
    }
  }, {
    key: 'itemIncludedByInput',
    value: function itemIncludedByInput(item, foldedValue) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.getTextRepresentations(item)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var text = _step.value;

          if (text.indexOf(foldedValue) >= 0) {
            return true;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    }
  }, {
    key: 'itemMatchesInput',
    value: function itemMatchesInput(item, foldedValue) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.getTextRepresentations(item)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var text = _step2.value;

          if (text === foldedValue) {
            return true;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return false;
    }
  }, {
    key: 'sortItems',
    value: function sortItems(items, foldedValue) {
      var _this = this;

      items.sort(function (a, b) {
        return _this.compareItemsWithValue(a, b, foldedValue);
      });
      return items;
    }

    // protected

  }, {
    key: 'compareItemsWithValue',
    value: function compareItemsWithValue(a, b, foldedValue) {
      // sort matching item(s) before non-matching
      var aMatches = this.itemMatchesInput(a, foldedValue);
      var bMatches = this.itemMatchesInput(b, foldedValue);
      if (aMatches != bMatches) {
        return aMatches ? -1 : 1;
      }
      // then sort based on inclusion rank
      var aRank = this.itemInclusionRankForInput(a, foldedValue);
      var bRank = this.itemInclusionRankForInput(b, foldedValue);
      if (aRank != bRank) {
        return aRank - bRank;
      }
      // within same inclusion rank, compare items ignoring value
      return this.compareItems(a, b);
    }

    // protected

  }, {
    key: 'itemInclusionRankForInput',
    value: function itemInclusionRankForInput(item, foldedValue) {
      var contains = false;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.getTextRepresentations(item)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var text = _step3.value;

          var index = text.indexOf(foldedValue);
          if (index === 0) {
            return 0;
          }
          if (index > 0) {
            contains = true;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3['return']) {
            _iterator3['return']();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return contains ? 1 : 2;
    }

    // protected

  }, {
    key: 'compareItems',
    value: function compareItems(a, b) {
      var aSortKey = this.getSortKey(a);
      var bSortKey = this.getSortKey(b);
      return aSortKey < bSortKey ? -1 : aSortKey == bSortKey ? 0 : 1;
    }

    // protected

  }, {
    key: 'renderItem',
    value: function renderItem(item) {
      // default rendering for both dropdown and multiple
      return this.getInputValue(item);
    }
  }, {
    key: 'renderSuggested',
    value: function renderSuggested(item) {
      // dropdown rendering
      return this.renderItem(item);
    }
  }, {
    key: 'renderSelected',
    value: function renderSelected(item) {
      // multiple selected rendering
      return this.renderItem(item);
    }
  }]);

  return ItemAdapter;
}();

exports['default'] = ItemAdapter;