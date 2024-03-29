"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--) {
            if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

exports.__esModule = true;
exports.ImageService = void 0;

var core_1 = require("@angular/core");

var http_1 = require("@angular/common/http");

var cabecera = {
    headers: new http_1.HttpHeaders({
        'Content-Type': 'application/json'
    })
};

var ImageService =
    /** @class */
    function() {
        function ImageService(httpClient) {
            this.httpClient = httpClient;
            this.imageURL = 'http://localhost:8080/image/';
        }

        ImageService.prototype.onUpload = function(image, id) {
            return this.httpClient.post(this.imageURL + 'upload' + "/" + id, image);
        };

        ImageService.prototype.getImage = function(nombre) {
            return this.httpClient.get(this.imageURL + 'get/' + nombre);
        };

        ImageService.prototype.getImageId = function(id) {
            return this.httpClient.get(this.imageURL + 'getId/' + id);
        };

        ImageService.prototype.getImageIdUsuario = function(id) {
            return this.httpClient.get(this.imageURL + 'getIdImagenUser/' + id);
        };

        ImageService.prototype.getIdImage = function(nombre, idUsuario) {
            return this.httpClient.get(this.imageURL + ("getIdImage/" + nombre) + ("&" + idUsuario));
        };

        ImageService = __decorate([core_1.Injectable({
            providedIn: 'root'
        })], ImageService);
        return ImageService;
    }();

exports.ImageService = ImageService;