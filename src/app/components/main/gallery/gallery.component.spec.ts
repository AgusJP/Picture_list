import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalleryComponent } from './gallery.component';
import { RandomPicturesService } from 'src/app/services/randomPictures/random-pictures.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FilterTextPipe } from 'src/app/pipes/filterPictures/filter-text.pipe';
import { PictureComponent } from '../picture/picture.component';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  let randomPicturesService: RandomPicturesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GalleryComponent, PictureComponent, FilterTextPipe],
      providers: [RandomPicturesService],
      imports: [InfiniteScrollModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    randomPicturesService = TestBed.inject(RandomPicturesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with data', () => {
    const spy = spyOn(randomPicturesService, 'generateRandomData').and.returnValue([
      { id: 1, photo: 'url1', text: 'Text 1' },
      { id: 2, photo: 'url2', text: 'Text 2' }
    ]);
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(component.currentData.length).toBe(10);
  });

  it('should load more data on scroll', () => {
    const initialDataLength = component.currentData.length;
    component.onScroll();
    expect(component.currentData.length).toBeGreaterThan(initialDataLength);
  });

  it('should render pictures with ngFor', () => {
    component.currentData = [
      { id: 1, photo: 'url1', text: 'Text 1' },
      { id: 2, photo: 'url2', text: 'Text 2' }
    ];
    fixture.detectChanges();
    const elements = fixture.nativeElement.querySelectorAll('.gallery app-picture');
    expect(elements.length).toBe(2);
  });

  it('should not render noFilterPictures message when currentData is not empty', () => {
    component.currentData = [
      { id: 1, photo: 'url1', text: 'Text 1' }
    ];
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.noFilterPictures');
    expect(element).toBeFalsy();
  });
});