(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-main-main-module"],{

/***/ "./src/app/pages/components/components.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/pages/components/components.module.ts ***!
  \*******************************************************/
/*! exports provided: ComponentsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentsModule", function() { return ComponentsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _sidebar_sidebar_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sidebar/sidebar.module */ "./src/app/pages/components/sidebar/sidebar.module.ts");
/* harmony import */ var _shared_navbar_navbar_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared/navbar/navbar.module */ "./src/app/pages/components/shared/navbar/navbar.module.ts");
/* harmony import */ var _shared_footer_footer_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shared/footer/footer.module */ "./src/app/pages/components/shared/footer/footer.module.ts");
/* harmony import */ var _shared_fixedplugin_fixedplugin_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shared/fixedplugin/fixedplugin.module */ "./src/app/pages/components/shared/fixedplugin/fixedplugin.module.ts");







var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [],
            imports: [
                _shared_navbar_navbar_module__WEBPACK_IMPORTED_MODULE_4__["NavbarModule"],
                _sidebar_sidebar_module__WEBPACK_IMPORTED_MODULE_3__["SidebarModule"],
                _shared_footer_footer_module__WEBPACK_IMPORTED_MODULE_5__["FooterModule"],
                _shared_fixedplugin_fixedplugin_module__WEBPACK_IMPORTED_MODULE_6__["FixedPluginModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            ],
            exports: [
                _sidebar_sidebar_module__WEBPACK_IMPORTED_MODULE_3__["SidebarModule"],
                _shared_navbar_navbar_module__WEBPACK_IMPORTED_MODULE_4__["NavbarModule"],
                _shared_footer_footer_module__WEBPACK_IMPORTED_MODULE_5__["FooterModule"],
                _shared_fixedplugin_fixedplugin_module__WEBPACK_IMPORTED_MODULE_6__["FixedPluginModule"],
            ]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());



/***/ }),

/***/ "./src/app/pages/components/shared/fixedplugin/fixedplugin.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/pages/components/shared/fixedplugin/fixedplugin.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"fixed-plugin\">\n    <div class=\"dropdown show-dropdown\">\n        <a href=\"#\" data-toggle=\"dropdown\">\n        <i class=\"fa fa-cog fa-2x\"> </i>\n        </a>\n        <ul class=\"dropdown-menu\">\n            <li class=\"header-title\">Sidebar Background</li>\n            <li class=\"adjustments-line text-center\">\n                <a href=\"javascript:void(0)\" class=\"switch-trigger background-color\">\n                        <span class=\"badge filter badge-white active\" data-color=\"white\"></span>\n                        <span class=\"badge filter badge-black\" data-color=\"black\"></span>\n                </a>\n            </li>\n\n\t\t\t<li class=\"header-title\">Sidebar Active Color</li>\n            <li class=\"adjustments-line text-center\">\n                <a href=\"javascript:void(0)\" class=\"switch-trigger active-color\">\n                        <span class=\"badge filter badge-primary\" data-color=\"primary\"></span>\n                        <span class=\"badge filter badge-info\" data-color=\"info\"></span>\n                        <span class=\"badge filter badge-success\" data-color=\"success\"></span>\n                        <span class=\"badge filter badge-warning\" data-color=\"warning\"></span>\n                        <span class=\"badge filter badge-danger active\" data-color=\"danger\"></span>\n                </a>\n            </li>\n\n        </ul>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/pages/components/shared/fixedplugin/fixedplugin.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/pages/components/shared/fixedplugin/fixedplugin.component.ts ***!
  \******************************************************************************/
/*! exports provided: FixedPluginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FixedPluginComponent", function() { return FixedPluginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var FixedPluginComponent = /** @class */ (function () {
    function FixedPluginComponent() {
    }
    FixedPluginComponent.prototype.ngOnInit = function () {
        var $sidebar = $('.sidebar');
        var $off_canvas_sidebar = $('.off-canvas-sidebar');
        var window_width = $(window).width();
        if (window_width > 767) {
            if ($('.fixed-plugin .dropdown').hasClass('show-dropdown')) {
                $('.fixed-plugin .dropdown').addClass('open');
            }
        }
        $('.fixed-plugin a').click(function (event) {
            if ($(this).hasClass('switch-trigger')) {
                if (event.stopPropagation) {
                    event.stopPropagation();
                }
                else if (window.event) {
                    window.event.cancelBubble = true;
                }
            }
        });
        $('.fixed-plugin .background-color span').click(function () {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            var new_color = $(this).data('color');
            if ($sidebar.length !== 0) {
                $sidebar.attr('data-background-color', new_color);
            }
            if ($off_canvas_sidebar.length !== 0) {
                $off_canvas_sidebar.attr('data-background-color', new_color);
            }
        });
        $('.fixed-plugin .active-color span').click(function () {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            var new_color = $(this).data('color');
            if ($sidebar.length !== 0) {
                $sidebar.attr('data-active-color', new_color);
            }
            if ($off_canvas_sidebar.length !== 0) {
                $off_canvas_sidebar.attr('data-active-color', new_color);
            }
        });
    };
    FixedPluginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-fixedplugin-cmp',
            template: __webpack_require__(/*! ./fixedplugin.component.html */ "./src/app/pages/components/shared/fixedplugin/fixedplugin.component.html")
        })
    ], FixedPluginComponent);
    return FixedPluginComponent;
}());



/***/ }),

/***/ "./src/app/pages/components/shared/fixedplugin/fixedplugin.module.ts":
/*!***************************************************************************!*\
  !*** ./src/app/pages/components/shared/fixedplugin/fixedplugin.module.ts ***!
  \***************************************************************************/
/*! exports provided: FixedPluginModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FixedPluginModule", function() { return FixedPluginModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _fixedplugin_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fixedplugin.component */ "./src/app/pages/components/shared/fixedplugin/fixedplugin.component.ts");





var FixedPluginModule = /** @class */ (function () {
    function FixedPluginModule() {
    }
    FixedPluginModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]],
            declarations: [_fixedplugin_component__WEBPACK_IMPORTED_MODULE_4__["FixedPluginComponent"]],
            exports: [_fixedplugin_component__WEBPACK_IMPORTED_MODULE_4__["FixedPluginComponent"]]
        })
    ], FixedPluginModule);
    return FixedPluginModule;
}());



/***/ }),

/***/ "./src/app/pages/components/shared/footer/footer.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/pages/components/shared/footer/footer.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<footer class=\"footer\">\n    <div class=\"container-fluid\">\n        <!-- <nav class=\"pull-left\">\n            <ul>\n\n                <li>\n                    <a>\n                        Nxtlife Technologies </a>\n                </li>\n                <li>\n                    <a>\n                        Blog\n                    </a>\n                </li>\n                <li>\n                    <a>\n                        Licenses\n                    </a>\n                </li>\n            </ul>\n        </nav> -->\n        <div class=\"copyright pull-right\">\n            <!-- &copy; {{test | date: 'yyyy'}}, made with <i class=\"fa fa-heart heart\"></i> by <a>Nxtlife Technologies</a> -->\n        </div>\n    </div>\n</footer>"

/***/ }),

/***/ "./src/app/pages/components/shared/footer/footer.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/pages/components/shared/footer/footer.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".footer {\n  background: #454545; }\n  .footer nav ul li a {\n    color: white !important; }\n  .footer .copyright {\n    color: white; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbGthZ2lyZGhhci9EZXNrdG9wL3Bhbmthai9KQVZBL2Vma29uLWNjaC9zcmMvYXBwL3BhZ2VzL2NvbXBvbmVudHMvc2hhcmVkL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxtQkFBbUIsRUFBQTtFQUR2QjtJQU9vQix1QkFBdUIsRUFBQTtFQVAzQztJQWNRLFlBQVksRUFBQSIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2NvbXBvbmVudHMvc2hhcmVkL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZm9vdGVyIHtcbiAgICBiYWNrZ3JvdW5kOiAjNDU0NTQ1O1xuXG4gICAgbmF2e1xuICAgICAgICB1bHtcbiAgICAgICAgICAgIGxpe1xuICAgICAgICAgICAgICAgIGEge1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAuY29weXJpZ2h0e1xuICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgfVxufSJdfQ== */"

/***/ }),

/***/ "./src/app/pages/components/shared/footer/footer.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/pages/components/shared/footer/footer.component.ts ***!
  \********************************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
        this.test = new Date();
    }
    FooterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-footer-cmp',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/pages/components/shared/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.scss */ "./src/app/pages/components/shared/footer/footer.component.scss")]
        })
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/pages/components/shared/footer/footer.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/pages/components/shared/footer/footer.module.ts ***!
  \*****************************************************************/
/*! exports provided: FooterModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterModule", function() { return FooterModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _footer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./footer.component */ "./src/app/pages/components/shared/footer/footer.component.ts");





var FooterModule = /** @class */ (function () {
    function FooterModule() {
    }
    FooterModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]],
            declarations: [_footer_component__WEBPACK_IMPORTED_MODULE_4__["FooterComponent"]],
            exports: [_footer_component__WEBPACK_IMPORTED_MODULE_4__["FooterComponent"]]
        })
    ], FooterModule);
    return FooterModule;
}());



/***/ }),

/***/ "./src/app/pages/components/shared/navbar/navbar.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/pages/components/shared/navbar/navbar.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-default\">\n    <div class=\"container-fluid\">\n        <div class=\"navbar-header\">\n            <button type=\"button\" class=\"navbar-toggle\" (click)=\"sidebarToggle()\">\n                <span class=\"sr-only\">Toggle navigation</span>\n                <span class=\"icon-bar bar1\"></span>\n                <span class=\"icon-bar bar2\"></span>\n                <span class=\"icon-bar bar3\"></span>\n            </button>\n            <a class=\"navbar-brand\">{{getTitle()}}</a>\n        </div>\n        <div class=\"collapse navbar-collapse\">\n            <ul class=\"nav navbar-nav navbar-right\">\n                <li>\n                    <a>\n                        <i class=\"logout\">\n                            <img src=\"../assets/img/logout.png\" /> </i>\n                        <p (click)=\"logout()\">logout</p>\n                    </a>\n                </li>\n            </ul>\n\n        </div>\n    </div>\n</nav>"

/***/ }),

