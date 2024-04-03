import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureComponent } from './picture.component';


describe('PictureComponent', () => {
  let component: PictureComponent;
  let fixture: ComponentFixture<PictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PictureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PictureComponent);
    component = fixture.componentInstance;
    component.picture = {
      id: 1,
      photo: 'https://example.com/image.jpg',
      text: 'Example text',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the picture id', () => {
    const idElement = fixture.nativeElement.querySelector('.picture__id');
    expect(idElement.textContent).toContain('# 1');
  });

  it('should display the picture image', () => {
    const imgElement = fixture.nativeElement.querySelector('.picture__photo');
    expect(imgElement.src).toContain('https://example.com/image.jpg');
  });

  it('should display the picture text', () => {
    const textElement = fixture.nativeElement.querySelector('.picture__text');
    expect(textElement.textContent).toContain('Example text');
  });

  it('should handle image error and hide text', () => {
    const imgElement = fixture.nativeElement.querySelector('.picture__photo');
    const textElement = fixture.nativeElement.querySelector('.picture__text');

    // Simular error de carga de imagen
    const errorEvent = new Event('error');
    imgElement.dispatchEvent(errorEvent);
    fixture.detectChanges();

    expect(imgElement.src).toContain('no-image.webp');
    expect(textElement.classList).toContain('hidden__text');
  });
});