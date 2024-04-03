import { Component, EventEmitter, Output } from "@angular/core";
import { BehaviorSubject, Subscription, debounceTime } from "rxjs";

@Component({
  selector: "app-search-input",
  templateUrl: "./search-input.component.html",
  styleUrls: ["./search-input.component.scss"],
})
export class SearchInputComponent {
  // BehaviorSubject to manage search text
  private searchSubject = new BehaviorSubject<string>("");
  private searchSubjectSubscription: Subscription;
  public searchText: string = "";
  // EventEmitter to emit changes in searchText
  @Output() private searchTextChange = new EventEmitter<string>();

  constructor() {
    // Subscribe to searchSubject and debounce the emitted values to increase performance
    this.searchSubjectSubscription = this.searchSubject
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.emitSearchText();
      });
  }

  public handleSearch(searchText: string) {
    this.searchSubject.next(searchText);
  }

  private emitSearchText(): void {
    this.searchTextChange.emit(this.searchText);
  }

  ngOnDestroy(): void {
    if (this.searchSubjectSubscription) {
      this.searchSubjectSubscription.unsubscribe();
    }
  }
}
