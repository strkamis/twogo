import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Validacoes } from '../shared/models/validacoes';
import { User } from '../shared/models/usuarios';
import { AuthService } from '../shared/services/auth-service';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  FormRegister: FormGroup;
  IsRegistered: User;
  status = {
    isDanger: true,
    valid: true };
  MsgError = '';

  constructor(private fb: FormBuilder,
              public authService: AuthService,
              public API: ApiService) { }

  ngOnInit(): void {
    this.newRegisterForm();
    this.status.valid = true;
    this.authService.status.valid = true;
  }
  NewRegister() {
    this.status.valid = true;

    if (this.FormRegister.valid) {
      const FormData = this.FormRegister.value;
      const registered = this.userExists(FormData.email);
      if (!registered) {

      const user = new User(
        FormData.name,
        FormData.email,
        FormData.cpf,
        FormData.cnpj,
        FormData.phone,
        FormData.namecomercial,
        // false
      );

      this.authService.SignUp(FormData.email, FormData.password);
      this.API.createUser(user).subscribe(
        res => { console.log('Novo usuário add com sucesso'); },
        err => { console.log('falha:' + err); }
        );
      } else {
        this.status.isDanger = true;
        this.status.valid = false;
        this.MsgError = 'Usuário já está registrado!';
      }
    } else {
      this.status.isDanger = true;
      this.status.valid = false;
      this.MsgError = 'Verifique os campos do seu formulário!';
    }
    // console.log(`O usuário ${user.name} foi cadastrado com sucesso. \n Dados: ${JSON.stringify(user)}`);
  }

  userExists(email: string): boolean {
    this.IsRegistered = undefined;
    this.API.getUser(email).subscribe((data) => {
      this.IsRegistered = data;
      console.log(data);
    });
    return (this.IsRegistered !== undefined);

  }
  newRegisterForm() {
    this.FormRegister = this.fb.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ])
      ],
      email: [
        '',
        Validators.compose([
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'),
          Validators.required
        ])
      ],
      cpf: [
        '',
        Validators.compose([
          Validators.required,
          Validacoes.ValidaCpf,
          Validators.maxLength(11)])
      ],
      cnpj: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]{9}')
        ])
      ],
      phone: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]{5,11}' )
        ])
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
        ])
      ],
      confirmPassword: ['', Validators.compose([Validators.required])]
    },
    {
      validator: Validacoes.CombinePwd
    }
    );
  }

  get name() {
    return this.FormRegister.get('name');
  }
  get email() {
    return this.FormRegister.get('email');
  }
  get cpf() {
    return this.FormRegister.get('cpf');
  }
  get cnpj() {
    return this.FormRegister.get('cnpj');
  }
  get phone() {
    return this.FormRegister.get('phone');
  }
  get password() {
    return this.FormRegister.get('password');
  }
  get confirmPassword() {
    return this.FormRegister.get('confirmPassword');
  }
  get nameComercial() {
    return this.FormRegister.get('namecomercial');
  }

}


