import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/MasterData/Users/User';
import { permissionGuard } from 'App/helper';

export default class RolePolicy extends BasePolicy {
	public async viewList(user: User) {
		return permissionGuard(user.role_id, 'role-viewList')
	}
	public async view(user: User) {
		return permissionGuard(user.role_id, 'role-view')
	}
	public async create(user: User) { 
		return permissionGuard(user.role_id, 'role-create')
	}
	public async update(user: User) {
		return permissionGuard(user.role_id, 'role-update')
	}
	public async delete(user: User) {
		return permissionGuard(user.role_id, 'role-delete')
	}
}
