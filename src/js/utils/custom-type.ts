export class Guid {
    private _guid: string;

    constructor(public guid: string) {
        this._guid = guid;
    }

    public static newGuid(): Guid {
        let result: string,
            i: string,
            j: number;

        result = "";

        for (j = 0; j < 32; j++) {
            if (j === 8 || j === 12 || j === 16 || j === 20) {
                result = result + "-";
            }
            i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
            result = result + i;
        }

        return new Guid(result);
    }

    public toString(): string {
        return this.guid;
    }
}
