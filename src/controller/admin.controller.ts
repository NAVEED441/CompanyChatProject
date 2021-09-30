import { SaveReqAdmin, UpdateReqAdmin, LoginAdmin } from "../types/request/admin.request";
import { Post, Tags, Put, Body, Route, Security } from "tsoa";
import CustomError from '../utills/error';
import { SaveUpdateResAdmin } from "../types/responce/admin.responce";
import { MainAdmin } from "../repositories/admin.repositories";
import { IADMIN } from "../types/document/IADMIN";
@Route('admin')
@Tags('admin')
export class AdminController {
    constructor() { }

    /** Save admin controller  */

    @Post('/saveadmin')
    async saveAdmin(@Body() savreq: SaveReqAdmin): Promise<SaveUpdateResAdmin> {
        const new_admin: IADMIN = await new MainAdmin().saveAdmin(savreq);
        return <SaveUpdateResAdmin>new_admin;
    };

    // update admin controller
    @Put('/updateadmin')
    async updateAdmin(@Body() updatereq: UpdateReqAdmin): Promise<SaveUpdateResAdmin> {
        const updated_admin: IADMIN = await new MainAdmin().updateAdmin(updatereq);
        if (updated_admin === null) {
            throw new CustomError('404', "Admin not found")
        }
        else {
            return <SaveUpdateResAdmin>updated_admin;
        }

    };

    // login Admin controller
    @Post('/loginadmin')
    async loginAdmin(@Body() loginReq: LoginAdmin): Promise<SaveUpdateResAdmin> {
        const loginadmin: IADMIN = <any>await new MainAdmin().loginAdmin(loginReq);
        return <SaveUpdateResAdmin>loginadmin;
    }
}