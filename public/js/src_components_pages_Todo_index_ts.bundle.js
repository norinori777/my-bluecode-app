"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkmy_bluecode_app"] = self["webpackChunkmy_bluecode_app"] || []).push([["src_components_pages_Todo_index_ts"],{

/***/ "./src/components/pages/Todo/container.tsx":
/*!*************************************************!*\
  !*** ./src/components/pages/Todo/container.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TodoContainer: () => (/* binding */ TodoContainer)\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/dist/react-redux.mjs\");\n/* harmony import */ var _presernter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./presernter */ \"./src/components/pages/Todo/presernter.tsx\");\n/* harmony import */ var _Reducks_todo_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Reducks/todo/selectors */ \"./src/Reducks/todo/selectors.ts\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _Reducks_todo_slices__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../Reducks/todo/slices */ \"./src/Reducks/todo/slices.ts\");\n\n\n\n\n\n\nvar TodoContainer = function () {\n    var nowTodos = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useSelector)(_Reducks_todo_selectors__WEBPACK_IMPORTED_MODULE_2__.todoItems);\n    var loading = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useSelector)(_Reducks_todo_selectors__WEBPACK_IMPORTED_MODULE_2__.loadingState);\n    var error = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useSelector)(_Reducks_todo_selectors__WEBPACK_IMPORTED_MODULE_2__.errorState);\n    var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useDispatch)();\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function () {\n        dispatch((0,_Reducks_todo_slices__WEBPACK_IMPORTED_MODULE_4__.fetchTodoItemsAsync)());\n    }, [dispatch]);\n    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_presernter__WEBPACK_IMPORTED_MODULE_1__.Todo, { todos: nowTodos, loading: loading, error: error }) }));\n};\n\n\n//# sourceURL=webpack://my-bluecode-app/./src/components/pages/Todo/container.tsx?");

/***/ }),

/***/ "./src/components/pages/Todo/index.ts":
/*!********************************************!*\
  !*** ./src/components/pages/Todo/index.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Todo: () => (/* reexport safe */ _container__WEBPACK_IMPORTED_MODULE_0__.TodoContainer)\n/* harmony export */ });\n/* harmony import */ var _container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./container */ \"./src/components/pages/Todo/container.tsx\");\n\n\n\n//# sourceURL=webpack://my-bluecode-app/./src/components/pages/Todo/index.ts?");

/***/ }),

/***/ "./src/components/pages/Todo/presernter.tsx":
/*!**************************************************!*\
  !*** ./src/components/pages/Todo/presernter.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Todo: () => (/* binding */ Todo)\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\n/* harmony import */ var _uiParts_TextMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../uiParts/TextMessage */ \"./src/components/uiParts/TextMessage/index.ts\");\n/* harmony import */ var _uiParts_ActionTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../uiParts/ActionTable */ \"./src/components/uiParts/ActionTable/index.ts\");\n\n\n\nvar titleHeader = ['id', 'text'];\nvar Todo = function (props) {\n    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"div\", { className: \"p-6\", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_uiParts_TextMessage__WEBPACK_IMPORTED_MODULE_1__.TextMessage, { text: \"Todo Page\", size: \"2xl\", theme: \"primary\", underline: true }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_uiParts_TextMessage__WEBPACK_IMPORTED_MODULE_1__.TextMessage, { text: props.error !== null ? props.error : '', size: \"base\", theme: \"danger\" }), props.loading ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"div\", { children: \"Loading...\" }) :\n                (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"div\", { className: \"p-2\", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_uiParts_TextMessage__WEBPACK_IMPORTED_MODULE_1__.TextMessage, { text: \"This is a simple todo list page.\", size: \"base\", theme: \"normal\" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"div\", { className: \"flex flex-row p-2 gap-1\", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_uiParts_ActionTable__WEBPACK_IMPORTED_MODULE_2__.TodoActionTableContainer, { titleHeader: titleHeader, items: props.todos }) })] })] }));\n};\n\n\n//# sourceURL=webpack://my-bluecode-app/./src/components/pages/Todo/presernter.tsx?");

/***/ }),

