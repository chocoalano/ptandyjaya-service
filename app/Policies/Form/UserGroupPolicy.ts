import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/MasterData/Users/User';
import { permissionGuard } from 'App/helper';

export default class UserGroupPolicy extends BasePolicy {
	public async viewList(user: User) {
		return permissionGuard(user.role_id, 'usergroup-viewList')
	}
	public async view(user: User) {
		return permissionGuard(user.role_id, 'usergroup-view')
	}
	public async create(user: User) { 
		return permissionGuard(user.role_id, 'usergroup-create')
	}
	public async update(user: User) {
		return permissionGuard(user.role_id, 'usergroup-update')
	}
	public async delete(user: User) {
		return permissionGuard(user.role_id, 'usergroup-delete')
	}
}
