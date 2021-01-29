import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../models/credencias.dto";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage_service";

@Injectable()
export class AuthService {

    constructor(public http: HttpClient, public storage: StorageService) {
    }

    authenticate(creeds: CredenciaisDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/login`,
            creeds,
            {
                observe: 'response',
                responseType: 'text'
            })
    }

    successfullLogin(authorizationValue: string) {
        let tok = authorizationValue.substring(7);
        let user: LocalUser = {
            token: tok
        };
        this.storage.setLocasUser(user);
    }

    logout() {
        this.storage.setLocasUser(null);
    }

}