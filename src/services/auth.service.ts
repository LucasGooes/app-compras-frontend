import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelper } from "angular2-jwt";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../models/credencias.dto";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage_service";

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

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
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocasUser(user);
    }

    logout() {
        this.storage.setLocasUser(null);
    }

}