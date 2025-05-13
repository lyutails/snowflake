import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { isPlatformBrowser } from '@angular/common';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

@Component({
  selector: 'app-snowflake',
  standalone: true,
  imports: [],
  templateUrl: './snowflake.component.html',
  styleUrl: './snowflake.component.scss',
})
export class SnowflakeComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas')
  private canvasRef!: ElementRef;
  private loaderGLTF = new GLTFLoader();

  @Input() public rotationSpeedX: number = 0.02;
  @Input() public rotationSpeedY: number = 0.02;
  @Input() public size: number = 200;
  @Input() public texture: string =
    '/public/assets/pics/frost-and-ice-on-a-screen1.jpg';
  @Input() public cameraZ: number = 400;
  @Input() public fieldOfView: number = 1;
  @Input('nearClipping') public nearClippingPlane: number = 1;
  @Input('farClippinig') public farClippingPlane: number = 1000;

  private camera!: THREE.PerspectiveCamera;
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  // private loader = new THREE.TextureLoader();
  // private geometry = new THREE.BoxGeometry(1, 1, 1);
  // private material = new THREE.MeshBasicMaterial({ map: this.loader.load(this.texture) });
  // private snowflake: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private snowflake: any;
  private ambientLight!: THREE.AmbientLight;
  private directionalLight!: THREE.DirectionalLight;
  private lightOne!: THREE.PointLight;
  private lightTwo!: THREE.PointLight;
  private lightThree!: THREE.PointLight;
  private lightFour!: THREE.PointLight;
  private controls!: OrbitControls;
  public isBrowser = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: InjectionToken<Object>,
    private http: HttpClient
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {}

  private createScene() {
    if (this.isBrowser) {
      this.scene = new THREE.Scene();

      const loaderGLTF = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('./draco/');
      loaderGLTF.setDRACOLoader(dracoLoader);

      const snowflakeModelGLB =
        '/3d_glb/snowflake_compressed_01-v1.glb';

      loaderGLTF.load(snowflakeModelGLB, (gltf: GLTF) => {
        this.snowflake = gltf.scene.children[0];
        this.scene.add(this.snowflake);
        this.snowflake.scale.set(3.5, 3.5, 3.5);
      });

      let aspectRatio = this.getAspectRatio();
      this.camera = new THREE.PerspectiveCamera(
        this.fieldOfView,
        aspectRatio,
        this.nearClippingPlane,
        this.farClippingPlane
      );
      this.camera.position.z = this.cameraZ;

      this.ambientLight = new THREE.AmbientLight(0xffffff);
      this.scene.add(this.ambientLight);

      this.directionalLight = new THREE.DirectionalLight(0x4bd3ff, 0.6);
      this.directionalLight.position.set(0, 1, 0);
      this.directionalLight.castShadow = true;
      this.scene.add(this.directionalLight);
      this.lightOne = new THREE.PointLight(0xff2bf2, 80);
      this.lightOne.position.set(0, 10, -10);
      this.scene.add(this.lightOne);
      this.lightTwo = new THREE.PointLight(0x4bffd3, 60);
      this.lightTwo.position.set(10, -10, 0);
      this.scene.add(this.lightTwo);
      this.lightThree = new THREE.PointLight(0xb83cff, 60);
      this.lightThree.position.set(1, 5, 1);
      this.scene.add(this.lightThree);
      this.lightFour = new THREE.PointLight(0x25cdf1, 60);
      this.lightFour.position.set(3, -5, 2);
      this.scene.add(this.lightFour);
    }
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private animSnowflake() {
    if (this.snowflake) {
      this.snowflake.rotation.x += this.rotationSpeedX;
      this.snowflake.rotation.y += this.rotationSpeedY;
    }
  }

  private startRenderingLoop() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
    });
    this.renderer.setClearColor(0x000000, 0);
    this.scene.background = null;
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: SnowflakeComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animSnowflake();
      component.renderer.render(component.scene, component.camera);
    })();
  }

  private createControls = () => {
    const renderer = new CSS2DRenderer();
    renderer.setSize(this.canvas.width, this.canvas.height);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0px';
    document.body.appendChild(renderer.domElement);
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.controls.autoRotate = true;
    this.controls.enableZoom = true;
    this.controls.enablePan = true;
    this.controls.update();
  };

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.createScene();
      this.startRenderingLoop();
      this.createControls();
    }
  }
}
