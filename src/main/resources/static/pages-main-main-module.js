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

module.exports = "<div class=\"fixed-plugin\">\r\n    <div class=\"dropdown show-dropdown\">\r\n        <a href=\"#\" data-toggle=\"dropdown\">\r\n        <i class=\"fa fa-cog fa-2x\"> </i>\r\n        </a>\r\n        <ul class=\"dropdown-menu\">\r\n            <li class=\"header-title\">Sidebar Background</li>\r\n            <li class=\"adjustments-line text-center\">\r\n                <a href=\"javascript:void(0)\" class=\"switch-trigger background-color\">\r\n                        <span class=\"badge filter badge-white active\" data-color=\"white\"></span>\r\n                        <span class=\"badge filter badge-black\" data-color=\"black\"></span>\r\n                </a>\r\n            </li>\r\n\r\n\t\t\t<li class=\"header-title\">Sidebar Active Color</li>\r\n            <li class=\"adjustments-line text-center\">\r\n                <a href=\"javascript:void(0)\" class=\"switch-trigger active-color\">\r\n                        <span class=\"badge filter badge-primary\" data-color=\"primary\"></span>\r\n                        <span class=\"badge filter badge-info\" data-color=\"info\"></span>\r\n                        <span class=\"badge filter badge-success\" data-color=\"success\"></span>\r\n                        <span class=\"badge filter badge-warning\" data-color=\"warning\"></span>\r\n                        <span class=\"badge filter badge-danger active\" data-color=\"danger\"></span>\r\n                </a>\r\n            </li>\r\n\r\n        </ul>\r\n    </div>\r\n</div>\r\n"

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

module.exports = "<footer class=\"footer\">\r\n    <div class=\"container-fluid\">\r\n        <!-- <nav class=\"pull-left\">\r\n            <ul>\r\n\r\n                <li>\r\n                    <a>\r\n                        Nxtlife Technologies </a>\r\n                </li>\r\n                <li>\r\n                    <a>\r\n                        Blog\r\n                    </a>\r\n                </li>\r\n                <li>\r\n                    <a>\r\n                        Licenses\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n        </nav> -->\r\n        <div class=\"copyright pull-right\">\r\n            <!-- &copy; {{test | date: 'yyyy'}}, made with <i class=\"fa fa-heart heart\"></i> by <a>Nxtlife Technologies</a> -->\r\n        </div>\r\n    </div>\r\n</footer>"

/***/ }),

/***/ "./src/app/pages/components/shared/footer/footer.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/pages/components/shared/footer/footer.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".footer {\n  background: #454545; }\n  .footer nav ul li a {\n    color: white !important; }\n  .footer .copyright {\n    color: white; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvY29tcG9uZW50cy9zaGFyZWQvZm9vdGVyL0U6XFxHaXRodWIgcHJvamVjdHNcXE15X01TSUxcXG1zaWxcXHNyY1xcbWFpblxcYW5ndWxhci9zcmNcXGFwcFxccGFnZXNcXGNvbXBvbmVudHNcXHNoYXJlZFxcZm9vdGVyXFxmb290ZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxtQkFBbUIsRUFBQTtFQUR2QjtJQU9vQix1QkFBdUIsRUFBQTtFQVAzQztJQWNRLFlBQVksRUFBQSIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2NvbXBvbmVudHMvc2hhcmVkL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZm9vdGVyIHtcclxuICAgIGJhY2tncm91bmQ6ICM0NTQ1NDU7XHJcblxyXG4gICAgbmF2e1xyXG4gICAgICAgIHVse1xyXG4gICAgICAgICAgICBsaXtcclxuICAgICAgICAgICAgICAgIGEge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC5jb3B5cmlnaHR7XHJcbiAgICAgICAgY29sb3I6IHdoaXRlO1xyXG4gICAgfVxyXG59Il19 */"

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

module.exports = "<nav class=\"navbar navbar-default\">\r\n    <div class=\"container-fluid\">\r\n        <div class=\"navbar-header\">\r\n            <button type=\"button\" class=\"navbar-toggle\" (click)=\"sidebarToggle()\">\r\n                <span class=\"sr-only\">Toggle navigation</span>\r\n                <span class=\"icon-bar bar1\"></span>\r\n                <span class=\"icon-bar bar2\"></span>\r\n                <span class=\"icon-bar bar3\"></span>\r\n            </button>\r\n            <a class=\"navbar-brand\">{{getTitle()}}</a>\r\n        </div>\r\n        <div class=\"collapse navbar-collapse\">\r\n            <ul class=\"nav navbar-nav navbar-right\">\r\n                <!-- <li class=\"dropdown year-drop\">\r\n                    <a class=\"dropdown-toggle\" data-toggle=\"dropdown\">\r\n                        <p> Year {{selectedYear}} </p>\r\n                        <b class=\"caret\"></b>\r\n                    </a>\r\n                    <ul class=\"dropdown-menu\">\r\n                        <li *ngFor=\"let y of yearList\">\r\n                            <a (click)=\"yearChange(y)\">{{y}} </a>\r\n                        </li>\r\n                    </ul>\r\n                </li> -->\r\n                <li>\r\n                    <a>\r\n                        <i class=\"logout\">\r\n                            <img src=\"../assets/img/logout.png\" /> </i>\r\n                        <p (click)=\"logout()\">logout</p>\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n\r\n        </div>\r\n    </div>\r\n</nav>"

/***/ }),

