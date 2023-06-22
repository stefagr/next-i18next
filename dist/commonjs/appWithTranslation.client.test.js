"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _fs = _interopRequireDefault(require("fs"));

var _react2 = require("@testing-library/react");

var _reactI18next = require("react-i18next");

var _appWithTranslation = require("./appWithTranslation");

var __jsx = _react["default"].createElement;
jest.mock('fs', function () {
  return {
    existsSync: jest.fn(),
    readdirSync: jest.fn()
  };
});

var DummyI18nextProvider = function DummyI18nextProvider(_ref) {
  var children = _ref.children;
  return __jsx(_react["default"].Fragment, null, children);
};

jest.mock('react-i18next', function () {
  return {
    I18nextProvider: jest.fn(),
    __esmodule: true
  };
});
var DummyApp = (0, _appWithTranslation.appWithTranslation)(function () {
  return __jsx("div", null, "Hello world");
});
var props = {
  pageProps: {
    _nextI18Next: {
      initialLocale: 'en',
      userConfig: {
        i18n: {
          defaultLocale: 'en',
          locales: ['en', 'de']
        }
      }
    }
  }
};

var renderComponent = function renderComponent() {
  return (0, _react2.render)(__jsx(DummyApp, props));
};

describe('appWithTranslation', function () {
  beforeEach(function () {
    _fs["default"].existsSync.mockReturnValue(true);

    _fs["default"].readdirSync.mockReturnValue([]);

    _reactI18next.I18nextProvider.mockImplementation(DummyI18nextProvider);
  });
  afterEach(jest.resetAllMocks);
  it('returns children', function () {
    renderComponent();
    expect(_react2.screen.getByText('Hello world')).toBeTruthy();
  });
  it('respects configOverride', function () {
    var DummyAppConfigOverride = (0, _appWithTranslation.appWithTranslation)(function () {
      return __jsx("div", null, "Hello world");
    }, {
      configOverride: 'custom-value',
      i18n: {
        defaultLocale: 'en',
        locales: ['en', 'de']
      }
    });
    var customProps = {
      pageProps: {
        _nextI18Next: {
          initialLocale: 'en'
        }
      }
    };
    (0, _react2.render)(__jsx(DummyAppConfigOverride, customProps));

    var _mock$calls = (0, _slicedToArray2["default"])(_reactI18next.I18nextProvider.mock.calls, 1),
        args = _mock$calls[0];

    expect(_react2.screen.getByText('Hello world')).toBeTruthy();
    expect(args[0].i18n.options.configOverride).toBe('custom-value');
  });
  it('throws an error if userConfig and configOverride are both missing', function () {
    var DummyAppConfigOverride = (0, _appWithTranslation.appWithTranslation)(function () {
      return __jsx("div", null, "Hello world");
    });
    var customProps = {
      pageProps: {
        _nextI18Next: {
          initialLocale: 'en',
          userConfig: null
        }
      }
    };
    expect(function () {
      return (0, _react2.render)(__jsx(DummyAppConfigOverride, customProps));
    }).toThrow('appWithTranslation was called without a next-i18next config');
  });
  it('returns an I18nextProvider', function () {
    renderComponent();
    expect(_reactI18next.I18nextProvider).toHaveBeenCalledTimes(1);

    var _mock$calls2 = (0, _slicedToArray2["default"])(_reactI18next.I18nextProvider.mock.calls, 1),
        args = _mock$calls2[0];

    expect(_reactI18next.I18nextProvider).toHaveBeenCalledTimes(1);
    expect(args).toHaveLength(2);
    expect(args[0].children).toBeTruthy();
    expect(args[0].i18n.addResource).toBeTruthy();
    expect(args[0].i18n.language).toEqual('en');
    expect(args[0].i18n.isInitialized).toEqual(true);
    expect(_fs["default"].existsSync).toHaveBeenCalledTimes(0);
    expect(_fs["default"].readdirSync).toHaveBeenCalledTimes(0);
  });
});