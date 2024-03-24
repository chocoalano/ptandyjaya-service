import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/MasterData/Users/User';
import { permissionGuard } from 'App/helper';

export default class PelangganPolicy extends BasePolicy {
	public async viewList(user: User) {
		return permissionGuard(user.role_id, 'masterpelanggan-viewList')
	}
	public async view(user: User) {
		return permissionGuard(user.role_id, 'masterpelanggan-view')
	}
	public async create(user: User) { 
		return permissionGuard(user.role_id, 'masterpelanggan-create')
	}
	public async update(user: User) {
		return permissionGuard(user.role_id, 'masterpelanggan-update')
	}
	public async delete(user: User) {
		return permissionGuard(user.role_id, 'masterpelanggan-delete')
	}
}
