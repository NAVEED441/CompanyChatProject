import { GroupSchema } from "../model/group.model";
import { IGROUP } from "../types/document/IGROUP";
import { SaveGruopReq } from "../types/request/group.request";


export default class MainGruop{
    constructor(){}

    /**Save group repository  */
    saveGroup(gruop:SaveGruopReq){
            return new GroupSchema(gruop).save();
    }
    
    /**this function is not use in the project */
    deletGroup(_id:string){
        return GroupSchema.findByIdAndDelete(_id);
      } 


    /** Add member in Group  */
    addMemberToGroup(_id:string){
        return GroupSchema.findById(_id);
    }

    /** return All messages of the group */
    returnMessages(_id:string){
      return GroupSchema.findById(_id);
    }

    /**send message in the group */
    saveMessage(id:string){
      return GroupSchema.findById(id);
}

    }