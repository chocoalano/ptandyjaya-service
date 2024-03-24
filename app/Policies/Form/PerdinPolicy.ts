import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/MasterData/Users/User';
import { permissionGuard } from 'App/helper';

export default class PerdinPolicy extends BasePolicy {
	public async viewList(user: User) {
		return permissionGuard(user.role_id, 'perdin-viewList')
	}
	public async view(user: User) {
		return permissionGuard(user.role_id, 'perdin-view')
	}
	public async create(user: User) { 
		return permissionGuard(user.role_id, 'perdin-create')
	}
	public async update(user: User) {
		return permissionGuard(user.role_id, 'perdin-update')
	}
	public async delete(user: User) {
		return permissionGuard(user.role_id, 'perdin-delete')
	}
}
