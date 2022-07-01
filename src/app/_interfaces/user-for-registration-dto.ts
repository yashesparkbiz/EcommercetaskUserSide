export interface UsersModel {
    in :{
        UserName: string;
        Email: string;
        PhoneNumber: string;
        Gender: string;
        Age: number;
        Password: string;
        ConfirmPassword: string;
        Role:string;
    }
}
