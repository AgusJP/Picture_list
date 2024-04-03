import { Component, Input } from "@angular/core";
import { Picture } from "src/app/interfaces/picture.interface";
import { RandomPicturesService } from "src/app/services/randomPictures/random-pictures.service";

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.scss"],
})
export class GalleryComponent {
  private readonly itemsPerPage: number = 10;
  // Array to store all random pictures in memory
  private jsonData: Picture[] = [];
  // Array to store currently displayed picture data step by step out of 10
  public currentData: Picture[] = [];
  @Input() public searchText: string = "";

  constructor(private randomPicturesService: RandomPicturesService) {}

  ngOnInit(): void {
    this.jsonData = this.randomPicturesService.generateRandomData();
    this.loadMoreData();
  }

  public onScroll() {
    this.loadMoreData();
  }

  private loadMoreData(): void {
    // Calculate start and end index of the next set of data to load
    const startIndex = this.currentData.length;
    const endIndex = startIndex + this.itemsPerPage;
    // Check if endIndex is within bounds of jsonData
    if (endIndex <= this.jsonData.length) {
      // Concatenate the next set of data to the currentData array
      this.currentData = this.currentData.concat(
        this.jsonData.slice(startIndex, endIndex),
      );
    }
  }

  trackByIdPicture(index: number, picture: Picture): number {
    return picture.id;
  }
}
