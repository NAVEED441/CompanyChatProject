import { AdminSchema } from "../model/admin.model";
import { SaveReqAdmin, UpdateReqAdmin, LoginAdmin } from "../types/request/admin.request";
export class MainAdmin {
    constructor() { }

    /** Save Admin in repositories  */
    saveAdmin(savereq: SaveReqAdmin) {
        return new AdminSchema(savereq).save();
    };

    /** Update Admin in repositories  */
    updateAdmin(updatereq: UpdateReqAdmin) {
        return AdminSchema.findByIdAndUpdate(updatereq._id, updatereq, {

            new: true
        });
    };

    /** Login Admin in repositories  */
    loginAdmin(loginadmin: LoginAdmin) {

        return AdminSchema.findOne({ Email: loginadmin.Email, Password: loginadmin.Password })

    }
}