/***/ "./src/components/uiParts/ActionTableRow/TodoActionTableRowContainer.tsx":
/*!*******************************************************************************!*\
  !*** ./src/components/uiParts/ActionTableRow/TodoActionTableRowContainer.tsx ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TodoActionTableRowContainer: () => (/* binding */ TodoActionTableRowContainer)\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\n/* harmony import */ var _MenuLinkItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../MenuLinkItem */ \"./src/components/uiParts/MenuLinkItem/index.ts\");\n/* harmony import */ var _presenter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./presenter */ \"./src/components/uiParts/ActionTableRow/presenter.tsx\");\n\n\n\nvar TodoActionTableRowContainer = function (props) {\n    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_presenter__WEBPACK_IMPORTED_MODULE_2__.ActionTableRow, { titleHeader: props.titleHeader, targetLinks: [], item: props.item, actionElements: props.actionElements, InCludeComponent: _MenuLinkItem__WEBPACK_IMPORTED_MODULE_1__.MenuLinkItem, linkPath: \"todo\" }));\n};\n\n\n//# sourceURL=webpack://my-bluecode-app/./src/components/uiParts/ActionTableRow/TodoActionTableRowContainer.tsx?");

/***/ }),

/***/ "./src/components/uiParts/ActionTable/TodoActionTableContainer.tsx":
/*!*************************************************************************!*\
  !*** ./src/components/uiParts/ActionTable/TodoActionTableContainer.tsx ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TodoActionTableContainer: () => (/* binding */ TodoActionTableContainer)\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\n/* harmony import */ var _presernter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./presernter */ \"./src/components/uiParts/ActionTable/presernter.tsx\");\n/* harmony import */ var _ActionTableRow_TodoActionTableRowContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ActionTableRow/TodoActionTableRowContainer */ \"./src/components/uiParts/ActionTableRow/TodoActionTableRowContainer.tsx\");\n/* harmony import */ var _uniqueParts_EditableTableAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../uniqueParts/EditableTableAction */ \"./src/components/uniqueParts/EditableTableAction/index.ts\");\n/* harmony import */ var _uniqueParts_CheckTableAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../uniqueParts/CheckTableAction */ \"./src/components/uniqueParts/CheckTableAction/index.ts\");\n\n\n\n\n\nvar actionElenments = [{ position: 2, element: _uniqueParts_EditableTableAction__WEBPACK_IMPORTED_MODULE_3__.TodoEditableTableActionContainer, headerTitle: \"Mod/Del\" }, { position: 2, element: _uniqueParts_CheckTableAction__WEBPACK_IMPORTED_MODULE_4__.TodoCheckBoxTableActionContainer, headerTitle: \"State\" }];\nvar TodoActionTableContainer = function (props) {\n    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_presernter__WEBPACK_IMPORTED_MODULE_1__.ActionTable, { titleHeader: props.titleHeader, items: props.items, actionRow: _ActionTableRow_TodoActionTableRowContainer__WEBPACK_IMPORTED_MODULE_2__.TodoActionTableRowContainer, actionElements: actionElenments }));\n};\n\n\n//# sourceURL=webpack://my-bluecode-app/./src/components/uiParts/ActionTable/TodoActionTableContainer.tsx?");

/***/ }),

/***/ "./src/components/uiParts/ActionTable/index.ts":
/*!*****************************************************!*\
  !*** ./src/components/uiParts/ActionTable/index.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TodoActionTableContainer: () => (/* reexport safe */ _TodoActionTableContainer__WEBPACK_IMPORTED_MODULE_0__.TodoActionTableContainer)\n/* harmony export */ });\n/* harmony import */ var _TodoActionTableContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TodoActionTableContainer */ \"./src/components/uiParts/ActionTable/TodoActionTableContainer.tsx\");\n\n\n\n//# sourceURL=webpack://my-bluecode-app/./src/components/uiParts/ActionTable/index.ts?");

/***/ }),

