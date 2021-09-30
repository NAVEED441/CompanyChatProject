export interface SaveReqAdmin {
    Name: string;
    Email: string;
    Password: string;
}
export interface UpdateReqAdmin {
    _id: string;
    Name: string;
    Email: string;
    Password: string;
}
export interface LoginAdmin {
    Email: string;
    Password: string;
}