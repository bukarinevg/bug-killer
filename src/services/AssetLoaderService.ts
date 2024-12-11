class AssetLoaderService {
    static loadAsset(scene: Phaser.Scene, assets:{key:string, path:string}[]) {
        assets.forEach(asset => {
            scene.load.image(asset.key, asset.path);
        });
    }
}

export default AssetLoaderService;