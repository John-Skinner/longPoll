"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientTracker = /** @class */ (function () {
    function ClientTracker() {
        this.uniqueName = undefined;
        this.currentRes = undefined;
    }
    ClientTracker.prototype.PollIn = function (res) {
        console.log(" polling in" + this.uniqueName);
        this.currentRes = res;
    };
    ClientTracker.prototype.Respond = function (msg) {
        console.log(" responding start in" + this.uniqueName);
        var response = {
            message: msg
        };
        var s = JSON.stringify(response);
        this.currentRes.send(s);
        console.log(" respond released to " + this.uniqueName + " " + msg);
    };
    return ClientTracker;
}());
exports.ClientTracker = ClientTracker;
//# sourceMappingURL=ClientTracker.js.map