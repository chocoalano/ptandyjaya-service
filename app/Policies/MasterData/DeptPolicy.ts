import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/MasterData/Users/User';
import { permissionGuard } from 'App/helper';

export default class DeptPolicy extends BasePolicy {
	public async viewList(user: User) {
		return permissionGuard(user.role_id, 'dept-viewList')
	}
	public async view(user: User) {
		return permissionGuard(user.role_id, 'dept-view')
	}
	public async create(user: User) { 
		return permissionGuard(user.role_id, 'dept-create')
	}
	public async update(user: User) {
		return permissionGuard(user.role_id, 'dept-update')
	}
	public async delete(user: User) {
		return permissionGuard(user.role_id, 'dept-delete')
	}
}
