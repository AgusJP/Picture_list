import { Picture } from 'src/app/interfaces/picture.interface';
import { FilterTextPipe } from './filter-text.pipe';

describe('FilterTextPipe', () => {
  let pipe: FilterTextPipe;

  beforeEach(() => {
    pipe = new FilterTextPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('filters pictures by text', () => {
    const searchText = 'cat';
    const pictures: Picture[] = [
      { id: 1, photo: 'image1.jpg', text: 'A cute cat' },
      { id: 2, photo: 'image2.jpg', text: 'A dog' },
      { id: 3, photo: 'image3.jpg', text: 'Another cat' }
    ];

    const filteredPictures = pipe.transform(pictures, searchText);

    expect(filteredPictures).not.toBeNull(); 
    expect(filteredPictures!.length).toBe(2); 
    expect(filteredPictures![0].text).toContain(searchText);
    expect(filteredPictures![1].text).toContain(searchText);
  });

  it('returns null when no matching pictures found', () => {
    const searchText = 'bird';
    const pictures: Picture[] = [
      { id: 1, photo: 'image1.jpg', text: 'A cute cat' },
      { id: 2, photo: 'image2.jpg', text: 'A dog' },
      { id: 3, photo: 'image3.jpg', text: 'Another cat' }
    ];

    const filteredPictures = pipe.transform(pictures, searchText);

    expect(filteredPictures).toBeNull(); 
  });

  it('returns the original array when searchText is empty', () => {
    const searchText = '';
    const pictures: Picture[] = [
      { id: 1, photo: 'image1.jpg', text: 'A cute cat' },
      { id: 2, photo: 'image2.jpg', text: 'A dog' },
      { id: 3, photo: 'image3.jpg', text: 'Another cat' }
    ];

    const filteredPictures = pipe.transform(pictures, searchText);

    expect(filteredPictures).toEqual(pictures); 
  });
});