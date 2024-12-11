"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssetLoaderService = /** @class */ (function () {
    function AssetLoaderService() {
    }
    AssetLoaderService.loadAsset = function (scene, assets) {
        assets.forEach(function (asset) {
            scene.load.image(asset.key, asset.path);
        });
    };
    return AssetLoaderService;
}());
exports.default = AssetLoaderService;
