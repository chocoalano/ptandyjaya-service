import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/MasterData/Users/User';
import { permissionGuard } from 'App/helper';

export default class MasterGudangPolicy extends BasePolicy {
	public async viewList(user: User) {
		return permissionGuard(user.role_id, 'mastergudang-viewList')
	}
	public async view(user: User) {
		return permissionGuard(user.role_id, 'mastergudang-view')
	}
	public async create(user: User) { 
		return permissionGuard(user.role_id, 'mastergudang-create')
	}
	public async update(user: User) {
		return permissionGuard(user.role_id, 'mastergudang-update')
	}
	public async delete(user: User) {
		return permissionGuard(user.role_id, 'mastergudang-delete')
	}
}
