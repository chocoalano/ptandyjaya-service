import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import UserPiket from 'App/Models/MasterData/Users/UserPiket';
import Ws from 'App/Services/Ws';
import { UnlinkFile, UploadFile, uniqueString } from 'App/helper';

export default class PiketIstirahatsController {
  public async index({ auth, response }: HttpContextContract) {
    try {
      const q = await Database
        .from('view_notif_piket_n_istirahat')
        .where('user_id', auth.user?.id!)
        .orderBy('created_at', 'desc')
      const r = await Database
        .from('view_notif_piket_n_istirahat')
        .where('user_id', auth.user?.id!)
        .andWhere('state', 'n')
        .count('* as total')
      return response.send({ status: true, data: { data: q, count: r[0].total }, msg: 'success' })
    } catch (error) {
      console.log(error);
      
      return response.send({ status: false, data: error.messages, msg: 'error' })
    }
  }

  public async store({ }: HttpContextContract) { }

  public async show({ }: HttpContextContract) { }

  public async update({ request, response }: HttpContextContract) {
    try {
      const filebefore = request.file('filebefore', {
        size: '10mb',
        extnames: ['jpg', 'png'],
      })
      const fileafter = request.file('fileafter', {
        size: '10mb',
        extnames: ['jpg', 'png'],
      })

      if (filebefore) {
        const u = await UserPiket.findByOrFail('id', request.param('id'))
        let unique = uniqueString(5)
        if (u.img_before !== '' || u.img_before !== null) {
          UnlinkFile(u.img_before, 'uploads/image-piket')
        }
        UploadFile(filebefore, unique, 'uploads/image-piket')
        u.img_before = `${unique}.${filebefore.extname}`
        await u.save()
        Ws.io.emit('jadwal-piket:piket-image-upload', { u })
      }
      if (fileafter) {
        const u = await UserPiket.findByOrFail('id', request.param('id'))
        let unique = uniqueString(5)
        if (u.img_after !== '' || u.img_after !== null) {
          UnlinkFile(u.img_after, 'uploads/image-piket')
        }
        UploadFile(fileafter, unique, 'uploads/image-piket')
        u.img_after = `${unique}.${fileafter.extname}`
        u.status = 'y'
        await u.save()
        Ws.io.emit('jadwal-piket:piket-image-upload', { u })
      }
      return response.send({ status: true, data: request.input('id'), msg: 'success' })
    } catch (error) {
      console.log(error);
    }
  }

  public async destroy({ }: HttpContextContract) { }
}
