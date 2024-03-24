import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/MasterData/Users/User';
import { permissionGuard } from 'App/helper';

export default class TimeConfigPolicy extends BasePolicy {
	public async viewList(user: User) {
		return permissionGuard(user.role_id, 'timeconfig-viewList')
	}
	public async view(user: User) {
		return permissionGuard(user.role_id, 'timeconfig-view')
	}
	public async create(user: User) { 
		return permissionGuard(user.role_id, 'timeconfig-create')
	}
	public async update(user: User) {
		return permissionGuard(user.role_id, 'timeconfig-update')
	}
	public async delete(user: User) {
		return permissionGuard(user.role_id, 'timeconfig-delete')
	}
}