/***/ "./src/app/pages/components/shared/navbar/navbar.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/pages/components/shared/navbar/navbar.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*      light colors - used for select dropdown         */\n.navbar-default {\n  background-image: -webkit-gradient(linear, left top, right top, color-stop(0, #008385), to(#27c6d9));\n  background-image: linear-gradient(to right, #008385 0, #27c6d9 100%);\n  background-image: -moz-gradient(linear, left top, right top, from(#008385), to(#27c6d9));\n  background-image: -o-linear-gradient(to right, #008385 0, #27c6d9 100%);\n  background-repeat: repeat-x; }\n.navbar-default .navbar-right li a {\n    color: white;\n    cursor: pointer; }\n.navbar-default .navbar-right li a:hover {\n      color: white; }\n.navbar-default .navbar-right li a:hover .caret {\n        border-bottom-color: #ffffff;\n        border-top-color: #ffffff; }\n.navbar-default .navbar-right li a i {\n      margin-right: 5px; }\n.navbar-default .navbar-right .year-drop .dropdown-menu {\n    background: #ffffff;\n    margin-top: 0;\n    min-width: inherit;\n    width: 130px;\n    border-radius: 0; }\n.navbar-default .navbar-right .year-drop .dropdown-menu li a {\n      color: #333; }\n.navbar-default .navbar-right .year-drop .dropdown-menu li a:hover {\n        color: white;\n        background-image: -webkit-gradient(linear, left top, right top, color-stop(0, #008385), to(#27c6d9));\n        background-image: linear-gradient(to right, #008385 0, #27c6d9 100%);\n        background-image: -moz-gradient(linear, left top, right top, from(#008385), to(#27c6d9));\n        background-image: -o-linear-gradient(to right, #008385 0, #27c6d9 100%);\n        background-repeat: repeat-x;\n        border-radius: 0; }\n.navbar-brand {\n  color: white; }\n.navbar-brand:hover {\n    color: white; }\n.logout img {\n  max-width: 25px;\n  margin-right: 5px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvY29tcG9uZW50cy9zaGFyZWQvbmF2YmFyL0U6XFxHaXRodWIgcHJvamVjdHNcXE15X01TSUxcXG1zaWxcXHNyY1xcbWFpblxcYW5ndWxhci9zcmNcXGFzc2V0c1xcc2Fzc1xccGFwZXJcXF92YXJpYWJsZXMuc2NzcyIsInNyYy9hcHAvcGFnZXMvY29tcG9uZW50cy9zaGFyZWQvbmF2YmFyL0U6XFxHaXRodWIgcHJvamVjdHNcXE15X01TSUxcXG1zaWxcXHNyY1xcbWFpblxcYW5ndWxhci9zcmNcXGFwcFxccGFnZXNcXGNvbXBvbmVudHNcXHNoYXJlZFxcbmF2YmFyXFxuYXZiYXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0VBLHlEQUFBO0FDOURFO0VBQ0ksb0dBQWlFO0VBQWpFLG9FQUFpRTtFQUlqRSx3RkFBb0Y7RUFDcEYsdUVBQXFFO0VBQ3JFLDJCQUEyQixFQUFBO0FBUC9CO0lBY1UsWUFBWTtJQUNaLGVBQWUsRUFBQTtBQWZ6QjtNQWlCWSxZQUFZLEVBQUE7QUFqQnhCO1FBbUJjLDRCQUE0QjtRQUM1Qix5QkFBeUIsRUFBQTtBQXBCdkM7TUF3QlksaUJBQWlCLEVBQUE7QUF4QjdCO0lBZ0NZLG1CQUFtQjtJQUNuQixhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWixnQkFBZ0IsRUFBQTtBQXBDNUI7TUF5Q2MsV0FBVyxFQUFBO0FBekN6QjtRQTRDZ0IsWUFBWTtRQUNaLG9HQUFrRTtRQUFsRSxvRUFBa0U7UUFJbEUsd0ZBQW9GO1FBQ3BGLHVFQUFxRTtRQUNyRSwyQkFBMkI7UUFDM0IsZ0JBQWdCLEVBQUE7QUFTbEM7RUFDRSxZQUFZLEVBQUE7QUFEZDtJQUlJLFlBQVksRUFBQTtBQUloQjtFQUVJLGVBQWU7RUFDZixpQkFBaUIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2NvbXBvbmVudHMvc2hhcmVkL25hdmJhci9uYXZiYXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIkZm9udC1jb2xvcjogICAgICAgICAgICAgICAgICM2NjYxNWIgIWRlZmF1bHQ7XHJcbiRmaWxsLWZvbnQtY29sb3I6ICAgICAgICAgICAgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpO1xyXG5cclxuJG5vbmU6ICAgICAgICAgICAgICAgICAgICAgICAwICAgIWRlZmF1bHQ7XHJcbiRib3JkZXItdGhpbjogICAgICAgICAgICAgICAgMXB4ICFkZWZhdWx0O1xyXG4kYm9yZGVyLXRoaWNrOiAgICAgICAgICAgICAgIDJweCAhZGVmYXVsdDtcclxuXHJcbiR3aGl0ZS1jb2xvcjogICAgICAgICAgICAgICAgI0ZGRkZGRiAhZGVmYXVsdDtcclxuJHdoaXRlLWJnOiAgICAgICAgICAgICAgICAgICAjRkZGRkZGICFkZWZhdWx0O1xyXG5cclxuJHNtb2tlLWJnOiAgICAgICAgICAgICAgICAgICAjRjVGNUY1ICFkZWZhdWx0O1xyXG4kcGFsZS1iZzogICAgICAgICAgICAgICAgICAgICNGRkZDRjUgIWRlZmF1bHQ7XHJcbiRtZWRpdW0tcGFsZS1iZzogICAgICAgICAgICAgI0YxRUFFMCAhZGVmYXVsdDtcclxuXHJcbiR0YWJsZS1saW5lLWNvbG9yOiAgICAgICAgICAgI0NDQzVCOSAhZGVmYXVsdDtcclxuJG11dGVkLWNvbG9yOiAgICAgICAgICAgICAgICAjYTQ5ZTkzICFkZWZhdWx0O1xyXG5cclxuJGJsYWNrLWJnOiAgICAgICAgICAgICAgICAgICByZ2JhKDMwLDMwLDMwLC45NykgIWRlZmF1bHQ7XHJcblxyXG4kYmxhY2stY29sb3I6ICAgICAgICAgICAgICAgICMzMzMzMzMgIWRlZmF1bHQ7XHJcbiRibGFjay1ocjogICAgICAgICAgICAgICAgICAgIzQ0NDQ0NCAhZGVmYXVsdDtcclxuXHJcbiR3aGl0ZS1iYWNrZ3JvdW5kLWNvbG9yOiAgICAgICAgI0ZGRkZGRiAhZGVmYXVsdDtcclxuJGJsYWNrLWJhY2tncm91bmQtY29sb3I6ICAgICAgICAjMjEyMTIwICFkZWZhdWx0O1xyXG5cclxuJGxpZ2h0LWdyYXk6ICAgICAgICAgICAgICAgICAjRTNFM0UzICFkZWZhdWx0O1xyXG4kbWVkaXVtLWdyYXk6ICAgICAgICAgICAgICAgICNEREREREQgIWRlZmF1bHQ7XHJcbiRkYXJrLWdyYXk6ICAgICAgICAgICAgICAgICAgIzlBOUE5QSAhZGVmYXVsdDtcclxuXHJcbiRncmF5LWlucHV0LWJnOiAgICAgICAgICAgICAgI2ZmZmNmNSAhZGVmYXVsdDtcclxuJGRhbmdlci1pbnB1dC1iZzogICAgICAgICAgICAjRkZDMEE0ICFkZWZhdWx0O1xyXG4kc3VjY2Vzcy1pbnB1dC1iZzogICAgICAgICAgICNBQkYzQ0IgIWRlZmF1bHQ7XHJcbiRvdGhlci1tZWRpdW0tZ3JheTogICAgICAgICAgI0E0OUU5MyAhZGVmYXVsdDtcclxuJHRyYW5zcGFyZW50LWJnOiAgICAgICAgICAgICB0cmFuc3BhcmVudCAhZGVmYXVsdDtcclxuXHJcbiRkZWZhdWx0LWNvbG9yOiAgICAgICAgICAgICAgIzY2NjE1QiAhZGVmYXVsdDtcclxuJGRlZmF1bHQtYmc6ICAgICAgICAgICAgICAgICAjNjY2MTVCICFkZWZhdWx0O1xyXG4kZGVmYXVsdC1zdGF0ZXMtY29sb3I6ICAgICAgICM0MDNEMzkgIWRlZmF1bHQ7XHJcblxyXG4kcHJpbWFyeS1jb2xvcjogICAgICAgICAgICAgICM3QTlFOUYgIWRlZmF1bHQ7XHJcbiRwcmltYXJ5LWJnOiAgICAgICAgICAgICAgICAgIzdBOUU5RiAhZGVmYXVsdDtcclxuJHByaW1hcnktc3RhdGVzLWNvbG9yOiAgICAgICAjNDI3Qzg5ICFkZWZhdWx0O1xyXG5cclxuJHN1Y2Nlc3MtY29sb3I6ICAgICAgICAgICAgICAjN0FDMjlBICFkZWZhdWx0O1xyXG4kc3VjY2Vzcy1iZzogICAgICAgICAgICAgICAgICM3QUMyOUEgIWRlZmF1bHQ7XHJcbiRzdWNjZXNzLXN0YXRlcy1jb2xvcjogICAgICAgIzQyQTA4NCAhZGVmYXVsdDtcclxuXHJcbiRpbmZvLWNvbG9yOiAgICAgICAgICAgICAgICAgIzY4QjNDOCAhZGVmYXVsdDtcclxuJGluZm8tYmc6ICAgICAgICAgICAgICAgICAgICAjNjhCM0M4ICFkZWZhdWx0O1xyXG4kaW5mby1zdGF0ZXMtY29sb3I6ICAgICAgICAgICMzMDkxQjIgIWRlZmF1bHQ7XHJcblxyXG4kd2FybmluZy1jb2xvcjogICAgICAgICAgICAgICNGM0JCNDUgIWRlZmF1bHQ7XHJcbiR3YXJuaW5nLWJnOiAgICAgICAgICAgICAgICAgI0YzQkI0NSAhZGVmYXVsdDtcclxuJHdhcm5pbmctc3RhdGVzLWNvbG9yOiAgICAgICAjQkI5OTJGICFkZWZhdWx0O1xyXG5cclxuXHJcbiRkYW5nZXItY29sb3I6ICAgICAgICAgICAgICAgI0REMDMzMCAhZGVmYXVsdDtcclxuJGRhbmdlci1iZzogICAgICAgICAgICAgICAgICAjREQwMzMwICFkZWZhdWx0O1xyXG4kZGFuZ2VyLXN0YXRlcy1jb2xvcjogICAgICAgICNiZjAzMmEgIWRlZmF1bHQ7XHJcblxyXG5cclxuJGxpbmstZGlzYWJsZWQtY29sb3I6ICAgICAgICAjNjY2NjY2ICFkZWZhdWx0O1xyXG5cclxuXHJcbi8qICAgICAgbGlnaHQgY29sb3JzIC0gdXNlZCBmb3Igc2VsZWN0IGRyb3Bkb3duICAgICAgICAgKi9cclxuXHJcbiRsaWdodC1ibHVlOiAgICAgICAgICAgICAgICAgcmdiYSgkcHJpbWFyeS1jb2xvciwgLjIpO1xyXG4kbGlnaHQtYXp1cmU6ICAgICAgICAgICAgICAgIHJnYmEoJGluZm8tY29sb3IsIC4yKTtcclxuJGxpZ2h0LWdyZWVuOiAgICAgICAgICAgICAgICByZ2JhKCRzdWNjZXNzLWNvbG9yLCAuMik7XHJcbiRsaWdodC1vcmFuZ2U6ICAgICAgICAgICAgICAgcmdiYSgkd2FybmluZy1jb2xvciwgLjIpO1xyXG4kbGlnaHQtcmVkOiAgICAgICAgICAgICAgICAgIHJnYmEoJGRhbmdlci1jb2xvciwgLjIpO1xyXG5cclxuXHJcbi8vPT0gQ29tcG9uZW50c1xyXG4vL1xyXG4kcGFkZGluZy1iYXNlLXZlcnRpY2FsOiAgICAgICAgIDdweCAhZGVmYXVsdDtcclxuJHBhZGRpbmctYmFzZS1ob3Jpem9udGFsOiAgICAgICAxOHB4ICFkZWZhdWx0O1xyXG5cclxuJHBhZGRpbmctcm91bmQtdmVydGljYWw6ICAgICAgICA5cHggIWRlZmF1bHQ7XHJcbiRwYWRkaW5nLXJvdW5kLWhvcml6b250YWw6ICAgICAxOHB4ICFkZWZhdWx0O1xyXG5cclxuJHBhZGRpbmctc2ltcGxlLXZlcnRpY2FsOiAgICAgIDEwcHggIWRlZmF1bHQ7XHJcbiRwYWRkaW5nLXNpbXBsZS1ob3Jpem9udGFsOiAgICAxOHB4ICFkZWZhdWx0O1xyXG5cclxuJHBhZGRpbmctbGFyZ2UtdmVydGljYWw6ICAgICAgIDExcHggIWRlZmF1bHQ7XHJcbiRwYWRkaW5nLWxhcmdlLWhvcml6b250YWw6ICAgICAzMHB4ICFkZWZhdWx0O1xyXG5cclxuJHBhZGRpbmctc21hbGwtdmVydGljYWw6ICAgICAgICA0cHggIWRlZmF1bHQ7XHJcbiRwYWRkaW5nLXNtYWxsLWhvcml6b250YWw6ICAgICAxMHB4ICFkZWZhdWx0O1xyXG5cclxuJHBhZGRpbmcteHMtdmVydGljYWw6ICAgICAgICAgICAycHggIWRlZmF1bHQ7XHJcbiRwYWRkaW5nLXhzLWhvcml6b250YWw6ICAgICAgICAgNXB4ICFkZWZhdWx0O1xyXG5cclxuJHBhZGRpbmctbGFiZWwtdmVydGljYWw6ICAgICAgICAycHggIWRlZmF1bHQ7XHJcbiRwYWRkaW5nLWxhYmVsLWhvcml6b250YWw6ICAgICAxMnB4ICFkZWZhdWx0O1xyXG5cclxuLy8gcGFkZGluZyBmb3IgbGlua3MgaW5zaWRlIGRyb3Bkb3duIG1lbnVcclxuJHBhZGRpbmctZHJvcGRvd24tdmVydGljYWw6ICAgICAxMHB4ICFkZWZhdWx0O1xyXG4kcGFkZGluZy1kcm9wZG93bi1ob3Jpem9udGFsOiAgIDE1cHggIWRlZmF1bHQ7XHJcblxyXG4kbWFyZ2luLWxhcmdlLXZlcnRpY2FsOiAgICAgICAgMzBweCAhZGVmYXVsdDtcclxuJG1hcmdpbi1iYXNlLXZlcnRpY2FsOiAgICAgICAgIDE1cHggIWRlZmF1bHQ7XHJcblxyXG4vLyBib3JkZXIgcmFkaXVzIGZvciBidXR0b25zXHJcbiRib3JkZXItcmFkaXVzLWJ0bi1zbWFsbDogICAgICAyNnB4ICFkZWZhdWx0O1xyXG4kYm9yZGVyLXJhZGl1cy1idG4tYmFzZTogICAgICAgMjBweCAhZGVmYXVsdDtcclxuJGJvcmRlci1yYWRpdXMtYnRuLWxhcmdlOiAgICAgIDUwcHggIWRlZmF1bHQ7XHJcblxyXG5cclxuLy8gQ3Jpc3RpbmE6IGFtIHNjaGltYmF0IGFpY2kgc2kgcy1hdSBtb2RpZmljYXQgaW5wdXR1cmlsZVxyXG4kbWFyZ2luLWJvdHRvbTogICAgICAgICAgICAgICAgMCAwIDEwcHggMCAhZGVmYXVsdDtcclxuJGJvcmRlci1yYWRpdXMtc21hbGw6ICAgICAgICAgICAzcHggIWRlZmF1bHQ7XHJcbiRib3JkZXItcmFkaXVzLWJhc2U6ICAgICAgICAgICAgNHB4ICFkZWZhdWx0O1xyXG4kYm9yZGVyLXJhZGl1cy1sYXJnZTogICAgICAgICAgIDZweCAhZGVmYXVsdDtcclxuJGJvcmRlci1yYWRpdXMtZXh0cmVtZTogICAgICAgIDZweCAhZGVmYXVsdDtcclxuXHJcbiRib3JkZXItcmFkaXVzLWxhcmdlLXRvcDogICAgICAkYm9yZGVyLXJhZGl1cy1sYXJnZSAkYm9yZGVyLXJhZGl1cy1sYXJnZSAwIDAgIWRlZmF1bHQ7XHJcbiRib3JkZXItcmFkaXVzLWxhcmdlLWJvdHRvbTogICAwIDAgJGJvcmRlci1yYWRpdXMtbGFyZ2UgJGJvcmRlci1yYWRpdXMtbGFyZ2UgIWRlZmF1bHQ7XHJcblxyXG4kYnRuLXJvdW5kLXJhZGl1czogICAgICAgICAgICAgMzBweCAhZGVmYXVsdDtcclxuXHJcbiRoZWlnaHQtYmFzZTogICAgICAgICAgICAgICAgICA0MHB4ICFkZWZhdWx0O1xyXG5cclxuJGZvbnQtc2l6ZS1iYXNlOiAgICAgICAgICAgICAgIDE0cHggIWRlZmF1bHQ7XHJcbiRmb250LXNpemUteHM6ICAgICAgICAgICAgICAgICAxMnB4ICFkZWZhdWx0O1xyXG4kZm9udC1zaXplLXNtYWxsOiAgICAgICAgICAgICAgMTJweCAhZGVmYXVsdDtcclxuJGZvbnQtc2l6ZS1tZWRpdW06ICAgICAgICAgICAgIDE2cHggIWRlZmF1bHQ7XHJcbiRmb250LXNpemUtbGFyZ2U6ICAgICAgICAgICAgICAxOHB4ICFkZWZhdWx0O1xyXG4kZm9udC1zaXplLWxhcmdlLW5hdmJhcjogICAgICAgMjBweCAhZGVmYXVsdDtcclxuXHJcbiRmb250LXNpemUtaDE6ICAgICAgICAgICAgICAgICAzLjJlbSAgICFkZWZhdWx0O1xyXG4kZm9udC1zaXplLWgyOiAgICAgICAgICAgICAgICAgMi42ZW0gICAgICFkZWZhdWx0O1xyXG4kZm9udC1zaXplLWgzOiAgICAgICAgICAgICAgICAgMS44MjVlbSAhZGVmYXVsdDtcclxuJGZvbnQtc2l6ZS1oNDogICAgICAgICAgICAgICAgIDEuNWVtICAgIWRlZmF1bHQ7XHJcbiRmb250LXNpemUtaDU6ICAgICAgICAgICAgICAgICAxLjI1ZW0gICFkZWZhdWx0O1xyXG4kZm9udC1zaXplLWg2OiAgICAgICAgICAgICAgICAgMC45ZW0gICAhZGVmYXVsdDtcclxuJGZvbnQtcGFyYWdyYXBoOiAgICAgICAgICAgICAgIDE2cHggICAgIWRlZmF1bHQ7XHJcbiRmb250LXNpemUtbmF2YmFyOiAgICAgICAgICAgICAxNnB4ICAgICFkZWZhdWx0O1xyXG4kZm9udC1zaXplLXNtYWxsOiAgICAgICAgICAgICAgMTJweCAgICAhZGVmYXVsdDtcclxuXHJcbiRmb250LXdlaWdodC1saWdodDogICAgICAgICAgMzAwICFkZWZhdWx0O1xyXG4kZm9udC13ZWlnaHQtbm9ybWFsOiAgICAgICAgIDQwMCAhZGVmYXVsdDtcclxuJGZvbnQtd2VpZ2h0LXNlbWk6ICAgICAgICAgICA1MDAgIWRlZmF1bHQ7XHJcbiRmb250LXdlaWdodC1ib2xkOiAgICAgICAgICAgNjAwICFkZWZhdWx0O1xyXG5cclxuJGxpbmUtaGVpZ2h0LXNtYWxsOiAgICAgICAgICAgIDIwcHggIWRlZmF1bHQ7XHJcbiRsaW5lLWhlaWdodC1nZW5lcmFsOiAgICAgICAgICAxLjRlbSAhZGVmYXVsdDtcclxuJGxpbmUtaGVpZ2h0OiAgICAgICAgICAgICAgICAgMzZweCAhZGVmYXVsdDtcclxuJGxpbmUtaGVpZ2h0LWxnOiAgICAgICAgICAgICAgNTRweCAhZGVmYXVsdDtcclxuXHJcblxyXG4kYm9yZGVyLXJhZGl1cy10b3A6ICAgICAgICAxMHB4IDEwcHggMCAwICFkZWZhdWx0O1xyXG4kYm9yZGVyLXJhZGl1cy1ib3R0b206ICAgICAwIDAgMTBweCAxMHB4ICFkZWZhdWx0O1xyXG5cclxuJGRyb3Bkb3duLXNoYWRvdzogICAgICAgICAgMCAycHggcmdiYSgxNywgMTYsIDE1LCAwLjEpLCAwIDJweCAxMHB4IHJnYmEoMTcsIDE2LCAxNSwgMC4xKTtcclxuXHJcbiRnZW5lcmFsLXRyYW5zaXRpb24tdGltZTogIDMwMG1zICFkZWZhdWx0O1xyXG5cclxuJHNsb3ctdHJhbnNpdGlvbi10aW1lOiAgICAgICAgICAgMzAwbXMgIWRlZmF1bHQ7XHJcbiRkcm9wZG93bi1jb29yZGluYXRlczogICAgICAyOXB4IC01MHB4ICFkZWZhdWx0O1xyXG5cclxuJGZhc3QtdHJhbnNpdGlvbi10aW1lOiAgICAgICAgICAgMTUwbXMgIWRlZmF1bHQ7XHJcbiRzZWxlY3QtY29vcmRpbmF0ZXM6ICAgICAgICAgNTAlIC00MHB4ICFkZWZhdWx0O1xyXG5cclxuJHRyYW5zaXRpb24tbGluZWFyOiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZWFyICFkZWZhdWx0O1xyXG4kdHJhbnNpdGlvbi1iZXppZXI6ICAgICAgICAgY3ViaWMtYmV6aWVyKDAuMzQsIDEuNjEsIDAuNywgMSkgIWRlZmF1bHQ7XHJcbiR0cmFuc2l0aW9uLWVhc2U6ICAgICAgICAgICBlYXNlIDBzO1xyXG5cclxuJG5hdmJhci1wYWRkaW5nLWE6ICAgICAgICAgICAgICAgMTBweCAxNXB4O1xyXG4kbmF2YmFyLW1hcmdpbi1hOiAgICAgICAgICAgICAgICAxNXB4ICAwcHg7XHJcblxyXG4kcGFkZGluZy1zb2NpYWwtYTogICAgICAgICAgICAgICAxMHB4ICA1cHg7XHJcblxyXG4kbmF2YmFyLW1hcmdpbi1hLWJ0bjogICAgICAgICAgICAxOHB4IDNweDtcclxuJG5hdmJhci1tYXJnaW4tYS1idG4tcm91bmQ6ICAgICAgMTlweCAzcHg7XHJcblxyXG5cclxuJG5hdmJhci1wYWRkaW5nLWJyYW5kOiAgICAgICAgICAgMjBweCAxNXB4O1xyXG4kbmF2YmFyLW1hcmdpbi1icmFuZDogICAgICAgICAgICAgNXB4ICAwcHg7XHJcblxyXG4kbmF2YmFyLW1hcmdpbi1icmFuZC1pY29uczogICAgICAxMnB4IGF1dG87XHJcblxyXG4kbmF2YmFyLW1hcmdpbi1idG46ICAgICAgICAgICAgICAxNXB4ICAzcHg7XHJcblxyXG4kaGVpZ2h0LWljb246XHRcdFx0XHRcdCA2NHB4ICFkZWZhdWx0O1xyXG4kd2lkdGgtaWNvbjpcdFx0XHRcdFx0IDY0cHggIWRlZmF1bHQ7XHJcbiRwYWRkaW5nLWljb246XHRcdFx0XHRcdCAxMnB4ICFkZWZhdWx0O1xyXG4kYm9yZGVyLXJhZGl1cy1pY29uOlx0XHQgICAgIDE1cHggIWRlZmF1bHQ7XHJcblxyXG5cclxuJHdoaXRlLW5hdmJhcjogICAgICAgICAgICAgIHJnYmEoI0ZGRkZGRiwgLjk2KTtcclxuJGJsdWUtbmF2YmFyOiAgICAgICAgICAgICAgIHJnYmEoIzM0QUNEQywgLjk4KTtcclxuJGF6dXJlLW5hdmJhcjogICAgICAgICAgICAgIHJnYmEoIzVCQ0FGRiwgLjk4KTtcclxuJGdyZWVuLW5hdmJhcjogICAgICAgICAgICAgIHJnYmEoIzRDRDk2NCwgLjk4KTtcclxuJG9yYW5nZS1uYXZiYXI6ICAgICAgICAgICAgIHJnYmEoI0ZGOTUwMCwgLjk4KTtcclxuJHJlZC1uYXZiYXI6ICAgICAgICAgICAgICAgIHJnYmEoI0ZGNEM0MCwgLjk4KTtcclxuXHJcbiRiZy1udWRlOiAgICAgICAgICAgICAgICNmNGYzZWYgIWRlZmF1bHQ7XHJcbiRiZy1wcmltYXJ5OiAgICAgICAgICAgICMxZTg4ZTUgIWRlZmF1bHQ7XHJcbiRiZy1pbmZvOiAgICAgICAgICAgICAgICM3Q0U0RkUgIWRlZmF1bHQ7XHJcbiRiZy1zdWNjZXNzOiAgICAgICAgICAgICM4RUYzQzUgIWRlZmF1bHQ7XHJcbiRiZy13YXJuaW5nOiAgICAgICAgICAgICNGRkUyOEMgIWRlZmF1bHQ7XHJcbiRiZy1kYW5nZXI6ICAgICAgICAgICAgICNGRjhGNUUgIWRlZmF1bHQ7XHJcblxyXG4kdG9wYmFyLXg6ICAgICAgICAgICAgIHRvcGJhci14ICFkZWZhdWx0O1xyXG4kdG9wYmFyLWJhY2s6ICAgICAgICAgIHRvcGJhci1iYWNrICFkZWZhdWx0O1xyXG4kYm90dG9tYmFyLXg6ICAgICAgICAgIGJvdHRvbWJhci14ICFkZWZhdWx0O1xyXG4kYm90dG9tYmFyLWJhY2s6ICAgICAgIGJvdHRvbWJhci1iYWNrICFkZWZhdWx0O1xyXG5cclxuJHRyYW5zaXRpb24tbGluZWFyOiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZWFyICFkZWZhdWx0O1xyXG4kdHJhbnNpdGlvbi1iZXppZXI6ICAgICAgICAgY3ViaWMtYmV6aWVyKDAuMzQsIDEuNjEsIDAuNywgMSkgIWRlZmF1bHQ7XHJcbiR0cmFuc2l0aW9uLWVhc2U6ICAgICAgICAgICBlYXNlIDBzO1xyXG4kdHJhbnNpdGlvbi1lYXNlLWluOiAgICAgICAgICAgICAgZWFzZS1pbiAhZGVmYXVsdDtcclxuJHRyYW5zaXRpb24tZWFzZS1vdXQ6ICAgICAgICAgICAgIGVhc2Utb3V0ICFkZWZhdWx0O1xyXG5cclxuJGdlbmVyYWwtdHJhbnNpdGlvbi10aW1lOiAgMzAwbXMgIWRlZmF1bHQ7XHJcblxyXG4kc2xvdy10cmFuc2l0aW9uLXRpbWU6ICAgICAgICAgICAzNzBtcyAhZGVmYXVsdDtcclxuJGRyb3Bkb3duLWNvb3JkaW5hdGVzOiAgICAgIDI5cHggLTUwcHggIWRlZmF1bHQ7XHJcblxyXG4kZmFzdC10cmFuc2l0aW9uLXRpbWU6ICAgICAgICAgICAxNTBtcyAhZGVmYXVsdDtcclxuXHJcbiR1bHRyYS1mYXN0LXRyYW5zaXRpb24tdGltZTogICAgIDEwMG1zICAhZGVmYXVsdDtcclxuXHJcbiRzZWxlY3QtY29vcmRpbmF0ZXM6ICAgICAgICAgNTAlIC00MHB4ICFkZWZhdWx0O1xyXG5cclxuJHBhZGRpbmctemVybzogICAgICAgICAgICAgICAgICAgMHB4ICFkZWZhdWx0O1xyXG5cclxuJHNpZGViYXItd2lkdGg6ICAgICAgICAgICAgICAgY2FsYygxMDAlIC0gMjYwcHgpICFkZWZhdWx0O1xyXG4kbWVkaXVtLWRhcmstZ3JheTogICAgICAgICAgICNBQUFBQUEgIWRlZmF1bHQ7XHJcblxyXG4vL3ZhcmlhYmxlcyB1c2VkIGluIGNhcmRzXHJcbiRjYXJkLWJsYWNrLWNvbG9yOiAgICAgICAgICAjMjUyNDIyICFkZWZhdWx0O1xyXG4kY2FyZC1tdXRlZC1jb2xvcjogICAgICAgICAgI2NjYzViOSAhZGVmYXVsdDtcclxuXHJcblxyXG4vL3ZhcmlhYmxlcyB1c2VkIGZvciBzaWRlYmFyXHJcbiRzaWRlYmFyLWJhY2tncm91bmQtZGFyay1ibHVlOiAjNTA2MzY3O1xyXG5cclxuJHNpZGViYXItYmFja2dyb3VuZC1ibHVlOiAgICAgICNiOGQ4ZDggIWRlZmF1bHQ7XHJcbiRzaWRlYmFyLWZvbnQtYmx1ZTogICAgICAgICAgICAjNTA2NTY4ICFkZWZhdWx0O1xyXG4kc2lkZWJhci1zdWJ0aXRsZS1ibHVlOiAgICAgICAgIzdhOWU5ZiAhZGVmYXVsdDtcclxuXHJcbiRzaWRlYmFyLWJhY2tncm91bmQtZ3JlZW46ICAgICAgI2Q1ZTVhMyAhZGVmYXVsdDtcclxuJHNpZGViYXItZm9udC1ncmVlbjogICAgICAgICAgICAjNjA3NzNkICFkZWZhdWx0O1xyXG4kc2lkZWJhci1zdWJ0aXRsZS1ncmVlbjogICAgICAgICM5MmFjNTYgIWRlZmF1bHQ7XHJcblxyXG4kc2lkZWJhci1iYWNrZ3JvdW5kLXllbGxvdzogICAgICAjZmZlMjhjICFkZWZhdWx0O1xyXG4kc2lkZWJhci1mb250LXllbGxvdzogICAgICAgICAgICAjYjI1ODI1ICFkZWZhdWx0O1xyXG4kc2lkZWJhci1zdWJ0aXRsZS15ZWxsb3c6ICAgICAgICAjZDg4NzE1ICFkZWZhdWx0O1xyXG5cclxuJHNpZGViYXItYmFja2dyb3VuZC1icm93bjogICAgICAjZDZjMWFiICFkZWZhdWx0O1xyXG4kc2lkZWJhci1mb250LWJyb3duOiAgICAgICAgICAgICM3NTQ0MmUgIWRlZmF1bHQ7XHJcbiRzaWRlYmFyLXN1YnRpdGxlLWJyb3duOiAgICAgICAgI2E0N2U2NSAhZGVmYXVsdDtcclxuXHJcbiRzaWRlYmFyLWJhY2tncm91bmQtcHVycGxlOiAgICAgICNiYWE5YmEgIWRlZmF1bHQ7XHJcbiRzaWRlYmFyLWZvbnQtcHVycGxlOiAgICAgICAgICAgICMzYTI4M2QgIWRlZmF1bHQ7XHJcbiRzaWRlYmFyLXN1YnRpdGxlLXB1cnBsZTogICAgICAgICM1YTI4M2QgIWRlZmF1bHQ7XHJcblxyXG4kc2lkZWJhci1iYWNrZ3JvdW5kLW9yYW5nZTogICAgICAjZmY4ZjVlICFkZWZhdWx0O1xyXG4kc2lkZWJhci1mb250LW9yYW5nZTogICAgICAgICAgICAjNzcyNTEwICFkZWZhdWx0O1xyXG4kc2lkZWJhci1zdWJ0aXRsZS1vcmFuZ2U6ICAgICAgICAjZTk1ZTM3ICFkZWZhdWx0O1xyXG4iLCJAaW1wb3J0ICdzcmMvYXNzZXRzL3Nhc3MvcGFwZXIvdmFyaWFibGVzLnNjc3MnO1xyXG5cclxuICAubmF2YmFyLWRlZmF1bHQge1xyXG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCh0byByaWdodCwjMDA4Mzg1IDAsIzI3YzZkOSAxMDAlKTtcclxuICAgICAgYmFja2dyb3VuZC1pbWFnZTotd2Via2l0LWdyYWRpZW50KGxpbmVhcixsZWZ0IHRvcCxyaWdodCB0b3AsZnJvbSgjMDA4Mzg1KSx0bygjMjdjNmQ5KSk7XHJcbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGxlZnQsIzAwODM4NSAwLCMyN2M2ZDkgMTAwJSk7XHJcbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC1tb3otbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCMwMDgzODUgMCwjMjdjNmQ5IDEwMCUpO1xyXG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtbW96LWdyYWRpZW50KGxpbmVhcixsZWZ0IHRvcCxyaWdodCB0b3AsZnJvbSgjMDA4Mzg1KSx0bygjMjdjNmQ5KSk7XHJcbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC1vLWxpbmVhci1ncmFkaWVudCh0byByaWdodCwjMDA4Mzg1IDAsIzI3YzZkOSAxMDAlKTtcclxuICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdC14O1xyXG5cclxuXHJcbiAgICAgIFxyXG4gICAgICAubmF2YmFyLXJpZ2h0e1xyXG4gICAgICAgIGxpe1xyXG4gICAgICAgICAgYXtcclxuICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xyXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgICAgICY6aG92ZXJ7XHJcbiAgICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xyXG4gICAgICAgICAgICAgIC5jYXJldHtcclxuICAgICAgICAgICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6ICNmZmZmZmY7XHJcbiAgICAgICAgICAgICAgICBib3JkZXItdG9wLWNvbG9yOiAjZmZmZmZmO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpe1xyXG4gICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogNXB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgfVxyXG4gICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLnllYXItZHJvcHtcclxuICAgICAgICAgIC5kcm9wZG93bi1tZW51IHtcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xyXG4gICAgICAgICAgICAgIG1hcmdpbi10b3A6IDA7XHJcbiAgICAgICAgICAgICAgbWluLXdpZHRoOiBpbmhlcml0O1xyXG4gICAgICAgICAgICAgIHdpZHRoOiAxMzBweDtcclxuICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGl7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgYXtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAjMzMzO1xyXG5cclxuICAgICAgICAgICAgICAgICY6aG92ZXJ7XHJcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCMwMDgzODUgMCwjMjdjNmQ5IDEwMCUpO1xyXG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOi13ZWJraXQtZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLHJpZ2h0IHRvcCxmcm9tKCMwMDgzODUpLHRvKCMyN2M2ZDkpKTtcclxuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQobGVmdCwjMDA4Mzg1IDAsIzI3YzZkOSAxMDAlKTtcclxuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLW1vei1saW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIzAwODM4NSAwLCMyN2M2ZDkgMTAwJSk7XHJcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC1tb3otZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLHJpZ2h0IHRvcCxmcm9tKCMwMDgzODUpLHRvKCMyN2M2ZDkpKTtcclxuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCMwMDgzODUgMCwjMjdjNmQ5IDEwMCUpO1xyXG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0LXg7XHJcbiAgICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgfVxyXG4gIH1cclxuLm5hdmJhci1icmFuZHtcclxuICBjb2xvcjogd2hpdGU7XHJcblxyXG4gICY6aG92ZXJ7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgfVxyXG59XHJcblxyXG4ubG9nb3V0IHtcclxuICBpbWcge1xyXG4gICAgbWF4LXdpZHRoOiAyNXB4O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7XHJcbiAgfVxyXG59Il19 */"

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
        this.yearList = ['2018', '2019', '2020', '2021'];
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
        this.yearChange(new Date().getFullYear().toString());
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
        this.year.emit(year);
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

