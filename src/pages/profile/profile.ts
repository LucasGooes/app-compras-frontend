import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage_service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocasUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response;
          //BUSCAR IMAGEM DO BUCKET S3
          //
        },
          error => { });
    }
  }
/*METODO PARA BUSCAR IMAGEM DO CLIENTE NO BUCKET
    QUANDO CONSEGUIR ACESSO AO S3
getImageExists() {
this.clienteService.getImageFromBucket(this.cliente.id)
.subscribe(response => {
this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
},
error => {}
);
}
*/
}
