import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { provideHttpClient } from '@angular/common/http';
import { SnowflakeComponent } from '../threejs/snowflake/snowflake.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let snowflakeComponent: SnowflakeComponent;
  let snowflakeFixture: ComponentFixture<SnowflakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    snowflakeFixture = TestBed.createComponent(SnowflakeComponent);
    snowflakeComponent = snowflakeFixture.componentInstance;
    snowflakeFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain text "If no such route out there - try another way" on the page', () => {
    const text: HTMLElement = fixture.nativeElement;
    expect(text.textContent).toContain(
      'If no such route out there - try another way'
    );
  });

  it('should contain text "or go home" on the page', () => {
    const text: HTMLElement = fixture.nativeElement;
    expect(text.textContent).toContain('or go home');
  });

  it('should contain text "404" on the page', () => {
    const text: HTMLElement = fixture.nativeElement;
    expect(text.textContent).toContain('404');
  });

  it('should contain Snowflake Component on the page', () => {
    expect(snowflakeComponent).toBeTruthy();
  });

  it('should contain text background image on the page', () => {
    const backgroundDiv: HTMLElement = fixture.nativeElement;
    const divWithBackgroundImage = backgroundDiv.querySelector('.not_found') as HTMLButtonElement;
    expect(divWithBackgroundImage?.style.backgroundImage).toBe(
      `url("./pics/shrine-bamboo-lantern-night-snow-torii-winter.jpg")`
    );
  });

  /* it(`should have the 'snowflake' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('snowflake');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, snowflake');
  }); */
});
