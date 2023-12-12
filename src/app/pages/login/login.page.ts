import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AutheticationService } from 'src/app/authetication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup
  
  constructor(public formBuilder: FormBuilder, public loadingCntrl: LoadingController, public authService: AutheticationService, public router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      correo: ['',[
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")
      ]],
      clave: ['',[
        Validators.required,
        Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{8,}")]]
    })
  }

  get errorControl(){
    return this.loginForm?.controls;
  }

  async loginIn(){
    const loading = await this.loadingCntrl.create();
    await loading.present();
    if(this.loginForm?.valid){
      const user = await this.authService.loginUser(this.loginForm.value.correo, this.loginForm.value.clave).catch((error)=>{
        console.log(error);
        loading.dismiss()

      })

      if(user){
        loading.dismiss()
        this.router.navigate(['/home'])
      }else{
        console.log('Favor ingrese credenciales validas')
      }
    }
  }
}

