import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { provideHttpClient } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain text "If no such route out there - try another way" on the page', () => {
    const text: HTMLElement = fixture.nativeElement;
    expect(text.textContent).toContain('If no such route out there - try another way');
  });

  it('should contain text "or go home" on the page', () => {
    const text: HTMLElement = fixture.nativeElement;
    expect(text.textContent).toContain('or go home');
  });

  it('should contain text "404" on the page', () => {
    const text: HTMLElement = fixture.nativeElement;
    expect(text.textContent).toContain('404');
  });
});
