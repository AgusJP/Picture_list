import { Injectable } from "@angular/core";
import { randomTexts } from "src/app/data/random-texts";
import { Picture } from "src/app/interfaces/picture.interface";

@Injectable({
  providedIn: "root",
})
export class RandomPicturesService {
  private readonly totalElements: number = 4000;

  constructor() {}

  public generateRandomData(): Picture[] {
    const data = [];
    for (let i = 1; i <= this.totalElements; i++) {
      const id = i;
      const photo = this.generateRandomImageURL(id);
      const text = this.generateRandomText();
      data.push({ id, photo, text });
    }
    return data;
  }

  private generateRandomImageURL(id: number): string {
    return `https://picsum.photos/id/${id}/500/500`;
  }

  private generateRandomText(): string {
    // Generate a random index for the array of random texts
    const randomIndex = Math.floor(Math.random() * randomTexts.length);
    // Return a random text from the array
    return randomTexts[randomIndex];
  }
}
