import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent implements OnInit {

  labelsResponse: any[];
  labels = [];
  currentLanguage;
  displayLabels = {};

  constructor(private router: Router) {


  }

  invalidEmail: boolean;
  emptyEmail: boolean;
  invalidPassword: boolean;

  isIE: boolean;

  showLoading: boolean = false;
  showGeneralConfirm: boolean = false;
  confirmHeading = "Attention";
  confirmContent;
  cancelValue = null;
  confirmValue = "Continue";

  test: boolean = false;

  user = { email: "", password: "" };

  currentUser = { access_token: "", firstName: "", lastName: "", profilePic: "", role: "", email: "", access: [], UserIdentityId: "" };

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  signin(): void {

    this.showLoading = true;


  }

  goTo(pass) {

  }

  ngOnInit() {

    // IE detector
    this.isIE = false;
    // Get IE or Edge browser version
    var version = this.detectIE();

    if (version === false) {
      console.log('not IE/Edge');
    } else if (version >= 12) {
      console.log('Edge');
    } else {
      console.log('IE' + version);
      this.isIE = true;
      localStorage.setItem('isIE', JSON.stringify(true));
    }

    var loginLabels = [{
      langCode: "en",
      labels: [
        {
          Id: "login-1", LabelDefault: "Email", Label: "Email"
        },
        {
          Id: "login-2", LabelDefault: "Email", Label: "Password"
        },
        {
          Id: "login-3", LabelDefault: "Email", Label: "Sign In"
        },
        {
          Id: "login-4", LabelDefault: "Email", Label: "Forgot Password?"
        },
        {
          Id: "login-5", LabelDefault: "Email", Label: "Invalid email format"
        },
        {
          Id: "login-6", LabelDefault: "Email", Label: "Password field empty"
        },
        {
          Id: "login-7", LabelDefault: "Email", Label: "Email field empty"
        }
      ]
    },
    {
      langCode: "fr",
      labels: [
        {
          Id: "login-1", LabelDefault: "Email", Label: "Email"
        },
        {
          Id: "login-2", LabelDefault: "Email", Label: "Mot de passe"
        },
        {
          Id: "login-3", LabelDefault: "Email", Label: "Connecxion"
        },
        {
          Id: "login-4", LabelDefault: "Email", Label: "Mot de passe oublié?"
        },
        {
          Id: "login-5", LabelDefault: "Email", Label: "Format de email invalide"
        },
        {
          Id: "login-6", LabelDefault: "Email", Label: "Champ de mot de passe vide"
        },
        {
          Id: "login-7", LabelDefault: "Email", Label: "Champ de email vide"
        }
      ]
    }
    ];

    localStorage.setItem('loginLabels', JSON.stringify(loginLabels));

    if (JSON.parse(localStorage.getItem('userLanguage')))
      this.currentLanguage = JSON.parse(localStorage.getItem('userLanguage'));
    else
      this.currentLanguage = 'en';

    this.labels = JSON.parse(localStorage.getItem('loginLabels'));

    this.labels.forEach(function (item, index) {

      if (item.langCode == this.currentLanguage) {
        for (var i = 0; i < item.labels.length; i++) {
          this.displayLabels[item.labels[i].Id] = item.labels[i].Label;
        }
      }
    }.bind(this));

  }

  /*
   * detect IE
   * returns version of IE or false, if browser is not Internet Explorer
   */

  detectIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }
    // other browser
    return false;
  }

}
