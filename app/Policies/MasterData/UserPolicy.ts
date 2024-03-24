import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/MasterData/Users/User';
import { permissionGuard } from 'App/helper';

export default class UserPolicy extends BasePolicy {
	public async viewList(user: User) {
		return permissionGuard(user.role_id, 'user-viewList')
	}
	public async view(user: User, model: User) {
		const cek = permissionGuard(user.role_id, 'user-view')
		if (!cek) {
			return model.id === user.id
		}
		return cek
	}
	public async create(user: User) { 
		return permissionGuard(user.role_id, 'user-create')
	}
	public async update(user: User, model: User) {
		const cek = permissionGuard(user.role_id, 'user-update')
		if (!cek) {
			return model.id === user.id
		}
		return cek
	}
	public async delete(user: User, model: User) {
		const cek = permissionGuard(user.role_id, 'user-delete')
		if (!cek) {
			return model.id === user.id
		}
		return cek
	}
}