/***/ "./src/components/uniqueParts/CheckTableAction/TodoCheckBoxTableActionContainer.tsx":
/*!******************************************************************************************!*\
  !*** ./src/components/uniqueParts/CheckTableAction/TodoCheckBoxTableActionContainer.tsx ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TodoCheckBoxTableActionContainer: () => (/* binding */ TodoCheckBoxTableActionContainer)\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/dist/react-redux.mjs\");\n/* harmony import */ var _Reducks_todo_slices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Reducks/todo/slices */ \"./src/Reducks/todo/slices.ts\");\n/* harmony import */ var _presenter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./presenter */ \"./src/components/uniqueParts/CheckTableAction/presenter.tsx\");\n\n\n\n\nvar TodoCheckBoxTableActionContainer = function (props) {\n    var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch)();\n    var handleCheck = function () {\n        dispatch((0,_Reducks_todo_slices__WEBPACK_IMPORTED_MODULE_1__.updateDoneTodoAsync)(props.target.id));\n    };\n    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_presenter__WEBPACK_IMPORTED_MODULE_2__.CheckBoxTableAction, { check: props.target.done, handleCheck: handleCheck }) }));\n};\n\n\n//# sourceURL=webpack://my-bluecode-app/./src/components/uniqueParts/CheckTableAction/TodoCheckBoxTableActionContainer.tsx?");

/***/ }),

/***/ "./src/components/uniqueParts/CheckTableAction/index.ts":
/*!**************************************************************!*\
  !*** ./src/components/uniqueParts/CheckTableAction/index.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TodoCheckBoxTableActionContainer: () => (/* reexport safe */ _TodoCheckBoxTableActionContainer__WEBPACK_IMPORTED_MODULE_0__.TodoCheckBoxTableActionContainer)\n/* harmony export */ });\n/* harmony import */ var _TodoCheckBoxTableActionContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TodoCheckBoxTableActionContainer */ \"./src/components/uniqueParts/CheckTableAction/TodoCheckBoxTableActionContainer.tsx\");\n\n\n\n//# sourceURL=webpack://my-bluecode-app/./src/components/uniqueParts/CheckTableAction/index.ts?");

/***/ }),

/***/ "./src/components/uniqueParts/EditableTableAction/TodoEditableTableActionContainer.tsx":
/*!*********************************************************************************************!*\
  !*** ./src/components/uniqueParts/EditableTableAction/TodoEditableTableActionContainer.tsx ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TodoEditableTableActionContainer: () => (/* binding */ TodoEditableTableActionContainer)\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/dist/react-redux.mjs\");\n/* harmony import */ var _Reducks_todo_slices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Reducks/todo/slices */ \"./src/Reducks/todo/slices.ts\");\n/* harmony import */ var _presenter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./presenter */ \"./src/components/uniqueParts/EditableTableAction/presenter.tsx\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router/dist/index.js\");\n\n\n\n\n\nvar TodoEditableTableActionContainer = function (props) {\n    var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch)();\n    var navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_4__.useNavigate)();\n    var handleEdit = function () {\n        navigate(\"/todo/\".concat(props.target.id));\n    };\n    var handleDelete = function () {\n        dispatch((0,_Reducks_todo_slices__WEBPACK_IMPORTED_MODULE_1__.deleteTodoAsync)(props.target.id));\n    };\n    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_presenter__WEBPACK_IMPORTED_MODULE_2__.EditableTableAction, { target: props.target, handleDelete: handleDelete, handleEdit: handleEdit }) }));\n};\n\n\n//# sourceURL=webpack://my-bluecode-app/./src/components/uniqueParts/EditableTableAction/TodoEditableTableActionContainer.tsx?");

/***/ }),

/***/ "./src/components/uniqueParts/EditableTableAction/index.ts":
/*!*****************************************************************!*\
  !*** ./src/components/uniqueParts/EditableTableAction/index.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TodoEditableTableActionContainer: () => (/* reexport safe */ _TodoEditableTableActionContainer__WEBPACK_IMPORTED_MODULE_0__.TodoEditableTableActionContainer)\n/* harmony export */ });\n/* harmony import */ var _TodoEditableTableActionContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TodoEditableTableActionContainer */ \"./src/components/uniqueParts/EditableTableAction/TodoEditableTableActionContainer.tsx\");\n\n\n\n//# sourceURL=webpack://my-bluecode-app/./src/components/uniqueParts/EditableTableAction/index.ts?");

/***/ })

}]);