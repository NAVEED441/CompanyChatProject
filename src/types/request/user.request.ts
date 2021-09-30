export interface SaveReqUSER {

  PictureUrl: string,
  Name: string;
  UserName: string;
  Password: string;

}
export interface UpdateReqUSER {
  _id: string;
  PictureUrl: string,
  Name: string;
  UserName: string;

  Password: string;
}
export interface LogInReqUSER {
  UserName: string;
  Password: string;
}
export interface DeleteUser {
  id: string
}