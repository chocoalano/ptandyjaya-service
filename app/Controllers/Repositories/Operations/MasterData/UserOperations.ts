import User from "App/Models/MasterData/Users/User";
import BaseRepository from "../../BaseRepository";
import { UnlinkFile, UploadFile } from "App/helper";
import UserGudang from "App/Models/MasterData/Users/UserGudang";
import UserOffice from "App/Models/MasterData/Users/UserOffice";
import UserToko from "App/Models/MasterData/Users/UserToko";
import Database from "@ioc:Adonis/Lucid/Database";
import Role from "App/Models/MasterData/Role";
import Dept from "App/Models/MasterData/Dept";
import MasterToko from "App/Models/MasterData/MasterToko";
import MasterOffice from "App/Models/MasterData/MasterOffice";
import MasterGudang from "App/Models/MasterData/MasterGudang";
import UserGroup from "App/Models/MasterData/Users/UserGroup";

export default class UserOperations extends BaseRepository {
    constructor() {
        super(User);
    }

    async UserList($input: { sortBy: any; search: any; sortDesc: any; page: any; limit: any; }) {
        const { sortBy, search, sortDesc, page, limit } = $input
            const count = await User.query().count('* as total').first()
            return await User.query()
                    .where(sortBy !== '' ? sortBy : 'name', 'LIKE', '%' + search + '%')
                    .orderBy([
                        {
                            column: sortBy !== '' ? sortBy : 'nik',
                            order: sortDesc ? 'desc' : 'asc',
                        }
                    ])
                    .preload('roles').preload('dept').paginate(page, limit < 5 ? count!.$extras.total : limit)
    }

    async UserStore($input: { avatar: { extname: any; }; nik: string; role_id: number; dept_id: number; name: string; email: string | null; password: string; activation: string; work_location: string; saldo_cuti: number; hp: string; status: string; tgl_join: Date; limit_kasbon: number; total_gaji_perbulan: number; id: any; work_location_master: string; }){
        UploadFile($input.avatar, $input.nik, 'uploads/avatar-users')
        const user = new User()
        user.role_id = $input.role_id
        user.dept_id = $input.dept_id
        user.name = $input.name
        user.email = $input.email != null ? $input.email : ''
        user.nik = $input.nik
        user.password = $input.password
        user.activation = $input.activation
        user.avatar = `${$input.nik}.${$input.avatar.extname}`
        user.work_location = $input.work_location
        user.saldo_cuti = $input.saldo_cuti
        user.hp = $input.hp
        user.status = $input.status
        user.tgl_join = $input.tgl_join
        user.limit_kasbon = $input.limit_kasbon
        user.total_gaji_perbulan = $input.total_gaji_perbulan
        if (await user.save()) {
            switch ($input.work_location) {
                case 'gudang':
                    await UserGudang.updateOrCreate({
                        user_id: $input.id
                    }, {
                        master_gudang_id: parseInt($input.work_location_master)
                    })
                    break;
                case 'office':
                    await UserOffice.updateOrCreate({
                        user_id: $input.id
                    }, {
                        master_office_id: parseInt($input.work_location_master)
                    })
                    break;
                case 'toko':
                    await UserToko.updateOrCreate({
                        user_id: $input.id
                    }, {
                        master_toko_id: parseInt($input.work_location_master)
                    })
                    break;
            }
        }
        return user
    }

    async UserShow(id: number){
        const user = await User
                    .query()
                    .where('id', id)
                    .preload('roles')
                    .preload('dept')

                if (user[0].work_location === 'office') {
                    const q = await Database
                        .from('users as u')
                        .join('user_offices as uo', 'u.id', '=', 'uo.user_id')
                        .select('uo.master_office_id')
                    user.push((typeof q[0] !== 'undefined') ? q[0].master_office_id : 0)
                } else if (user[0].work_location === 'gudang') {
                    const q = await Database
                        .from('users as u')
                        .join('user_gudangs as ug', 'u.id', '=', 'ug.user_id')
                        .select('ug.master_gudang_id')
                    user.push((typeof q[0] !== 'undefined') ? q[0].master_gudang_id : 0)
                } else if (user[0].work_location === 'toko') {
                    const q = await Database
                        .from('users as u')
                        .join('user_tokos as ut', 'u.id', '=', 'ut.user_id')
                        .select('ut.master_toko_id')
                    user.push((typeof q[0] !== 'undefined') ? q[0].master_toko_id : 0)
                }
                return user
    }

    async UserUpdate(id:number, input:any){
        const user = await User.findOrFail(id)
        user.role_id = input.role_id
        user.dept_id = input.dept_id
        user.name = input.name
        user.email = input.email != null ? input.email : ''
        user.nik = input.nik
        user.activation = input.activation
        user.work_location = input.work_location
        user.saldo_cuti = input.saldo_cuti
        user.hp = input.hp
        user.status = input.status
        user.tgl_join = input.tgl_join
        user.limit_kasbon = input.limit_kasbon
        user.total_gaji_perbulan = input.total_gaji_perbulan
        if (await user.save()) {
            switch (input.work_location) {
                case 'gudang':
                    await UserGudang.updateOrCreate({
                        user_id: input.id
                    }, {
                        master_gudang_id: parseInt(input.work_location_master)
                    })
                    break;
                case 'office':
                    await UserOffice.updateOrCreate({
                        user_id: input.id
                    }, {
                        master_office_id: parseInt(input.work_location_master)
                    })
                    break;
                case 'toko':
                    await UserToko.updateOrCreate({
                        user_id: input.id
                    }, {
                        master_toko_id: parseInt(input.work_location_master)
                    })
                    break;
            }
        }
        return user
    }

    async UserDelete(id:number){
        const user = await User.findOrFail(id)
        if (user) {
            UnlinkFile(user.avatar, 'uploads/avatar-users')
            await user.delete()
            return user
        }
        return null
    }

    async attr(){
        const roles = await Role.all()
        const depts = await Dept.all()
        const toko = await MasterToko.all()
        const office = await MasterOffice.all()
        const gudang = await MasterGudang.all()
        return { roles, depts, toko, office, gudang }
    }

    async UserApproval(auth){
        const carigroup = await UserGroup.findByOrFail('user_id', auth.user?.id)
        const cariuSER = await UserGroup.query().where('master_group_id', carigroup.master_group_id).preload('user')
        return cariuSER
    }
}