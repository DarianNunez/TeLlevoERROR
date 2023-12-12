import { Component } from '@angular/core';
import { AutheticationService } from '../authetication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: any

  constructor(public router:Router, public authService:AutheticationService) {
    this.user = authService.getProfile()
  }

  async desconectar(){
    this.authService.singOut().then(()=>{
      this.router.navigate(['/landing'])
    }).catch((error)=>{
      console.log(error);
    })

  }

}