module.exports = "<div class=\"sidebar-wrapper\">\r\n    <div class=\"logo\">\r\n        <a href=\"https://www.creative-tim.com\" class=\"simple-text\">\r\n            <div class=\"logo-img\">\r\n                <img src=\"../../assets/img/angular2-logo.png\" alt=\"\">\r\n            </div>\r\n            Efkon - Cch\r\n        </a>\r\n    </div>\r\n    <ul class=\"nav\">\r\n        <li *ngIf=\"isNotMobileMenu()\">\r\n            <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\r\n                <i class=\"ti-panel\"></i>\r\n                <p>Stats</p>\r\n            </a>\r\n        </li>\r\n        <li class=\"dropdown\" *ngIf=\"isNotMobileMenu()\">\r\n            <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\r\n                <i class=\"ti-bell\"></i>\r\n                <p class=\"notification\">5</p>\r\n                <p>Notifications</p>\r\n                <b class=\"caret\"></b>\r\n            </a>\r\n            <ul class=\"dropdown-menu\">\r\n                <li><a href=\"#\">Notification 1</a></li>\r\n                <li><a href=\"#\">Notification 2</a></li>\r\n                <li><a href=\"#\">Notification 3</a></li>\r\n                <li><a href=\"#\">Notification 4</a></li>\r\n                <li><a href=\"#\">Another notification</a></li>\r\n            </ul>\r\n        </li>\r\n        <li *ngIf=\"isNotMobileMenu()\">\r\n            <a href=\"#\">\r\n                <i class=\"ti-settings\"></i>\r\n                <p>Settings</p>\r\n            </a>\r\n        </li>\r\n        <li class=\"divider\" *ngIf=\"isNotMobileMenu()\"></li>\r\n        <li *ngFor=\"let menuItem of menuItems\" routerLinkActive=\"active\" class=\"{{menuItem.class}}\">\r\n            <a [routerLink]=\"[menuItem.path]\">\r\n                <i class=\"{{menuItem.icon}}\"></i>\r\n                <p>{{menuItem.title}}</p>\r\n            </a>\r\n        </li>\r\n    </ul>\r\n</div>"

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

