import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/MasterData/Users/User';
import { permissionGuard } from 'App/helper';

export default class PermissionPolicy extends BasePolicy {
	public async viewList(user: User) {
		return permissionGuard(user.role_id, 'permission-viewList')
	}
	public async view(user: User) {
		return permissionGuard(user.role_id, 'permission-view')
	}
	public async create(user: User) { 
		return permissionGuard(user.role_id, 'permission-create')
	}
	public async update(user: User) {
		return permissionGuard(user.role_id, 'permission-update')
	}
	public async delete(user: User) {
		return permissionGuard(user.role_id, 'permission-delete')
	}
}
