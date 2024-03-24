/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Application from '@ioc:Adonis/Core/Application'

Route.group(() => {
  Route.get('images/:folder/:filename', async ({ params, response }) => {
    const folder=params.folder.split("&")
    if (folder.length > 1) {
      const filePath = Application.tmpPath(`uploads/${folder[0]}/${folder[1]}/${params.filename}`)
      return response.attachment(filePath)
    }else{
      const filePath = Application.tmpPath(`uploads/${folder[0]}/${params.filename}`)
      return response.attachment(filePath)
    }
  })
  Route.post("register", "WebApps/AuthController.register");
  Route.post("login", "WebApps/AuthController.login");
  Route.group(() => {
    Route.get("profile", "WebApps/AuthController.profile");
    Route.get("beranda", "WebApps/AuthController.beranda");
    Route.post("profile-update", "WebApps/AuthController.profileUpdate");
    Route.post("logout", "WebApps/AuthController.logout");
    Route.resource("users", "WebApps/MasterData/UsersController").apiOnly();
    Route.get("attr_form", "WebApps/MasterData/UsersController.attr_form",);
    Route.get("user-approval", "WebApps/MasterData/UsersController.user_approval",);
    Route.resource("role", "WebApps/MasterData/RolesController").apiOnly();
    Route.resource("permission", "WebApps/MasterData/PermissionsController").apiOnly();
    Route.resource("dept", "WebApps/MasterData/DeptsController").apiOnly();
    Route.resource("role-permission", "WebApps/Feature/SetRolePermissionsController").apiOnly();
    Route.resource("master-toko", "WebApps/MasterData/MasterTokoController").apiOnly();
    Route.resource("master-office", "WebApps/MasterData/MasterOfficeController").apiOnly();
    Route.resource("master-gudang", "WebApps/MasterData/MasterGudangController").apiOnly();
    Route.resource("absensi", "WebApps/Tools/AbsensiController").apiOnly();
    Route.resource("pelanggan", "WebApps/MasterData/PelangganController").apiOnly();
    Route.resource("form-cuti", "WebApps/Form/CutisController").apiOnly();
    Route.put("form-cuti/approval/:id", "WebApps/Form/CutisController.approval");
    Route.get("report-cuti", "WebApps/Form/CutisController.report");
    Route.get("report-cuti-export", "WebApps/Form/CutisController.exportreport");
    Route.resource("form-izin", "WebApps/Form/IzinsController").apiOnly();
    Route.put("form-izin/approval/:id", "WebApps/Form/IzinsController.approval");
    Route.get("report-izin", "WebApps/Form/IzinsController.report");
    Route.get("report-izin-export", "WebApps/Form/IzinsController.exportreport");
    Route.resource("form-lembur", "WebApps/Form/LembursController").apiOnly();
    Route.put("form-lembur/approval/:id", "WebApps/Form/LembursController.approval");
    Route.get("report-lembur", "WebApps/Form/LembursController.report");
    Route.get("report-lembur-export", "WebApps/Form/LembursController.exportreport");
    Route.resource("form-perdin", "WebApps/Form/PerdinsController").apiOnly();
    Route.put("form-perdin/approval/:id", "WebApps/Form/PerdinsController.approval");
    Route.get("report-perdin", "WebApps/Form/PerdinsController.report");
    Route.get("report-perdin-export", "WebApps/Form/PerdinsController.exportreport");
    Route.resource("form-reimburs", "WebApps/Form/ReimbursController").apiOnly();
    Route.get("report-reimburs", "WebApps/Form/ReimbursController.report");
    Route.get("report-reimburs-export", "WebApps/Form/ReimbursController.exportreport");
    Route.put("form-reimburs/approval/:id", "WebApps/Form/ReimbursController.approval");
    Route.resource("jadwal-group", "WebApps/Form/JadwalGroupsController").apiOnly();
    Route.get("jadwal-group-attr-form", "WebApps/Form/JadwalGroupsController.attr_form");
    Route.resource("master-group", "WebApps/Form/MasterGroupsController").apiOnly();
    Route.resource("user-group", "WebApps/Form/UserGroupsController").apiOnly();
    Route.resource("time-config", "WebApps/Form/TimeConfigsController").apiOnly();
    Route.get("time-config-jadwal-user", "WebApps/Form/TimeConfigsController.jadwal_user");
    Route.resource("jadwal-istirahat", "WebApps/Feature/JadwalIstirahatsController").apiOnly();
    Route.get("jadwal-istirahat-attr-form", "WebApps/Feature/JadwalIstirahatsController.attr_form");
    Route.get("report-jadwal-istirahat", "WebApps/Feature/JadwalIstirahatsController.report");
    Route.get("report-jadwal-istirahat-export", "WebApps/Feature/JadwalIstirahatsController.exportreport");
    Route.resource("master-piket", "WebApps/MasterData/MasterPiketsController").apiOnly();
    Route.resource("jadwal-piket", "WebApps/Feature/UserPiketsController").apiOnly();
    Route.get("jadwal-piket-attr-form", "WebApps/Feature/UserPiketsController.attr_form");
    Route.get("report-jadwal-piket", "WebApps/Feature/UserPiketsController.report");
    Route.get("report-jadwal-piket-export", "WebApps/Feature/UserPiketsController.exportreport");
    
    Route.get("absensi-chart", "WebApps/Tools/AbsensiController.chart");
    Route.get("absensi-report", "WebApps/Tools/AbsensiController.laporan");
    
    Route.resource("variable-gaji", "WebApps/Feature/VariableGajisController").apiOnly();
    Route.resource("formula-gaji", "WebApps/Feature/FormulaGajisController").apiOnly();
    Route.post("formula-gaji/generate", "WebApps/Feature/FormulaGajisController.generate");
    Route.resource("gaji", "WebApps/Feature/GajisController").apiOnly();
    Route.get("report-gaji", "WebApps/Feature/GajisController.report");
    Route.get("report-gaji-export", "WebApps/Feature/GajisController.exportreport");
    Route.get("gaji-selip/:userId", "WebApps/Feature/GajisController.selip");
    Route.resource("resign", "WebApps/Feature/ResignsController").apiOnly();
    Route.resource("kasbon", "WebApps/Feature/KasbonsController").apiOnly();
    Route.get("kasbon-create", "WebApps/Feature/KasbonsController.create");
    Route.get("kasbon-user", "WebApps/Feature/KasbonsController.user");
    Route.get("kasbon-report", "WebApps/Feature/KasbonsController.report");
    Route.get("report-kasbon-export", "WebApps/Feature/KasbonsController.exportreport");
  }).middleware("auth:api");
}).prefix("api");

Route.group(() => {
  Route.group(() => {
    Route.resource("piket-istirahat", "WebApps/Notification/PiketIstirahatsController").apiOnly();
    Route.resource("info", "WebApps/Notification/InfoController").apiOnly();
  }).middleware("auth:api");
}).prefix("fetch-notification");
