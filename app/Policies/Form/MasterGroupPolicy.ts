import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/MasterData/Users/User';
import { permissionGuard } from 'App/helper';

export default class MasterGroupPolicy extends BasePolicy {
	public async viewList(user: User) {
		return permissionGuard(user.role_id, 'mastergroup-viewList')
	}
	public async view(user: User) {
		return permissionGuard(user.role_id, 'mastergroup-view')
	}
	public async create(user: User) { 
		return permissionGuard(user.role_id, 'mastergroup-create')
	}
	public async update(user: User) {
		return permissionGuard(user.role_id, 'mastergroup-update')
	}
	public async delete(user: User) {
		return permissionGuard(user.role_id, 'mastergroup-delete')
	}
}
