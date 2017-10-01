import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse  } from '@ionic-native/facebook';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;

  isLoggedIn: boolean = false;
  userData: any = null;
  fbLoggedIn: boolean = false;

  constructor(public navCtrl: NavController, private googlePlus: GooglePlus, private facebook: Facebook) {

  }

  login() {
    console.log("Clicking")
    this.googlePlus.login({})
      .then(res => {
        console.log(res);
        this.displayName = res.displayName;
        this.email = res.email;
        this.familyName = res.familyName;
        this.givenName = res.givenName;
        this.userId = res.userId;
        this.imageUrl = res.imageUrl;
        this.isLoggedIn = true;
      })
      .catch(err => console.error(err));
  }

  logout() {
    this.googlePlus.logout()
      .then(res => {
        console.log(res);
        this.displayName = "";
        this.email = "";
        this.familyName = "";
        this.givenName = "";
        this.userId = "";
        this.imageUrl = "";

        this.isLoggedIn = false;
      })
      .catch(err => console.error(err));
  }

  loginWithFB() {
    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.facebook.api('me?fields=id,name,email,first_name,last_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
        this.fbLoggedIn = true;
      });
    });
  }

  logoutFromFB(){
    this.facebook.logout().then(res => {
        this.userData = null;
        this.fbLoggedIn = false;
    });
  }


}
