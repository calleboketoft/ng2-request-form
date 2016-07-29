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
var forms_1 = require('@angular/forms');
var CoRequestFormComponent = (function () {
    function CoRequestFormComponent(formBuilder) {
        this.formBuilder = formBuilder;
        this.methodStr = 'GET';
        this.urlStr = '';
        this.bodyStr = '{}';
        this.headersObj = {};
        // keep track of which headers are currently present
        this.headersArr = [];
        this.methodOptions = [
            'GET',
            'POST',
            'PUT',
            'DELETE'
        ];
        this.ngOnInitDone = false;
    }
    Object.defineProperty(CoRequestFormComponent.prototype, "method", {
        // Logics to handle externally updated values
        set: function (value) {
            this.methodStr = value;
            if (!this.ngOnInitDone)
                return;
            this.requestForm.controls.method.updateValue(value);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(CoRequestFormComponent.prototype, "url", {
        set: function (value) {
            this.urlStr = value;
            if (!this.ngOnInitDone)
                return;
            this.requestForm.controls.url.updateValue(value);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(CoRequestFormComponent.prototype, "body", {
        set: function (value) {
            this.bodyStr = value;
            if (!this.ngOnInitDone)
                return;
            this.requestForm.controls.body.updateValue(value);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(CoRequestFormComponent.prototype, "headers", {
        set: function (value) {
            var _this = this;
            this.headersObj = value;
            if (!this.ngOnInitDone)
                return;
            // When new headers come in, remove the old controls
            this.headersArr.forEach(function (headerKey) {
                _this.requestForm.controls.headers.removeControl(headerKey);
            });
            // headersarr is used in the template to render list of header inputs
            this.headersArr = Object.keys(value);
            // Add all the new header controls
            Object.keys(value).forEach(function (headerKey) {
                var headerControl = new forms_1.FormControl(value[headerKey]);
                _this.requestForm.controls.headers.addControl(headerKey, headerControl);
            });
        },
        enumerable: true,
        configurable: true
    });
    ;
    CoRequestFormComponent.prototype.ngOnInit = function () {
        this.ngOnInitDone = true;
        this.initializeForm();
    };
    CoRequestFormComponent.prototype.initializeForm = function () {
        var _this = this;
        // headersarr is used in the template to render list of header inputs
        this.headersArr = Object.keys(this.headersObj).map(function (headerKey) { return headerKey; });
        var headersControlsObj = Object.keys(this.headersObj).reduce(function (mem, curr) {
            mem[curr] = [_this.headersObj[curr]];
            return mem;
        }, {});
        this.requestForm = this.formBuilder.group({
            'url': [this.urlStr],
            'method': [this.methodStr],
            'body': [this.bodyStr],
            'headers': this.formBuilder.group(headersControlsObj)
        });
        this.newHeaderForm = this.formBuilder.group({
            'newHeaderKey': [''],
            'newHeaderValue': ['']
        });
    };
    CoRequestFormComponent.prototype.addHeaderRow = function () {
        // TODO check if the specific header already exists, if it does,
        // just update its value instead of creating new
        var newHeaderKeyControl = this.newHeaderForm.controls.newHeaderKey;
        var newHeaderValueControl = this.newHeaderForm.controls.newHeaderValue;
        var headerControlKey = newHeaderKeyControl.value;
        var headerControl = new forms_1.FormControl(newHeaderValueControl.value);
        // Keep the headers arr up to date for the template rendering
        this.headersArr.push(newHeaderKeyControl.value);
        this.requestForm.controls.headers.addControl(headerControlKey, headerControl);
        // clear inputs in form
        newHeaderKeyControl.updateValue('');
        newHeaderValueControl.updateValue('');
    };
    CoRequestFormComponent.prototype.removeHeaderRow = function (headerToRemove) {
        // Remove from form
        this.requestForm.controls.headers.removeControl(headerToRemove);
        // Remove from header array
        this.headersArr = this.headersArr.filter(function (headerKey) { return headerKey !== headerToRemove; });
    };
    CoRequestFormComponent.prototype.request = function () {
        var _this = this;
        // go through the headers and get their values
        var headers = Object.keys(this.requestForm.controls.headers.controls).reduce(function (mem, curr) {
            mem[curr] = _this.requestForm.controls.headers.controls[curr].value;
            return mem;
        }, {});
        return {
            url: this.requestForm.controls.url.value,
            body: this.requestForm.controls.body.value,
            method: this.requestForm.controls.method.value,
            headers: headers
        };
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], CoRequestFormComponent.prototype, "method", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], CoRequestFormComponent.prototype, "url", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], CoRequestFormComponent.prototype, "body", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], CoRequestFormComponent.prototype, "headers", null);
    CoRequestFormComponent = __decorate([
        core_1.Component({
            selector: 'co-request-form-cmp',
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES],
            template: "\n    <form [formGroup]=\"requestForm\">\n      <div class=\"row\">\n        <div class=\"col-sm-8\">\n          <fieldset class=\"form-group\">\n            <label>URL</label>\n            <input type=\"text\" class=\"form-control\" formControlName=\"url\">\n          </fieldset>\n        </div>\n        <div class=\"col-sm-4\">\n          <fieldset class=\"form-group\">\n            <label>Method</label>\n            <select class=\"form-control\" formControlName=\"method\" #method>\n              <option *ngFor=\"let option of methodOptions\"\n                [value]=\"option\">\n                {{option}}\n              </option>\n            </select>\n          </fieldset>\n        </div>\n      </div>\n\n      <div class=\"row\"\n        [hidden]=\"requestForm.controls.method.value !== 'POST' && requestForm.controls.method.value !== 'PUT'\">\n        <div class=\"col-sm-12\">\n          <fieldset class=\"form-group\">\n            <label>Body</label>\n            <textarea class=\"form-control\" formControlName=\"body\" rows=\"3\"></textarea>\n          </fieldset>\n        </div>\n      </div>\n\n      <label>Headers</label>\n\n      <div class=\"row\" style=\"margin-bottom: 5px;\" formGroupName=\"headers\"\n        *ngFor=\"let headerKey of headersArr\">\n        <div class=\"col-xs-4\">\n          <input type=\"text\" disabled [value]=\"headerKey\" class=\"form-control\">\n        </div>\n        <div class=\"col-xs-4\">\n          <input type=\"text\" class=\"form-control\" [formControlName]=\"headerKey\">\n        </div>\n        <div class=\"col-xs-4\" style=\"text-align: right;\">\n          <button type=\"button\" class=\"btn btn-danger\"\n            (click)=\"removeHeaderRow(headerKey)\">\n            Remove\n          </button>\n        </div>\n      </div>\n    </form>\n\n    <!-- Add new header TODO make into form-->\n    <form [formGroup]=\"newHeaderForm\">\n      <div class=\"row\">\n        <div class=\"col-xs-4\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"New header\"\n            formControlName=\"newHeaderKey\">\n        </div>\n        <div class=\"col-xs-4\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"New header value\"\n            formControlName=\"newHeaderValue\">\n        </div>\n        <div class=\"col-xs-4\" style=\"text-align: right;\">\n          <button type=\"button\" class=\"btn btn-primary\"\n            (click)=\"addHeaderRow()\">\n            Add header\n          </button>\n        </div>\n      </div>\n    </form>\n  "
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], CoRequestFormComponent);
    return CoRequestFormComponent;
}());
exports.CoRequestFormComponent = CoRequestFormComponent;
//# sourceMappingURL=co-request-form.component.js.map