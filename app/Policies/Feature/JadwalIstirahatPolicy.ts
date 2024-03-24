import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/MasterData/Users/User';
import { permissionGuard } from 'App/helper';

export default class JadwalIstirahatPolicy extends BasePolicy {
	public async viewList(user: User) {
		return permissionGuard(user.role_id, 'jadwalistirahat-viewList')
	}
	public async view(user: User) {
		return permissionGuard(user.role_id, 'jadwalistirahat-view')
	}
	public async create(user: User) { 
		return permissionGuard(user.role_id, 'jadwalistirahat-create')
	}
	public async update(user: User) {
		return permissionGuard(user.role_id, 'jadwalistirahat-update')
	}
	public async delete(user: User) {
		return permissionGuard(user.role_id, 'jadwalistirahat-delete')
	}
}
