import { USERSchema } from "../model/user.model";
import { IUSER } from "../types/document/IUSER";
import { LogInReqUSER } from "../types/request/user.request";

export default class MainUser {
  constructor() { }

  /**save User function   */
  saveUser(user: IUSER) {
    return new USERSchema(user).save();
  }

  /**Update User function   */
  updateUser(user: IUSER) {
    return USERSchema.findByIdAndUpdate(user._id, user, {
      new: true
    });
  }

  /**Delete User function   */
  deletUser(_id: string) {
    return USERSchema.findByIdAndDelete(_id);
  }

  /**Login User function   */
  loginUser(loginuser: LogInReqUSER) {

    return USERSchema.findOne({ UserName: loginuser.UserName, Password: loginuser.Password })

  }
}