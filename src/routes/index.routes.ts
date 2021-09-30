import express from 'express';

import { AdminRoutesApi } from './admin.routes';
import { UserRoutesApi } from './user.routes';
import { GroupRoutesApi } from './group.routes';

export class MainRoutes{
    router:express.Router;
    constructor(){
        this.router = express.Router();
        this.routes()
    }
     routes(){
        
         this.router.use('/admin', AdminRoutesApi);
         this.router.use('/user',UserRoutesApi);
         this.router.use('/group',GroupRoutesApi);
       
     }
}
export const MainApi = new MainRoutes().router;