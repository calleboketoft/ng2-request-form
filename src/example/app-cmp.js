"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var co_request_form_cmp_1 = require('../co-request-form-cmp');
var example_api_service_1 = require('./example-api-service');
var http_1 = require('angular2/http');
var AppCmp = (function () {
    function AppCmp(_exampleApiService) {
        this._exampleApiService = _exampleApiService;
    }
    AppCmp.prototype._makeRequest = function (config) {
        this._exampleApiService.request(config);
    };
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app',
            directives: [co_request_form_cmp_1.CoRequestFormCmp],
            providers: [
                http_1.HTTP_PROVIDERS,
                example_api_service_1.ExampleApiService
            ],
            template: "\n    <h3>co-request-form-cmp</h3>\n    <co-request-form-cmp\n      (request)='_makeRequest($event)'>\n    </co-request-form-cmp>\n  "
        }), 
        __metadata('design:paramtypes', [example_api_service_1.ExampleApiService])
    ], AppCmp);
    return AppCmp;
}());
exports.AppCmp = AppCmp;
//# sourceMappingURL=app-cmp.js.map