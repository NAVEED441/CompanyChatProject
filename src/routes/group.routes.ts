import express from 'express';
import Jwt from 'jsonwebtoken';
import { SaveGruopReq, DeletGruopReq, AddUserInGruop, MessageInGroup, CheckingMessage, ReturnGroupMessage } from "../types/request/group.request";
import GroupController from '../controller/group.controller';
import { auth } from '../middleware/auth';
import { SaveUpdateResgroup } from "../types/responce/group.responce";
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
                const groupname: IGROUP = <any>await new GroupController().returnGropMessage(addmemberreq)

                if (groupname) {



                    res.status(200).json({
                        result: groupname
                    })
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


                    savemesage.Messages.map(e => {
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
                const checkmessage: CheckingMessage = req.body;
                const groupname: IGROUP = <any>await new GroupController().checkingMesage(checkmessage)

                if (groupname) {
                    var message: any = new Array(2)
                    var counter = 0;
                    var countOfWord = 0;
                    groupname.Message.forEach(e => {

                        if (e.Message.search(checkmessage.message) === -1) {


                        } else {
                            message[counter] = e.Message,
                                message[++counter] = e.User,
                                message[++counter] = checkmessage._id
                                message[++counter]=`this is  next member message`
                            counter += 1;
                            countOfWord += 1;
                        }
                        // if (e.Message.search('Salary')) {

                        //     })
                        // }

                    });
                    res.status(200).json({
                        Message: message,
                        Word_Using_count: countOfWord

                    })
                }

            } catch (err) {
                next(err)
            }
        });


    }
}
export const GroupRoutesApi = new GroupRoute().router;