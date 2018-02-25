webpackJsonp([4],{

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.getQueryParams = getQueryParams;\nfunction getQueryParams() {\n    var qs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.location.search;\n\n    qs = qs.split('+').join(' ');\n\n    var params = {};\n    var tokens = void 0;\n    var re = /[?&]?([^=]+)=([^&]*)/g;\n\n    while (tokens = re.exec(qs)) {\n        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);\n    }\n\n    return params;\n}\n\n//////////////////\n// WEBPACK FOOTER\n// ./frontend/src/helpers/utils.js\n// module id = 136\n// module chunks = 3 4\n\n//# sourceURL=webpack:///./frontend/src/helpers/utils.js?");

/***/ }),

/***/ 179:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _react = __webpack_require__(1);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(19);\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\n__webpack_require__(95);\n\nvar _subscription = __webpack_require__(208);\n\nvar _subscription2 = _interopRequireDefault(_subscription);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n_reactDom2.default.render(_react2.default.createElement(_subscription2.default, null), document.getElementById('react-subscription'));\n\n//////////////////\n// WEBPACK FOOTER\n// ./frontend/src/landing.js\n// module id = 179\n// module chunks = 4\n\n//# sourceURL=webpack:///./frontend/src/landing.js?");

/***/ }),

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\n__webpack_require__(209);\n\nvar _react = __webpack_require__(1);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactForm = __webpack_require__(28);\n\nvar _reactAutobind = __webpack_require__(102);\n\nvar _reactAutobind2 = _interopRequireDefault(_reactAutobind);\n\nvar _classnames = __webpack_require__(39);\n\nvar _classnames2 = _interopRequireDefault(_classnames);\n\nvar _buttons = __webpack_require__(103);\n\nvar _spinners = __webpack_require__(105);\n\nvar _validators = __webpack_require__(41);\n\nvar _rest = __webpack_require__(106);\n\nvar _utils = __webpack_require__(136);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Subscription = function (_Component) {\n    _inherits(Subscription, _Component);\n\n    function Subscription(props) {\n        _classCallCheck(this, Subscription);\n\n        var _this = _possibleConstructorReturn(this, (Subscription.__proto__ || Object.getPrototypeOf(Subscription)).call(this, props));\n\n        (0, _reactAutobind2.default)(_this);\n        _this.state = {\n            submitSuccess: false,\n            alreadySubscribed: false,\n            submitPending: false,\n            submitErrors: { email: null },\n            unsubscribeSuccess: false,\n            unsubscribeError: ''\n        };\n        _this._token = (0, _utils.getQueryParams)().token;\n        return _this;\n    }\n\n    _createClass(Subscription, [{\n        key: 'validateError',\n        value: function validateError(values) {\n            this.setState({ submitErrors: { email: null } });\n            if (!values.email) {\n                return { email: gettext('Please type your email.') };\n            } else if (!(0, _validators.validateEmail)(values.email)) {\n                return { email: gettext('Oops... There\\'s a mistake. Please type a valid email.') };\n            }\n            return { email: null };\n        }\n    }, {\n        key: 'onSubmit',\n        value: function onSubmit(values) {\n            var _this2 = this;\n\n            this.setState({\n                submitSuccess: false,\n                submitPending: true\n            });\n            (0, _rest.post)('subscriptions/', values).then(function (response) {\n                _this2.setState({\n                    submitSuccess: true,\n                    submitPending: false,\n                    alreadySubscribed: response.data.already_subscribed\n                });\n            }).catch(function (error) {\n                var message = gettext('Oops! Something went wrong. Please try again in a moment.');\n                if (error.response && error.response.data.email) {\n                    message = error.response.data.email[0];\n                }\n                _this2.setState({\n                    submitPending: false,\n                    submitErrors: { email: message }\n                });\n            });\n        }\n    }, {\n        key: 'unsubscribe',\n        value: function unsubscribe() {\n            var _this3 = this;\n\n            this.setState({ submitPending: true });\n            (0, _rest.post)('subscriptions/unsubscribe/', { token: this._token }).then(function () {\n                _this3.setState({\n                    unsubscribeSuccess: true,\n                    submitPending: false\n                });\n            }).catch(function (error) {\n                var message = gettext('Oops! Something went wrong. Please try again in a moment.');\n                if (error.response && error.response.data.detail) {\n                    message = error.response.data.detail;\n                }\n                _this3.setState({\n                    submitPending: false,\n                    unsubscribeError: message\n                });\n            });\n        }\n    }, {\n        key: 'renderForm',\n        value: function renderForm() {\n            var _this4 = this;\n\n            return _react2.default.createElement(\n                'div',\n                { className: (0, _classnames2.default)('subscription-form', { 'hidden': this.state.submitSuccess || this.state.submitPending }) },\n                _react2.default.createElement(\n                    'h5',\n                    null,\n                    gettext('Get notified when it\\'s ready')\n                ),\n                _react2.default.createElement(\n                    _reactForm.Form,\n                    {\n                        onSubmit: this.onSubmit,\n                        validateError: this.validateError,\n                        dontValidateOnMount: true,\n                        validateOnSubmit: true\n                    },\n                    function (formApi) {\n                        return _react2.default.createElement(\n                            'form',\n                            { onSubmit: formApi.submitForm },\n                            _react2.default.createElement(\n                                'div',\n                                { className: 'inputs' },\n                                _react2.default.createElement(_reactForm.Text, {\n                                    field: 'email',\n                                    name: 'email',\n                                    className: 'grow',\n                                    placeholder: 'Email'\n                                }),\n                                _react2.default.createElement(\n                                    _buttons.Button,\n                                    { type: 'submit' },\n                                    gettext('Subscribe')\n                                )\n                            ),\n                            _react2.default.createElement(\n                                'div',\n                                { className: 'error' },\n                                formApi.errors.email,\n                                _this4.state.submitErrors.email\n                            )\n                        );\n                    }\n                )\n            );\n        }\n    }, {\n        key: 'renderUnsubscribe',\n        value: function renderUnsubscribe() {\n            if (this.state.unsubscribeError) {\n                return _react2.default.createElement(\n                    'div',\n                    { className: 'error' },\n                    this.state.unsubscribeError\n                );\n            }\n            return _react2.default.createElement(\n                'div',\n                { className: (0, _classnames2.default)('unsubscribe', { 'hidden': this.state.unsubscribeSuccess || this.state.submitPending }) },\n                _react2.default.createElement(\n                    'h5',\n                    null,\n                    gettext('Are you sure that you want to unsubscribe?')\n                ),\n                _react2.default.createElement(\n                    'span',\n                    { onClick: this.unsubscribe },\n                    _react2.default.createElement(\n                        _buttons.Button,\n                        null,\n                        gettext('Yes, I\\'m sure')\n                    )\n                )\n            );\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            return _react2.default.createElement(\n                'div',\n                { className: 'subscription' },\n                this.state.submitSuccess && !this.state.alreadySubscribed && _react2.default.createElement(\n                    'h4',\n                    null,\n                    gettext('You were subscribed successfully!'),\n                    _react2.default.createElement('br', null),\n                    gettext('See ya!')\n                ),\n                this.state.submitSuccess && this.state.alreadySubscribed && _react2.default.createElement(\n                    'h4',\n                    null,\n                    gettext('Looks like you are already subscribed.'),\n                    _react2.default.createElement('br', null),\n                    gettext('Thank you for being with us!')\n                ),\n                this.state.unsubscribeSuccess && _react2.default.createElement(\n                    'h4',\n                    null,\n                    gettext('You were unsubscribed.'),\n                    _react2.default.createElement('br', null),\n                    gettext('Hope to see you again.')\n                ),\n                this.state.submitPending && _react2.default.createElement(_spinners.DoubleBounceSpinner, null),\n                this._token ? this.renderUnsubscribe() : this.renderForm(),\n                _react2.default.createElement(\n                    'div',\n                    { className: 'promise' },\n                    gettext('We promise to never spam you or share your personal information!')\n                )\n            );\n        }\n    }]);\n\n    return Subscription;\n}(_react.Component);\n\nexports.default = Subscription;\n\n//////////////////\n// WEBPACK FOOTER\n// ./frontend/src/apps/landing/containers/subscription.js\n// module id = 208\n// module chunks = 4\n\n//# sourceURL=webpack:///./frontend/src/apps/landing/containers/subscription.js?");

/***/ }),

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(210);\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(119)(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {\n\tmodule.hot.accept(\"!!../../../node_modules/css-loader/index.js!../../../node_modules/less-loader/dist/cjs.js!./subscription.less\", function() {\n\t\tvar newContent = require(\"!!../../../node_modules/css-loader/index.js!../../../node_modules/less-loader/dist/cjs.js!./subscription.less\");\n\n\t\tif(typeof newContent === 'string') newContent = [[module.id, newContent, '']];\n\n\t\tvar locals = (function(a, b) {\n\t\t\tvar key, idx = 0;\n\n\t\t\tfor(key in a) {\n\t\t\t\tif(!b || a[key] !== b[key]) return false;\n\t\t\t\tidx++;\n\t\t\t}\n\n\t\t\tfor(key in b) idx--;\n\n\t\t\treturn idx === 0;\n\t\t}(content.locals, newContent.locals));\n\n\t\tif(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');\n\n\t\tupdate(newContent);\n\t});\n\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//////////////////\n// WEBPACK FOOTER\n// ./frontend/src/styles/subscription.less\n// module id = 209\n// module chunks = 4\n\n//# sourceURL=webpack:///./frontend/src/styles/subscription.less?");

/***/ }),

/***/ 210:
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(118)(false);\n// imports\n\n\n// module\nexports.push([module.i, \".subscription {\\n  margin-top: 50px;\\n}\\n.subscription .inputs {\\n  max-width: 500px;\\n  margin-top: 18px;\\n  margin-left: auto;\\n  margin-right: auto;\\n  display: flex;\\n}\\n.subscription .error {\\n  margin-top: 17px;\\n  color: #f57575;\\n}\\n.subscription .promise {\\n  margin-top: 45px;\\n  color: #a1a1a1;\\n}\\ninput {\\n  -webkit-appearance: none;\\n  margin: 0;\\n  border-radius: 0;\\n  font: inherit;\\n  height: 48px;\\n  border: solid 1px #404040;\\n  padding: 0 18px;\\n  font-size: 16px;\\n  font-weight: 500;\\n}\\ninput:hover {\\n  box-shadow: 0 1px 25px 7px rgba(104, 139, 217, 0.15);\\n  border: solid 1px #ffffff;\\n}\\ninput:focus,\\ninput:active {\\n  box-shadow: 0 1px 25px 7px rgba(104, 139, 217, 0.15);\\n  border: solid 1px #404040;\\n  outline: none;\\n}\\ninput::-webkit-input-placeholder {\\n  /* Chrome/Opera/Safari */\\n  color: #a1a1a1;\\n}\\ninput::-moz-placeholder {\\n  /* Firefox 19+ */\\n  color: #a1a1a1;\\n}\\ninput:-ms-input-placeholder {\\n  /* IE 10+ */\\n  color: #a1a1a1;\\n}\\ninput:-moz-placeholder {\\n  /* Firefox 18- */\\n  color: #a1a1a1;\\n}\\n@media screen and (max-width: 767px) {\\n  .subscription .inputs {\\n    flex-direction: column;\\n  }\\n  .subscription .inputs .btn {\\n    margin-top: 10px;\\n    width: 100%;\\n  }\\n}\\n\", \"\"]);\n\n// exports\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/css-loader!./node_modules/less-loader/dist/cjs.js!./frontend/src/styles/subscription.less\n// module id = 210\n// module chunks = 4\n\n//# sourceURL=webpack:///./frontend/src/styles/subscription.less?./node_modules/css-loader!./node_modules/less-loader/dist/cjs.js");

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.validateEmail = validateEmail;\nexports.validatePhone = validatePhone;\nexports.validateLength = validateLength;\nfunction validateEmail(value) {\n    var re = /^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/;\n    return re.test(String(value).toLowerCase());\n}\n\nfunction validatePhone(value) {\n    var re = /^[-0-9+()\\s]*$/;\n    return re.test(String(value)) && validateLength(value, 25, 5);\n}\n\nfunction validateLength(value, maxLength) {\n    var minLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;\n\n    if (minLength === 0 && !value) return true;\n    return Boolean(value) && value.length <= maxLength && value.length >= minLength;\n}\n\n//////////////////\n// WEBPACK FOOTER\n// ./frontend/src/helpers/validators.js\n// module id = 41\n// module chunks = 0 1 2 4\n\n//# sourceURL=webpack:///./frontend/src/helpers/validators.js?");

/***/ })

},[179]);