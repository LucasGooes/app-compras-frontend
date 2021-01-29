import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ClienteDTO } from "../../models/cliente.dto";
import { StorageService } from "../storage_service";

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient,
        public storage: StorageService) {
    }

    findByEmail(email: string): Observable<ClienteDTO> {
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    /* METODO PARA BUSCAR IMAGEM DO CLIENTE NO BUCKET
    QUANDO CONSEGUIR ACESSO AO S3
        getImageFromBucket(id : string) : Observable<any> {
            let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
            return this.http.get(url, {responseType : 'blob'});
        }   
    */


}