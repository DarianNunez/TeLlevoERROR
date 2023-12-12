import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AutheticationService } from 'src/app/authetication.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
})
export class SingupPage implements OnInit {
  regForm: FormGroup
  
  constructor(public formBuilder: FormBuilder, public loadingCntrl: LoadingController, public authService: AutheticationService, public router: Router) { 

  }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      rut: ['',[
        Validators.required,
        Validators.pattern("^[0-9]+[-|‐]{1}[0-9kK]{1}$")]],
      nombreCompleto: ['',[Validators.required]],
      correo: ['',[
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")
      ]],
      clave: ['',[
        Validators.required,
        Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{8,}")]]/* Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters */
    })
  }

  get errorControl(){
    return this.regForm?.controls;
  }

  async singUp(){
    const loading = await this.loadingCntrl.create();
    await loading.present();
    if(this.regForm?.valid){
      const user = await this.authService.registerUser(this.regForm.value.correo, this.regForm.value.clave).catch((error)=>{
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
