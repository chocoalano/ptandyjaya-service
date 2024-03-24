import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/MasterData/Users/User';
import { permissionGuard } from 'App/helper';

export default class CutiPolicy extends BasePolicy {
	public async viewList(user: User) {
		return permissionGuard(user.role_id, 'cuti-viewList')
	}
	public async view(user: User) {
		return permissionGuard(user.role_id, 'cuti-view')
	}
	public async create(user: User) { 
		return permissionGuard(user.role_id, 'cuti-create')
	}
	public async update(user: User) {
		return permissionGuard(user.role_id, 'cuti-update')
	}
	public async delete(user: User) {
		return permissionGuard(user.role_id, 'cuti-delete')
	}
}
