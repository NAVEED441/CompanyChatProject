import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AdminSchema } from '../model/admin.model';


/** admin Checking  */

export const auth = async (req: Request, res: Response, next: NextFunction) => {
	const token: any = req.header('token');
	if (!token) return res.send("unautharise ")
	const userId: any = jwt.verify(token, 'this is the key');
	//res.locals.useid = userId._id;
	const user = await AdminSchema.findById(userId._id);
	if (user) {
		res.locals.id = userId._id;
		next();
	} else {
		return res.status(400).json({
			message: 'User not found',
		});
	}
};