/***/ "./src/app/pages/components/shared/navbar/navbar.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/pages/components/shared/navbar/navbar.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*      light colors - used for select dropdown         */\n.navbar-default {\n  background-image: linear-gradient(to right, #008385 0, #27c6d9 100%);\n  background-image: -moz-gradient(linear, left top, right top, from(#008385), to(#27c6d9));\n  background-image: -o-linear-gradient(to right, #008385 0, #27c6d9 100%);\n  background-repeat: repeat-x; }\n.navbar-default .navbar-right li a {\n    color: white;\n    cursor: pointer; }\n.navbar-default .navbar-right li a:hover {\n      color: white; }\n.navbar-default .navbar-right li a:hover .caret {\n        border-bottom-color: #ffffff;\n        border-top-color: #ffffff; }\n.navbar-default .navbar-right li a i {\n      margin-right: 5px; }\n.navbar-default .navbar-right .year-drop .dropdown-menu {\n    background: #ffffff;\n    margin-top: 0;\n    min-width: inherit;\n    width: 130px;\n    border-radius: 0; }\n.navbar-default .navbar-right .year-drop .dropdown-menu li a {\n      color: #333; }\n.navbar-default .navbar-right .year-drop .dropdown-menu li a:hover {\n        color: white;\n        background-image: linear-gradient(to right, #008385 0, #27c6d9 100%);\n        background-image: -moz-gradient(linear, left top, right top, from(#008385), to(#27c6d9));\n        background-image: -o-linear-gradient(to right, #008385 0, #27c6d9 100%);\n        background-repeat: repeat-x;\n        border-radius: 0; }\n.navbar-brand {\n  color: white; }\n.navbar-brand:hover {\n    color: white; }\n.logout img {\n  max-width: 25px;\n  margin-right: 5px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbGthZ2lyZGhhci9EZXNrdG9wL3Bhbmthai9KQVZBL2Vma29uLWNjaC9zcmMvYXNzZXRzL3Nhc3MvcGFwZXIvX3ZhcmlhYmxlcy5zY3NzIiwiL1VzZXJzL2Fsa2FnaXJkaGFyL0Rlc2t0b3AvcGFua2FqL0pBVkEvZWZrb24tY2NoL3NyYy9hcHAvcGFnZXMvY29tcG9uZW50cy9zaGFyZWQvbmF2YmFyL25hdmJhci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnRUEseURBQUE7QUM5REU7RUFDSSxvRUFBaUU7RUFJakUsd0ZBQW9GO0VBQ3BGLHVFQUFxRTtFQUNyRSwyQkFBMkIsRUFBQTtBQVAvQjtJQWNVLFlBQVk7SUFDWixlQUFlLEVBQUE7QUFmekI7TUFpQlksWUFBWSxFQUFBO0FBakJ4QjtRQW1CYyw0QkFBNEI7UUFDNUIseUJBQXlCLEVBQUE7QUFwQnZDO01Bd0JZLGlCQUFpQixFQUFBO0FBeEI3QjtJQWdDWSxtQkFBbUI7SUFDbkIsYUFBYTtJQUNiLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1osZ0JBQWdCLEVBQUE7QUFwQzVCO01BeUNjLFdBQVcsRUFBQTtBQXpDekI7UUE0Q2dCLFlBQVk7UUFDWixvRUFBa0U7UUFJbEUsd0ZBQW9GO1FBQ3BGLHVFQUFxRTtRQUNyRSwyQkFBMkI7UUFDM0IsZ0JBQWdCLEVBQUE7QUFTbEM7RUFDRSxZQUFZLEVBQUE7QUFEZDtJQUlJLFlBQVksRUFBQTtBQUloQjtFQUVJLGVBQWU7RUFDZixpQkFBaUIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2NvbXBvbmVudHMvc2hhcmVkL25hdmJhci9uYXZiYXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIkZm9udC1jb2xvcjogICAgICAgICAgICAgICAgICM2NjYxNWIgIWRlZmF1bHQ7XG4kZmlsbC1mb250LWNvbG9yOiAgICAgICAgICAgIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KTtcblxuJG5vbmU6ICAgICAgICAgICAgICAgICAgICAgICAwICAgIWRlZmF1bHQ7XG4kYm9yZGVyLXRoaW46ICAgICAgICAgICAgICAgIDFweCAhZGVmYXVsdDtcbiRib3JkZXItdGhpY2s6ICAgICAgICAgICAgICAgMnB4ICFkZWZhdWx0O1xuXG4kd2hpdGUtY29sb3I6ICAgICAgICAgICAgICAgICNGRkZGRkYgIWRlZmF1bHQ7XG4kd2hpdGUtYmc6ICAgICAgICAgICAgICAgICAgICNGRkZGRkYgIWRlZmF1bHQ7XG5cbiRzbW9rZS1iZzogICAgICAgICAgICAgICAgICAgI0Y1RjVGNSAhZGVmYXVsdDtcbiRwYWxlLWJnOiAgICAgICAgICAgICAgICAgICAgI0ZGRkNGNSAhZGVmYXVsdDtcbiRtZWRpdW0tcGFsZS1iZzogICAgICAgICAgICAgI0YxRUFFMCAhZGVmYXVsdDtcblxuJHRhYmxlLWxpbmUtY29sb3I6ICAgICAgICAgICAjQ0NDNUI5ICFkZWZhdWx0O1xuJG11dGVkLWNvbG9yOiAgICAgICAgICAgICAgICAjYTQ5ZTkzICFkZWZhdWx0O1xuXG4kYmxhY2stYmc6ICAgICAgICAgICAgICAgICAgIHJnYmEoMzAsMzAsMzAsLjk3KSAhZGVmYXVsdDtcblxuJGJsYWNrLWNvbG9yOiAgICAgICAgICAgICAgICAjMzMzMzMzICFkZWZhdWx0O1xuJGJsYWNrLWhyOiAgICAgICAgICAgICAgICAgICAjNDQ0NDQ0ICFkZWZhdWx0O1xuXG4kd2hpdGUtYmFja2dyb3VuZC1jb2xvcjogICAgICAgICNGRkZGRkYgIWRlZmF1bHQ7XG4kYmxhY2stYmFja2dyb3VuZC1jb2xvcjogICAgICAgICMyMTIxMjAgIWRlZmF1bHQ7XG5cbiRsaWdodC1ncmF5OiAgICAgICAgICAgICAgICAgI0UzRTNFMyAhZGVmYXVsdDtcbiRtZWRpdW0tZ3JheTogICAgICAgICAgICAgICAgI0RERERERCAhZGVmYXVsdDtcbiRkYXJrLWdyYXk6ICAgICAgICAgICAgICAgICAgIzlBOUE5QSAhZGVmYXVsdDtcblxuJGdyYXktaW5wdXQtYmc6ICAgICAgICAgICAgICAjZmZmY2Y1ICFkZWZhdWx0O1xuJGRhbmdlci1pbnB1dC1iZzogICAgICAgICAgICAjRkZDMEE0ICFkZWZhdWx0O1xuJHN1Y2Nlc3MtaW5wdXQtYmc6ICAgICAgICAgICAjQUJGM0NCICFkZWZhdWx0O1xuJG90aGVyLW1lZGl1bS1ncmF5OiAgICAgICAgICAjQTQ5RTkzICFkZWZhdWx0O1xuJHRyYW5zcGFyZW50LWJnOiAgICAgICAgICAgICB0cmFuc3BhcmVudCAhZGVmYXVsdDtcblxuJGRlZmF1bHQtY29sb3I6ICAgICAgICAgICAgICAjNjY2MTVCICFkZWZhdWx0O1xuJGRlZmF1bHQtYmc6ICAgICAgICAgICAgICAgICAjNjY2MTVCICFkZWZhdWx0O1xuJGRlZmF1bHQtc3RhdGVzLWNvbG9yOiAgICAgICAjNDAzRDM5ICFkZWZhdWx0O1xuXG4kcHJpbWFyeS1jb2xvcjogICAgICAgICAgICAgICM3QTlFOUYgIWRlZmF1bHQ7XG4kcHJpbWFyeS1iZzogICAgICAgICAgICAgICAgICM3QTlFOUYgIWRlZmF1bHQ7XG4kcHJpbWFyeS1zdGF0ZXMtY29sb3I6ICAgICAgICM0MjdDODkgIWRlZmF1bHQ7XG5cbiRzdWNjZXNzLWNvbG9yOiAgICAgICAgICAgICAgIzdBQzI5QSAhZGVmYXVsdDtcbiRzdWNjZXNzLWJnOiAgICAgICAgICAgICAgICAgIzdBQzI5QSAhZGVmYXVsdDtcbiRzdWNjZXNzLXN0YXRlcy1jb2xvcjogICAgICAgIzQyQTA4NCAhZGVmYXVsdDtcblxuJGluZm8tY29sb3I6ICAgICAgICAgICAgICAgICAjNjhCM0M4ICFkZWZhdWx0O1xuJGluZm8tYmc6ICAgICAgICAgICAgICAgICAgICAjNjhCM0M4ICFkZWZhdWx0O1xuJGluZm8tc3RhdGVzLWNvbG9yOiAgICAgICAgICAjMzA5MUIyICFkZWZhdWx0O1xuXG4kd2FybmluZy1jb2xvcjogICAgICAgICAgICAgICNGM0JCNDUgIWRlZmF1bHQ7XG4kd2FybmluZy1iZzogICAgICAgICAgICAgICAgICNGM0JCNDUgIWRlZmF1bHQ7XG4kd2FybmluZy1zdGF0ZXMtY29sb3I6ICAgICAgICNCQjk5MkYgIWRlZmF1bHQ7XG5cblxuJGRhbmdlci1jb2xvcjogICAgICAgICAgICAgICAjREQwMzMwICFkZWZhdWx0O1xuJGRhbmdlci1iZzogICAgICAgICAgICAgICAgICAjREQwMzMwICFkZWZhdWx0O1xuJGRhbmdlci1zdGF0ZXMtY29sb3I6ICAgICAgICAjYmYwMzJhICFkZWZhdWx0O1xuXG5cbiRsaW5rLWRpc2FibGVkLWNvbG9yOiAgICAgICAgIzY2NjY2NiAhZGVmYXVsdDtcblxuXG4vKiAgICAgIGxpZ2h0IGNvbG9ycyAtIHVzZWQgZm9yIHNlbGVjdCBkcm9wZG93biAgICAgICAgICovXG5cbiRsaWdodC1ibHVlOiAgICAgICAgICAgICAgICAgcmdiYSgkcHJpbWFyeS1jb2xvciwgLjIpO1xuJGxpZ2h0LWF6dXJlOiAgICAgICAgICAgICAgICByZ2JhKCRpbmZvLWNvbG9yLCAuMik7XG4kbGlnaHQtZ3JlZW46ICAgICAgICAgICAgICAgIHJnYmEoJHN1Y2Nlc3MtY29sb3IsIC4yKTtcbiRsaWdodC1vcmFuZ2U6ICAgICAgICAgICAgICAgcmdiYSgkd2FybmluZy1jb2xvciwgLjIpO1xuJGxpZ2h0LXJlZDogICAgICAgICAgICAgICAgICByZ2JhKCRkYW5nZXItY29sb3IsIC4yKTtcblxuXG4vLz09IENvbXBvbmVudHNcbi8vXG4kcGFkZGluZy1iYXNlLXZlcnRpY2FsOiAgICAgICAgIDdweCAhZGVmYXVsdDtcbiRwYWRkaW5nLWJhc2UtaG9yaXpvbnRhbDogICAgICAgMThweCAhZGVmYXVsdDtcblxuJHBhZGRpbmctcm91bmQtdmVydGljYWw6ICAgICAgICA5cHggIWRlZmF1bHQ7XG4kcGFkZGluZy1yb3VuZC1ob3Jpem9udGFsOiAgICAgMThweCAhZGVmYXVsdDtcblxuJHBhZGRpbmctc2ltcGxlLXZlcnRpY2FsOiAgICAgIDEwcHggIWRlZmF1bHQ7XG4kcGFkZGluZy1zaW1wbGUtaG9yaXpvbnRhbDogICAgMThweCAhZGVmYXVsdDtcblxuJHBhZGRpbmctbGFyZ2UtdmVydGljYWw6ICAgICAgIDExcHggIWRlZmF1bHQ7XG4kcGFkZGluZy1sYXJnZS1ob3Jpem9udGFsOiAgICAgMzBweCAhZGVmYXVsdDtcblxuJHBhZGRpbmctc21hbGwtdmVydGljYWw6ICAgICAgICA0cHggIWRlZmF1bHQ7XG4kcGFkZGluZy1zbWFsbC1ob3Jpem9udGFsOiAgICAgMTBweCAhZGVmYXVsdDtcblxuJHBhZGRpbmcteHMtdmVydGljYWw6ICAgICAgICAgICAycHggIWRlZmF1bHQ7XG4kcGFkZGluZy14cy1ob3Jpem9udGFsOiAgICAgICAgIDVweCAhZGVmYXVsdDtcblxuJHBhZGRpbmctbGFiZWwtdmVydGljYWw6ICAgICAgICAycHggIWRlZmF1bHQ7XG4kcGFkZGluZy1sYWJlbC1ob3Jpem9udGFsOiAgICAgMTJweCAhZGVmYXVsdDtcblxuLy8gcGFkZGluZyBmb3IgbGlua3MgaW5zaWRlIGRyb3Bkb3duIG1lbnVcbiRwYWRkaW5nLWRyb3Bkb3duLXZlcnRpY2FsOiAgICAgMTBweCAhZGVmYXVsdDtcbiRwYWRkaW5nLWRyb3Bkb3duLWhvcml6b250YWw6ICAgMTVweCAhZGVmYXVsdDtcblxuJG1hcmdpbi1sYXJnZS12ZXJ0aWNhbDogICAgICAgIDMwcHggIWRlZmF1bHQ7XG4kbWFyZ2luLWJhc2UtdmVydGljYWw6ICAgICAgICAgMTVweCAhZGVmYXVsdDtcblxuLy8gYm9yZGVyIHJhZGl1cyBmb3IgYnV0dG9uc1xuJGJvcmRlci1yYWRpdXMtYnRuLXNtYWxsOiAgICAgIDI2cHggIWRlZmF1bHQ7XG4kYm9yZGVyLXJhZGl1cy1idG4tYmFzZTogICAgICAgMjBweCAhZGVmYXVsdDtcbiRib3JkZXItcmFkaXVzLWJ0bi1sYXJnZTogICAgICA1MHB4ICFkZWZhdWx0O1xuXG5cbi8vIENyaXN0aW5hOiBhbSBzY2hpbWJhdCBhaWNpIHNpIHMtYXUgbW9kaWZpY2F0IGlucHV0dXJpbGVcbiRtYXJnaW4tYm90dG9tOiAgICAgICAgICAgICAgICAwIDAgMTBweCAwICFkZWZhdWx0O1xuJGJvcmRlci1yYWRpdXMtc21hbGw6ICAgICAgICAgICAzcHggIWRlZmF1bHQ7XG4kYm9yZGVyLXJhZGl1cy1iYXNlOiAgICAgICAgICAgIDRweCAhZGVmYXVsdDtcbiRib3JkZXItcmFkaXVzLWxhcmdlOiAgICAgICAgICAgNnB4ICFkZWZhdWx0O1xuJGJvcmRlci1yYWRpdXMtZXh0cmVtZTogICAgICAgIDZweCAhZGVmYXVsdDtcblxuJGJvcmRlci1yYWRpdXMtbGFyZ2UtdG9wOiAgICAgICRib3JkZXItcmFkaXVzLWxhcmdlICRib3JkZXItcmFkaXVzLWxhcmdlIDAgMCAhZGVmYXVsdDtcbiRib3JkZXItcmFkaXVzLWxhcmdlLWJvdHRvbTogICAwIDAgJGJvcmRlci1yYWRpdXMtbGFyZ2UgJGJvcmRlci1yYWRpdXMtbGFyZ2UgIWRlZmF1bHQ7XG5cbiRidG4tcm91bmQtcmFkaXVzOiAgICAgICAgICAgICAzMHB4ICFkZWZhdWx0O1xuXG4kaGVpZ2h0LWJhc2U6ICAgICAgICAgICAgICAgICAgNDBweCAhZGVmYXVsdDtcblxuJGZvbnQtc2l6ZS1iYXNlOiAgICAgICAgICAgICAgIDE0cHggIWRlZmF1bHQ7XG4kZm9udC1zaXplLXhzOiAgICAgICAgICAgICAgICAgMTJweCAhZGVmYXVsdDtcbiRmb250LXNpemUtc21hbGw6ICAgICAgICAgICAgICAxMnB4ICFkZWZhdWx0O1xuJGZvbnQtc2l6ZS1tZWRpdW06ICAgICAgICAgICAgIDE2cHggIWRlZmF1bHQ7XG4kZm9udC1zaXplLWxhcmdlOiAgICAgICAgICAgICAgMThweCAhZGVmYXVsdDtcbiRmb250LXNpemUtbGFyZ2UtbmF2YmFyOiAgICAgICAyMHB4ICFkZWZhdWx0O1xuXG4kZm9udC1zaXplLWgxOiAgICAgICAgICAgICAgICAgMy4yZW0gICAhZGVmYXVsdDtcbiRmb250LXNpemUtaDI6ICAgICAgICAgICAgICAgICAyLjZlbSAgICAgIWRlZmF1bHQ7XG4kZm9udC1zaXplLWgzOiAgICAgICAgICAgICAgICAgMS44MjVlbSAhZGVmYXVsdDtcbiRmb250LXNpemUtaDQ6ICAgICAgICAgICAgICAgICAxLjVlbSAgICFkZWZhdWx0O1xuJGZvbnQtc2l6ZS1oNTogICAgICAgICAgICAgICAgIDEuMjVlbSAgIWRlZmF1bHQ7XG4kZm9udC1zaXplLWg2OiAgICAgICAgICAgICAgICAgMC45ZW0gICAhZGVmYXVsdDtcbiRmb250LXBhcmFncmFwaDogICAgICAgICAgICAgICAxNnB4ICAgICFkZWZhdWx0O1xuJGZvbnQtc2l6ZS1uYXZiYXI6ICAgICAgICAgICAgIDE2cHggICAgIWRlZmF1bHQ7XG4kZm9udC1zaXplLXNtYWxsOiAgICAgICAgICAgICAgMTJweCAgICAhZGVmYXVsdDtcblxuJGZvbnQtd2VpZ2h0LWxpZ2h0OiAgICAgICAgICAzMDAgIWRlZmF1bHQ7XG4kZm9udC13ZWlnaHQtbm9ybWFsOiAgICAgICAgIDQwMCAhZGVmYXVsdDtcbiRmb250LXdlaWdodC1zZW1pOiAgICAgICAgICAgNTAwICFkZWZhdWx0O1xuJGZvbnQtd2VpZ2h0LWJvbGQ6ICAgICAgICAgICA2MDAgIWRlZmF1bHQ7XG5cbiRsaW5lLWhlaWdodC1zbWFsbDogICAgICAgICAgICAyMHB4ICFkZWZhdWx0O1xuJGxpbmUtaGVpZ2h0LWdlbmVyYWw6ICAgICAgICAgIDEuNGVtICFkZWZhdWx0O1xuJGxpbmUtaGVpZ2h0OiAgICAgICAgICAgICAgICAgMzZweCAhZGVmYXVsdDtcbiRsaW5lLWhlaWdodC1sZzogICAgICAgICAgICAgIDU0cHggIWRlZmF1bHQ7XG5cblxuJGJvcmRlci1yYWRpdXMtdG9wOiAgICAgICAgMTBweCAxMHB4IDAgMCAhZGVmYXVsdDtcbiRib3JkZXItcmFkaXVzLWJvdHRvbTogICAgIDAgMCAxMHB4IDEwcHggIWRlZmF1bHQ7XG5cbiRkcm9wZG93bi1zaGFkb3c6ICAgICAgICAgIDAgMnB4IHJnYmEoMTcsIDE2LCAxNSwgMC4xKSwgMCAycHggMTBweCByZ2JhKDE3LCAxNiwgMTUsIDAuMSk7XG5cbiRnZW5lcmFsLXRyYW5zaXRpb24tdGltZTogIDMwMG1zICFkZWZhdWx0O1xuXG4kc2xvdy10cmFuc2l0aW9uLXRpbWU6ICAgICAgICAgICAzMDBtcyAhZGVmYXVsdDtcbiRkcm9wZG93bi1jb29yZGluYXRlczogICAgICAyOXB4IC01MHB4ICFkZWZhdWx0O1xuXG4kZmFzdC10cmFuc2l0aW9uLXRpbWU6ICAgICAgICAgICAxNTBtcyAhZGVmYXVsdDtcbiRzZWxlY3QtY29vcmRpbmF0ZXM6ICAgICAgICAgNTAlIC00MHB4ICFkZWZhdWx0O1xuXG4kdHJhbnNpdGlvbi1saW5lYXI6ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lYXIgIWRlZmF1bHQ7XG4kdHJhbnNpdGlvbi1iZXppZXI6ICAgICAgICAgY3ViaWMtYmV6aWVyKDAuMzQsIDEuNjEsIDAuNywgMSkgIWRlZmF1bHQ7XG4kdHJhbnNpdGlvbi1lYXNlOiAgICAgICAgICAgZWFzZSAwcztcblxuJG5hdmJhci1wYWRkaW5nLWE6ICAgICAgICAgICAgICAgMTBweCAxNXB4O1xuJG5hdmJhci1tYXJnaW4tYTogICAgICAgICAgICAgICAgMTVweCAgMHB4O1xuXG4kcGFkZGluZy1zb2NpYWwtYTogICAgICAgICAgICAgICAxMHB4ICA1cHg7XG5cbiRuYXZiYXItbWFyZ2luLWEtYnRuOiAgICAgICAgICAgIDE4cHggM3B4O1xuJG5hdmJhci1tYXJnaW4tYS1idG4tcm91bmQ6ICAgICAgMTlweCAzcHg7XG5cblxuJG5hdmJhci1wYWRkaW5nLWJyYW5kOiAgICAgICAgICAgMjBweCAxNXB4O1xuJG5hdmJhci1tYXJnaW4tYnJhbmQ6ICAgICAgICAgICAgIDVweCAgMHB4O1xuXG4kbmF2YmFyLW1hcmdpbi1icmFuZC1pY29uczogICAgICAxMnB4IGF1dG87XG5cbiRuYXZiYXItbWFyZ2luLWJ0bjogICAgICAgICAgICAgIDE1cHggIDNweDtcblxuJGhlaWdodC1pY29uOlx0XHRcdFx0XHQgNjRweCAhZGVmYXVsdDtcbiR3aWR0aC1pY29uOlx0XHRcdFx0XHQgNjRweCAhZGVmYXVsdDtcbiRwYWRkaW5nLWljb246XHRcdFx0XHRcdCAxMnB4ICFkZWZhdWx0O1xuJGJvcmRlci1yYWRpdXMtaWNvbjpcdFx0ICAgICAxNXB4ICFkZWZhdWx0O1xuXG5cbiR3aGl0ZS1uYXZiYXI6ICAgICAgICAgICAgICByZ2JhKCNGRkZGRkYsIC45Nik7XG4kYmx1ZS1uYXZiYXI6ICAgICAgICAgICAgICAgcmdiYSgjMzRBQ0RDLCAuOTgpO1xuJGF6dXJlLW5hdmJhcjogICAgICAgICAgICAgIHJnYmEoIzVCQ0FGRiwgLjk4KTtcbiRncmVlbi1uYXZiYXI6ICAgICAgICAgICAgICByZ2JhKCM0Q0Q5NjQsIC45OCk7XG4kb3JhbmdlLW5hdmJhcjogICAgICAgICAgICAgcmdiYSgjRkY5NTAwLCAuOTgpO1xuJHJlZC1uYXZiYXI6ICAgICAgICAgICAgICAgIHJnYmEoI0ZGNEM0MCwgLjk4KTtcblxuJGJnLW51ZGU6ICAgICAgICAgICAgICAgI2Y0ZjNlZiAhZGVmYXVsdDtcbiRiZy1wcmltYXJ5OiAgICAgICAgICAgICMxZTg4ZTUgIWRlZmF1bHQ7XG4kYmctaW5mbzogICAgICAgICAgICAgICAjN0NFNEZFICFkZWZhdWx0O1xuJGJnLXN1Y2Nlc3M6ICAgICAgICAgICAgIzhFRjNDNSAhZGVmYXVsdDtcbiRiZy13YXJuaW5nOiAgICAgICAgICAgICNGRkUyOEMgIWRlZmF1bHQ7XG4kYmctZGFuZ2VyOiAgICAgICAgICAgICAjRkY4RjVFICFkZWZhdWx0O1xuXG4kdG9wYmFyLXg6ICAgICAgICAgICAgIHRvcGJhci14ICFkZWZhdWx0O1xuJHRvcGJhci1iYWNrOiAgICAgICAgICB0b3BiYXItYmFjayAhZGVmYXVsdDtcbiRib3R0b21iYXIteDogICAgICAgICAgYm90dG9tYmFyLXggIWRlZmF1bHQ7XG4kYm90dG9tYmFyLWJhY2s6ICAgICAgIGJvdHRvbWJhci1iYWNrICFkZWZhdWx0O1xuXG4kdHJhbnNpdGlvbi1saW5lYXI6ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lYXIgIWRlZmF1bHQ7XG4kdHJhbnNpdGlvbi1iZXppZXI6ICAgICAgICAgY3ViaWMtYmV6aWVyKDAuMzQsIDEuNjEsIDAuNywgMSkgIWRlZmF1bHQ7XG4kdHJhbnNpdGlvbi1lYXNlOiAgICAgICAgICAgZWFzZSAwcztcbiR0cmFuc2l0aW9uLWVhc2UtaW46ICAgICAgICAgICAgICBlYXNlLWluICFkZWZhdWx0O1xuJHRyYW5zaXRpb24tZWFzZS1vdXQ6ICAgICAgICAgICAgIGVhc2Utb3V0ICFkZWZhdWx0O1xuXG4kZ2VuZXJhbC10cmFuc2l0aW9uLXRpbWU6ICAzMDBtcyAhZGVmYXVsdDtcblxuJHNsb3ctdHJhbnNpdGlvbi10aW1lOiAgICAgICAgICAgMzcwbXMgIWRlZmF1bHQ7XG4kZHJvcGRvd24tY29vcmRpbmF0ZXM6ICAgICAgMjlweCAtNTBweCAhZGVmYXVsdDtcblxuJGZhc3QtdHJhbnNpdGlvbi10aW1lOiAgICAgICAgICAgMTUwbXMgIWRlZmF1bHQ7XG5cbiR1bHRyYS1mYXN0LXRyYW5zaXRpb24tdGltZTogICAgIDEwMG1zICAhZGVmYXVsdDtcblxuJHNlbGVjdC1jb29yZGluYXRlczogICAgICAgICA1MCUgLTQwcHggIWRlZmF1bHQ7XG5cbiRwYWRkaW5nLXplcm86ICAgICAgICAgICAgICAgICAgIDBweCAhZGVmYXVsdDtcblxuJHNpZGViYXItd2lkdGg6ICAgICAgICAgICAgICAgY2FsYygxMDAlIC0gMjYwcHgpICFkZWZhdWx0O1xuJG1lZGl1bS1kYXJrLWdyYXk6ICAgICAgICAgICAjQUFBQUFBICFkZWZhdWx0O1xuXG4vL3ZhcmlhYmxlcyB1c2VkIGluIGNhcmRzXG4kY2FyZC1ibGFjay1jb2xvcjogICAgICAgICAgIzI1MjQyMiAhZGVmYXVsdDtcbiRjYXJkLW11dGVkLWNvbG9yOiAgICAgICAgICAjY2NjNWI5ICFkZWZhdWx0O1xuXG5cbi8vdmFyaWFibGVzIHVzZWQgZm9yIHNpZGViYXJcbiRzaWRlYmFyLWJhY2tncm91bmQtZGFyay1ibHVlOiAjNTA2MzY3O1xuXG4kc2lkZWJhci1iYWNrZ3JvdW5kLWJsdWU6ICAgICAgI2I4ZDhkOCAhZGVmYXVsdDtcbiRzaWRlYmFyLWZvbnQtYmx1ZTogICAgICAgICAgICAjNTA2NTY4ICFkZWZhdWx0O1xuJHNpZGViYXItc3VidGl0bGUtYmx1ZTogICAgICAgICM3YTllOWYgIWRlZmF1bHQ7XG5cbiRzaWRlYmFyLWJhY2tncm91bmQtZ3JlZW46ICAgICAgI2Q1ZTVhMyAhZGVmYXVsdDtcbiRzaWRlYmFyLWZvbnQtZ3JlZW46ICAgICAgICAgICAgIzYwNzczZCAhZGVmYXVsdDtcbiRzaWRlYmFyLXN1YnRpdGxlLWdyZWVuOiAgICAgICAgIzkyYWM1NiAhZGVmYXVsdDtcblxuJHNpZGViYXItYmFja2dyb3VuZC15ZWxsb3c6ICAgICAgI2ZmZTI4YyAhZGVmYXVsdDtcbiRzaWRlYmFyLWZvbnQteWVsbG93OiAgICAgICAgICAgICNiMjU4MjUgIWRlZmF1bHQ7XG4kc2lkZWJhci1zdWJ0aXRsZS15ZWxsb3c6ICAgICAgICAjZDg4NzE1ICFkZWZhdWx0O1xuXG4kc2lkZWJhci1iYWNrZ3JvdW5kLWJyb3duOiAgICAgICNkNmMxYWIgIWRlZmF1bHQ7XG4kc2lkZWJhci1mb250LWJyb3duOiAgICAgICAgICAgICM3NTQ0MmUgIWRlZmF1bHQ7XG4kc2lkZWJhci1zdWJ0aXRsZS1icm93bjogICAgICAgICNhNDdlNjUgIWRlZmF1bHQ7XG5cbiRzaWRlYmFyLWJhY2tncm91bmQtcHVycGxlOiAgICAgICNiYWE5YmEgIWRlZmF1bHQ7XG4kc2lkZWJhci1mb250LXB1cnBsZTogICAgICAgICAgICAjM2EyODNkICFkZWZhdWx0O1xuJHNpZGViYXItc3VidGl0bGUtcHVycGxlOiAgICAgICAgIzVhMjgzZCAhZGVmYXVsdDtcblxuJHNpZGViYXItYmFja2dyb3VuZC1vcmFuZ2U6ICAgICAgI2ZmOGY1ZSAhZGVmYXVsdDtcbiRzaWRlYmFyLWZvbnQtb3JhbmdlOiAgICAgICAgICAgICM3NzI1MTAgIWRlZmF1bHQ7XG4kc2lkZWJhci1zdWJ0aXRsZS1vcmFuZ2U6ICAgICAgICAjZTk1ZTM3ICFkZWZhdWx0O1xuIiwiQGltcG9ydCAnc3JjL2Fzc2V0cy9zYXNzL3BhcGVyL3ZhcmlhYmxlcy5zY3NzJztcblxuICAubmF2YmFyLWRlZmF1bHQge1xuICAgICAgYmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIzAwODM4NSAwLCMyN2M2ZDkgMTAwJSk7XG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOi13ZWJraXQtZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLHJpZ2h0IHRvcCxmcm9tKCMwMDgzODUpLHRvKCMyN2M2ZDkpKTtcbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGxlZnQsIzAwODM4NSAwLCMyN2M2ZDkgMTAwJSk7XG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtbW96LWxpbmVhci1ncmFkaWVudCh0byByaWdodCwjMDA4Mzg1IDAsIzI3YzZkOSAxMDAlKTtcbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC1tb3otZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLHJpZ2h0IHRvcCxmcm9tKCMwMDgzODUpLHRvKCMyN2M2ZDkpKTtcbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC1vLWxpbmVhci1ncmFkaWVudCh0byByaWdodCwjMDA4Mzg1IDAsIzI3YzZkOSAxMDAlKTtcbiAgICAgIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQteDtcblxuXG4gICAgICBcbiAgICAgIC5uYXZiYXItcmlnaHR7XG4gICAgICAgIGxpe1xuICAgICAgICAgIGF7XG4gICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICAmOmhvdmVye1xuICAgICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgICAgIC5jYXJldHtcbiAgICAgICAgICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiAjZmZmZmZmO1xuICAgICAgICAgICAgICAgIGJvcmRlci10b3AtY29sb3I6ICNmZmZmZmY7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGl7XG4gICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogNXB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgfVxuICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgLnllYXItZHJvcHtcbiAgICAgICAgICAuZHJvcGRvd24tbWVudSB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gICAgICAgICAgICAgIG1hcmdpbi10b3A6IDA7XG4gICAgICAgICAgICAgIG1pbi13aWR0aDogaW5oZXJpdDtcbiAgICAgICAgICAgICAgd2lkdGg6IDEzMHB4O1xuICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsaXtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIGF7XG4gICAgICAgICAgICAgICAgY29sb3I6ICMzMzM7XG5cbiAgICAgICAgICAgICAgICAmOmhvdmVye1xuICAgICAgICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCMwMDgzODUgMCwjMjdjNmQ5IDEwMCUpO1xuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTotd2Via2l0LWdyYWRpZW50KGxpbmVhcixsZWZ0IHRvcCxyaWdodCB0b3AsZnJvbSgjMDA4Mzg1KSx0bygjMjdjNmQ5KSk7XG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChsZWZ0LCMwMDgzODUgMCwjMjdjNmQ5IDEwMCUpO1xuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLW1vei1saW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIzAwODM4NSAwLCMyN2M2ZDkgMTAwJSk7XG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtbW96LWdyYWRpZW50KGxpbmVhcixsZWZ0IHRvcCxyaWdodCB0b3AsZnJvbSgjMDA4Mzg1KSx0bygjMjdjNmQ5KSk7XG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtby1saW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIzAwODM4NSAwLCMyN2M2ZDkgMTAwJSk7XG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0LXg7XG4gICAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICB9XG4gIH1cbi5uYXZiYXItYnJhbmR7XG4gIGNvbG9yOiB3aGl0ZTtcblxuICAmOmhvdmVye1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgfVxufVxuXG4ubG9nb3V0IHtcbiAgaW1nIHtcbiAgICBtYXgtd2lkdGg6IDI1cHg7XG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7XG4gIH1cbn0iXX0= */"

