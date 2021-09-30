import { IGROUP } from "../types/document/IGROUP";
import MainGruop from "../repositories/gruop.repositories";
import { GroupSchema } from "../model/group.model";
import { SaveGruopReq, DeletGruopReq, AddUserInGruop, MessageInGroup, ReturnGroupMessage, CheckingMessage } from "../types/request/group.request";
import { Get, Route, Tags, Post, Body, Path, Put, Delete, SuccessResponse, Security } from "tsoa";
import CustomeError from '../utills/error';
import { SaveUpdateResgroup } from "../types/responce/group.responce";
@Route('group')
@Tags('Group')
export default class GroupController {
  constructor() { }

  /** only admin create the groups */
  @Security('api_key')
  @Post('/savegrop')
  async saveGrop(@Body() group: SaveGruopReq): Promise<SaveUpdateResgroup> {
    const new_grop: IGROUP = <any>await new MainGruop().saveGroup(group)
    return <SaveUpdateResgroup>new_grop;
  }

  /** only admin delete the groups */
  @Security('api_key')
  @Delete('/deletegrop')
  @SuccessResponse("200", "User is deleted")
  async deleteGrop(@Body() delReq: DeletGruopReq) {
    return await new MainGruop().deletGroup(delReq._id);
  }

  /** only admin can add member in the groups */
  @Security('api_key')
  @Post('/addmembertogroup')
  async addMembertoGroup(@Body() req: AddUserInGruop): Promise<SaveUpdateResgroup> {
    const add_member: IGROUP = <any>await new MainGruop().addMemberToGroup(req.gruopId)
    return <SaveUpdateResgroup>add_member;

  }

  // if admin want to checkmessages in the group
  @Security('api_key')
  @Post('/returnmessages')
  async returnGropMessage(@Body() req: ReturnGroupMessage): Promise<SaveUpdateResgroup> {
    const add_member: IGROUP = <any>await new MainGruop().returnMessages(req._id)
    return <SaveUpdateResgroup>add_member;

  }

  // save controller function controller 

  @Post('/savemessages')
  async SaveMessage(@Body() req: MessageInGroup): Promise<SaveUpdateResgroup> {
    const add_member: IGROUP = <any>await new MainGruop().returnMessages(req.groupId)
    return <SaveUpdateResgroup>add_member;

  }

  // Here check some words in messages 
  @Security('api_key')
  @Post('/checkingMessage')
  async checkingMesage(@Body() req: CheckingMessage): Promise<SaveUpdateResgroup> {
    const add_member: IGROUP = <any>await new MainGruop().returnMessages(req._id)
    return <SaveUpdateResgroup>add_member;
  }

}