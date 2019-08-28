"use strict";
const sys = server.registerSystem(0, 0);
sys.initialize = function () {
    server.log("3 heart mod by Fjun loaded");
};
sys.update = function () {
    setHeart(0, 9, 6);
};
function setHeart(min, max, hp) {
    sys.executeCommand("testfor @a[lm=" + min + ",l=" + max + "]", data => {
        let callbackData = JSON.stringify(data);
        let players = callbackData.match(/\[.*\]/i);
        if (players != null) {
            for (let player in Array(players)) {
                server.log(player);
            }
        }
    });
}
