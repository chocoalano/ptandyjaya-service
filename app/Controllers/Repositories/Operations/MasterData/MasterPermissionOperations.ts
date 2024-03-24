import Permission from "App/Models/MasterData/Permission";
import BaseRepository from "../../BaseRepository";

export default class MasterPermissionOperations extends BaseRepository {
    constructor() {
        super(Permission);
    }
    async stored(data: any): Promise<any> {
        const arrname = [] as any;
        const fetch = data.permission
        for (let i = 0; i < fetch.length; i++) {
            const txt = fetch[i] + '-' + data.name
            arrname.push({
                name: txt.toLowerCase(),
                basepermission: data.name.toLowerCase()
            })
        }
        const q = await Permission.createMany(arrname)
        return { status: true, data: q, msg: 'success' }
    }
}