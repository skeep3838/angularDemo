import { Ingerdient } from "../shared/ingerdient.model";

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingerdients:  Ingerdient[];

    constructor(name: string, description: string, imagePath: string, ingerdients: Ingerdient[]) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath; 
        this.ingerdients = ingerdients;
    }
}
