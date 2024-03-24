import Application from '@ioc:Adonis/Core/Application'
import Drive from '@ioc:Adonis/Core/Drive'
import Database from '@ioc:Adonis/Lucid/Database'
import moment from 'moment'
export async function UploadFile(file, namefile, pathtarget) {
    return await file.move(Application.tmpPath(pathtarget), {
        name: `${namefile}.${file.extname}`,
        overwrite: true,
    })
}
export async function UnlinkFile(namefile, pathtarget) {
    const filePath = Application.tmpPath(`${pathtarget}/${namefile}`)
    return await Drive.delete(filePath)
}
export function DateTimeFormated(format, date) {
    return moment(date).format(format)
}
export function uniqueString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
export function uniqueDatime(xDate) {
    return xDate.getFullYear().toString(10).substring(2)
        + (xDate.getMonth() + 1).toString(10).padStart(2, '0')
        + xDate.getDate().toString(10).padStart(2, '0')
        + xDate.getHours().toString(10).padStart(2, '0')
        + xDate.getMinutes().toString(10).padStart(2, '0')
        + xDate.getSeconds().toString(10).padStart(2, '0')
}

export function arrayUnique(array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
}

export function gaji_variable(variable_name, bobot, gajiperhari, periode, total_absen) {
    switch (variable_name) {
        case 'Total Gaji':
            return gajiperhari / bobot * 100;
        case 'Jumlah hari perbulan':
            const dateparse = new Date(periode)
            return new Date(dateparse.getFullYear(), dateparse.getMonth() + 1, 0).getDate();
        case 'Total absensi perbulan':
            return (gajiperhari * total_absen) / bobot * 100;
    }
}

export function errMsg(error) {
    switch (error.code) {
        case 'ER_DUP_ENTRY':
            return { msg: `${error.sqlMessage}`, status: 500 }
            break;

        default:
            break;
    }
}

export async function permissionGuard(params: number, name: string) {

    const arr: number[] = [];
    const call = await Database
        .from('permissions')
        .join('role_has_permissions', 'permissions.id', '=', 'role_has_permissions.permission_id')
        .join('roles', 'role_has_permissions.role_id', '=', 'roles.id')
        .where('permissions.name', name)
        .select('role_has_permissions.role_id');
    call.forEach(el => {
        arr.push(el.role_id)
    });
    return arr.includes(params)
}

export const getRandomFromArray = (arr: any[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
}