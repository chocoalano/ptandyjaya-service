import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/MasterData/Users/User';
import { permissionGuard } from 'App/helper';

export default class LemburPolicy extends BasePolicy {
	public async viewList(user: User) {
		return permissionGuard(user.role_id, 'lembur-viewList')
	}
	public async view(user: User) {
		return permissionGuard(user.role_id, 'lembur-view')
	}
	public async create(user: User) { 
		return permissionGuard(user.role_id, 'lembur-create')
	}
	public async update(user: User) {
		return permissionGuard(user.role_id, 'lembur-update')
	}
	public async delete(user: User) {
		return permissionGuard(user.role_id, 'lembur-delete')
	}
}
