import { Pipe, PipeTransform } from "@angular/core";
import { Picture } from "src/app/interfaces/picture.interface";

@Pipe({
  name: "filterPictures",
})
export class FilterTextPipe implements PipeTransform {
  transform(value: Picture[], searchText: string): Picture[] | null {
    if (!value || !searchText) {
      return value;
    }

    const lowerSearchText = searchText.toLowerCase();

    const filteredPictures = value.filter((image: Picture) => {
      const lowerText = image.text.toLowerCase();
      const lowerId = image.id.toString().toLowerCase();
      return (
        lowerText.includes(lowerSearchText) || lowerId.includes(lowerSearchText)
      );
    });

    return filteredPictures.length > 0 ? filteredPictures : null;
  }
}
