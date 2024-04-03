import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchInputComponent } from "./search-input.component";
import { FormsModule } from "@angular/forms";

describe("SearchInputComponent", () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;
  let emitSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchInputComponent],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    emitSpy = spyOn(component['searchSubject'], 'next');
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  
  it('should emit search text on input change', () => {
    const searchText = 'test';
    const searchInput = fixture.nativeElement.querySelector('.container__searchInput');
    searchInput.value = searchText;
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalledWith(searchText);
  });

  it('should debounce search input changes', (done) => {
    const searchText = 'test';
    const searchInput = fixture.nativeElement.querySelector('.container__searchInput');
    searchInput.value = searchText;
    searchInput.dispatchEvent(new Event('input'));

    setTimeout(() => {
      expect(emitSpy).toHaveBeenCalledWith(searchText);
      done();
    }, 500);
  });

  it('should unsubscribe from searchSubject on component destruction', () => {
    const unsubscribeSpy = spyOn(component['searchSubjectSubscription'], 'unsubscribe');
    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
