import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/MasterData/Users/User';
import { permissionGuard } from 'App/helper';

export default class MasterOfficePolicy extends BasePolicy {
	public async viewList(user: User) {
		return permissionGuard(user.role_id, 'masteroffice-viewList')
	}
	public async view(user: User) {
		return permissionGuard(user.role_id, 'masteroffice-view')
	}
	public async create(user: User) { 
		return permissionGuard(user.role_id, 'masteroffice-create')
	}
	public async update(user: User) {
		return permissionGuard(user.role_id, 'masteroffice-update')
	}
	public async delete(user: User) {
		return permissionGuard(user.role_id, 'masteroffice-delete')
	}
}
