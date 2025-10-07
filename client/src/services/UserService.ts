import type {AxiosResponse} from "axios";
import $api from "../http";
import type {IUser} from "../models/response/IUser.ts";


export default class UserService {

    static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users' )
    }

}