import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/MasterData/Users/User';
import { permissionGuard } from 'App/helper';

export default class JadwalPiketPolicy extends BasePolicy {
	public async viewList(user: User) {
		return permissionGuard(user.role_id, 'jadwalpiket-viewList')
	}
	public async view(user: User) {
		return permissionGuard(user.role_id, 'jadwalpiket-view')
	}
	public async create(user: User) { 
		return permissionGuard(user.role_id, 'jadwalpiket-create')
	}
	public async update(user: User) {
		return permissionGuard(user.role_id, 'jadwalpiket-update')
	}
	public async delete(user: User) {
		return permissionGuard(user.role_id, 'jadwalpiket-delete')
	}
}
