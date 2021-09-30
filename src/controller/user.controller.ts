import { IUSER } from "../types/document/IUSER";
import MainUser from "../repositories/user.repositories";
import { SaveReqUSER, UpdateReqUSER, LogInReqUSER, DeleteUser } from "../types/request/user.request";
import { Get, Route, Tags, Post, Body, Path, Put, Delete, SuccessResponse, Security } from "tsoa";
import CustomeError from '../utills/error';
import { SaveUpdateResUser } from "../types/responce/user.responce";

@Route('user')
@Tags('User')
export default class UserController {
  constructor() { }

  /**user save controller function but only admin can add the user */
  @Security('api_key')
  @Post('/saveuser')
  async saveUser(@Body() user: SaveReqUSER): Promise<SaveUpdateResUser> {
    const new_user: IUSER = await new MainUser().saveUser(<IUSER>(user));
    return <SaveUpdateResUser>new_user;
  }

  /**User manage its profile */
  @Put('/updateUser')
  async updateUser(@Body() user: UpdateReqUSER): Promise<SaveUpdateResUser> {
    const update_user: IUSER = await new MainUser().updateUser(<IUSER>(user));
    if (update_user === null)
      throw new CustomeError(400, 'User not updated');
    return <SaveUpdateResUser>update_user;
  }

  /**Only admin can delete User */
  @Security('api_key')
  @Delete('/deleteUser')
  @SuccessResponse("200", "User is deleted")
  async deletadmin(@Body() delReq: DeleteUser) {
    return await new MainUser().deletUser(delReq.id);
  }


  /**user login  */
  @Post('/loginUser')
  async loginUser(@Body() loginReq: LogInReqUSER): Promise<SaveUpdateResUser> {
    const loginuser: IUSER = <any>await new MainUser().loginUser(loginReq);
    return <SaveUpdateResUser>loginuser;
  }

}