/***/ }),

/***/ "./src/app/pages/components/shared/navbar/navbar.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/pages/components/shared/navbar/navbar.component.ts ***!
  \********************************************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../sidebar/sidebar.component */ "./src/app/pages/components/sidebar/sidebar.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");





var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(location, renderer, router, element) {
        this.renderer = renderer;
        this.router = router;
        this.element = element;
        this.year = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"](null);
        this.yearList1 = ['2018', '2019', '2020', '2021'];
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        this.listTitles = _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_2__["ROUTES"].filter(function (listTitle) { return listTitle; });
        var navbar = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    };
    NavbarComponent.prototype.getTitle = function () {
        var titlee = window.location.pathname;
        titlee = titlee.substring(1);
        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    };
    NavbarComponent.prototype.sidebarToggle = function () {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            setTimeout(function () {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        }
        else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    };
    NavbarComponent.prototype.yearChange = function (year) {
        // this.year.emit(year);
    };
    NavbarComponent.prototype.logout = function () {
        localStorage.clear();
        this.router.navigate(['login']);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('app-navbar-cmp'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], NavbarComponent.prototype, "button", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], NavbarComponent.prototype, "year", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], NavbarComponent.prototype, "selectedYear", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], NavbarComponent.prototype, "yearList", void 0);
    NavbarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-navbar-cmp',
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/pages/components/shared/navbar/navbar.component.html"),
            styles: [__webpack_require__(/*! ./navbar.component.scss */ "./src/app/pages/components/shared/navbar/navbar.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_3__["Location"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/pages/components/shared/navbar/navbar.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/pages/components/shared/navbar/navbar.module.ts ***!
  \*****************************************************************/
/*! exports provided: NavbarModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarModule", function() { return NavbarModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _navbar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./navbar.component */ "./src/app/pages/components/shared/navbar/navbar.component.ts");





var NavbarModule = /** @class */ (function () {
    function NavbarModule() {
    }
    NavbarModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]],
            declarations: [_navbar_component__WEBPACK_IMPORTED_MODULE_4__["NavbarComponent"]],
            exports: [_navbar_component__WEBPACK_IMPORTED_MODULE_4__["NavbarComponent"]]
        })
    ], NavbarModule);
    return NavbarModule;
}());



