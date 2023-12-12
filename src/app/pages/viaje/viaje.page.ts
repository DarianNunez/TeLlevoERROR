import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutheticationService } from 'src/app/authetication.service';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {
  
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

  ngOnInit() {
  }

}
