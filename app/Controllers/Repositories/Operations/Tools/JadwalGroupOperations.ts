import JadwalGroup from "App/Models/Form/JadwalGroup";
import BaseRepository from "../../BaseRepository";
import MasterGroup from "App/Models/Form/MasterGroup";
import TimeConfig from "App/Models/Form/TimeConfig";

export default class JadwalGroupOperations extends BaseRepository {
    constructor() {
        super(JadwalGroup);
    }
    async index(input:any){
        const { sortBy, sortDesc, page, limit } = input
        const fetch = await JadwalGroup.query().orderBy([
            {
                column: sortBy !== '' ? sortBy : 'created_at',
                order: sortDesc ? 'desc' : 'asc',
            }
        ])
        .preload('master_group')
        .preload('time_config')
        .paginate(page, limit)
        return { status: true, data: fetch, msg: 'success' }
    }
    async form_attr(input:any){
        switch (input) {
            case 'group':
                const group = await MasterGroup.all()
                const time = await TimeConfig.all()
                return { status: true, data: { group, time }, msg: 'success' }
                break;
        
            default:
                return { status: true, data: null, msg: 'success' }
                break;
        }
    }
    async storeMany(input:any){
        const arr: any[] = []
        input.date.forEach((el: any) => {
            arr.push({
                master_group_id: input.master_group_id,
                time_config_id: input.time_config_id,
                date: el
            })
        });
        await JadwalGroup.createMany(arr)
        return { status: true, data: input, msg: 'success' }
    }
}