module.exports = "<div class=\"container-fluid\">\r\n\r\n\r\n\r\n\r\n    <section>\r\n        <div class=\"row\">\r\n            <!-- Trips -->\r\n            <div class=\"col-md-6\">\r\n                <div class=\"card\">\r\n                    <div class=\"header tittle\">\r\n                        <h4 class=\"\">Trips</h4>\r\n                    </div>\r\n                    <div class=\"content\">\r\n                        <div id=\"tripChart\" class=\"ct-chart\">\r\n                            <img src=\"assets/img/loading.gif\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <!-- Monthly transactions -->\r\n            <div class=\"col-md-6\">\r\n                <div class=\"card\">\r\n                    <div class=\"header tittle\">\r\n                        <h4 class=\"\">Vehicle Availablity\r\n                            <select name=\"location\" id=\"\" [(ngModel)]=\"locationCode\" (ngModelChange)=\"getVehicleAvailability($event)\">\r\n                                <option [value]=\"loc.code\" *ngFor=\"let loc of locations;\">\r\n                                    {{loc.locName}}\r\n                                </option>\r\n                            </select>\r\n                        </h4>\r\n                    </div>\r\n                    <div class=\"content\" *ngIf=\"vehicleAvailablity.length\">\r\n                        <div class=\"ct-chart\">\r\n                            <div class=\"c2\" *ngIf=\"vehicleAvailablity.length\">\r\n                                <div class=\"text\">\r\n                                    <div>{{vehicleAvailablity[2].range}} </div>\r\n                                    <div>{{vehicleAvailablity[2].count}}</div>\r\n                                </div>\r\n                                <div class=\"c1\">\r\n                                    <div class=\"text\">\r\n                                        <div>{{vehicleAvailablity[1].range}} </div>\r\n                                        <div>{{vehicleAvailablity[1].count}}</div>\r\n                                    </div>\r\n                                    <div class=\"c0\">\r\n                                        <div class=\"text\">\r\n                                            <div>{{vehicleAvailablity[0].range}} </div>\r\n                                            <div>{{vehicleAvailablity[0].count}}</div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <img src=\"assets/img/loading.gif\" *ngIf=\"!vehicleAvailablity.length\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!-- Violations Chart -->\r\n            <div class=\"col-md-12\">\r\n                <div class=\"card\">\r\n                    <div class=\"header tittle\">\r\n                        <h4 class=\"\">Violations Chart\r\n                            <select class=\"pull-right\" name=\"customer\" id=\"\" [(ngModel)]=\"selectedCustomer\" (ngModelChange)=\"getViolationsByCustomer($event)\">\r\n                                <option [value]=\"transporter.custId\" *ngFor=\"let transporter of transporters\">{{transporter.custName}}</option>\r\n                            </select>\r\n                        </h4>\r\n                    </div>\r\n                    <div class=\"content\">\r\n                        <div id=\"violationChart\" class=\"ct-chart\">\r\n                            <img src=\"assets/img/loading.gif\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-md-12\">\r\n                <div class=\"card\">\r\n                    <div class=\"header tittle\">\r\n                        <h4 class=\"\">Fleet Utilization Chart\r\n                        </h4>\r\n                    </div>\r\n                    <div class=\"content\">\r\n                        <div class=\"form-group\">\r\n                            <label for=\"transporters\">Transporters: </label>\r\n                            <select name=\"customer\" id=\"\" [(ngModel)]=\"Transporter\" (ngModelChange)=\"getFleetUtilization(Month, Year, Transporter)\">\r\n                                <option [value]=\"transporter.custId\" *ngFor=\"let transporter of transporters\">{{transporter.custName}}</option>\r\n                            </select>\r\n                        </div>\r\n                        <div id=\"fleetUtilizationChart\" class=\"ct-chart\">\r\n                            <img src=\"assets/img/loading.gif\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </section>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/main/dashboard/dashboard.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/pages/main/dashboard/dashboard.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "img {\n  padding-left: 50%;\n  padding-top: 11%; }\n\n.card {\n  border-radius: 0; }\n\n.notfound {\n  text-align: center;\n  color: red !important;\n  vertical-align: middle;\n  font-size: 24px;\n  height: 245px; }\n\n.section {\n  margin: 10px 0px 20px 0;\n  background: white;\n  padding: 20px 0px;\n  border-radius: 6px; }\n\n.tittle {\n  padding: 10px;\n  color: #333;\n  border-bottom: solid 1px #ddd;\n  background: #fafafa; }\n\n.tittle h4 {\n    font-size: 20px;\n    margin: 0;\n    font-weight: 400;\n    text-transform: uppercase; }\n\n.chart-contant-main {\n  height: 100px; }\n\n.chart-contant-main .chart-contant-left {\n    text-align: right;\n    padding: 15px;\n    background: #28b6f6;\n    height: 100px;\n    position: relative; }\n\n.chart-contant-main .chart-contant-left .numbers {\n      font-size: 2em;\n      text-align: right;\n      position: absolute;\n      top: 33%;\n      right: 12px; }\n\n.chart-contant-main .chart-contant-left .numbers h6 {\n        font-weight: normal;\n        text-transform: uppercase;\n        color: white;\n        font-size: 15px; }\n\n.chart-contant-main .chart-contant-left p {\n      color: white;\n      font-weight: 900;\n      padding-top: 2px; }\n\n.chart-contant-main .chart-icon {\n    background: #6362bb;\n    height: 100px;\n    line-height: 100px; }\n\n.card-box {\n  border-radius: 0;\n  box-shadow: 0 2px 2px rgba(204, 197, 185, 0.5);\n  background-color: #FFFFFF;\n  color: #252422;\n  margin-bottom: 20px;\n  position: relative;\n  padding: 15px;\n  min-height: 100px;\n  display: inline-block;\n  width: 100%; }\n\n.card-box .numbers {\n    display: inline-block;\n    width: auto;\n    float: right;\n    color: white; }\n\n.card-box .numbers h6 {\n      font-size: 16px; }\n\n.card-box .chart-icon {\n    display: inline-block;\n    width: auto;\n    color: white; }\n\n.card-box .chart-icon i {\n      color: white; }\n\n.card-box .chart-icon i::before {\n        font-size: 50px; }\n\n.card-box .chart-icon img {\n      max-width: 60px;\n      padding: 0;\n      margin-top: 5px; }\n\n/*-----if-only-one-box----*/\n\n.card-box.taggs_issue {\n  background-image: -webkit-gradient(linear, left top, right top, color-stop(0, #008385), to(#27c6d9));\n  background-image: linear-gradient(to right, #008385 0, #27c6d9 100%);\n  background-image: -moz-gradient(linear, left top, right top, from(#008385), to(#27c6d9));\n  background-image: -o-linear-gradient(to right, #008385 0, #27c6d9 100%);\n  background-repeat: repeat-x; }\n\n.card-box.taggs_issue .chart-icon i {\n    color: white; }\n\n.card-box.taggs_issue .numbers {\n    color: white; }\n\n.card-box.new-tags {\n  background-image: -webkit-gradient(linear, left top, right top, color-stop(0, #ff425c), to(#eb7c8b));\n  background-image: linear-gradient(to right, #ff425c 0, #eb7c8b 100%);\n  background-image: -moz-gradient(linear, left top, right top, from(#ff425c), to(#eb7c8b));\n  background-image: -o-linear-gradient(to right, #ff425c 0, #eb7c8b 100%);\n  background-repeat: repeat-x; }\n\n.card-box.total-recharge {\n  background: -webkit-gradient(linear, left top, right top, color-stop(0, #ff864a), to(#db8d67));\n  background: linear-gradient(to right, #ff864a 0, #db8d67 100%);\n  background-image: -moz-gradient(linear, left top, right top, from(#ff864a), to(#db8d67));\n  background-image: -o-linear-gradient(to right, #ff864a 0, #db8d67 100%);\n  background-repeat: repeat-x; }\n\n.card-box.total-revenue {\n  background: -webkit-gradient(linear, left top, right top, color-stop(0, #13a579), to(#29cd9b));\n  background: linear-gradient(to right, #13a579 0, #29cd9b 100%);\n  background-image: -moz-gradient(linear, left top, right top, from(#13a579), to(#29cd9b));\n  background-image: -o-linear-gradient(to right, #13a579 0, #29cd9b 100%);\n  background-repeat: repeat-x; }\n\n.ct-chart {\n  margin: 30px 0 30px;\n  height: 315px; }\n\n.ct-chart .text {\n    position: absolute;\n    top: 10px;\n    width: 100%;\n    text-align: center; }\n\n.ct-chart .c2 {\n    background: green;\n    color: white;\n    height: 330px;\n    width: 330px;\n    border-radius: 50%;\n    text-align: center;\n    margin: auto;\n    position: relative;\n    vertical-align: middle; }\n\n.ct-chart .c2 .c1 {\n      background: yellow;\n      color: black;\n      height: 210px;\n      width: 210px;\n      border-radius: 50%;\n      margin: auto;\n      vertical-align: middle;\n      position: relative;\n      top: 50%;\n      -webkit-transform: translateY(-50%);\n              transform: translateY(-50%); }\n\n.ct-chart .c2 .c1 .c0 {\n        background: red;\n        color: white;\n        height: 100px;\n        width: 100px;\n        border-radius: 50%;\n        margin: auto;\n        vertical-align: middle;\n        position: relative;\n        top: 50%;\n        -webkit-transform: translateY(-50%);\n                transform: translateY(-50%); }\n\n.ct-chart .c2 .c1 .c0 .text {\n          top: 50%;\n          -webkit-transform: translateY(-50%);\n                  transform: translateY(-50%); }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvbWFpbi9kYXNoYm9hcmQvRTpcXEdpdGh1YiBwcm9qZWN0c1xcTXlfTVNJTFxcbXNpbFxcc3JjXFxtYWluXFxhbmd1bGFyL3NyY1xcYXBwXFxwYWdlc1xcbWFpblxcZGFzaGJvYXJkXFxkYXNoYm9hcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0E7RUFDQSxpQkFBaUI7RUFDYixnQkFBZ0IsRUFBQTs7QUFHcEI7RUFDSSxnQkFBZ0IsRUFBQTs7QUFFcEI7RUFDRyxrQkFBa0I7RUFDbEIscUJBQXFCO0VBQ3JCLHNCQUFzQjtFQUN0QixlQUFlO0VBQ2YsYUFBYSxFQUFBOztBQUVoQjtFQUNJLHVCQUF1QjtFQUN2QixpQkFBaUI7RUFDakIsaUJBQWlCO0VBQ2pCLGtCQUFrQixFQUFBOztBQUV0QjtFQUNJLGFBQWE7RUFDYixXQUFXO0VBQ1gsNkJBQTZCO0VBQzdCLG1CQUFtQixFQUFBOztBQUp2QjtJQU9RLGVBQWU7SUFDZixTQUFTO0lBQ1QsZ0JBQWdCO0lBQ2hCLHlCQUF5QixFQUFBOztBQUlqQztFQUNJLGFBQWEsRUFBQTs7QUFEakI7SUFJUSxpQkFBaUI7SUFDakIsYUFBYTtJQUNiLG1CQUFtQjtJQUNuQixhQUFhO0lBQ2Isa0JBQWtCLEVBQUE7O0FBUjFCO01BV1ksY0FBYztNQUNkLGlCQUFpQjtNQUNqQixrQkFBa0I7TUFDbEIsUUFBUTtNQUNSLFdBQVcsRUFBQTs7QUFmdkI7UUFpQlksbUJBQW1CO1FBQ3ZCLHlCQUF5QjtRQUN6QixZQUFZO1FBQ1osZUFBZSxFQUFBOztBQXBCdkI7TUF5QlksWUFBWTtNQUNaLGdCQUFnQjtNQUNoQixnQkFBZ0IsRUFBQTs7QUEzQjVCO0lBbUNRLG1CQUFtQjtJQUNuQixhQUFhO0lBQ2Isa0JBQWtCLEVBQUE7O0FBSzFCO0VBQ0ksZ0JBQWdCO0VBQ2hCLDhDQUE4QztFQUM5Qyx5QkFBeUI7RUFDekIsY0FBYztFQUNkLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLGlCQUFpQjtFQUNqQixxQkFBcUI7RUFDckIsV0FBVyxFQUFBOztBQVZmO0lBYVEscUJBQXFCO0lBQ3JCLFdBQVc7SUFDWCxZQUFZO0lBQ1osWUFBWSxFQUFBOztBQWhCcEI7TUFtQlksZUFBZSxFQUFBOztBQW5CM0I7SUF1QlEscUJBQXFCO0lBQ3JCLFdBQVc7SUFDWCxZQUFZLEVBQUE7O0FBekJwQjtNQTRCWSxZQUFZLEVBQUE7O0FBNUJ4QjtRQStCZ0IsZUFBZSxFQUFBOztBQS9CL0I7TUFtQ1ksZUFBZTtNQUNmLFVBQVU7TUFDVixlQUFlLEVBQUE7O0FBaUIzQiwyQkFBQTs7QUFFQTtFQUVRLG9HQUFrRTtFQUFsRSxvRUFBa0U7RUFJbEUsd0ZBQW9GO0VBQ3BGLHVFQUFxRTtFQUNyRSwyQkFBMkIsRUFBQTs7QUFSbkM7SUFZZ0IsWUFBWSxFQUFBOztBQVo1QjtJQWdCWSxZQUFZLEVBQUE7O0FBS3hCO0VBRVEsb0dBQWtFO0VBQWxFLG9FQUFrRTtFQUlsRSx3RkFBb0Y7RUFDcEYsdUVBQXFFO0VBQ3JFLDJCQUEyQixFQUFBOztBQVJuQztFQVlRLDhGQUE0RDtFQUE1RCw4REFBNEQ7RUFJNUQsd0ZBQW9GO0VBQ3BGLHVFQUFxRTtFQUNyRSwyQkFBMkIsRUFBQTs7QUFsQm5DO0VBcUJRLDhGQUE0RDtFQUE1RCw4REFBNEQ7RUFJNUQsd0ZBQW9GO0VBQ3BGLHVFQUFxRTtFQUNyRSwyQkFBMkIsRUFBQTs7QUFNbkM7RUFDSSxtQkFBbUI7RUFDbkIsYUFBYSxFQUFBOztBQUZqQjtJQUtRLGtCQUFrQjtJQUNsQixTQUFTO0lBQ1QsV0FBVztJQUNYLGtCQUFrQixFQUFBOztBQVIxQjtJQVlRLGlCQUFpQjtJQUNqQixZQUFZO0lBQ1osYUFBYTtJQUNiLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsc0JBQXNCLEVBQUE7O0FBcEI5QjtNQXVCWSxrQkFBa0I7TUFDbEIsWUFBWTtNQUNaLGFBQWE7TUFDYixZQUFZO01BQ1osa0JBQWtCO01BQ2xCLFlBQVk7TUFDWixzQkFBc0I7TUFDdEIsa0JBQWtCO01BQ2xCLFFBQVE7TUFDUixtQ0FBMkI7Y0FBM0IsMkJBQTJCLEVBQUE7O0FBaEN2QztRQWtDZ0IsZUFBZTtRQUNmLFlBQVk7UUFDWixhQUFhO1FBQ2IsWUFBWTtRQUNaLGtCQUFrQjtRQUNsQixZQUFZO1FBQ1osc0JBQXNCO1FBQ3RCLGtCQUFrQjtRQUNsQixRQUFRO1FBQ1IsbUNBQTJCO2dCQUEzQiwyQkFBMkIsRUFBQTs7QUEzQzNDO1VBOENvQixRQUFRO1VBQ1IsbUNBQTJCO2tCQUEzQiwyQkFBMkIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL21haW4vZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiAgICAvLyBDYXBhY2l0eSA6ICNGM0JCNDVcclxuLy8gUmV2ZW51ZSAgOiAjN0FDMjlBXHJcbi8vIGVycm9yICAgIDogI0REMDMzMFxyXG4vLyB0d2V0dGVyICA6ICM2OEIzQzhcclxuXHJcbmltZyB7XHJcbnBhZGRpbmctbGVmdDogNTAlO1xyXG4gICAgcGFkZGluZy10b3A6IDExJTtcclxuXHJcbn1cclxuLmNhcmR7XHJcbiAgICBib3JkZXItcmFkaXVzOiAwO1xyXG59XHJcbi5ub3Rmb3VuZCB7XHJcbiAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgY29sb3I6IHJlZCAhaW1wb3J0YW50O1xyXG4gICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyBcclxuICAgZm9udC1zaXplOiAyNHB4O1xyXG4gICBoZWlnaHQ6IDI0NXB4O1xyXG59XHJcbi5zZWN0aW9uIHtcclxuICAgIG1hcmdpbjogMTBweCAwcHggMjBweCAwO1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICBwYWRkaW5nOiAyMHB4IDBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcclxufVxyXG4udGl0dGxlIHtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBjb2xvcjogIzMzMztcclxuICAgIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCAjZGRkO1xyXG4gICAgYmFja2dyb3VuZDogI2ZhZmFmYTtcclxuXHJcbiAgICBoNHtcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICAgIH1cclxufVxyXG5cclxuLmNoYXJ0LWNvbnRhbnQtbWFpbntcclxuICAgIGhlaWdodDogMTAwcHg7XHJcblxyXG4gICAgLmNoYXJ0LWNvbnRhbnQtbGVmdCB7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgICAgICAgcGFkZGluZzogMTVweDtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAjMjhiNmY2O1xyXG4gICAgICAgIGhlaWdodDogMTAwcHg7XHJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgXHJcbiAgICAgICAgLm51bWJlcnN7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMmVtO1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcclxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgICAgICB0b3A6IDMzJTtcclxuICAgICAgICAgICAgcmlnaHQ6IDEycHg7XHJcbiAgICAgICAgaDZ7XHJcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICAgICAgICBjb2xvcjogd2hpdGU7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNXB4O1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAgICAgcCB7XHJcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDkwMDtcclxuICAgICAgICAgICAgcGFkZGluZy10b3A6IDJweDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcblxyXG5cclxuICAgIC5jaGFydC1pY29uIHtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAjNjM2MmJiO1xyXG4gICAgICAgIGhlaWdodDogMTAwcHg7XHJcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEwMHB4O1xyXG59XHJcblxyXG59XHJcblxyXG4uY2FyZC1ib3h7XHJcbiAgICBib3JkZXItcmFkaXVzOiAwO1xyXG4gICAgYm94LXNoYWRvdzogMCAycHggMnB4IHJnYmEoMjA0LCAxOTcsIDE4NSwgMC41KTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7XHJcbiAgICBjb2xvcjogIzI1MjQyMjtcclxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBwYWRkaW5nOiAxNXB4O1xyXG4gICAgbWluLWhlaWdodDogMTAwcHg7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuXHJcbiAgICAubnVtYmVycyB7XHJcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgIHdpZHRoOiBhdXRvO1xyXG4gICAgICAgIGZsb2F0OiByaWdodDtcclxuICAgICAgICBjb2xvcjogd2hpdGU7XHJcblxyXG4gICAgICAgIGg2IHtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC5jaGFydC1pY29uIHtcclxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgd2lkdGg6IGF1dG87XHJcbiAgICAgICAgY29sb3I6IHdoaXRlO1xyXG4gICAgICAgIGkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xyXG5cclxuICAgICAgICAgICAgJjo6YmVmb3Jle1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiA1MHB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGltZyB7XHJcbiAgICAgICAgICAgIG1heC13aWR0aDogNjBweDtcclxuICAgICAgICAgICAgcGFkZGluZzogMDtcclxuICAgICAgICAgICAgbWFyZ2luLXRvcDogNXB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICAvLyBpbWcge1xyXG4gICAgLy8gICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgLy8gICAgIGhlaWdodDogYXV0bztcclxuICAgIC8vICAgICBwYWRkaW5nOiAwO1xyXG4gICAgLy8gICAgIG9wYWNpdHk6IDAuMztcclxuICAgIC8vICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAvLyAgICAgbGVmdDogMDtcclxuICAgIC8vICAgICBib3R0b206IDA7XHJcbiAgICAvLyAgICAgZGlzcGxheTogbm9uZTtcclxuICAgIC8vIH1cclxufVxyXG5cclxuXHJcbi8qLS0tLS1pZi1vbmx5LW9uZS1ib3gtLS0tKi9cclxuXHJcbi5jYXJkLWJveHtcclxuICAgICYudGFnZ3NfaXNzdWV7XHJcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCMwMDgzODUgMCwjMjdjNmQ5IDEwMCUpO1xyXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6LXdlYmtpdC1ncmFkaWVudChsaW5lYXIsbGVmdCB0b3AscmlnaHQgdG9wLGZyb20oIzAwODM4NSksdG8oIzI3YzZkOSkpO1xyXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGxlZnQsIzAwODM4NSAwLCMyN2M2ZDkgMTAwJSk7XHJcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLW1vei1saW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIzAwODM4NSAwLCMyN2M2ZDkgMTAwJSk7XHJcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLW1vei1ncmFkaWVudChsaW5lYXIsbGVmdCB0b3AscmlnaHQgdG9wLGZyb20oIzAwODM4NSksdG8oIzI3YzZkOSkpO1xyXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC1vLWxpbmVhci1ncmFkaWVudCh0byByaWdodCwjMDA4Mzg1IDAsIzI3YzZkOSAxMDAlKTtcclxuICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0LXg7XHJcbiAgXHJcbiAgICAgICAgLmNoYXJ0LWljb257XHJcbiAgICAgICAgICAgIGl7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogd2hpdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLm51bWJlcnMge1xyXG4gICAgICAgICAgICBjb2xvcjogd2hpdGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4uY2FyZC1ib3h7XHJcbiAgICAmLm5ldy10YWdze1xyXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwjZmY0MjVjIDAsI2ViN2M4YiAxMDAlKTtcclxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOi13ZWJraXQtZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLHJpZ2h0IHRvcCxmcm9tKCNmZjQyNWMpLHRvKCNlYjdjOGIpKTtcclxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChsZWZ0LCNmZjQyNWMgMCwjZWI3YzhiIDEwMCUpO1xyXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC1tb3otbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCNmZjQyNWMgMCwjZWI3YzhiIDEwMCUpO1xyXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC1tb3otZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLHJpZ2h0IHRvcCxmcm9tKCNmZjQyNWMpLHRvKCNlYjdjOGIpKTtcclxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtby1saW5lYXItZ3JhZGllbnQodG8gcmlnaHQsI2ZmNDI1YyAwLCNlYjdjOGIgMTAwJSk7XHJcbiAgICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdC14O1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgJi50b3RhbC1yZWNoYXJnZXtcclxuICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsI2ZmODY0YSAwLCNkYjhkNjcgMTAwJSk7XHJcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTotd2Via2l0LWdyYWRpZW50KGxpbmVhcixsZWZ0IHRvcCxyaWdodCB0b3AsZnJvbSgjZmY4NjRhKSx0bygjZGI4ZDY3KSk7XHJcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQobGVmdCwjZmY4NjRhIDAsI2RiOGQ2NyAxMDAlKTtcclxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtbW96LWxpbmVhci1ncmFkaWVudCh0byByaWdodCwjZmY4NjRhIDAsI2RiOGQ2NyAxMDAlKTtcclxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtbW96LWdyYWRpZW50KGxpbmVhcixsZWZ0IHRvcCxyaWdodCB0b3AsZnJvbSgjZmY4NjRhKSx0bygjZGI4ZDY3KSk7XHJcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCNmZjg2NGEgMCwjZGI4ZDY3IDEwMCUpO1xyXG4gICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQteDtcclxuICAgIH1cclxuICAgICYudG90YWwtcmV2ZW51ZXtcclxuICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIzEzYTU3OSAwLCMyOWNkOWIgMTAwJSk7XHJcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTotd2Via2l0LWdyYWRpZW50KGxpbmVhcixsZWZ0IHRvcCxyaWdodCB0b3AsZnJvbSgjMTNhNTc5KSx0bygjMjljZDliKSk7XHJcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQobGVmdCwjMTNhNTc5IDAsIzI5Y2Q5YiAxMDAlKTtcclxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtbW96LWxpbmVhci1ncmFkaWVudCh0byByaWdodCwjMTNhNTc5IDAsIzI5Y2Q5YiAxMDAlKTtcclxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtbW96LWdyYWRpZW50KGxpbmVhcixsZWZ0IHRvcCxyaWdodCB0b3AsZnJvbSgjMTNhNTc5KSx0bygjMjljZDliKSk7XHJcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCMxM2E1NzkgMCwjMjljZDliIDEwMCUpO1xyXG4gICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQteDtcclxuICAgIH1cclxuICAgIFxyXG59XHJcblxyXG5cclxuLmN0LWNoYXJ0e1xyXG4gICAgbWFyZ2luOiAzMHB4IDAgMzBweDtcclxuICAgIGhlaWdodDogMzE1cHg7XHJcblxyXG4gICAgLnRleHQge1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICB0b3A6IDEwcHg7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC5jMntcclxuICAgICAgICBiYWNrZ3JvdW5kOiBncmVlbjtcclxuICAgICAgICBjb2xvcjogd2hpdGU7XHJcbiAgICAgICAgaGVpZ2h0OiAzMzBweDtcclxuICAgICAgICB3aWR0aDogMzMwcHg7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICBtYXJnaW46IGF1dG87XHJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcblxyXG4gICAgICAgIC5jMXtcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogeWVsbG93O1xyXG4gICAgICAgICAgICBjb2xvcjogYmxhY2s7XHJcbiAgICAgICAgICAgIGhlaWdodDogMjEwcHg7XHJcbiAgICAgICAgICAgIHdpZHRoOiAyMTBweDtcclxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgICAgICAgICBtYXJnaW46IGF1dG87XHJcbiAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgICAgICAgdG9wOiA1MCU7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICAgICAgICAgICAgLmMwe1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogcmVkO1xyXG4gICAgICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDBweDtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDBweDtcclxuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgICAgICAgICAgICAgIG1hcmdpbjogYXV0bztcclxuICAgICAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgICAgICAgICB0b3A6IDUwJTtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAudGV4dCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiA1MCU7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ== */"

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




var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(dashboardservice, activateRoute) {
        this.dashboardservice = dashboardservice;
        this.activateRoute = activateRoute;
        this.Transporter = "";
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
        this.months = months;
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
                _this.selectedYear = (res.year) ? res.year : (new Date()).getFullYear() - 1;
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
        this.locationCode = '001';
        this.getVehicleAvailability('001');
        this.getTransporters();
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
                hAxis: {
                    title: 'Year',
                    format: ' ',
                    viewWindow: {
                        max: new Date().getFullYear() - 2,
                        min: new Date().getFullYear() + 2
                    }
                },
                vAxis: {
                    title: 'Count'
                }
                // title: 'Tags Issued Monthly Trend',
                // colors: ['#26c6da', '#ff425c', '#2ad8a4', '#ff864a', '#a94442']
            };
            var chart = new google.visualization.LineChart(document.getElementById('tripChart'));
            google.visualization.events.addListener(chart, 'click', function (e) {
                console.log(e);
                var parts = e.targetID.split('#');
                if (parts[0] == "hAxis")
                    console.log(parts);
                // this.getTripsByYear(2019);
            });
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
                tripsData[index + 1].push(months[element.month - 1]);
                element.trips.forEach(function (el) {
                    tripsData[index + 1].push(el.count);
                });
            });
            var data = google.visualization.arrayToDataTable(tripsData);
            var options = {
                hAxis: { title: 'Month' },
                vAxis: { title: 'Count' }
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
    DashboardComponent.prototype.getTransporters = function () {
        var _this = this;
        this.dashboardservice.getTransporters().subscribe(function (response) {
            _this.transporters = response;
            _this.Transporter = 'ECUS519';
            _this.getFleetUtilizationByCustId(_this.Transporter);
        });
    };
    DashboardComponent.prototype.getViolations = function () {
        var _this = this;
        this.dashboardservice.getViolations().subscribe(function (response) {
            _this.violations = response;
            _this.selectedCustomer = 'ECUS875';
            _this.getViolationsByCustomer('ECUS875');
        });
    };
    DashboardComponent.prototype.getViolationsByCustomer = function (custId) {
        var _this = this;
        this.dashboardservice.getViolationsByCustomerId(custId).subscribe(function (response) {
            _this.drawViolationChart(custId, response.violationsMetricsList);
        });
    };
    DashboardComponent.prototype.drawViolationChart = function (custId, violationsMetricsList) {
        var _this = this;
        var violationChartData = [[]];
        violationChartData[0] = ['Year'];
        violationsMetricsList[0].violations.forEach(function (element) {
            violationChartData[0].push(element.name);
        });
        violationsMetricsList.forEach(function (element, index) {
            violationChartData[index + 1] = [];
            violationChartData[index + 1][0] = '' + element.year;
            element.violations.forEach(function (e) {
                violationChartData[index + 1].push(e.count);
            });
        });
        var data = google.visualization.arrayToDataTable(violationChartData);
        var options = {
            hAxis: { title: 'Year' },
            vAxis: { title: 'Count' },
            isStacked: true
            // title: 'Tags Issued Monthly Trend',
            // colors: ['#26c6da', '#ff425c', '#2ad8a4', '#ff864a', '#a94442']
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('violationChart'));
        google.visualization.events.addListener(chart, 'click', function (e) {
            var parts = e.targetID.split('#');
            if (parts[0] == "hAxis")
                _this.getViolatonsByYear(violationChartData[parseInt(parts[3]) + 1][0], custId);
        });
        chart.draw(data, options);
    };
    DashboardComponent.prototype.getViolatonsByYear = function (year, custId) {
        var _this = this;
        this.dashboardservice.getViolationsByCustomerIdAndYear(year, custId).subscribe(function (response) {
            _this.drawViolationChartByMonth(custId, year, response.violationsMetricsList);
        });
    };
    DashboardComponent.prototype.drawViolationChartByMonth = function (custId, year, violationsMetricsList) {
        var _this = this;
        var violationChartData = [[]];
        violationChartData[0] = ['Month'];
        violationsMetricsList[0].violations.forEach(function (element) {
            violationChartData[0].push(element.name);
        });
        violationsMetricsList.forEach(function (element, index) {
            violationChartData[index + 1] = [];
            violationChartData[index + 1][0] = '' + months[element.month - 1];
            element.violations.forEach(function (e) {
                violationChartData[index + 1].push(e.count);
            });
        });
        var data = google.visualization.arrayToDataTable(violationChartData);
        var options = {
            hAxis: { title: 'Months of ' + year },
            vAxis: { title: 'Count' },
            isStacked: true,
            // title: 'Tags Issued Monthly Trend',
            colors: ['#26c6da', '#ff425c', '#2ad8a4', '#ff864a', '#a94442']
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('violationChart'));
        google.visualization.events.addListener(chart, 'click', function (e) {
            var parts = e.targetID.split('#');
            if (parts[0] == "hAxis")
                _this.getViolatonsByYearAndMonth(custId, year, months.indexOf(violationChartData[parseInt(parts[3]) + 1][0]) + 1);
        });
        chart.draw(data, options);
    };
    DashboardComponent.prototype.getViolatonsByYearAndMonth = function (custId, year, month) {
        var _this = this;
        this.dashboardservice.getViolationsByCustomerIdAndYearAndMonth(year, month, custId).subscribe(function (response) {
            _this.drawViolationChartByDay(year, month, response.violationsMetricsList);
        });
    };
    DashboardComponent.prototype.drawViolationChartByDay = function (year, month, violationsMetricsList) {
        var violationChartData = [[]];
        violationChartData[0] = ['Day'];
        violationsMetricsList[0].violations.forEach(function (element) {
            violationChartData[0].push(element.name);
        });
        violationsMetricsList.forEach(function (element, index) {
            violationChartData[index + 1] = [];
            violationChartData[index + 1][0] = '' + element.day;
            element.violations.forEach(function (e) {
                violationChartData[index + 1].push(e.count);
            });
        });
        var data = google.visualization.arrayToDataTable(violationChartData);
        var options = {
            hAxis: { title: 'Days of ' + months[month - 1] + '-' + year },
            vAxis: { title: 'Count' },
            isStacked: true,
            // title: 'Tags Issued Monthly Trend',
            colors: ['#26c6da', '#ff425c', '#2ad8a4', '#ff864a', '#a94442']
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('violationChart'));
        chart.draw(data, options);
    };
    DashboardComponent.prototype.getFleetUtilizationByCustId = function (custId) {
        var _this = this;
        this.dashboardservice.getFleetUtilizationByCustId(custId).subscribe(function (response) {
            _this.drawFleetUtilization(custId, response.list);
        }, function (error) {
        });
    };
    DashboardComponent.prototype.drawFleetUtilization = function (custId, fleetUtilizations) {
        var _this = this;
        var fleetUtilizationChartData = [[]];
        fleetUtilizationChartData[0] = ['Year', 'Percent', { type: 'string', role: 'tooltip' }];
        fleetUtilizations.forEach(function (v) {
            fleetUtilizationChartData.push(['' + v.year, v.percent, "Total: " + v.total + ",\nCount: " + v.count + ",\nPercent: " + v.percent]);
        });
        var data = google.visualization.arrayToDataTable(fleetUtilizationChartData);
        var options = {
            hAxis: {
                title: 'Year'
                // slantedText: true,
                // slantedTextAngle: 30
            },
            vAxis: { title: 'Percent' },
            // title: 'Tags Issued Monthly Trend',
            colors: ['#26c6da', '#ff425c', '#2ad8a4', '#ff864a', '#a94442']
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('fleetUtilizationChart'));
        google.visualization.events.addListener(chart, 'click', function (e) {
            var parts = e.targetID.split('#');
            if (parts[0] == "hAxis")
                _this.getFleetUtilizationByCustIdAndYear(fleetUtilizationChartData[parseInt(parts[3]) + 1][0], custId);
        });
        chart.draw(data, options);
    };
    DashboardComponent.prototype.getFleetUtilizationByCustIdAndYear = function (year, custId) {
        var _this = this;
        this.dashboardservice.getFleetUtilizationByCustIdAndYear(year, custId).subscribe(function (response) {
            _this.drawFleetUtilizationByYear(year, custId, response.list);
        }, function (error) {
        });
    };
    DashboardComponent.prototype.drawFleetUtilizationByYear = function (year, custId, fleetUtilizations) {
        var _this = this;
        var fleetUtilizationChartData = [[]];
        fleetUtilizationChartData[0] = ['Month', 'Percent', { type: 'string', role: 'tooltip' }];
        fleetUtilizations.forEach(function (v) {
            fleetUtilizationChartData.push([months[v.month - 1], v.percent, "Total: " + v.total + ",\nCount: " + v.count + ",\nPercent: " + v.percent]);
        });
        var data = google.visualization.arrayToDataTable(fleetUtilizationChartData);
        var options = {
            hAxis: {
                title: 'Months of ' + year
                // slantedText: true,
                // slantedTextAngle: 30
            },
            vAxis: { title: 'Percent' },
            // title: 'Tags Issued Monthly Trend',
            colors: ['#26c6da', '#ff425c', '#2ad8a4', '#ff864a', '#a94442']
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('fleetUtilizationChart'));
        google.visualization.events.addListener(chart, 'click', function (e) {
            var parts = e.targetID.split('#');
            if (parts[0] == "hAxis") {
                _this.getFleetUtilizationByCustIdAndYearAndMonth(months.indexOf(fleetUtilizationChartData[parseInt(parts[3]) + 1][0]) + 1, year, custId);
            }
        });
        chart.draw(data, options);
    };
    DashboardComponent.prototype.getFleetUtilizationByCustIdAndYearAndMonth = function (month, year, custId) {
        var _this = this;
        this.dashboardservice.getFleetUtilizationByCustIdYearAndMonth(year, month, custId).subscribe(function (response) {
            _this.drawFleetUtilizationByYearAndMonth(month, year, custId, response.list);
        }, function (error) {
        });
    };
    DashboardComponent.prototype.drawFleetUtilizationByYearAndMonth = function (month, year, custId, fleetUtilizations) {
        var fleetUtilizationChartData = [[]];
        fleetUtilizationChartData[0] = ['Day', 'Percent', { type: 'string', role: 'tooltip' }];
        fleetUtilizations.forEach(function (v) {
            fleetUtilizationChartData.push(['' + v.day, v.percent, "Total: " + v.total + ",\nCount: " + v.count + ",\nPercent: " + v.percent]);
        });
        var data = google.visualization.arrayToDataTable(fleetUtilizationChartData);
        var options = {
            hAxis: {
                title: 'Days of ' + months[month - 1] + '-' + year
                // slantedText: true,
                // slantedTextAngle: 30
            },
            vAxis: { title: 'Percent' },
            // title: 'Tags Issued Monthly Trend',
            colors: ['#26c6da', '#ff425c', '#2ad8a4', '#ff864a', '#a94442']
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('fleetUtilizationChart'));
        chart.draw(data, options);
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

module.exports = "<!-- <div class=\"wrapper\">\r\n  <div class=\"sidebar\" data-background-color=\"white\" data-active-color=\"danger\">\r\n    <app-sidebar-cmp></app-sidebar-cmp>\r\n  </div>\r\n  <div class=\"main-panel\"> -->\r\n<!-- <app-navbar-cmp></app-navbar-cmp>\r\n    <div class=\"content\">\r\n      <router-outlet></router-outlet>\r\n    </div> -->\r\n<!-- <app-navbar-cmp (year)=\"onYearChange($event)\" [selectedYear]=\"selectedYear\" [yearList]=\"yearList\"></app-navbar-cmp>\r\n<div class=\"content\">\r\n  <router-outlet></router-outlet>\r\n</div>\r\n    <app-footer-cmp></app-footer-cmp>\r\n  </div>\r\n</div> -->\r\n<!-- <app-fixedplugin-cmp></app-fixedplugin-cmp> -->\r\n\r\n\r\n<app-navbar-cmp (year)=\"onYearChange($event)\" [selectedYear]=\"selectedYear\" [yearList]=\"yearList\"></app-navbar-cmp>\r\n<div class=\"content\">\r\n  <router-outlet></router-outlet>\r\n</div>\r\n<app-footer-cmp></app-footer-cmp>"

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
        this.yearList = [2018, 2019, 2020];
        // this.getMinYear();
        this.activateRoute.queryParams.subscribe(function (res) {
            _this.selectedYear = (res.year) ? res.year : (new Date()).getFullYear() - 1;
        });
    };
    MainComponent.prototype.getMinYear = function () {
        var _this = this;
        this.dashboardService.getMinYear()
            .subscribe(function (res) {
            debugger;
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
    DashboardService.prototype.getTransporters = function () {
        return this.api.get('api/metrics/transporters');
    };
    DashboardService.prototype.getViolations = function () {
        return this.api.get('api/metrics/violations');
    };
    DashboardService.prototype.getViolationsByCustomerId = function (custId) {
        return this.api.get('api/metrics/violations/' + custId);
    };
    DashboardService.prototype.getViolationsByCustomerIdAndYear = function (year, custId) {
        return this.api.get('api/metrics/violations/' + custId + '?year=' + year);
    };
    DashboardService.prototype.getViolationsByCustomerIdAndYearAndMonth = function (year, month, custId) {
        return this.api.get('api/metrics/violations/' + custId + '?year=' + year + '&month=' + month);
    };
    DashboardService.prototype.getFleetUtilizationByCustId = function (custId) {
        return this.api.get("api/metrics/fleetUtilization?custId=" + custId);
    };
    DashboardService.prototype.getFleetUtilizationByCustIdAndYear = function (year, custId) {
        return this.api.get("api/metrics/fleetUtilization?year=" + year + "&custId=" + custId);
    };
    DashboardService.prototype.getFleetUtilizationByCustIdYearAndMonth = function (year, month, custId) {
        return this.api.get("api/metrics/fleetUtilization?month=" + month + "&year=" + year + "&custId=" + custId);
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