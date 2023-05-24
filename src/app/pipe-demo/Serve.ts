export class Serve{
    status: string; 
    name: string; 
    instanceType: string; 
    started: Date;

    constructor(status: string, name: string, instanceType: string, started: Date){
        this.status = status;
        this.name = name;
        this.instanceType = instanceType;
        this.started = started;
    }
}