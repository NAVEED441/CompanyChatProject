import express from 'express';
import Jwt from 'jsonwebtoken';
import { SaveGruopReq, DeletGruopReq, AddUserInGruop, MessageInGroup, CheckingMessage, ReturnGroupMessage } from "../types/request/group.request";
import GroupController from '../controller/group.controller';
import { auth } from '../middleware/auth';
import { SaveUpdateResgroup, CheckMsgResGroup } from "../types/responce/group.responce";
import { IGROUP } from '../types/document/IGROUP';
import e from 'express';
import { Res } from '@tsoa/runtime';


export class GroupRoute {
    router: express.Router;
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {

        /**  only admin can group create*/
        this.router.post('/savegrop', auth, async (req, res, next) => {
            try {
                const savereq: SaveGruopReq = req.body;
                const new_group: SaveUpdateResgroup = await new GroupController().saveGrop(savereq)
                res.status(200).json({
                    message: new_group
                });

            } catch (error) {
                next(error)
            }
        });

        /** only admin delete the group */
        this.router.delete("/deletegrop", auth, async (req, res, next) => {
            try {

                const getReqId: DeletGruopReq = req.body;
                const delReq = await new GroupController().deleteGrop(getReqId);
                res.status(200).json({
                    message: "Gruop is Deleted"
                });

            }
            catch (error) {
                next(error);
            }
        });

        /** Only admin can add member in the group */
        this.router.post('/addmembertogroup', auth, async (req, res, next) => {
            try {
                const addmemberreq: AddUserInGruop = req.body;
                const groupname: IGROUP = <any>await new GroupController().addMembertoGroup(addmemberreq)

                if (groupname) {
                    groupname.Member.map(e => {


                    })
                    groupname.Member.push({
                        UserId: addmemberreq.id
                    });
                    const new_member: SaveUpdateResgroup = await new GroupController().saveGrop(groupname)

                    res.status(200).json({
                        result: "Member is added"
                    })
                }
                else {
                    res.json({
                        result: 'grop not found'
                    })
                }



            } catch (err) {
                next(err)
            }
        });

        /**return groups mesasges by sending group Id  */
        this.router.post('/returnmessages', auth, async (req, res, next) => {

            try {
                const addmemberreq: ReturnGroupMessage = req.body;
                const groupname: SaveUpdateResgroup[] = <any>await new GroupController().returnGropMessage(addmemberreq)
                let result: any[]=[]
                if(groupname){
                groupname.map((element: any) => {
                    let groupResult: CheckMsgResGroup = {
                        Group: element.Msg,
                        Result: []
                    }
                    
                  
                    element.Message.map((message: any) => {
                        
                        if(message.Message.toLowerCase().includes(addmemberreq.Msg.toLowerCase())) {
                            groupResult.Result.push({
                                User: message.User,
                                Message: message.Message
                            })
                        }
                    })
                    if (groupResult.Result.length > 0) {
                        result.push(groupResult)
                    }
                })
                 res.json(result)
            }

            } catch (err) {
                next(err)
            }
        });

       

        /** save message in the group */
        this.router.post('/savemessages', async (req, res, next) => {
            try {
                const savemesage: MessageInGroup = req.body;
                const groupname: IGROUP = <any>await new GroupController().SaveMessage(savemesage)

                if (groupname) {


                    savemesage.Message.map(e => {
                        groupname.Message.push({
                            User: e.User,
                            Message: e.Message

                        });
                    })


                    const new_member: SaveUpdateResgroup = await new GroupController().saveGrop(groupname)

                    res.status(200).json({
                        result: "Message is send"
                    })
                }
                else {
                    res.status(200).json({
                        result: "Message is fail"
                    })
                }

            } catch (err) {
                next(err)
            }
        });

        /** searching message in the group */
        this.router.post('/checkingMessage', auth, async (req, res, next) => {
            try {
                const addmemberreq: CheckingMessage = req.body;
                const groupname: SaveUpdateResgroup[] = <any>await new GroupController().checkingMesage(addmemberreq)
                let result: any[]=[]
                if(groupname){
                groupname.map((element: any) => {
                    let groupResult: CheckMsgResGroup = {
                        Group: element.Msg,
                        Result: []
                    }
                    
                    console.log('first group')
                    element.Message.map((message: any) => {
                      console.log(message.User)
                        if(message.Message.toLowerCase().includes(addmemberreq.Msg.toLowerCase()) &&  message.User.toString() === addmemberreq.UserId.toString() ) {
                            groupResult.Result.push({
                                User: message.User,
                                Message: message.Message
                            })
                        }
                    })
                    if (groupResult.Result.length > 0) {
                        result.push(groupResult)
                    }
                })
                 res.json(result)
            }

            } catch (err) {
                next(err)
            }
        });

       

    }
   
}

export const GroupRoutesApi = new GroupRoute().router;