/***/ }),

/***/ "./src/app/pages/components/sidebar/sidebar.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/pages/components/sidebar/sidebar.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar-wrapper\">\n    <div class=\"logo\">\n        <a href=\"https://www.creative-tim.com\" class=\"simple-text\">\n            <div class=\"logo-img\">\n                <img src=\"../../assets/img/angular2-logo.png\" alt=\"\">\n            </div>\n            Efkon - Cch\n        </a>\n    </div>\n    <ul class=\"nav\">\n        <li *ngIf=\"isNotMobileMenu()\">\n            <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n                <i class=\"ti-panel\"></i>\n                <p>Stats</p>\n            </a>\n        </li>\n        <li class=\"dropdown\" *ngIf=\"isNotMobileMenu()\">\n            <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n                <i class=\"ti-bell\"></i>\n                <p class=\"notification\">5</p>\n                <p>Notifications</p>\n                <b class=\"caret\"></b>\n            </a>\n            <ul class=\"dropdown-menu\">\n                <li><a href=\"#\">Notification 1</a></li>\n                <li><a href=\"#\">Notification 2</a></li>\n                <li><a href=\"#\">Notification 3</a></li>\n                <li><a href=\"#\">Notification 4</a></li>\n                <li><a href=\"#\">Another notification</a></li>\n            </ul>\n        </li>\n        <li *ngIf=\"isNotMobileMenu()\">\n            <a href=\"#\">\n                <i class=\"ti-settings\"></i>\n                <p>Settings</p>\n            </a>\n        </li>\n        <li class=\"divider\" *ngIf=\"isNotMobileMenu()\"></li>\n        <li *ngFor=\"let menuItem of menuItems\" routerLinkActive=\"active\" class=\"{{menuItem.class}}\">\n            <a [routerLink]=\"[menuItem.path]\">\n                <i class=\"{{menuItem.icon}}\"></i>\n                <p>{{menuItem.title}}</p>\n            </a>\n        </li>\n    </ul>\n</div>"

/***/ }),

/***/ "./src/app/pages/components/sidebar/sidebar.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/pages/components/sidebar/sidebar.component.ts ***!
  \***************************************************************/
/*! exports provided: ROUTES, SidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarComponent", function() { return SidebarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ROUTES = [
    { path: 'dashboard', title: 'Dashboard', icon: 'ti-panel', class: '' },
];
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent() {
    }
    SidebarComponent.prototype.ngOnInit = function () {
        this.menuItems = ROUTES.filter(function (menuItem) { return menuItem; });
    };
    SidebarComponent.prototype.isNotMobileMenu = function () {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
    SidebarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-sidebar-cmp',
            template: __webpack_require__(/*! ./sidebar.component.html */ "./src/app/pages/components/sidebar/sidebar.component.html"),
        })
    ], SidebarComponent);
    return SidebarComponent;
}());



/***/ }),

/***/ "./src/app/pages/components/sidebar/sidebar.module.ts":
/*!************************************************************!*\
  !*** ./src/app/pages/components/sidebar/sidebar.module.ts ***!
  \************************************************************/
/*! exports provided: SidebarModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarModule", function() { return SidebarModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _sidebar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sidebar.component */ "./src/app/pages/components/sidebar/sidebar.component.ts");





var SidebarModule = /** @class */ (function () {
    function SidebarModule() {
    }
    SidebarModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]],
            declarations: [_sidebar_component__WEBPACK_IMPORTED_MODULE_4__["SidebarComponent"]],
            exports: [_sidebar_component__WEBPACK_IMPORTED_MODULE_4__["SidebarComponent"]]
        })
    ], SidebarModule);
    return SidebarModule;
}());



/***/ }),

/***/ "./src/app/pages/main/dashboard/dashboard.component.html":
/*!***************************************************************!*\
  !*** ./src/app/pages/main/dashboard/dashboard.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n\n\n\n\n    <section>\n        <div class=\"row\">\n            <!-- Trips -->\n            <div class=\"col-md-6\">\n                <div class=\"card\">\n                    <div class=\"header tittle\">\n                        <h4 class=\"\">Trips\n                            <select name=\"year\" id=\"\" [(ngModel)]=\"selectedYear\" (ngModelChange)=\"getTripsByYear($event)\">\n                                <option value=\"2017\">2017</option>\n                                <option value=\"2018\">2018</option>\n                                <option value=\"2019\">2019</option>\n                            </select>\n                        </h4>\n                    </div>\n                    <div class=\"content\">\n                        <div id=\"tripChart\" class=\"ct-chart\">\n                            <img src=\"assets/img/loading.gif\">\n                        </div>\n\n                    </div>\n                </div>\n            </div>\n\n            <!-- Monthly transactions -->\n            <div class=\"col-md-6\">\n                <div class=\"card\">\n                    <div class=\"header tittle\">\n                        <h4 class=\"\">Vehicle Availablity\n                            <select name=\"location\" id=\"\" [(ngModel)]=\"locationCode\" (ngModelChange)=\"getVehicleAvailability($event)\">\n                                <option [value]=\"loc.code\" *ngFor=\"let loc of locations;\">\n                                    {{loc.locName}}\n                                </option>\n                            </select>\n                        </h4>\n                    </div>\n                    <div class=\"content\">\n                        <div class=\"ct-chart\">\n                            <div class=\"c2\">\n                                <div class=\"text\">\n                                    <div>{{vehicleAvailablity[0].range}} </div>\n                                    <div>{{vehicleAvailablity[0].count}}</div>\n                                </div>\n                                <div class=\"c1\">\n                                    <div class=\"text\">\n                                        <div>{{vehicleAvailablity[1].range}} </div>\n                                        <div>{{vehicleAvailablity[1].count}}</div>\n                                    </div>\n                                    <div class=\"c0\">\n                                        <div class=\"text\">\n                                            <div>{{vehicleAvailablity[2].range}} </div>\n                                            <div>{{vehicleAvailablity[2].count}}</div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            <!-- <img src=\"assets/img/loading.gif\"> -->\n                        </div>\n\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n</div>"

/***/ }),

