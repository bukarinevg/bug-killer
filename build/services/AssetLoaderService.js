"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssetLoaderService = /** @class */ (function () {
    function AssetLoaderService() {
    }
    AssetLoaderService.loadAssetImage = function (scene, assets) {
        assets.forEach(function (asset) {
            scene.load.image(asset.key, asset.path);
        });
    };
    AssetLoaderService.loadAssetAudio = function (scene, assets) {
        assets.forEach(function (asset) {
            scene.load.audio(asset.key, asset.path);
        });
    };
    return AssetLoaderService;
}());
exports.default = AssetLoaderService;
