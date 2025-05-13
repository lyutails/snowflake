import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { SnowflakeComponent } from './snowflake.component';

describe('SnowflakeComponent', () => {
  let component: SnowflakeComponent;
  let fixture: ComponentFixture<SnowflakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnowflakeComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(SnowflakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain canvas element for snowflake component on the page', () => {
    const snowflakeCanvas: HTMLElement = fixture.nativeElement;
    const canvasElement = snowflakeCanvas.querySelector('.snowflake') as HTMLCanvasElement;
    expect(canvasElement).toBeTruthy();
  });
});
