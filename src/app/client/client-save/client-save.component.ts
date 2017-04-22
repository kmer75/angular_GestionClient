import { ClientFirebaseService } from './../services/client-firebase.service';
import { ClientService } from './../services/client.service';
import { Animations } from './../../shared/animation';
import { Router } from '@angular/router';
import { Client } from './../Client';
import { Adresse } from './../Adresse';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import {
  Component, NgModule, NgZone, OnInit, ViewChild, ElementRef, AfterViewInit, trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { AgmCoreModule, MapsAPILoader } from 'angular2-google-maps/core';
declare var jQuery: any;

@Component({
  selector: 'app-client-save',
  templateUrl: './client-save.component.html',
  styleUrls: ['./client-save.component.css'],
  host: { '[@routeAnimation]': 'true' },
  animations: Animations.page
})
export class ClientSaveComponent implements OnInit, AfterViewInit {


  client: Client = {
    id : null,
    nom: '', prenom: '', description: '',
    imgPath: '', telephone: '', email: '', genre: '',
    adresse: {
      rue: "",
      zipcode: "",
      ville: "",
      pays: "",
      latitude: 48.8665906,
      longitude: 2.317465200000015
    }
  }

  $key : string;

  public latitude: number;
  public longitude: number;

  public searchControl: FormControl;
  public zoom: number;
  autocomplete: any = null;


  isEdit: boolean = false;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private formBuilder: FormBuilder,
    private clientService: ClientService,
    private clientFbService : ClientFirebaseService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private elementRef: ElementRef,
    private ngZone: NgZone) {

  }


  genres: string[] = ['homme', 'femme'];
  clientForm: FormGroup;
  regexTel = "^[0-9]{10}$";
  regexEmail = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";

  changeState() {
    this.state = !this.state;
  }

  state: boolean = false;

  onCancel() {
    this.location.back();
  }

  onSubmit(key : string) {
    this.state = true;
    if (!this.clientForm.valid) {
      alert("formulaire non valide !");
      this.changeState();
      return;
    }
    
    console.log('formulaire soumis');
    var clientSaved: Client = this.clientForm.value as Client;
    console.log('go methode save');
    this.clientFbService.save(key,clientSaved);
    console.log('apres methode save');
    
    var that = this;
    setTimeout(function () {
      console.log('ds timeout');
      that.changeState();
      console.log('apres changement etat pour le loader');
      that.router.navigate(['/client']);
    }, 2000);
  }

  //determine si c'est la page d'édition d'un user ou de creation
  whichForm() {

    if (this.router.url.indexOf('edit') >= 0) {
      this.isEdit = true;

    } else {
      this.isEdit = false;
    }
  }


  ngOnInit() {


    jQuery(this.elementRef.nativeElement).find('#clickJson').on('click', function () {

      if (jQuery('#json').is(":visible")) {
        jQuery('#json').slideUp(300);
      } else {
        jQuery('#json').slideDown(300);
      }

    });

    /*
          var that = this;
          var $input = jQuery( '.datepicker' ).pickadate({
              formatSubmit: 'yyyy/mm/dd',
              // min: [2015, 7, 14],
              container: '#container',
              // editable: true,
              closeOnSelect: false,
              closeOnClear: false,
              
          })
  
          var picker = $input.pickadate('picker');
          */

    this.whichForm();

    this.buildForm();

    //google map API
    //set google maps defaults
    this.zoom = 5;
    this.latitude = 48.8665906,
      this.longitude = 2.317465200000015

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['geocode'],
        componentRestrictions: { country: 'fr' }
      });
      this.autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
          this.fillInAddress(place);
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 7;
        });
      });
    });

  }

  ngAfterViewInit() {
    this.isEditForm();
  }

  isEditForm() {
    if (this.isEdit) {
      this.route.params
        .switchMap((params: any) => {
          var client = this.clientFbService.getClient(params['id']);
          return client;
        })
        .subscribe((client) => {
          this.client = client as Client;
          this.latitude = client.adresse.latitude;
          this.longitude = client.adresse.longitude;
          this.buildForm();
          this.$key = client.$key;
        });
    }

  }

  //va maper les element input html avec ces parametre
  buildForm() {
    this.clientForm = this.formBuilder.group({
      //'$key' : [this.client.$key],
      'id': [this.client.id],
      'nom': [this.client.nom, [Validators.required, Validators.minLength(2)]],
      'prenom': [this.client.prenom, [Validators.required, Validators.minLength(2)]],
      'email': [this.client.email, [Validators.required, Validators.pattern(this.regexEmail)]],
      'genre': [this.client.genre, [Validators.required]],
      'description': [this.client.description, [Validators.required]],
      'telephone': [this.client.telephone, [Validators.required, Validators.pattern(this.regexTel)]],
      'imgPath': [this.client.imgPath, [Validators.required]],
      'adresse': this.formBuilder.group({
        'rue': [this.client.adresse.rue, [Validators.required]],
        'zipcode': [this.client.adresse.zipcode, [Validators.required]],
        'ville': [this.client.adresse.ville, [Validators.required]],
        'pays': [this.client.adresse.pays, [Validators.required]],
        'latitude': [this.client.adresse.latitude],
        'longitude': [this.client.adresse.longitude]
      }),

    });

    this.clientForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  //lorsqu'une valeur de mon formulaire change, on verifie si chaque parametre est conforme a mes validateurs
  onValueChanged(data?: any) {
    if (!this.clientForm) { return; }
    const form = this.clientForm;

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
    'email': '',
    'genre': '',
    'description': '',
    'telephone': '',
    'adresse.rue': '',
    'adresse.zipcode': '',
    'adresse.ville': '',
    'adresse.pays': '',
    'imgPath': ''
  };

  //lorsque le champs n'a pas ete changé j'affiche ce message de base
  pristineMessages = {
    'nom': 'Veuillez inscrire votre nom',
    'prenom': 'Veuillez inscrire votre prénom',
    'email': 'Veuillez inscrire votre adresse email',
    'genre': 'Veuillez choisir un genre',
    'description': 'Veuillez donner une courte description',
    'telephone': 'Veuillez inscrire votre numéro de téléphone au format : 0102030405',
    'autocomplete': 'Veuillez inscrire votre adresse (autocomplétion de celle-ci)',
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
    'email': {
      'required': 'email est obligatoire.',
      'pattern': 'adresse email non conforme'
    },
    'genre': {
      'required': 'genre est obligatoire.'
    },
    'description': {
      'required': 'description est obligatoire.'
    },
    'telephone': {
      'required': 'telephone est obligatoire.',
      'pattern': 'numéro de telephone non conforme'
    },
    'autocomplete': {
      'required': 'adresse est obligatoire.'
    },
    'adresse.rue': {
      'required': 'rue est obligatoire.'
    },
    'adresse.code postal': {
      'required': 'code postal est obligatoire.'
    },
    'adresse.ville': {
      'required': 'ville est obligatoire.'
    },
    'adresse.pays': {
      'required': 'pays est obligatoire.'
    },
    'imgPath': {
      'required': 'portrait est obligatoire.'
    }
  };

  //creation d'une methode pour afficher la rue car cote vue angular traduit string + string par 'null'
  getRue(): string {
    if (this.autocomplete && this.autocomplete.getPlace() && this.autocomplete.getPlace().address_components) {
      return this.autocomplete.getPlace().address_components[0].long_name + ' ' + this.autocomplete.getPlace().address_components[1].long_name;
    }
    return '';
  }

    getZipcode(): string {
    if (this.autocomplete && this.autocomplete.getPlace() && this.autocomplete.getPlace().address_components) {
      return this.autocomplete.getPlace().address_components[6].long_name;
    }
    return '';
  }

    getVille(): string {
    if (this.autocomplete && this.autocomplete.getPlace() && this.autocomplete.getPlace().address_components) {
      return this.autocomplete.getPlace().address_components[2].long_name;
    }
    return '';
  }

    getPays(): string {
    if (this.autocomplete && this.autocomplete.getPlace() && this.autocomplete.getPlace().address_components) {
      return this.autocomplete.getPlace().address_components[5].long_name;
    }
    return '';
  }

    getLat(): string {
    if (this.autocomplete && this.autocomplete.getPlace() && this.autocomplete.getPlace().geometry) {
      return this.autocomplete.getPlace().geometry.location.lat();
    }
    return '';
  }

    getLng(): string {
    if (this.autocomplete && this.autocomplete.getPlace() && this.autocomplete.getPlace().geometry) {
      return this.autocomplete.getPlace().geometry.location.lng();
    }
    return '';
  }


  //methode google map pour recuperer different champs de l'adresse
  fillInAddress(place) {

    var num = place.address_components[0].long_name;
    console.log(num);
    var rue = place.address_components[1].long_name;
    console.log(rue);
    var ville = place.address_components[2].long_name;
    console.log(ville);
    var pays = place.address_components[5].long_name;
    console.log(pays);
    var zipcode = place.address_components[6].long_name;
    console.log(zipcode);
    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();


    var adresse = {
      rue: num + ' ' + rue,
      ville: ville,
      zipcode: zipcode,
      pays: pays,
      latitude: lat,
      longitude: lng
    }
    // this.rue = rue;
    // this.ville = ville;
    // this.zipcode = zipcode;
    // this.pays = pays;
    // this.latitude = lat;
    // this.longitude = lng;

    this.clientForm.patchValue({
      adresse: adresse
    });

    // this.clientForm.value.rue = rue;
    // this.clientForm.value.ville = ville;
    // this.clientForm.value.zipcode = zipcode;
    // this.clientForm.value.pays = pays;
    // this.clientForm.value.latitude = lat;
    // this.clientForm.value.longitude = lng;

    // jQuery(this.elementRef.nativeElement).ready(function () {
    //         jQuery('#rue').val(num + ' ' + rue);
    //         jQuery('#ville').val(ville);
    //         jQuery('#pays').val(pays);
    //         jQuery('#zipcode').val(zipcode);
    //         jQuery('#lat').val(lat);
    //         jQuery('#lng').val(lng);
    //     });
  }


  //methode google map pour set le marker sur la map
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 5;
      });
    }
  }

}
