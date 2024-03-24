import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/MasterData/Users/User';
import { permissionGuard } from 'App/helper';

export default class KasbonPolicy extends BasePolicy {
	public async viewList(user: User) {
		return permissionGuard(user.role_id, 'kasbon-viewList')
	}
	public async view(user: User) {
		return permissionGuard(user.role_id, 'kasbon-view')
	}
	public async create(user: User) { 
		return permissionGuard(user.role_id, 'kasbon-create')
	}
	public async update(user: User) {
		return permissionGuard(user.role_id, 'kasbon-update')
	}
	public async delete(user: User) {
		return permissionGuard(user.role_id, 'kasbon-delete')
	}
}
