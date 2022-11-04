function createPlayer(x,angle,z,size,scene) {
    var spriteManager = new BABYLON.SpriteManager("manager", "../../Texturen/Insekt2.png", 1, 256, scene);
    var player = new BABYLON.Sprite("player",spriteManager);
    player.position = new BABYLON.Vector3(x,0.1,z);
    player.angle = angle;
    player.size = size;
    return player;
}
function createArea (scene) {
    var GroundMaterial = new BABYLON.StandardMaterial("ground", scene);
    var GroundTexture = new BABYLON.Texture("../../Texturen/wiese.png", scene);
    GroundMaterial.diffuseTexture = GroundTexture;
    GroundMaterial.diffuseTexture.uScale = 2.0;
    GroundMaterial.diffuseTexture.vScale = 2.0;
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 24, height: 24, scene});
    ground.material = GroundMaterial;
    //ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.GroundImpostor, {mass:0}, scene);
    return ground;
}
function createObstacle (x,z,scene){
    var obsctacle = BABYLON.Mesh.CreateSphere("sphere2",20 , 2 , scene);
    obsctacle.position = new BABYLON.Vector3(x,1,z)
    obsctacle.physicsImpostor = new BABYLON.PhysicsImpostor(obsctacle, BABYLON.PhysicsImpostor.SphereImpostor, {mass:1}, scene);
    var ObsctacleMaterial = new BABYLON.StandardMaterial("obstacle", scene);
    var ObsctacleTexture = new BABYLON.Texture("../../Texturen/Mauer.png", scene);
    ObsctacleMaterial.diffuseTexture = ObsctacleTexture;
    obsctacle.material = ObsctacleMaterial;
    return obsctacle;
}
function movePlayer (player) {
    window.addEventListener("keydown", function(event){
        var left = -10.5; var right = 10.5;
        var back = -10.5; var front = 10.5;
        var diff = 0.5;
        var key = event.key;
        if (key == "ArrowRight") {
            if (player.position.x > left)
                player.position.x -= diff;
            player.angle = -Math.PI/2;
        }
        if (key == "ArrowDown") {
            if (player.position.z < front)
                player.position.z += diff;
            player.angle = Math.PI;
        } 
        if (key == "ArrowLeft") {
            if (player.position.x < right)
                player.position.x += diff;
            player.angle = Math.PI/2; 
        }
        if (key == "ArrowUp") {
            if (player.position.z > back) 
                player.position.z -= diff;
            player.angle = 0; 
        }
        if (key == "Enter") {
            player.position.x = 0;
            player.position.z = 0;
            player.position.y = 0.1;
            player.angle = 0;
        }
    });
}