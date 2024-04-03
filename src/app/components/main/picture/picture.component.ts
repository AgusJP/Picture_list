import { Component, Input } from "@angular/core";
import { Picture } from "src/app/interfaces/picture.interface";

@Component({
  selector: "app-picture",
  templateUrl: "./picture.component.html",
  styleUrls: ["./picture.component.scss"],
})
export class PictureComponent {
  @Input() public picture!: Picture;
  public showText: boolean = true;

  public handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    // Change the URL of the image if it does not exist.
    imgElement.src = "../../../../assets/no-image.webp";
    // Hide the text when the image does not load.
    this.showText = false;
  }
}
