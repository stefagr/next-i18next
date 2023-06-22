"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fs = _interopRequireDefault(require("fs"));

var _serverSideTranslations = require("./serverSideTranslations");

jest.mock('fs', function () {
  return {
    existsSync: jest.fn(),
    readdirSync: jest.fn()
  };
});
describe('serverSideTranslations', function () {
  beforeEach(function () {
    _fs["default"].existsSync.mockReturnValueOnce(false);

    _fs["default"].existsSync.mockReturnValueOnce(true);

    _fs["default"].readdirSync.mockReturnValue([]);
  });
  afterEach(jest.resetAllMocks);
  it('throws if initialLocale is not passed', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return expect((0, _serverSideTranslations.serverSideTranslations)(undefined)).rejects.toThrow('Initial locale argument was not passed into serverSideTranslations');

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  describe('When namespacesRequired is not provided', function () {
    beforeEach(function () {
      _fs["default"].readdirSync.mockImplementation(function (path) {
        return ['common', "namespace-of-".concat(path.split('/').pop())];
      });
    });
    it('returns all namespaces', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var props;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _serverSideTranslations.serverSideTranslations)('en-US', undefined, {
                i18n: {
                  defaultLocale: 'en-US',
                  locales: ['en-US', 'fr-CA']
                }
              });

            case 2:
              props = _context2.sent;
              expect(_fs["default"].existsSync).toHaveBeenCalledTimes(0);
              expect(_fs["default"].readdirSync).toHaveBeenCalledTimes(1);
              expect(_fs["default"].readdirSync).toHaveBeenCalledWith(expect.stringMatching('/public/locales/en-US'));
              expect(props._nextI18Next.initialI18nStore).toEqual({
                'en-US': {
                  common: {},
                  'namespace-of-en-US': {}
                }
              });

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('returns all namespaces with fallbackLng (as string)', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var props;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _serverSideTranslations.serverSideTranslations)('en-US', undefined, {
                i18n: {
                  defaultLocale: 'fr-BE',
                  fallbackLng: 'fr',
                  locales: ['nl-BE', 'fr-BE']
                }
              });

            case 2:
              props = _context3.sent;
              expect(_fs["default"].readdirSync).toHaveBeenCalledTimes(2);
              expect(_fs["default"].readdirSync).toHaveBeenCalledWith(expect.stringMatching('/public/locales/fr'));
              expect(props._nextI18Next.initialI18nStore).toEqual({
                'en-US': {
                  common: {},
                  'namespace-of-en-US': {},
                  'namespace-of-fr': {}
                },
                fr: {
                  common: {},
                  'namespace-of-en-US': {},
                  'namespace-of-fr': {}
                }
              });

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('returns all namespaces with fallbackLng (as array)', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var props;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return (0, _serverSideTranslations.serverSideTranslations)('en-US', undefined, {
                i18n: {
                  defaultLocale: 'en-US',
                  fallbackLng: ['en', 'fr'],
                  locales: ['en-US', 'fr-CA']
                }
              });

            case 2:
              props = _context4.sent;
              expect(_fs["default"].readdirSync).toHaveBeenCalledTimes(3);
              expect(_fs["default"].readdirSync).toHaveBeenCalledWith(expect.stringMatching('/public/locales/en-US'));
              expect(_fs["default"].readdirSync).toHaveBeenCalledWith(expect.stringMatching('/public/locales/en'));
              expect(_fs["default"].readdirSync).toHaveBeenCalledWith(expect.stringMatching('/public/locales/fr'));
              expect(props._nextI18Next.initialI18nStore).toEqual({
                en: {
                  common: {},
                  'namespace-of-en': {},
                  'namespace-of-en-US': {},
                  'namespace-of-fr': {}
                },
                'en-US': {
                  common: {},
                  'namespace-of-en': {},
                  'namespace-of-en-US': {},
                  'namespace-of-fr': {}
                },
                fr: {
                  common: {},
                  'namespace-of-en': {},
                  'namespace-of-en-US': {},
                  'namespace-of-fr': {}
                }
              });

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('returns all namespaces with fallbackLng (as object)', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var props;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return (0, _serverSideTranslations.serverSideTranslations)('en-US', undefined, {
                i18n: {
                  defaultLocale: 'nl-BE',
                  fallbackLng: {
                    "default": ['fr'],
                    'nl-BE': ['en']
                  },
                  locales: ['nl-BE', 'fr-BE']
                }
              });

            case 2:
              props = _context5.sent;
              expect(_fs["default"].readdirSync).toHaveBeenCalledTimes(3);
              expect(_fs["default"].readdirSync).toHaveBeenCalledWith(expect.stringMatching('/public/locales/en'));
              expect(_fs["default"].readdirSync).toHaveBeenCalledWith(expect.stringMatching('/public/locales/fr'));
              expect(props._nextI18Next.initialI18nStore).toEqual({
                en: {
                  common: {},
                  'namespace-of-en': {},
                  'namespace-of-en-US': {},
                  'namespace-of-fr': {}
                },
                'en-US': {
                  common: {},
                  'namespace-of-en': {},
                  'namespace-of-en-US': {},
                  'namespace-of-fr': {}
                },
                fr: {
                  common: {},
                  'namespace-of-en': {},
                  'namespace-of-en-US': {},
                  'namespace-of-fr': {}
                }
              });

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
  it('returns props', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    var props;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _serverSideTranslations.serverSideTranslations)('en-US', [], {
              i18n: {
                defaultLocale: 'en-US',
                locales: ['en-US', 'fr-CA']
              }
            });

          case 2:
            props = _context6.sent;
            expect(props).toEqual({
              _nextI18Next: {
                initialI18nStore: {
                  'en-US': {}
                },
                initialLocale: 'en-US',
                userConfig: {
                  i18n: {
                    defaultLocale: 'en-US',
                    locales: ['en-US', 'fr-CA']
                  }
                }
              }
            });

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
});