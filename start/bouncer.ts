/**
 * Contract source: https://git.io/Jte3T
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Bouncer from '@ioc:Adonis/Addons/Bouncer'

/*
|--------------------------------------------------------------------------
| Bouncer Actions
|--------------------------------------------------------------------------
|
| Actions allows you to separate your application business logic from the
| authorization logic. Feel free to make use of policies when you find
| yourself creating too many actions
|
| You can define an action using the `.define` method on the Bouncer object
| as shown in the following example
|
| ```
| 	Bouncer.define('deletePost', (user: User, post: Post) => {
|			return post.user_id === user.id
| 	})
| ```
|
|****************************************************************
| NOTE: Always export the "actions" const from this file
|****************************************************************
*/
/*
|--------------------------------------------------------------------------
| Bouncer Policies
|--------------------------------------------------------------------------
|
| Policies are self contained actions for a given resource. For example: You
| can create a policy for a "User" resource, one policy for a "Post" resource
| and so on.
|
| The "registerPolicies" accepts a unique policy name and a function to lazy
| import the policy
|
| ```
| 	Bouncer.registerPolicies({
|			UserPolicy: () => import('App/Policies/User'),
| 		PostPolicy: () => import('App/Policies/Post')
| 	})
| ```
|
|****************************************************************
| NOTE: Always export the "policies" const from this file
|****************************************************************
*/
export const { policies } = Bouncer.registerPolicies({
    // masterdata permission group
    UserPolicy: () => import('App/Policies/MasterData/UserPolicy'),
    RolePolicy: () => import('App/Policies/MasterData/RolePolicy'),
    PermissionPolicy: () => import('App/Policies/MasterData/PermissionPolicy'),
    PelangganPolicy: () => import('App/Policies/MasterData/PelangganPolicy'),
    MasterTokoPolicy: () => import('App/Policies/MasterData/MasterTokoPolicy'),
    JadwalPiketPolicy: () => import('App/Policies/MasterData/JadwalPiketPolicy'),
    MasterOfficePolicy: () => import('App/Policies/MasterData/MasterOfficePolicy'),
    MasterGudangPolicy: () => import('App/Policies/MasterData/MasterGudangPolicy'),
    DeptPolicy: () => import('App/Policies/MasterData/DeptPolicy'),
    // tools permissions group
    AbsensiPolicy: () => import('App/Policies/Tools/AbsensiPolicy'),
    // feature permissions group
    GajiPolicy: () => import('App/Policies/Feature/GajiPolicy'),
    JadwalIstirahatPolicy: () => import('App/Policies/Feature/JadwalIstirahatPolicy'),
    KasbonPolicy: () => import('App/Policies/Feature/KasbonPolicy'),
    ResignPolicy: () => import('App/Policies/Feature/ResignPolicy'),
    // form permissions group
    CutiPolicy: () => import('App/Policies/Form/CutiPolicy'),
    IzinPolicy: () => import('App/Policies/Form/IzinPolicy'),
    JadwalGroupPolicy: () => import('App/Policies/Form/JadwalGroupPolicy'),
    LemburPolicy: () => import('App/Policies/Form/LemburPolicy'),
    MasterGroupPolicy: () => import('App/Policies/Form/MasterGroupPolicy'),
    PerdinPolicy: () => import('App/Policies/Form/PerdinPolicy'),
    ReimbursPolicy: () => import('App/Policies/Form/ReimbursPolicy'),
    TimeConfigPolicy: () => import('App/Policies/Form/TimeConfigPolicy'),
    UserGroupPolicy: () => import('App/Policies/Form/UserGroupPolicy'),
})
