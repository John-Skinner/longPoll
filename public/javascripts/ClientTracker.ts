export class ClientTracker
{
    public uniqueName:string;
    private currentRes:any;

    constructor()
    {
        this.uniqueName = undefined;
        this.currentRes = undefined;
    }
    public PollIn(res:any)
    {
        console.log(" polling in" + this.uniqueName);
        this.currentRes = res;
    }
    public Respond(msg:string)
    {
        console.log(" responding start in" + this.uniqueName);
        let response = {
            message: msg
        };
        let s = JSON.stringify(response);
        this.currentRes.send(s);
        console.log(" respond released to " + this.uniqueName + " " + msg);
    }
}