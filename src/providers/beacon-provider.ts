import { Injectable } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { IBeacon } from 'ionic-native';
import {AlertController} from 'ionic-angular';
import { ViewController } from 'ionic-angular';




/*
  Generated class for the BeaconProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BeaconProvider {

  delegate: any;
  region: any;
  mensage: any;

  constructor(public platform: Platform, public events: Events,
     private alertController: AlertController) {
  }

  initialise(): any {
    let promise = new Promise((resolve, reject) => {
      // we need to be running on a device
      if (this.platform.is('cordova')) {
        this.mensage="Entra a la condicion this.platform.is('cordova')";
       // this.presentAlert();
        // Request permission to use location on iOS
        IBeacon.requestAlwaysAuthorization();
        // create a new delegate and register it with the native layer
        this.delegate = IBeacon.Delegate();

        // Subscribe to some of the delegate's event handlers
        this.delegate.didRangeBeaconsInRegion()
          .subscribe(
          data => {
            this.events.publish('didRangeBeaconsInRegion', data);
          },
          error => console.error()
          );


        //this.region = IBeacon.BeaconRegion(‘deskBeacon’,’f7826da6-4fa2-4e98-8024-bc5b71e0893e’);
        //this.region = IBeacon.BeaconRegion(‘deskBeacon’,’784fabe2-373b-4b72-8d55-33280f4f64e7′);
        //this.region = IBeacon.BeaconRegion('deskBeacon','e6c56db5-dffb-48d2-b088-40f5a81496ee');
        //this.region = IBeacon.BeaconRegion('estimote', 'b9407f30-f5f8-466e-aff9-25556b57fe6d');
        this.region = IBeacon.BeaconRegion('deskBeacon','FDA50693-A4E2-4FB1-AFCF-C6EB07647825');
//FDA50693A4E24FB1AFCFC6EB07647825
//FDA50693A4E24FB1AFCFC6EB07647825
        // start ranging
        IBeacon.startRangingBeaconsInRegion(this.region)
          .then(
          () => {
            resolve(true);
          },
          error => {
            this.mensage= "Failed to begin monitoring: " + error;
            resolve(false);
          }
          );
      } else {
        this.mensage = "else error This application needs to be running on a device";
        this.presentAlert();
        resolve(false);
      }
    });
    return promise;
  }
  presentAlert(){
    let alert = this.alertController.create({
      title: 'Alert',
      subTitle: 'ok: ' + this.mensage,
      buttons: ['Dismiss']
    });
    alert.present();
  }


}
