import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/MasterData/Users/User';
import { permissionGuard } from 'App/helper';

export default class ReimbursPolicy extends BasePolicy {
	public async viewList(user: User) {
		return permissionGuard(user.role_id, 'reimburs-viewList')
	}
	public async view(user: User) {
		return permissionGuard(user.role_id, 'reimburs-view')
	}
	public async create(user: User) { 
		return permissionGuard(user.role_id, 'reimburs-create')
	}
	public async update(user: User) {
		return permissionGuard(user.role_id, 'reimburs-update')
	}
	public async delete(user: User) {
		return permissionGuard(user.role_id, 'reimburs-delete')
	}
}
