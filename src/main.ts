const sys = server.registerSystem(0, 0);
let player: IEntity;
let playerName;

sys.initialize = function (){
    server.log("3 heart mod by Fjun loaded"); 

    sys.listenForEvent<IBlockDestructionStartedEventData>("minecraft:block_destruction_started", eventData =>{
        player = eventData.data.player;
        playerName = sys.getComponent<INameableComponent>(player, MinecraftComponent.Nameable).data.name;
        setHeart(0, 9, 6);
        setHeart(10, 19, 8);
        setHeart(20, 29, 10);
        setHeart(30, 39, 12);
        setHeart(40, 49, 14);
        setHeart(50, 59, 16);
        setHeart(60, 69, 18);
        setHeart(70, 71, 20);
    });
}

async function setHeart(min: number, max: number, maxhp: number){
    sys.executeCommand("testfor @a[name=" + playerName + ",lm=" + min + ",l=" + max + "]", data =>{
        let jsonData: ITestFor = JSON.parse(JSON.stringify(data));
        if(jsonData.statusMessage != "No targets matched selector"){
            if(jsonData.victim[0] == playerName){
                let health = sys.getComponent<IHealthComponent>(player, MinecraftComponent.Health);
                health.data.max = maxhp;
                if(health.data.value > maxhp){health.data.value = maxhp}
                sys.applyComponentChanges(player, health);
            }
        }
    })
}

interface ITestFor{
    statusCode: number;
    statusMessage : string;
    victim : any;
}