/***/ "./src/app/pages/main/dashboard/dashboard.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/pages/main/dashboard/dashboard.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "img {\n  padding-left: 50%;\n  padding-top: 11%; }\n\n.card {\n  border-radius: 0; }\n\n.notfound {\n  text-align: center;\n  color: red !important;\n  vertical-align: middle;\n  font-size: 24px;\n  height: 245px; }\n\n.section {\n  margin: 10px 0px 20px 0;\n  background: white;\n  padding: 20px 0px;\n  border-radius: 6px; }\n\n.tittle {\n  padding: 10px;\n  color: #333;\n  border-bottom: solid 1px #ddd;\n  background: #fafafa; }\n\n.tittle h4 {\n    font-size: 20px;\n    margin: 0;\n    font-weight: 400;\n    text-transform: uppercase; }\n\n.chart-contant-main {\n  height: 100px; }\n\n.chart-contant-main .chart-contant-left {\n    text-align: right;\n    padding: 15px;\n    background: #28b6f6;\n    height: 100px;\n    position: relative; }\n\n.chart-contant-main .chart-contant-left .numbers {\n      font-size: 2em;\n      text-align: right;\n      position: absolute;\n      top: 33%;\n      right: 12px; }\n\n.chart-contant-main .chart-contant-left .numbers h6 {\n        font-weight: normal;\n        text-transform: uppercase;\n        color: white;\n        font-size: 15px; }\n\n.chart-contant-main .chart-contant-left p {\n      color: white;\n      font-weight: 900;\n      padding-top: 2px; }\n\n.chart-contant-main .chart-icon {\n    background: #6362bb;\n    height: 100px;\n    line-height: 100px; }\n\n.card-box {\n  border-radius: 0;\n  box-shadow: 0 2px 2px rgba(204, 197, 185, 0.5);\n  background-color: #FFFFFF;\n  color: #252422;\n  margin-bottom: 20px;\n  position: relative;\n  padding: 15px;\n  min-height: 100px;\n  display: inline-block;\n  width: 100%; }\n\n.card-box .numbers {\n    display: inline-block;\n    width: auto;\n    float: right;\n    color: white; }\n\n.card-box .numbers h6 {\n      font-size: 16px; }\n\n.card-box .chart-icon {\n    display: inline-block;\n    width: auto;\n    color: white; }\n\n.card-box .chart-icon i {\n      color: white; }\n\n.card-box .chart-icon i::before {\n        font-size: 50px; }\n\n.card-box .chart-icon img {\n      max-width: 60px;\n      padding: 0;\n      margin-top: 5px; }\n\n/*-----if-only-one-box----*/\n\n.card-box.taggs_issue {\n  background-image: linear-gradient(to right, #008385 0, #27c6d9 100%);\n  background-image: -moz-gradient(linear, left top, right top, from(#008385), to(#27c6d9));\n  background-image: -o-linear-gradient(to right, #008385 0, #27c6d9 100%);\n  background-repeat: repeat-x; }\n\n.card-box.taggs_issue .chart-icon i {\n    color: white; }\n\n.card-box.taggs_issue .numbers {\n    color: white; }\n\n.card-box.new-tags {\n  background-image: linear-gradient(to right, #ff425c 0, #eb7c8b 100%);\n  background-image: -moz-gradient(linear, left top, right top, from(#ff425c), to(#eb7c8b));\n  background-image: -o-linear-gradient(to right, #ff425c 0, #eb7c8b 100%);\n  background-repeat: repeat-x; }\n\n.card-box.total-recharge {\n  background: linear-gradient(to right, #ff864a 0, #db8d67 100%);\n  background-image: -moz-gradient(linear, left top, right top, from(#ff864a), to(#db8d67));\n  background-image: -o-linear-gradient(to right, #ff864a 0, #db8d67 100%);\n  background-repeat: repeat-x; }\n\n.card-box.total-revenue {\n  background: linear-gradient(to right, #13a579 0, #29cd9b 100%);\n  background-image: -moz-gradient(linear, left top, right top, from(#13a579), to(#29cd9b));\n  background-image: -o-linear-gradient(to right, #13a579 0, #29cd9b 100%);\n  background-repeat: repeat-x; }\n\n.ct-chart {\n  margin: 30px 0 30px;\n  height: 315px; }\n\n.ct-chart .text {\n    position: absolute;\n    top: 10px;\n    width: 100%;\n    text-align: center; }\n\n.ct-chart .c2 {\n    background: green;\n    color: white;\n    height: 330px;\n    width: 330px;\n    border-radius: 50%;\n    text-align: center;\n    margin: auto;\n    position: relative;\n    vertical-align: middle; }\n\n.ct-chart .c2 .c1 {\n      background: yellow;\n      color: black;\n      height: 210px;\n      width: 210px;\n      border-radius: 50%;\n      margin: auto;\n      vertical-align: middle;\n      position: relative;\n      top: 50%;\n      -webkit-transform: translateY(-50%);\n              transform: translateY(-50%); }\n\n.ct-chart .c2 .c1 .c0 {\n        background: red;\n        color: white;\n        height: 100px;\n        width: 100px;\n        border-radius: 50%;\n        margin: auto;\n        vertical-align: middle;\n        position: relative;\n        top: 50%;\n        -webkit-transform: translateY(-50%);\n                transform: translateY(-50%); }\n\n.ct-chart .c2 .c1 .c0 .text {\n          top: 50%;\n          -webkit-transform: translateY(-50%);\n                  transform: translateY(-50%); }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbGthZ2lyZGhhci9EZXNrdG9wL3Bhbmthai9KQVZBL2Vma29uLWNjaC9zcmMvYXBwL3BhZ2VzL21haW4vZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQTtFQUNBLGlCQUFpQjtFQUNiLGdCQUFnQixFQUFBOztBQUdwQjtFQUNJLGdCQUFnQixFQUFBOztBQUVwQjtFQUNHLGtCQUFrQjtFQUNsQixxQkFBcUI7RUFDckIsc0JBQXNCO0VBQ3RCLGVBQWU7RUFDZixhQUFhLEVBQUE7O0FBRWhCO0VBQ0ksdUJBQXVCO0VBQ3ZCLGlCQUFpQjtFQUNqQixpQkFBaUI7RUFDakIsa0JBQWtCLEVBQUE7O0FBRXRCO0VBQ0ksYUFBYTtFQUNiLFdBQVc7RUFDWCw2QkFBNkI7RUFDN0IsbUJBQW1CLEVBQUE7O0FBSnZCO0lBT1EsZUFBZTtJQUNmLFNBQVM7SUFDVCxnQkFBZ0I7SUFDaEIseUJBQXlCLEVBQUE7O0FBSWpDO0VBQ0ksYUFBYSxFQUFBOztBQURqQjtJQUlRLGlCQUFpQjtJQUNqQixhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLGFBQWE7SUFDYixrQkFBa0IsRUFBQTs7QUFSMUI7TUFXWSxjQUFjO01BQ2QsaUJBQWlCO01BQ2pCLGtCQUFrQjtNQUNsQixRQUFRO01BQ1IsV0FBVyxFQUFBOztBQWZ2QjtRQWlCWSxtQkFBbUI7UUFDdkIseUJBQXlCO1FBQ3pCLFlBQVk7UUFDWixlQUFlLEVBQUE7O0FBcEJ2QjtNQXlCWSxZQUFZO01BQ1osZ0JBQWdCO01BQ2hCLGdCQUFnQixFQUFBOztBQTNCNUI7SUFtQ1EsbUJBQW1CO0lBQ25CLGFBQWE7SUFDYixrQkFBa0IsRUFBQTs7QUFLMUI7RUFDSSxnQkFBZ0I7RUFDaEIsOENBQThDO0VBQzlDLHlCQUF5QjtFQUN6QixjQUFjO0VBQ2QsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsaUJBQWlCO0VBQ2pCLHFCQUFxQjtFQUNyQixXQUFXLEVBQUE7O0FBVmY7SUFhUSxxQkFBcUI7SUFDckIsV0FBVztJQUNYLFlBQVk7SUFDWixZQUFZLEVBQUE7O0FBaEJwQjtNQW1CWSxlQUFlLEVBQUE7O0FBbkIzQjtJQXVCUSxxQkFBcUI7SUFDckIsV0FBVztJQUNYLFlBQVksRUFBQTs7QUF6QnBCO01BNEJZLFlBQVksRUFBQTs7QUE1QnhCO1FBK0JnQixlQUFlLEVBQUE7O0FBL0IvQjtNQW1DWSxlQUFlO01BQ2YsVUFBVTtNQUNWLGVBQWUsRUFBQTs7QUFpQjNCLDJCQUFBOztBQUVBO0VBRVEsb0VBQWtFO0VBSWxFLHdGQUFvRjtFQUNwRix1RUFBcUU7RUFDckUsMkJBQTJCLEVBQUE7O0FBUm5DO0lBWWdCLFlBQVksRUFBQTs7QUFaNUI7SUFnQlksWUFBWSxFQUFBOztBQUt4QjtFQUVRLG9FQUFrRTtFQUlsRSx3RkFBb0Y7RUFDcEYsdUVBQXFFO0VBQ3JFLDJCQUEyQixFQUFBOztBQVJuQztFQVlRLDhEQUE0RDtFQUk1RCx3RkFBb0Y7RUFDcEYsdUVBQXFFO0VBQ3JFLDJCQUEyQixFQUFBOztBQWxCbkM7RUFxQlEsOERBQTREO0VBSTVELHdGQUFvRjtFQUNwRix1RUFBcUU7RUFDckUsMkJBQTJCLEVBQUE7O0FBTW5DO0VBQ0ksbUJBQW1CO0VBQ25CLGFBQWEsRUFBQTs7QUFGakI7SUFLUSxrQkFBa0I7SUFDbEIsU0FBUztJQUNULFdBQVc7SUFDWCxrQkFBa0IsRUFBQTs7QUFSMUI7SUFZUSxpQkFBaUI7SUFDakIsWUFBWTtJQUNaLGFBQWE7SUFDYixZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLHNCQUFzQixFQUFBOztBQXBCOUI7TUF1Qlksa0JBQWtCO01BQ2xCLFlBQVk7TUFDWixhQUFhO01BQ2IsWUFBWTtNQUNaLGtCQUFrQjtNQUNsQixZQUFZO01BQ1osc0JBQXNCO01BQ3RCLGtCQUFrQjtNQUNsQixRQUFRO01BQ1IsbUNBQTJCO2NBQTNCLDJCQUEyQixFQUFBOztBQWhDdkM7UUFrQ2dCLGVBQWU7UUFDZixZQUFZO1FBQ1osYUFBYTtRQUNiLFlBQVk7UUFDWixrQkFBa0I7UUFDbEIsWUFBWTtRQUNaLHNCQUFzQjtRQUN0QixrQkFBa0I7UUFDbEIsUUFBUTtRQUNSLG1DQUEyQjtnQkFBM0IsMkJBQTJCLEVBQUE7O0FBM0MzQztVQThDb0IsUUFBUTtVQUNSLG1DQUEyQjtrQkFBM0IsMkJBQTJCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9tYWluL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIgICAgLy8gQ2FwYWNpdHkgOiAjRjNCQjQ1XG4vLyBSZXZlbnVlICA6ICM3QUMyOUFcbi8vIGVycm9yICAgIDogI0REMDMzMFxuLy8gdHdldHRlciAgOiAjNjhCM0M4XG5cbmltZyB7XG5wYWRkaW5nLWxlZnQ6IDUwJTtcbiAgICBwYWRkaW5nLXRvcDogMTElO1xuXG59XG4uY2FyZHtcbiAgICBib3JkZXItcmFkaXVzOiAwO1xufVxuLm5vdGZvdW5kIHtcbiAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgIGNvbG9yOiByZWQgIWltcG9ydGFudDtcbiAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IFxuICAgZm9udC1zaXplOiAyNHB4O1xuICAgaGVpZ2h0OiAyNDVweDtcbn1cbi5zZWN0aW9uIHtcbiAgICBtYXJnaW46IDEwcHggMHB4IDIwcHggMDtcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICBwYWRkaW5nOiAyMHB4IDBweDtcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XG59XG4udGl0dGxlIHtcbiAgICBwYWRkaW5nOiAxMHB4O1xuICAgIGNvbG9yOiAjMzMzO1xuICAgIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCAjZGRkO1xuICAgIGJhY2tncm91bmQ6ICNmYWZhZmE7XG5cbiAgICBoNHtcbiAgICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgfVxufVxuXG4uY2hhcnQtY29udGFudC1tYWlue1xuICAgIGhlaWdodDogMTAwcHg7XG5cbiAgICAuY2hhcnQtY29udGFudC1sZWZ0IHtcbiAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICAgIHBhZGRpbmc6IDE1cHg7XG4gICAgICAgIGJhY2tncm91bmQ6ICMyOGI2ZjY7XG4gICAgICAgIGhlaWdodDogMTAwcHg7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBcbiAgICAgICAgLm51bWJlcnN7XG4gICAgICAgICAgICBmb250LXNpemU6IDJlbTtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgdG9wOiAzMyU7XG4gICAgICAgICAgICByaWdodDogMTJweDtcbiAgICAgICAgaDZ7XG4gICAgICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgIGZvbnQtc2l6ZTogMTVweDtcblxuICAgICAgICB9XG4gICAgfVxuICAgICAgICBwIHtcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA5MDA7XG4gICAgICAgICAgICBwYWRkaW5nLXRvcDogMnB4O1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG5cblxuICAgIC5jaGFydC1pY29uIHtcbiAgICAgICAgYmFja2dyb3VuZDogIzYzNjJiYjtcbiAgICAgICAgaGVpZ2h0OiAxMDBweDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEwMHB4O1xufVxuXG59XG5cbi5jYXJkLWJveHtcbiAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgIGJveC1zaGFkb3c6IDAgMnB4IDJweCByZ2JhKDIwNCwgMTk3LCAxODUsIDAuNSk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcbiAgICBjb2xvcjogIzI1MjQyMjtcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBwYWRkaW5nOiAxNXB4O1xuICAgIG1pbi1oZWlnaHQ6IDEwMHB4O1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB3aWR0aDogMTAwJTtcblxuICAgIC5udW1iZXJzIHtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICB3aWR0aDogYXV0bztcbiAgICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgICAgICBjb2xvcjogd2hpdGU7XG5cbiAgICAgICAgaDYge1xuICAgICAgICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgICB9XG4gICAgfVxuICAgIC5jaGFydC1pY29uIHtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICB3aWR0aDogYXV0bztcbiAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICBpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuXG4gICAgICAgICAgICAmOjpiZWZvcmV7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiA1MHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGltZyB7XG4gICAgICAgICAgICBtYXgtd2lkdGg6IDYwcHg7XG4gICAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogNXB4O1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgLy8gaW1nIHtcbiAgICAvLyAgICAgd2lkdGg6IDEwMCU7XG4gICAgLy8gICAgIGhlaWdodDogYXV0bztcbiAgICAvLyAgICAgcGFkZGluZzogMDtcbiAgICAvLyAgICAgb3BhY2l0eTogMC4zO1xuICAgIC8vICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgLy8gICAgIGxlZnQ6IDA7XG4gICAgLy8gICAgIGJvdHRvbTogMDtcbiAgICAvLyAgICAgZGlzcGxheTogbm9uZTtcbiAgICAvLyB9XG59XG5cblxuLyotLS0tLWlmLW9ubHktb25lLWJveC0tLS0qL1xuXG4uY2FyZC1ib3h7XG4gICAgJi50YWdnc19pc3N1ZXtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCMwMDgzODUgMCwjMjdjNmQ5IDEwMCUpO1xuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOi13ZWJraXQtZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLHJpZ2h0IHRvcCxmcm9tKCMwMDgzODUpLHRvKCMyN2M2ZDkpKTtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQobGVmdCwjMDA4Mzg1IDAsIzI3YzZkOSAxMDAlKTtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLW1vei1saW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIzAwODM4NSAwLCMyN2M2ZDkgMTAwJSk7XG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC1tb3otZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLHJpZ2h0IHRvcCxmcm9tKCMwMDgzODUpLHRvKCMyN2M2ZDkpKTtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCMwMDgzODUgMCwjMjdjNmQ5IDEwMCUpO1xuICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0LXg7XG4gIFxuICAgICAgICAuY2hhcnQtaWNvbntcbiAgICAgICAgICAgIGl7XG4gICAgICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC5udW1iZXJzIHtcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLmNhcmQtYm94e1xuICAgICYubmV3LXRhZ3N7XG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwjZmY0MjVjIDAsI2ViN2M4YiAxMDAlKTtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTotd2Via2l0LWdyYWRpZW50KGxpbmVhcixsZWZ0IHRvcCxyaWdodCB0b3AsZnJvbSgjZmY0MjVjKSx0bygjZWI3YzhiKSk7XG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGxlZnQsI2ZmNDI1YyAwLCNlYjdjOGIgMTAwJSk7XG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC1tb3otbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCNmZjQyNWMgMCwjZWI3YzhiIDEwMCUpO1xuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtbW96LWdyYWRpZW50KGxpbmVhcixsZWZ0IHRvcCxyaWdodCB0b3AsZnJvbSgjZmY0MjVjKSx0bygjZWI3YzhiKSk7XG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC1vLWxpbmVhci1ncmFkaWVudCh0byByaWdodCwjZmY0MjVjIDAsI2ViN2M4YiAxMDAlKTtcbiAgICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdC14O1xuICAgICAgICBcbiAgICB9XG4gICAgJi50b3RhbC1yZWNoYXJnZXtcbiAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCNmZjg2NGEgMCwjZGI4ZDY3IDEwMCUpO1xuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOi13ZWJraXQtZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLHJpZ2h0IHRvcCxmcm9tKCNmZjg2NGEpLHRvKCNkYjhkNjcpKTtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQobGVmdCwjZmY4NjRhIDAsI2RiOGQ2NyAxMDAlKTtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLW1vei1saW5lYXItZ3JhZGllbnQodG8gcmlnaHQsI2ZmODY0YSAwLCNkYjhkNjcgMTAwJSk7XG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC1tb3otZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLHJpZ2h0IHRvcCxmcm9tKCNmZjg2NGEpLHRvKCNkYjhkNjcpKTtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCNmZjg2NGEgMCwjZGI4ZDY3IDEwMCUpO1xuICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0LXg7XG4gICAgfVxuICAgICYudG90YWwtcmV2ZW51ZXtcbiAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCMxM2E1NzkgMCwjMjljZDliIDEwMCUpO1xuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOi13ZWJraXQtZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLHJpZ2h0IHRvcCxmcm9tKCMxM2E1NzkpLHRvKCMyOWNkOWIpKTtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQobGVmdCwjMTNhNTc5IDAsIzI5Y2Q5YiAxMDAlKTtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLW1vei1saW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIzEzYTU3OSAwLCMyOWNkOWIgMTAwJSk7XG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC1tb3otZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLHJpZ2h0IHRvcCxmcm9tKCMxM2E1NzkpLHRvKCMyOWNkOWIpKTtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCMxM2E1NzkgMCwjMjljZDliIDEwMCUpO1xuICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0LXg7XG4gICAgfVxuICAgIFxufVxuXG5cbi5jdC1jaGFydHtcbiAgICBtYXJnaW46IDMwcHggMCAzMHB4O1xuICAgIGhlaWdodDogMzE1cHg7XG5cbiAgICAudGV4dCB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAxMHB4O1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIH1cblxuICAgIC5jMntcbiAgICAgICAgYmFja2dyb3VuZDogZ3JlZW47XG4gICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgaGVpZ2h0OiAzMzBweDtcbiAgICAgICAgd2lkdGg6IDMzMHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgbWFyZ2luOiBhdXRvO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG5cbiAgICAgICAgLmMxe1xuICAgICAgICAgICAgYmFja2dyb3VuZDogeWVsbG93O1xuICAgICAgICAgICAgY29sb3I6IGJsYWNrO1xuICAgICAgICAgICAgaGVpZ2h0OiAyMTBweDtcbiAgICAgICAgICAgIHdpZHRoOiAyMTBweDtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICB0b3A6IDUwJTtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgICAgICAgICAgIC5jMHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiByZWQ7XG4gICAgICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgICAgIGhlaWdodDogMTAwcHg7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMHB4O1xuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgICAgICAgICBtYXJnaW46IGF1dG87XG4gICAgICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuXG4gICAgICAgICAgICAgICAgLnRleHQge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IDUwJTtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSJdfQ== */"

/***/ }),

