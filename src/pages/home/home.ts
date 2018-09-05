// core stuff
import { Component } from '@angular/core';
import { NavController, Platform, Events } from 'ionic-angular';
import { NgZone } from "@angular/core";
import {AlertController} from 'ionic-angular';

// plugins
import { IBeacon } from 'ionic-native';

// providers
import { BeaconProvider } from '../../providers/beacon-provider'

// models
import { BeaconModel } from '../../models/beacon-model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  beacons: BeaconModel[] = [];
  zone: any;
  mensage: any;

  constructor(public navCtrl: NavController, public platform: Platform,
    public beaconProvider: BeaconProvider, public events: Events,
    private alertController: AlertController) {
    // required for UI update
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.mensage = beaconProvider.mensage;
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.beaconProvider.initialise().then((isInitialised) => {
        this.mensage="entra " + isInitialised;
        this.presentAlertHome();
        if (isInitialised) {
          this.mensage="entra en isInitialised";
          this.presentAlertHome();
          this.listenToBeaconEvents();
        }
      });
    });
  }

  listenToBeaconEvents() {
    this.events.subscribe('didRangeBeaconsInRegion', (data) => {

      // update the UI with the beacon list
      this.mensage= "update the UI with the beacon list";
        this.presentAlertHome();
      this.zone.run(() => {

        this.beacons = [];

        let beaconList = data.beacons;
        beaconList.forEach((beacon) => {
          let beaconObject = new BeaconModel(beacon);
          this.beacons.push(beaconObject);
        });
        this.mensage= this.beacons.length;
        this.presentAlertHome();
      });

    });
  }

  presentAlertHome(){
    let alert = this.alertController.create({
      title: 'Alert',
      subTitle: 'ok: ' + this.mensage,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
