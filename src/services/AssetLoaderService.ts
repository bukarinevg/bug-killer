class AssetLoaderService {
    static loadAssetImage(scene: Phaser.Scene, assets:{key:string, path:string}[]) {
        assets.forEach(asset => {
            scene.load.image(asset.key, asset.path);
        });
    }
    
    static loadAssetAudio(scene: Phaser.Scene, assets:{key:string, path:string}[]) {
        assets.forEach(asset => {
            scene.load.audio(asset.key, asset.path);
        });
    }
}

export default AssetLoaderService;