/***/ "./src/app/pages/main/dashboard/dashboard.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/pages/main/dashboard/dashboard.component.ts ***!
  \*************************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_providers_dashboard_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/providers/dashboard.service */ "./src/app/providers/dashboard.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(dashboardservice, activateRoute) {
        this.dashboardservice = dashboardservice;
        this.activateRoute = activateRoute;
        this.vehicleAvailablity = [];
        this.viewPanel = true;
        this.viewPanel1 = true;
        // for dashboard card
        this.totalRevanue = 0;
        this.totalRevanueValue = false;
        this.totalIssue = 0;
        this.totalIssueValue = false;
        this.totalInactive = 0;
        this.newActivetedTags = 0;
        this.newActivetedTagsValue = false;
        this.totalRecharge = 0;
        this.totalRechargeValue = false;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dashboardservice.getLocations().subscribe(function (response) {
            _this.locations = response;
        });
        this.dashboardservice.loadScript().subscribe(function (res) { }, function (err) { }, function () {
            _this.loadGoogleChart();
        });
    };
    DashboardComponent.prototype.loadGoogleChart = function () {
        var _this = this;
        google.charts.load('current', { packages: ['corechart', 'bar'], language: 'hi_ln' });
        google.charts.setOnLoadCallback(function () {
            _this.activateRoute.queryParams.subscribe(function (res) {
                _this.viewPanel = true;
                _this.viewPanel1 = true;
                _this.getAllChart();
                _this.viewPanel = true;
                _this.viewPanel1 = true;
            });
        });
    };
    // all at a time
    DashboardComponent.prototype.getAllChart = function () {
        this.getTrips();
        this.getVehicleAvailability('001');
    };
    DashboardComponent.prototype.getTrips = function () {
        this.dashboardservice.getYearlyTrips().subscribe(function (response) {
            var tripMonthlyList = response;
            var tripsData = [[]];
            tripsData[0] = [];
            tripsData[0].push('year');
            tripMonthlyList[0].tripsList.forEach(function (element) {
                tripsData[0].push(element.tripType);
            });
            tripMonthlyList.forEach(function (element, index) {
                tripsData[index + 1] = [];
                tripsData[index + 1].push(element.year);
                element.tripsList.forEach(function (el) {
                    tripsData[index + 1].push(el.count);
                });
            });
            var data = google.visualization.arrayToDataTable(tripsData);
            var options = {
            // title: 'Tags Issued Monthly Trend',
            // colors: ['#26c6da', '#ff425c', '#2ad8a4', '#ff864a', '#a94442']
            };
            var chart = new google.visualization.LineChart(document.getElementById('tripChart'));
            chart.draw(data, options);
        });
    };
    DashboardComponent.prototype.getTripsByYear = function (year) {
        this.dashboardservice.getTripsByYear(year).subscribe(function (response) {
            var tripMonthlyList = response.tripMonthlyList;
            var tripsData = [[]];
            tripsData[0] = [];
            tripsData[0].push('month');
            tripMonthlyList[0].trips.forEach(function (element) {
                tripsData[0].push(element.tripType);
            });
            tripMonthlyList.forEach(function (element, index) {
                tripsData[index + 1] = [];
                tripsData[index + 1].push(element.month);
                element.trips.forEach(function (el) {
                    tripsData[index + 1].push(el.count);
                });
            });
            var data = google.visualization.arrayToDataTable(tripsData);
            var options = {
            // title: 'Tags Issued Monthly Trend',
            // colors: ['#26c6da', '#ff425c', '#2ad8a4', '#ff864a', '#a94442']
            };
            var chart = new google.visualization.LineChart(document.getElementById('tripChart'));
            chart.draw(data, options);
        });
    };
    DashboardComponent.prototype.getVehicleAvailability = function (locCode) {
        var _this = this;
        this.dashboardservice.getVehicleAvailablity(locCode).subscribe(function (response) {
            _this.vehicleAvailablity = response;
        });
    };
    DashboardComponent.prototype.hidePanel = function (val) {
        if (val === 1) {
            this.viewPanel = true;
            // this.monthlyTagIssueTrend();
        }
        else {
            this.viewPanel1 = true;
            // this.totalMonthlyRevenue();
        }
        // this.loadGoogleChart();
        // if (num) {
        //   this.monthlyRevenueTitle = (num === 1) ? 'Tags Issued Monthly Trend' : ' Retails Tags Issued Monthly Trend';
        //   this.viewPanel1 = value;
        // } else {
        //   this.monthlyIssuedTite = ' Tags Issued Monthly ';
        //   this.viewPanel = value;
        // }
    };
    DashboardComponent.prototype.giveHtmlTooltip = function (month, percent, value, activeType) {
        return "\n    <div style=\"padding:5px;max-width:250px !important\">\n    <h6 style=\"margin:0;padding:0\">" + month + "</h6>\n    <p style=\"margin:0;font-size:small\">Active (%): <b>" + percent + "</b></p>\n    <p style=\"margin:0;font-size:small\">Tags Issued " + (activeType === '30' ? 'Till' : 'In') + ": <b>" + value + "</b></p>\n    </div>\n    ";
    };
    DashboardComponent.prototype.giveIndianStyleDecimal = function (amount) {
        if (typeof amount !== 'number' && Number.isNaN(amount)) {
            throw Error('Input parameter must be of type number');
        }
        var str = amount.toString();
        // check if amount contains any fraction part
        var fraction = '';
        var dotIndex = str.indexOf('.');
        if (dotIndex > -1) {
            fraction = str.slice(dotIndex + 1);
            str = str.slice(0, dotIndex);
        }
        var newStr = '';
        var sepCount = 0;
        var l = str.length;
        for (var i = l - 1; i > -1; i--) {
            newStr = str[i] + newStr;
            sepCount += 1;
            if (sepCount === 3) {
                if (i !== 0) {
                    newStr = ',' + newStr;
                }
                sepCount = 0;
            }
            if (sepCount === 2 && newStr.length > 3) {
                if (i !== 0) {
                    newStr = ',' + newStr;
                }
                sepCount = 0;
            }
        }
        return newStr + (fraction ? "." + fraction : '');
    };
    DashboardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-dashboard-cmp',
            template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/pages/main/dashboard/dashboard.component.html"),
            styles: [__webpack_require__(/*! ./dashboard.component.scss */ "./src/app/pages/main/dashboard/dashboard.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_providers_dashboard_service__WEBPACK_IMPORTED_MODULE_2__["DashboardService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/pages/main/main-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/main/main-routing.module.ts ***!
  \***************************************************/
/*! exports provided: routes, MainRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainRoutingModule", function() { return MainRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/pages/main/dashboard/dashboard.component.ts");
/* harmony import */ var _main_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./main.component */ "./src/app/pages/main/main.component.ts");





var routes = [
    {
        path: '',
        component: _main_component__WEBPACK_IMPORTED_MODULE_4__["MainComponent"],
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_3__["DashboardComponent"]
            },
        ]
    }
];
var MainRoutingModule = /** @class */ (function () {
    function MainRoutingModule() {
    }
    MainRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], MainRoutingModule);
    return MainRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/main/main.component.html":
/*!************************************************!*\
  !*** ./src/app/pages/main/main.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"wrapper\">\n  <div class=\"sidebar\" data-background-color=\"white\" data-active-color=\"danger\">\n    <app-sidebar-cmp></app-sidebar-cmp>\n  </div>\n  <div class=\"main-panel\"> -->\n<!-- <app-navbar-cmp></app-navbar-cmp>\n    <div class=\"content\">\n      <router-outlet></router-outlet>\n    </div> -->\n<!-- <app-navbar-cmp (year)=\"onYearChange($event)\" [selectedYear]=\"selectedYear\" [yearList]=\"yearList\"></app-navbar-cmp>\n<div class=\"content\">\n  <router-outlet></router-outlet>\n</div>\n    <app-footer-cmp></app-footer-cmp>\n  </div>\n</div> -->\n<!-- <app-fixedplugin-cmp></app-fixedplugin-cmp> -->\n\n\n<app-navbar-cmp (year)=\"onYearChange($event)\" [selectedYear]=\"selectedYear\" [yearList]=\"yearList\"></app-navbar-cmp>\n<div class=\"content\">\n  <router-outlet></router-outlet>\n</div>\n<app-footer-cmp></app-footer-cmp>"

/***/ }),

/***/ "./src/app/pages/main/main.component.scss":
/*!************************************************!*\
  !*** ./src/app/pages/main/main.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL21haW4vbWFpbi5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/pages/main/main.component.ts":
/*!**********************************************!*\
  !*** ./src/app/pages/main/main.component.ts ***!
  \**********************************************/
/*! exports provided: MainComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainComponent", function() { return MainComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _providers_dashboard_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../providers/dashboard.service */ "./src/app/providers/dashboard.service.ts");




var MainComponent = /** @class */ (function () {
    function MainComponent(router, activateRoute, dashboardService) {
        this.router = router;
        this.activateRoute = activateRoute;
        this.dashboardService = dashboardService;
    }
    MainComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.getMinYear();
        this.activateRoute.queryParams.subscribe(function (res) {
            _this.selectedYear = (res.year) ? res.year : (new Date()).getFullYear() - 1;
        });
    };
    MainComponent.prototype.getMinYear = function () {
        var _this = this;
        this.dashboardService.getMinYear()
            .subscribe(function (res) {
            var currentYear = new Date().getFullYear();
            var minY = res[0].year;
            _this.yearList = [];
            while (minY <= currentYear) {
                _this.yearList.push(minY);
                minY++;
            }
        }, function (err) { });
    };
    MainComponent.prototype.onYearChange = function (selectedYear) {
        this.router.navigate(['home/dashboard'], { queryParams: { year: selectedYear } });
    };
    MainComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-main',
            template: __webpack_require__(/*! ./main.component.html */ "./src/app/pages/main/main.component.html"),
            styles: [__webpack_require__(/*! ./main.component.scss */ "./src/app/pages/main/main.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _providers_dashboard_service__WEBPACK_IMPORTED_MODULE_3__["DashboardService"]])
    ], MainComponent);
    return MainComponent;
}());



