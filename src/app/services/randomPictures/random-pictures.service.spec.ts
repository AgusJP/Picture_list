import { TestBed } from "@angular/core/testing";

import { RandomPicturesService } from "./random-pictures.service";
import { Picture } from "src/app/interfaces/picture.interface";

describe("RandomPicturesService", () => {
  let service: RandomPicturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RandomPicturesService],
    });
    service = TestBed.inject(RandomPicturesService);
  });

  it("RandomPicturesService should be created", () => {
    expect(service).toBeTruthy();
  });

  it("Should generate random data with 4000 pictures", () => {
    const pictures: Picture[] = service.generateRandomData();
    expect(pictures.length).toBe(4000);
  });

  it("Should generate data with correct structure", () => {
    const pictures: Picture[] = service.generateRandomData();
    const firstPicture = pictures[0];
    expect(firstPicture.id).toBeDefined();
    expect(firstPicture.photo).toBeDefined();
    expect(firstPicture.text).toBeDefined();
  });

  it("Should generate random data with valid image URLs", () => {
    const pictures: Picture[] = service.generateRandomData();
    pictures.forEach((picture) => {
      expect(picture.photo).toContain(
        `https://picsum.photos/id/${picture.id}/500/500`,
      );
    });
  });

  it("Should generate random data with existing random texts", () => {
    const pictures: Picture[] = service.generateRandomData();
    pictures.forEach((picture) => {
      expect(picture.text).toBeTruthy();
    });
  });
});
