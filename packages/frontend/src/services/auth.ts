import {IAuthService} from "./types";
import {ApiClient, backend} from "./apiClient";

export class AuthService implements IAuthService {
    constructor(private readonly apiClient: ApiClient = backend) {}

    getCurrentUser = async () => {
        const response = await this.apiClient.authorized.users.me.get()
        return response.data
    }

    logout = async () => {
        await this.apiClient.auth.logout.post()
    }
}