/***/ }),

/***/ "./src/app/pages/main/main.module.ts":
/*!*******************************************!*\
  !*** ./src/app/pages/main/main.module.ts ***!
  \*******************************************/
/*! exports provided: MainModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainModule", function() { return MainModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _main_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./main-routing.module */ "./src/app/pages/main/main-routing.module.ts");
/* harmony import */ var _main_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./main.component */ "./src/app/pages/main/main.component.ts");
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/components.module */ "./src/app/pages/components/components.module.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/pages/main/dashboard/dashboard.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");









var MainModule = /** @class */ (function () {
    function MainModule() {
    }
    MainModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_main_component__WEBPACK_IMPORTED_MODULE_4__["MainComponent"], _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_6__["DashboardComponent"]],
            imports: [
                _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _components_components_module__WEBPACK_IMPORTED_MODULE_5__["ComponentsModule"],
                _main_routing_module__WEBPACK_IMPORTED_MODULE_3__["MainRoutingModule"]
            ]
        })
    ], MainModule);
    return MainModule;
}());



/***/ }),

/***/ "./src/app/providers/dashboard.service.ts":
/*!************************************************!*\
  !*** ./src/app/providers/dashboard.service.ts ***!
  \************************************************/
/*! exports provided: DashboardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardService", function() { return DashboardService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _custamHTTP__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./custamHTTP */ "./src/app/providers/custamHTTP.ts");




