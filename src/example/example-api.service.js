// Simple example of an API service
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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var ExampleApiService = (function () {
    function ExampleApiService(http) {
        this.http = http;
    }
    ExampleApiService.prototype.request = function (_a) {
        var url = _a.url, method = _a.method, body = _a.body, _b = _a.headers, headers = _b === void 0 ? [] : _b;
        var headersObj = {};
        if (headers.length > 0) {
            headersObj = headers.reduce(function (mem, curr) {
                mem[curr.key] = curr.value;
                return mem;
            }, {});
        }
        var headersMerged = new http_1.Headers(headersObj);
        return this.http.request(new http_1.Request({
            headers: headersMerged,
            method: method,
            url: url,
            body: body
        }));
    };
    ExampleApiService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ExampleApiService);
    return ExampleApiService;
}());
exports.ExampleApiService = ExampleApiService;
//# sourceMappingURL=example-api.service.js.map