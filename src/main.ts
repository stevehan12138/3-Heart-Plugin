const sys = server.registerSystem(0, 0);
let player: IEntity;

sys.initialize = function (){
    server.log("3 heart mod by Fjun loaded"); 
    sys.listenForEvent<IBlockDestructionStartedEventData>("minecraft:block_destruction_started", eventData =>{
        player = eventData.data.player;
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

function setHeart(min: number, max: number, hp: number){
    sys.executeCommand("testfor @a[lm=" + min + ",l=" + max + "]", data =>{
        let jsonData: ITestFor = JSON.parse(JSON.stringify(data));
        if(jsonData.statusMessage != "No targets matched selector"){
            for(let each in jsonData.victim){
                if(jsonData.victim[each] == sys.getComponent<INameableComponent>(player, MinecraftComponent.Nameable).data.name){
                    let health = sys.getComponent<IHealthComponent>(player, MinecraftComponent.Health);
                    health.data.max = hp;
                    sys.applyComponentChanges(player, health);
                }
            }
        }
    })
}

interface ITestFor{
    statusCode: number;
    statusMessage : string;
    victim : any;
}