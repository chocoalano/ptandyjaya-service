import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/MasterData/Users/User';
import { permissionGuard } from 'App/helper';

export default class ResignPolicy extends BasePolicy {
	public async viewList(user: User) {
		return permissionGuard(user.role_id, 'resign-viewList')
	}
	public async view(user: User) {
		return permissionGuard(user.role_id, 'resign-view')
	}
	public async create(user: User) { 
		return permissionGuard(user.role_id, 'resign-create')
	}
	public async update(user: User) {
		return permissionGuard(user.role_id, 'resign-update')
	}
	public async delete(user: User) {
		return permissionGuard(user.role_id, 'resign-delete')
	}
}
