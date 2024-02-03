import { Component, OnInit } from '@angular/core';

import { RxStompService } from '@stomp/ng2-stompjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-delivery-map',
  templateUrl: './delivery-map.component.html',
  styleUrls: ['./delivery-map.component.css'],
})
export class DeliveryMapComponent implements OnInit {
  private serverUrl = 'http://localhost:8080/socket';
  private stompClient: any;
  isLoaded: boolean = false;
  isCustomSocketOpened = false;
  public points: number[][] = [];
  map!: Map;

  constructor() {}

  ngOnInit(): void {
    this.initializeWebSocketConnection();
    this.initMap();
  }

  initMap() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([19.824826, 45.24632]),
        zoom: 16,
      }),
    });
  }

  // Funkcija za otvaranje konekcije sa serverom
  initializeWebSocketConnection() {
    // serverUrl je vrednost koju smo definisali u registerStompEndpoints() metodi na serveru
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;

    this.stompClient.connect({}, function () {
      that.isLoaded = true;
      that.openGlobalSocket();
    });
  }

  // Funckija za pretplatu na topic /socket-publisher (definise se u configureMessageBroker() metodi)
  // Globalni socket se otvara prilikom inicijalizacije klijentske aplikacije
  openGlobalSocket() {
    if (this.isLoaded) {
      this.stompClient.subscribe(
        '/socket-publisher',
        (message: { body: string }) => {
          let jsonList = message.body;
          this.points = JSON.parse(jsonList);
          // Define coordinates for the path (list of points)
          const coordinates = this.points.map((coord) =>
            fromLonLat(coord as [number, number])
          );

          // Create a path feature
          const path = new Feature({
            geometry: new LineString(coordinates),
          });

          // Create a vector layer to display the path
          const vectorLayer = new VectorLayer({
            source: new VectorSource({
              features: [path],
            }),
          });

          // Add the vector layer to the map
          this.map.addLayer(vectorLayer);
        }
      );
    }
  }
}
