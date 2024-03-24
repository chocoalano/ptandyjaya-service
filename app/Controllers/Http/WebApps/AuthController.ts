import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database';
import Dept from 'App/Models/MasterData/Dept';
import Role from 'App/Models/MasterData/Role';
import User from 'App/Models/MasterData/Users/User';
import { RegisterValidator, LoginValidator } from 'App/Validators/AuthValidator';
import Drive from '@ioc:Adonis/Core/Drive'
import { AvatarValidator, PasswordValidator, UserValidatorUpdate } from 'App/Validators/UserValidator'
import { DateTimeFormated, arrayUnique } from 'App/helper';

export default class AuthController {
    /*
    |--------------------------------------------------------------------------
    | REGISTER::FUNCTION
    |--------------------------------------------------------------------------
    */
    public async register({ request, auth, response }: HttpContextContract) {
        try {
            const payload = await request.validate(RegisterValidator)
            await payload.avatar.move(Application.tmpPath('uploads/avatar-users'), {
                name: `${payload.nik}.jpg`,
                overwrite: true,
            })
            const user = new User()
            user.role_id = payload.role_id
            user.dept_id = payload.dept_id
            user.name = payload.name
            user.email = payload.email != null ? payload.email : ''
            user.nik = payload.nik
            user.password = payload.password
            user.activation = payload.activation
            user.avatar = payload.avatar.fileName as string
            user.work_location = payload.work_location
            user.saldo_cuti = payload.saldo_cuti
            await user.save()
            const token = await auth.use("api").login(user, {
                expiresIn: "1 days",
            });
            return response.send({ status: true, data: token, msg: 'success' })
        } catch (error) {
            return response.send({ status: false, data: error.messages, msg: 'error' })
        }
    }
    /*
    |--------------------------------------------------------------------------
    | LOGIN::FUNCTION
    |--------------------------------------------------------------------------
    */
    public async login({ request, auth, response }: HttpContextContract) {
        try {
            const payload = await request.validate(LoginValidator)
            const token = await auth.use("api").attempt(payload.email, payload.password, {
                expiresIn: "1 days",
            });
            return response.send({ status: true, data: token, msg: 'success' })
        } catch (error) {
            console.log(error);
            
            return response.send({ status: false, data: error.messages, msg: 'error' })
        }
    }
    /*
    |--------------------------------------------------------------------------
    | PROFILE::FUNCTION
    |--------------------------------------------------------------------------
    */
    public async profile({ auth, response }: HttpContextContract) {
        try {
            const getJadwal = await Database
                .from('users')
                .join('user_groups', 'users.id', '=', 'user_groups.user_id')
                .join('master_groups', 'user_groups.master_group_id', '=', 'master_groups.id')
                .join('jadwal_groups', 'master_groups.id', '=', 'jadwal_groups.master_group_id')
                .join('time_configs', 'jadwal_groups.time_config_id', '=', 'time_configs.id')
                .where('users.id', auth.user?.id!)
                .andWhere('jadwal_groups.date', DateTimeFormated('YYYY-MM-DD', new Date()))
                .select('time_configs.*')
                .first()
            const fetch = await User.findOrFail(auth.user?.id)
            if (await fetch.save()) {
                const permission: string[] = [];
                const call = Database
                    .from('role_has_permissions AS rhp')
                    .join('permissions AS p', 'p.id', '=', 'rhp.permission_id')
                    .join('roles AS r', 'rhp.role_id', '=', 'r.id')
                    .join('users AS u', 'u.role_id', '=', 'r.id')
                    .where('u.id', fetch.id)
                    .select('p.name AS permissionsname');
                (await call).forEach(el => {
                    permission.push(el.permissionsname)
                });
                const rolename = await Role.find(fetch.role_id)
                const deptname = await Dept.find(fetch.dept_id)
                const q = {
                    "id": fetch.id,
                    'role_id': fetch.role_id,
                    'dept_id': fetch.dept_id,
                    'name': fetch.name,
                    'email': fetch.email,
                    'nik': fetch.nik,
                    'activation': fetch.activation,
                    'avatar': fetch.avatar,
                    'work_location': fetch.work_location,
                    'saldo_cuti': fetch.saldo_cuti,
                    'hp': fetch.hp,
                    'status': fetch.status,
                    'tgl_join': fetch.tgl_join,
                    'limit_kasbon': fetch.limit_kasbon,
                    "role_name": rolename?.rolename,
                    "dept_name": deptname?.deptname,
                    "work_location_detail": {},
                    "jadwal": getJadwal,
                }
                if (fetch.work_location === 'toko') {
                    const x = await Database.rawQuery(`SELECT mt.* FROM users u JOIN user_tokos ut ON u.id = ut.user_id JOIN master_tokos mt ON ut.master_toko_id = mt.id WHERE u.id = ${auth.user?.id};`)
                    q["work_location_detail"] = x[0][0]
                }
                if (fetch.work_location === 'office') {
                    const x = await Database.rawQuery(`SELECT mo.* FROM users u JOIN user_offices uo ON u.id = uo.user_id JOIN master_offices mo ON uo.master_office_id = mo.id WHERE u.id = ${auth.user?.id};`)
                    q["work_location_detail"] = x[0][0]
                }
                if (fetch.work_location === 'gudang') {
                    const x = await Database.rawQuery(`SELECT mg.* FROM users u JOIN user_gudangs ug ON u.id = ug.user_id JOIN master_gudangs mg ON ug.master_gudang_id = mg.id WHERE u.id = ${auth.user?.id};`)
                    q["work_location_detail"] = x[0][0]
                }
                return response.send({ status: true, data: { user: q, permission }, msg: 'success' })
            }
        } catch (error) {
            console.log(error);

            return response.send({ status: false, data: error.messages, msg: 'error' })
        }
    }
    /*
    |--------------------------------------------------------------------------
    | PROFILE UPDATE::FUNCTION
    |--------------------------------------------------------------------------
    */
    public async profileUpdate({ response, request, auth }: HttpContextContract) {
        try {
            const user = await User.findOrFail(auth.user?.id)
            const payload = await request.validate(UserValidatorUpdate)
            if (request.file('avatar') != null) {
                const payimg = await request.validate(AvatarValidator)
                const filePath = Application.tmpPath(`uploads/avatar-users/${user.avatar}`)
                await Drive.delete(filePath)
                await payimg.avatar.move(Application.tmpPath('uploads/avatar-users'), {
                    name: `${payload.nik}.jpg`,
                    overwrite: true,
                })
                user.avatar = payimg.avatar.fileName as string
            }
            if (request.input('password') != null) {
                const paypass = await request.validate(PasswordValidator)
                user.password = paypass.password
            }
            user.role_id = payload.role_id
            user.dept_id = payload.dept_id
            user.name = payload.name
            user.email = payload.email != null ? payload.email : ''
            user.nik = payload.nik
            user.activation = payload.activation
            user.work_location = payload.work_location
            user.saldo_cuti = payload.saldo_cuti
            await user.save()
            return response.send({ status: true, data: payload, msg: 'success' })
        } catch (error) {
            return response.send({ status: false, data: error.messages, msg: 'error' })
        }
    }
    /*
    |--------------------------------------------------------------------------
    | LOGOUT::FUNCTION
    |--------------------------------------------------------------------------
    */
    public async logout({ auth, response }: HttpContextContract) {
        try {
            if (await auth.check()) {
                const updateUser = await User.findOrFail(auth.user?.id)
                if (await updateUser.save()) {
                    auth.use("api").logout()
                }
            }
            const msg = (await auth.check()) ? 'Success logout' : 'Invalid Credential'
            return response.send({ status: true, data: msg, msg: 'success' })
        } catch (error) {
            return response.send({ status: false, data: error.messages, msg: 'error' })
        }
    }
    /*
    |--------------------------------------------------------------------------
    | BERANDA CHART::FUNCTION
    |--------------------------------------------------------------------------
    */
    public async beranda({ response }: HttpContextContract) {
        try {
            const chart_cuti_once = await Database.rawQuery(`SELECT COUNT(*) as count, MONTHNAME(date) as month_name FROM form_cutis where YEAR(date) = date('Y') AND req_type = 'once' GROUP BY month_name`)
            const chart_cuti_range = await Database.rawQuery(`SELECT COUNT(*) as count, MONTHNAME(date) as month_name FROM form_cutis where YEAR(date) = date('Y') AND req_type = 'range' GROUP BY month_name`)
            const month1: string[] = [];
            const month2: string[] = [];
            const once: number[] = [];
            const range: number[] = [];
            chart_cuti_once[0].forEach(element => {
                month1.push(element.month_name)
            });
            chart_cuti_range[0].forEach(element => {
                month2.push(element.month_name)
            });
            var Q = arrayUnique(month1.concat(month2));
            const label = Q.sort(function (a, b) {
                return a - b;
            })
            label.forEach(bulan => {
                let obj = chart_cuti_once[0].find(o => o.month_name === bulan);
                if (obj !== undefined) {
                    once.push(obj.count)
                } else {
                    once.push(0)
                }
            });
            label.forEach(bulan => {
                let obj = chart_cuti_range[0].find(o => o.month_name === bulan);
                if (obj !== undefined) {
                    range.push(obj.count)
                } else {
                    range.push(0)
                }
            });

            const chart_resign = await Database.rawQuery(`SELECT COUNT(*) as count, MONTHNAME(created_at) as month_name FROM resigns where YEAR(created_at) = date('Y') GROUP BY month_name;`)
            const bln: string[] = [];
            const val: number[] = [];
            chart_resign[0].forEach(element => {
                bln.push(element.month_name)
            });
            var B = arrayUnique(bln);
            const labelResign = B.sort(function (a, b) {
                return a - b;
            })
            labelResign.forEach(bulan => {
                let obj = chart_resign[0].find(o => o.month_name === bulan);
                if (obj !== undefined) {
                    val.push(obj.count)
                } else {
                    val.push(0)
                }
            });

            const chart_izin_1 = await Database.rawQuery(`SELECT COUNT(*) as count, MONTHNAME(date) as month_name, permit_req FROM form_izins where YEAR(date) = date('Y') AND permit_req = 'come to late' GROUP BY month_name`)
            const chart_izin_2 = await Database.rawQuery(`SELECT COUNT(*) as count, MONTHNAME(date) as month_name, permit_req FROM form_izins where YEAR(date) = date('Y') AND permit_req = 'sick' GROUP BY month_name`)
            const chart_izin_3 = await Database.rawQuery(`SELECT COUNT(*) as count, MONTHNAME(date) as month_name, permit_req FROM form_izins where YEAR(date) = date('Y') AND permit_req = 'not present' GROUP BY month_name`)
            const chart_izin_4 = await Database.rawQuery(`SELECT COUNT(*) as count, MONTHNAME(date) as month_name, permit_req FROM form_izins where YEAR(date) = date('Y') AND permit_req = 'other' GROUP BY month_name`)
            const monthIzin1: string[] = [];
            const monthIzin2: string[] = [];
            const monthIzin3: string[] = [];
            const monthIzin4: string[] = [];
            const permit1: string[] = [];
            const permit2: string[] = [];
            const permit3: string[] = [];
            const permit4: string[] = [];
            const charts: number[] = [];
            chart_izin_1[0].forEach(element => {
                permit1.push(element.permit_req)
                monthIzin1.push(element.month_name)
            });
            chart_izin_2[0].forEach(element => {
                permit2.push(element.permit_req)
                monthIzin2.push(element.month_name)
            });
            chart_izin_3[0].forEach(element => {
                permit3.push(element.permit_req)
                monthIzin3.push(element.month_name)
            });
            chart_izin_4[0].forEach(element => {
                permit4.push(element.permit_req)
                monthIzin4.push(element.month_name)
            });
            var Q = arrayUnique(permit1.concat(permit2, permit3, permit4));
            const labelizin = Q.sort(function (a, b) {
                return a - b;
            })
            labelizin.forEach(permit => {
                let obj = chart_izin_1[0].find(o => o.permit_req === permit);
                if (obj !== undefined) {
                    charts.push(obj.count)
                }
            });
            labelizin.forEach(permit => {
                let obj = chart_izin_2[0].find(o => o.permit_req === permit);
                if (obj !== undefined) {
                    charts.push(obj.count)
                }
            });
            labelizin.forEach(permit => {
                let obj = chart_izin_3[0].find(o => o.permit_req === permit);
                if (obj !== undefined) {
                    charts.push(obj.count)
                }
            });
            labelizin.forEach(permit => {
                let obj = chart_izin_4[0].find(o => o.permit_req === permit);
                if (obj !== undefined) {
                    charts.push(obj.count)
                }
            });

            return response.send({
                status: true, data: {
                    cutichart: { label, once, range },
                    izinchart: {
                        labelizin, charts
                    },
                    resign: {
                        labelResign, val
                    }
                }, msg: 'success'
            })
            // return response.send({ status: true, data: msg, msg: 'success' })
        } catch (error) {
            return response.send({ status: false, data: error.messages, msg: 'error' })
        }
    }
}
