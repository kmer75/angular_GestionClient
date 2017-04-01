import { Animations } from './../shared/animation';
import { AdminService } from './../admin.service';
import { Admin } from 'app/admin';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Component, OnInit,trigger,
  state,
  style,
  transition,
  animate, ElementRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
declare var jQuery: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  host: { '[@routeAnimation]': 'true' },
  animations: Animations.page
})
export class AdminComponent implements OnInit {

    constructor(
      private location : Location, 
      private router : Router,
       private adminService : AdminService, 
       private formBuilder: FormBuilder, 
       private elementRef: ElementRef) { }

    admin: Admin = {
    nom: '', prenom: '',
    imgPath: ''
  }

  adminForm: FormGroup = null;

    changeState() {
    this.state = !this.state;
  }

  state: boolean = false;

  onCancel() {
    this.location.back();
  }

  onSubmit() {
    console.log(this.adminForm.value);
    this.state = true;
    if (!this.adminForm.valid) {
      alert("formulaire non valide !");
      this.changeState();
      return;
    }
    console.log('avant');
    console.log(this.adminService.admin);
    var adminSaved: Admin = this.adminForm.value as Admin;
    this.adminService.update(adminSaved) //code a remplir
    console.log('apres');
    console.log(this.adminService.admin);
    var that = this;
    setTimeout(function () {
      that.changeState();
      that.location.back();
    }, 2000);
  }



  ngOnInit() {
    jQuery(this.elementRef.nativeElement).find('#clickJson').on('click', function () {

      if (jQuery('#json').is(":visible")) {
        jQuery('#json').slideUp(300);
      } else {
        jQuery('#json').slideDown(300);
      }

    });

    this.buildForm();
  }


  //va maper les element input html avec ces parametre
  buildForm() {
    this.adminForm = this.formBuilder.group({
      
      'nom': [this.admin.nom, [Validators.required, Validators.minLength(2)]],
      'prenom': [this.admin.prenom, [Validators.required, Validators.minLength(2)]],
      'imgPath': [this.admin.imgPath, [Validators.required]]
    });

    this.adminForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  //lorsqu'une valeur de mon formulaire change, on verifie si chaque parametre est conforme a mes validateurs
  onValueChanged(data?: any) {
    if (!this.adminForm) { return; }
    const form = this.adminForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = ''; //a la base les champs d'erreur sont vide
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  //de base les msg d'erreur sont vide, puis prendront la valeur des validation messages si erreur
  formErrors = {
    'nom': '',
    'prenom': '',
    'imgPath': ''
  };

  //lorsque le champs n'a pas ete changé j'affiche ce message de base
  pristineMessages = {
    'nom': 'Veuillez inscrire votre nom',
    'prenom': 'Veuillez inscrire votre prénom',
    'imgPath': 'Veuillez inscrire votre portrait (lien vers une image du net)'
  };

  //message de validation
  validationMessages = {
    'nom': {
      'required': 'le nom est obligatoire.',
      'minlength': 'nom doit contenir au moins 2 caractères.'
    },
    'prenom': {
      'required': 'prenom est obligatoire.',
      'minlength': 'prenom doit contenir au moins 2 caractères.'
    },
    'imgPath': {
      'required': 'portrait est obligatoire.'
    }
  };

}