// const fake = [{ "count": 13815, "name": "JAN", "list": [{ "count": 8392, "name": "Retail", "percentage": 4.06 }, { "count": 5423, "name": "Corporate", "percentage": 14.87 }], "percentage": 4.06 }, { "count": 19222, "name": "FEB", "list": [{ "count": 10379, "name": "Retail", "percentage": 5.02 }, { "count": 8843, "name": "Corporate", "percentage": 24.24 }], "percentage": 5.02 }, { "count": 27519, "name": "MAR", "list": [{ "count": 15505, "name": "Retail", "percentage": 7.49 }, { "count": 12014, "name": "Corporate", "percentage": 32.93 }], "percentage": 7.49 }, { "count": 35224, "name": "APR", "list": [{ "count": 21757, "name": "Retail", "percentage": 10.51 }, { "count": 13467, "name": "Corporate", "percentage": 36.91 }], "percentage": 10.51 }, { "count": 40597, "name": "MAY", "list": [{ "count": 26935, "name": "Retail", "percentage": 13.01 }, { "count": 13662, "name": "Corporate", "percentage": 37.45 }], "percentage": 13.01 }, { "count": 47006, "name": "JUN", "list": [{ "count": 31993, "name": "Retail", "percentage": 15.45 }, { "count": 15013, "name": "Corporate", "percentage": 41.15 }], "percentage": 15.45 }, { "count": 52162, "name": "JUL", "list": [{ "count": 34504, "name": "Retail", "percentage": 16.67 }, { "count": 17658, "name": "Corporate", "percentage": 48.4 }], "percentage": 16.67 }, { "count": 56155, "name": "AUG", "list": [{ "count": 36960, "name": "Retail", "percentage": 17.85 }, { "count": 19195, "name": "Corporate", "percentage": 52.61 }], "percentage": 17.85 }, { "count": 61204, "name": "SEP", "list": [{ "count": 38477, "name": "Retail", "percentage": 18.58 }, { "count": 22727, "name": "Corporate", "percentage": 62.29 }], "percentage": 18.58 }, { "count": 67130, "name": "OCT", "list": [{ "count": 42025, "name": "Retail", "percentage": 20.3 }, { "count": 25105, "name": "Corporate", "percentage": 68.81 }], "percentage": 20.3 }, { "count": 73668, "name": "NOV", "list": [{ "count": 48077, "name": "Retail", "percentage": 23.22 }, { "count": 25591, "name": "Corporate", "percentage": 70.14 }], "percentage": 23.22 }, { "count": 77260, "name": "DEC", "list": [{ "count": 50724, "name": "Retail", "percentage": 24.5 }, { "count": 26536, "name": "Corporate", "percentage": 72.73 }], "percentage": 24.5 }];
// const fakeMonthlyTxn =
//   [{
//     "count": 127479, "name": "JAN",
//     "list": [{ "count": 78474, "name": "Retail" }, { "count": 49005, "name": "Corporate" }]
//   }, { "count": 276432, "name": "FEB", "list": [{ "count": 94742, "name": "Retail" }, { "count": 181690, "name": "Corporate" }] }, { "count": 446826, "name": "MAR", "list": [{ "count": 148520, "name": "Retail" }, { "count": 298306, "name": "Corporate" }] }, { "count": 525869, "name": "APR", "list": [{ "count": 188479, "name": "Retail" }, { "count": 337390, "name": "Corporate" }] }, { "count": 657246, "name": "MAY", "list": [{ "count": 248722, "name": "Retail" }, { "count": 408524, "name": "Corporate" }] }, { "count": 685079, "name": "JUN", "list": [{ "count": 281657, "name": "Retail" }, { "count": 403422, "name": "Corporate" }] }, { "count": 778013, "name": "JUL", "list": [{ "count": 296544, "name": "Retail" }, { "count": 481469, "name": "Corporate" }] }, { "count": 869112, "name": "AUG", "list": [{ "count": 339152, "name": "Retail" }, { "count": 529960, "name": "Corporate" }] }, { "count": 866441, "name": "SEP", "list": [{ "count": 335004, "name": "Retail" }, { "count": 531437, "name": "Corporate" }] }, { "count": 910788, "name": "OCT", "list": [{ "count": 377651, "name": "Retail" }, { "count": 533137, "name": "Corporate" }] }, { "count": 1001023, "name": "NOV", "list": [{ "count": 386887, "name": "Retail" }, { "count": 614136, "name": "Corporate" }] }, { "count": 1155036, "name": "DEC", "list": [{ "count": 445596, "name": "Retail" }, { "count": 709440, "name": "Corporate" }] }];
// const fakeRechargeRetail = [{ "name": "JAN", "list": [{ "count": 4224, "name": "Retail", "recharge": 1913766, "paymentType": "Cash" }, { "count": 7693, "name": "Retail", "recharge": 553664, "paymentType": "MANUAL CREDIT" }, { "count": 6126, "name": "Retail", "recharge": 9819166, "paymentType": "Payment Gateway" }], "revenue": 12286596 }, { "name": "FEB", "list": [{ "count": 4431, "name": "Retail", "recharge": 1544239, "paymentType": "Cash" }, { "count": 8308, "name": "Retail", "recharge": 954530, "paymentType": "MANUAL CREDIT" }, { "count": 7517, "name": "Retail", "recharge": 13709437, "paymentType": "Payment Gateway" }], "revenue": 16208206 }, { "name": "MAR", "list": [{ "count": 13627, "name": "Retail", "recharge": 2501274, "paymentType": "Cash" }, { "count": 7846, "name": "Retail", "recharge": 933220, "paymentType": "MANUAL CREDIT" }, { "count": 11258, "name": "Retail", "recharge": 21058549, "paymentType": "Payment Gateway" }], "revenue": 24493043 }, { "name": "APR", "list": [{ "count": 16460, "name": "Retail", "recharge": 2588090, "paymentType": "Cash" }, { "count": 13518, "name": "Retail", "recharge": 1567164, "paymentType": "MANUAL CREDIT" }, { "count": 12215, "name": "Retail", "recharge": 24050956, "paymentType": "Payment Gateway" }], "revenue": 28206210 }, { "name": "MAY", "list": [{ "count": 18461, "name": "Retail", "recharge": 4071877, "paymentType": "Cash" }, { "count": 18903, "name": "Retail", "recharge": 1324681, "paymentType": "MANUAL CREDIT" }, { "count": 16164, "name": "Retail", "recharge": 34205371, "paymentType": "Payment Gateway" }], "revenue": 39601929 }, { "name": "JUN", "list": [{ "count": 18924, "name": "Retail", "recharge": 4244961, "paymentType": "Cash" }, { "count": 21605, "name": "Retail", "recharge": 1559472, "paymentType": "MANUAL CREDIT" }, { "count": 16391, "name": "Retail", "recharge": 36246048, "paymentType": "Payment Gateway" }], "revenue": 42050481 }, { "name": "JUL", "list": [{ "count": 17341, "name": "Retail", "recharge": 4032026, "paymentType": "Cash" }, { "count": 25304, "name": "Retail", "recharge": 1778684, "paymentType": "MANUAL CREDIT" }, { "count": 17748, "name": "Retail", "recharge": 36735671, "paymentType": "Payment Gateway" }], "revenue": 42546381 }, { "name": "AUG", "list": [{ "count": 18275, "name": "Retail", "recharge": 4106191, "paymentType": "Cash" }, { "count": 1566, "name": "Retail", "recharge": 143305, "paymentType": "MANUAL CREDIT" }, { "count": 20033, "name": "Retail", "recharge": 44009011, "paymentType": "Payment Gateway" }], "revenue": 48258507 }, { "name": "SEP", "list": [{ "count": 16506, "name": "Retail", "recharge": 4098831, "paymentType": "Cash" }, { "count": 27469, "name": "Retail", "recharge": 1859169, "paymentType": "MANUAL CREDIT" }, { "count": 19153, "name": "Retail", "recharge": 42193151, "paymentType": "Payment Gateway" }], "revenue": 48151151 }, { "name": "OCT", "list": [{ "count": 20343, "name": "Retail", "recharge": 4811133, "paymentType": "Cash" }, { "count": 38784, "name": "Retail", "recharge": 4268220, "paymentType": "MANUAL CREDIT" }, { "count": 22560, "name": "Retail", "recharge": 48454910, "paymentType": "Payment Gateway" }], "revenue": 57534263 }, { "name": "NOV", "list": [{ "count": 22211, "name": "Retail", "recharge": 5226962, "paymentType": "Cash" }, { "count": 29569, "name": "Retail", "recharge": 2095025, "paymentType": "MANUAL CREDIT" }, { "count": 23052, "name": "Retail", "recharge": 46419460, "paymentType": "Payment Gateway" }], "revenue": 53741447 }, { "name": "DEC", "list": [{ "count": 23427, "name": "Retail", "recharge": 5740716, "paymentType": "Cash" }, { "count": 33405, "name": "Retail", "recharge": 3043002, "paymentType": "MANUAL CREDIT" }, { "count": 24664, "name": "Retail", "recharge": 51070602, "paymentType": "Payment Gateway" }], "revenue": 59854320 }];
// const shgsu = [{ "name": "JAN", "list": [{ "name": "Retail", "revenue": 9161267.29 }, { "name": "Corporate", "revenue": 16129244.46 }], "revenue": 25290511.75 }, { "name": "FEB", "list": [{ "name": "Retail", "revenue": 12610226.81 }, { "name": "Corporate", "revenue": 41977460.76 }], "revenue": 54587687.57 }, { "name": "MAR", "list": [{ "name": "Retail", "revenue": 19027718.59 }, { "name": "Corporate", "revenue": 67339549.28 }], "revenue": 86367267.87 }, { "name": "APR", "list": [{ "name": "Retail", "revenue": 23029361.91 }, { "name": "Corporate", "revenue": 77658538.52 }], "revenue": 100687900.43 }, { "name": "MAY", "list": [{ "name": "Retail", "revenue": 30634928.26 }, { "name": "Corporate", "revenue": 91325327.02 }], "revenue": 121960255.28 }, { "name": "JUN", "list": [{ "name": "Retail", "revenue": 35369241.10 }, { "name": "Corporate", "revenue": 94990429.81 }], "revenue": 130359670.91 }, { "name": "JUL", "list": [{ "name": "Retail", "revenue": 35716896.48 }, { "name": "Corporate", "revenue": 110621976.39 }], "revenue": 146338872.87 }, { "name": "AUG", "list": [{ "name": "Retail", "revenue": 41965066.08 }, { "name": "Corporate", "revenue": 127023894.83 }], "revenue": 168988960.91 }, { "name": "SEP", "list": [{ "name": "Retail", "revenue": 41554537.35 }, { "name": "Corporate", "revenue": 130538850.63 }], "revenue": 172093387.98 }, { "name": "OCT", "list": [{ "name": "Retail", "revenue": 47073047.81 }, { "name": "Corporate", "revenue": 136797217.55 }], "revenue": 183870265.36 }, { "name": "NOV", "list": [{ "name": "Retail", "revenue": 45963748.52 }, { "name": "Corporate", "revenue": 157197034.45 }], "revenue": 203160782.97 }, { "name": "DEC", "list": [{ "name": "Retail", "revenue": 53914416.18 }, { "name": "Corporate", "revenue": 185093213.42 }], "revenue": 239007629.60 }]
// const monthlySetting = [{ "name": "JAN", "list": [{ "name": "Retail", "revenue": 8889511.00 }, { "name": "Corporate", "revenue": 15490637.00 }], "revenue": 24380148.00 }, { "name": "FEB", "list": [{ "name": "Retail", "revenue": 12425123.00 }, { "name": "Corporate", "revenue": 41450657.00 }], "revenue": 53875780.00 }, { "name": "MAR", "list": [{ "name": "Retail", "revenue": 18787434.00 }, { "name": "Corporate", "revenue": 66066178.00 }], "revenue": 84853612.00 }, { "name": "APR", "list": [{ "name": "Retail", "revenue": 22593338.00 }, { "name": "Corporate", "revenue": 76435224.00 }], "revenue": 99028562.00 }, { "name": "MAY", "list": [{ "name": "Retail", "revenue": 30348302.00 }, { "name": "Corporate", "revenue": 90902357.00 }], "revenue": 121250659.00 }, { "name": "JUN", "list": [{ "name": "Retail", "revenue": 34869541.00 }, { "name": "Corporate", "revenue": 94293678.00 }], "revenue": 129163219.00 }, { "name": "JUL", "list": [{ "name": "Retail", "revenue": 35212433.00 }, { "name": "Corporate", "revenue": 109621641.00 }], "revenue": 144834074.00 }, { "name": "AUG", "list": [{ "name": "Retail", "revenue": 41422500.00 }, { "name": "Corporate", "revenue": 126315447.00 }], "revenue": 167737947.00 }, { "name": "SEP", "list": [{ "name": "Retail", "revenue": 41046700.00 }, { "name": "Corporate", "revenue": 129673265.00 }], "revenue": 170719965.00 }, { "name": "OCT", "list": [{ "name": "Retail", "revenue": 45779831.00 }, { "name": "Corporate", "revenue": 136168813.00 }], "revenue": 181948644.00 }, { "name": "NOV", "list": [{ "name": "Retail", "revenue": 44951736.00 }, { "name": "Corporate", "revenue": 155873960.00 }], "revenue": 200825696.00 }, { "name": "DEC", "list": [{ "name": "Retail", "revenue": 52462963.00 }, { "name": "Corporate", "revenue": 184371615.00 }], "revenue": 236834578.00 }]
// const inactiveTag = [{ "count": 47323, "name": "JAN", "list": [{ "count": 39725, "name": "Retail" }, { "count": 7598, "name": "Corporate" }], "rateOfChange": 0 }, { "count": 45858, "name": "FEB", "list": [{ "count": 39584, "name": "Retail" }, { "count": 6274, "name": "Corporate" }], "rateOfChange": -3.100 }, { "count": 17721, "name": "MAR", "list": [{ "count": 16132, "name": "Retail" }, { "count": 1589, "name": "Corporate" }], "rateOfChange": -61.400 }, { "count": 6840, "name": "APR", "list": [{ "count": 6551, "name": "Retail" }, { "count": 289, "name": "Corporate" }], "rateOfChange": -61.400 }, { "count": 7696, "name": "MAY", "list": [{ "count": 6677, "name": "Retail" }, { "count": 1019, "name": "Corporate" }], "rateOfChange": 12.500 }, { "count": 6542, "name": "JUN", "list": [{ "count": 5622, "name": "Retail" }, { "count": 920, "name": "Corporate" }], "rateOfChange": -15.000 }, { "count": 7245, "name": "JUL", "list": [{ "count": 5826, "name": "Retail" }, { "count": 1419, "name": "Corporate" }], "rateOfChange": 10.700 }, { "count": 10213, "name": "AUG", "list": [{ "count": 6631, "name": "Retail" }, { "count": 3582, "name": "Corporate" }], "rateOfChange": 41.000 }, { "count": 11098, "name": "SEP", "list": [{ "count": 6928, "name": "Retail" }, { "count": 4170, "name": "Corporate" }], "rateOfChange": 8.700 }, { "count": 14553, "name": "OCT", "list": [{ "count": 9649, "name": "Retail" }, { "count": 4904, "name": "Corporate" }], "rateOfChange": 31.100 }, { "count": 15095, "name": "NOV", "list": [{ "count": 11651, "name": "Retail" }, { "count": 3444, "name": "Corporate" }], "rateOfChange": 3.700 }, { "count": 22224, "name": "DEC", "list": [{ "count": 20050, "name": "Retail" }, { "count": 2174, "name": "Corporate" }], "rateOfChange": 47.200 }]
// const tagIssuMonthlyTrend = [{ "count": 16238, "name": "JAN", "list": [{ "count": 13117, "name": "Retail" }, { "count": 3121, "name": "Corporate" }], "rateOfChange": 0 }, { "count": 15441, "name": "FEB", "list": [{ "count": 12355, "name": "Retail" }, { "count": 3086, "name": "Corporate" }], "rateOfChange": -4.900 }, { "count": 17877, "name": "MAR", "list": [{ "count": 15801, "name": "Retail" }, { "count": 2076, "name": "Corporate" }], "rateOfChange": 15.800 }, { "count": 18550, "name": "APR", "list": [{ "count": 17586, "name": "Retail" }, { "count": 964, "name": "Corporate" }], "rateOfChange": 3.800 }, { "count": 21570, "name": "MAY", "list": [{ "count": 19214, "name": "Retail" }, { "count": 2356, "name": "Corporate" }], "rateOfChange": 16.300 }, { "count": 20315, "name": "JUN", "list": [{ "count": 17911, "name": "Retail" }, { "count": 2404, "name": "Corporate" }], "rateOfChange": -5.800 }, { "count": 19316, "name": "JUL", "list": [{ "count": 16381, "name": "Retail" }, { "count": 2935, "name": "Corporate" }], "rateOfChange": -4.900 }, { "count": 21165, "name": "AUG", "list": [{ "count": 16610, "name": "Retail" }, { "count": 4555, "name": "Corporate" }], "rateOfChange": 9.600 }, { "count": 19439, "name": "SEP", "list": [{ "count": 15074, "name": "Retail" }, { "count": 4365, "name": "Corporate" }], "rateOfChange": -8.200 }, { "count": 24899, "name": "OCT", "list": [{ "count": 19606, "name": "Retail" }, { "count": 5293, "name": "Corporate" }], "rateOfChange": 28.100 }, { "count": 25260, "name": "NOV", "list": [{ "count": 21184, "name": "Retail" }, { "count": 4076, "name": "Corporate" }], "rateOfChange": 1.400 }, { "count": 24761, "name": "DEC", "list": [{ "count": 22367, "name": "Retail" }, { "count": 2394, "name": "Corporate" }], "rateOfChange": -2.000 }]
var ttttt = [{ "count": 8024, "name": "JAN", "list": [{ "count": 6782, "name": "Retail", "percentage": 25.95 }, { "count": 1242, "name": "Corporate", "percentage": 14.27 }] }, { "count": 10885, "name": "FEB", "list": [{ "count": 8274, "name": "Retail", "percentage": 21.53 }, { "count": 2611, "name": "Corporate", "percentage": 22.59 }] }, { "count": 16547, "name": "MAR", "list": [{ "count": 12578, "name": "Retail", "percentage": 23.27 }, { "count": 3969, "name": "Corporate", "percentage": 30.29 }] }, { "count": 22628, "name": "APR", "list": [{ "count": 18206, "name": "Retail", "percentage": 25.4 }, { "count": 4422, "name": "Corporate", "percentage": 31.6 }] }, { "count": 28235, "name": "MAY", "list": [{ "count": 22901, "name": "Retail", "percentage": 25.19 }, { "count": 5334, "name": "Corporate", "percentage": 32.45 }] }, { "count": 33523, "name": "JUN", "list": [{ "count": 27388, "name": "Retail", "percentage": 25.18 }, { "count": 6135, "name": "Corporate", "percentage": 33.04 }] }, { "count": 37075, "name": "JUL", "list": [{ "count": 29592, "name": "Retail", "percentage": 23.74 }, { "count": 7483, "name": "Corporate", "percentage": 35.85 }] }, { "count": 40438, "name": "AUG", "list": [{ "count": 32378, "name": "Retail", "percentage": 22.82 }, { "count": 8060, "name": "Corporate", "percentage": 31.54 }] }, { "count": 42491, "name": "SEP", "list": [{ "count": 33604, "name": "Retail", "percentage": 21.44 }, { "count": 8887, "name": "Corporate", "percentage": 31.44 }] }, { "count": 47410, "name": "OCT", "list": [{ "count": 36907, "name": "Retail", "percentage": 20.91 }, { "count": 10503, "name": "Corporate", "percentage": 29.59 }] }, { "count": 54490, "name": "NOV", "list": [{ "count": 42831, "name": "Retail", "percentage": 21.66 }, { "count": 11659, "name": "Corporate", "percentage": 29.88 }] }, { "count": 57663, "name": "DEC", "list": [{ "count": 44826, "name": "Retail", "percentage": 20.37 }, { "count": 12837, "name": "Corporate", "percentage": 30.54 }] }];
var monthEndWalletBalance = [{ "name": "JAN", "list": [{ "name": "Retail", "recharge": 6357824.52 }, { "name": "Corporate", "recharge": 1487105.05 }], "recharge": 7844929.57 }, { "name": "FEB", "list": [{ "name": "Retail", "recharge": 8976004.43 }, { "name": "Corporate", "recharge": 3281796.41 }], "recharge": 12257800.84 }, { "name": "MAR", "list": [{ "name": "Retail", "recharge": 12398255.19 }, { "name": "Corporate", "recharge": 4251444.67 }], "recharge": 16649699.86 }, { "name": "APR", "list": [{ "name": "Retail", "recharge": 15458692.02 }, { "name": "Corporate", "recharge": 5262931.14 }], "recharge": 20721623.16 }, { "name": "MAY", "list": [{ "name": "Retail", "recharge": 20801034.63 }, { "name": "Corporate", "recharge": 6000915.28 }], "recharge": 26801949.91 }, { "name": "JUN", "list": [{ "name": "Retail", "recharge": 24328758.58 }, { "name": "Corporate", "recharge": 8235633.96 }], "recharge": 32564392.54 }, { "name": "JUL", "list": [{ "name": "Retail", "recharge": 27484650.90 }, { "name": "Corporate", "recharge": 8839108.49 }], "recharge": 36323759.39 }, { "name": "AUG", "list": [{ "name": "Retail", "recharge": 29900033.87 }, { "name": "Corporate", "recharge": 9955382.39 }], "recharge": 39855416.26 }, { "name": "SEP", "list": [{ "name": "Retail", "recharge": 32586002.36 }, { "name": "Corporate", "recharge": 9696629.81 }], "recharge": 42282632.17 }, { "name": "OCT", "list": [{ "name": "Retail", "recharge": 38594772.36 }, { "name": "Corporate", "recharge": 12404017.93 }], "recharge": 50998790.29 }, { "name": "NOV", "list": [{ "name": "Retail", "recharge": 42645707.81 }, { "name": "Corporate", "recharge": 13126908.05 }], "recharge": 55772615.86 }, { "name": "DEC", "list": [{ "name": "Retail", "recharge": 48832488.93 }, { "name": "Corporate", "recharge": 15671403.07 }], "recharge": 64503892.00 }];
var active90 = [{ "count": 27527, "name": "JAN", "list": [{ "count": 23064, "name": "Retail", "percentage": 35.501213 }, { "count": 4463, "name": "Corporate", "percentage": 27.851221 }] }, { "count": 40025, "name": "FEB", "list": [{ "count": 33214, "name": "Retail", "percentage": 34.56675 }, { "count": 6811, "name": "Corporate", "percentage": 41.917484 }] }, { "count": 48550, "name": "MAR", "list": [{ "count": 41003, "name": "Retail", "percentage": 35.36083 }, { "count": 7547, "name": "Corporate", "percentage": 69.81582 }] }, { "count": 50829, "name": "APR", "list": [{ "count": 45537, "name": "Retail", "percentage": 42.148144 }, { "count": 5292, "name": "Corporate", "percentage": 71.12623 }] }, { "count": 57360, "name": "MAY", "list": [{ "count": 52484, "name": "Retail", "percentage": 53.145718 }, { "count": 4876, "name": "Corporate", "percentage": 51.086956 }] }, { "count": 60171, "name": "JUN", "list": [{ "count": 54708, "name": "Retail", "percentage": 58.82869 }, { "count": 5463, "name": "Corporate", "percentage": 56.85521 }] }, { "count": 59868, "name": "JUL", "list": [{ "count": 52991, "name": "Retail", "percentage": 65.26014 }, { "count": 6877, "name": "Corporate", "percentage": 68.44555 }] }, { "count": 60099, "name": "AUG", "list": [{ "count": 50976, "name": "Retail", "percentage": 63.669174 }, { "count": 9123, "name": "Corporate", "percentage": 54.98191 }] }, { "count": 57700, "name": "SEP", "list": [{ "count": 47999, "name": "Retail", "percentage": 57.557453 }, { "count": 9701, "name": "Corporate", "percentage": 45.34584 }] }, { "count": 66503, "name": "OCT", "list": [{ "count": 51877, "name": "Retail", "percentage": 50.480946 }, { "count": 14626, "name": "Corporate", "percentage": 30.705591 }] }, { "count": 69318, "name": "NOV", "list": [{ "count": 55849, "name": "Retail", "percentage": 48.811974 }, { "count": 13469, "name": "Corporate", "percentage": 46.88544 }] }, { "count": 77159, "name": "DEC", "list": [{ "count": 63388, "name": "Retail", "percentage": 51.722725 }, { "count": 13771, "name": "Corporate", "percentage": 59.923027 }] }];
var DashboardService = /** @class */ (function () {
    function DashboardService(api) {
        this.api = api;
        this.script = {
            name: 'GoogleCharts',
            src: 'https://www.gstatic.com/charts/loader.js'
        };
    }
    DashboardService.prototype.loadScript = function () {
        var _this = this;
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].create(function (observer) {
            if (document.getElementById(_this.script.name) == null) {
                var node = document.createElement('script');
                node.src = _this.script.src;
                node.type = 'text/javascript';
                node.async = false;
                node.charset = 'utf-8';
                node.id = _this.script.name;
                document.getElementsByTagName('head')[0].appendChild(node);
                node.onload = function () {
                    observer.complete();
                };
            }
            else {
                observer.complete();
            }
        });
    };
    DashboardService.prototype.getMinYear = function () {
        return this.api.get('api/dashboard/MinYear');
    };
    DashboardService.prototype.getLocations = function () {
        return this.api.get('api/metrics/locations');
    };
    DashboardService.prototype.getYearlyTrips = function () {
        return this.api.get('api/metrics/tripsYearly');
    };
    DashboardService.prototype.getTripsByYear = function (year) {
        return this.api.get('api/metrics/tripsMonthly?year=' + year + '&month=0');
    };
    DashboardService.prototype.getVehicleAvailablity = function (locCode) {
        return this.api.get('api/metrics/vehicleAvailability/' + locCode);
    };
    DashboardService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_custamHTTP__WEBPACK_IMPORTED_MODULE_3__["CustomHttpService"]])
    ], DashboardService);
    return DashboardService;
}());



/***/ })

}]);
//# sourceMappingURL=pages-main-main-module.js.map