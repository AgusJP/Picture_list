/* Angular Core */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
/* External libraries */
import { InfiniteScrollModule } from "ngx-infinite-scroll";
/* Custom Components */
import { MainComponent } from "./main.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { SearchInputComponent } from "./search-input/search-input.component";
import { PictureComponent } from "./picture/picture.component";
/* Custom Pipes */
import { FilterTextPipe } from "src/app/pipes/filterPictures/filter-text.pipe";

@NgModule({
  declarations: [
    MainComponent,
    SearchInputComponent,
    GalleryComponent,
    PictureComponent,
    FilterTextPipe,
  ],
  imports: [CommonModule, FormsModule, InfiniteScrollModule],
  exports: [MainComponent],
})
export class MainModule {}
