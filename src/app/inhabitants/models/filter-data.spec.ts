import { FilterData } from './filtar-data';
import { Gnome } from 'src/app/shared/models/gnome';

let inhabitantsList: Gnome[];
let filterData: FilterData;
describe('FilterData', () => {
  beforeEach(() => {
    filterData = new FilterData();

    inhabitantsList = [
      {
        id: 0,
        name: 'Fake 0',
        thumbnail: 'fake-thumbnail.jpg',
        professions: ['prof1'],
        age: 30,
        height: 0,
        weight: 20,
        friends: [],
        hair_color: 'blue'
      },
      {
        id: 1,
        name: 'Fake 2',
        thumbnail: 'fake-thumbnail.jpg',
        professions: ['prof2'],
        age: 20,
        height: 150,
        weight: 60,
        friends: [],
        hair_color: 'pink'
      },
      {
        id: 2,
        name: 'Fake 1',
        thumbnail: 'fake-thumbnail.jpg',
        professions: ['prof1', 'prof2'],
        age: 10,
        height: 300,
        weight: 40,
        friends: [],
        hair_color: 'red'
      }
    ];
  });
  describe('#executeAllStrategies', () => {
    it('Should call all strategy methods', () => {
      const nameStrategySpy = spyOn(filterData, 'nameStrategy');
      const sortingStrategySyp = spyOn(filterData, 'sortingStrategy');
      const ageRangeStrategySyp = spyOn(filterData, 'ageRangeStrategy');
      const weightRangeStrategySyp = spyOn(filterData, 'weightRangeStrategy');
      const heightRangeStrategySyp = spyOn(filterData, 'heightRangeStrategy');
      const hairColorsStrategySyp = spyOn(filterData, 'hairColorsStrategy');
      const professionsStrategySyp = spyOn(filterData, 'professionsStrategy');

      filterData.executeAllStrategies(inhabitantsList);

      expect(nameStrategySpy).toHaveBeenCalled();
      expect(sortingStrategySyp).toHaveBeenCalled();
      expect(ageRangeStrategySyp).toHaveBeenCalled();
      expect(weightRangeStrategySyp).toHaveBeenCalled();
      expect(heightRangeStrategySyp).toHaveBeenCalled();
      expect(hairColorsStrategySyp).toHaveBeenCalled();
      expect(professionsStrategySyp).toHaveBeenCalled();
    });

    it('Should work with inmutable data', () => {
      const newInhabitantsList = filterData.executeAllStrategies(inhabitantsList);

      expect(newInhabitantsList).not.toBe(inhabitantsList);
    });
  });
  describe('#nameStrategy', () => {
    it('Should filter by name', () => {
      filterData.name = 'Fake 2';
      const filteredInhabitantsList = filterData.nameStrategy(inhabitantsList);

      expect(filteredInhabitantsList.length).toBe(1);
      expect(filteredInhabitantsList[0].id).toBe(1);
    });

    it('Should filter with case insensitive', () => {
      filterData.name = 'faKE 2';
      const filteredInhabitantsList = filterData.nameStrategy(inhabitantsList);

      expect(filteredInhabitantsList.length).toBe(1);
      expect(filteredInhabitantsList[0].id).toBe(1);
    });

    it('Should return all records when name is empty', () => {
      filterData.name = '';
      const filteredInhabitantsList = filterData.nameStrategy(inhabitantsList);

      expect(filteredInhabitantsList.length).toBe(3);
      expect(filteredInhabitantsList).toBe(inhabitantsList);
    });
  });

  describe('#sortingStrategy', () => {
    it('Should sort asc', () => {
      filterData.sorting.asc = true;
      const filteredInhabitantsList = filterData.sortingStrategy(
        JSON.parse(JSON.stringify(inhabitantsList))
      );

      expect(filteredInhabitantsList.length).toBe(3);
      expect(filteredInhabitantsList[1].name).toBe(inhabitantsList[2].name);
    });
    it('Should sort desc', () => {
      filterData.sorting.desc = true;
      const filteredInhabitantsList = filterData.sortingStrategy(
        JSON.parse(JSON.stringify(inhabitantsList))
      );

      expect(filteredInhabitantsList.length).toBe(3);
      expect(filteredInhabitantsList[0].name).toBe(inhabitantsList[1].name);
    });
  });
  describe('#ageRangeStrategy', () => {
    it('Should filter by age range', () => {
      filterData.ageRange.lower = 0;
      filterData.ageRange.upper = 10;
      const filteredInhabitantsList = filterData.ageRangeStrategy(inhabitantsList);

      expect(filteredInhabitantsList.length).toBe(1);
      expect(filteredInhabitantsList[0].age).toBe(10);
    });
    it('Should filter by age range including lower and upper limits', () => {
      filterData.ageRange.lower = 10;
      filterData.ageRange.upper = 20;
      const filteredInhabitantsList = filterData.ageRangeStrategy(inhabitantsList);

      expect(filteredInhabitantsList.length).toBe(2);
      expect(filteredInhabitantsList[0].age).toBe(20);
      expect(filteredInhabitantsList[1].age).toBe(10);
    });

    it('Should return a new instance of data', () => {
      filterData.ageRange.lower = 10;
      filterData.ageRange.upper = 30;
      const filteredInhabitantsList = filterData.ageRangeStrategy(inhabitantsList);

      expect(filteredInhabitantsList.length).toBe(3);
      expect(filteredInhabitantsList).not.toBe(inhabitantsList);
    });
  });

  describe('#weightRangeStrategy', () => {
    it('Should filter by weight range', () => {
      filterData.weightRange.lower = 20;
      filterData.weightRange.upper = 30;
      const filteredInhabitantsList = filterData.weightRangeStrategy(inhabitantsList);

      expect(filteredInhabitantsList.length).toBe(1);
      expect(filteredInhabitantsList[0].weight).toBe(20);
    });
    it('Should filter by weight range including lower and upper limits', () => {
      filterData.weightRange.lower = 20;
      filterData.weightRange.upper = 40;
      const filteredInhabitantsList = filterData.weightRangeStrategy(inhabitantsList);

      expect(filteredInhabitantsList.length).toBe(2);
      expect(filteredInhabitantsList[0].weight).toBe(20);
      expect(filteredInhabitantsList[1].weight).toBe(40);
    });

    it('Should return a new instance of data', () => {
      filterData.weightRange.lower = 20;
      filterData.weightRange.upper = 60;
      const filteredInhabitantsList = filterData.weightRangeStrategy(inhabitantsList);

      expect(filteredInhabitantsList.length).toBe(3);
      expect(filteredInhabitantsList).not.toBe(inhabitantsList);
    });
  });

  describe('#heightRangeStrategy', () => {
    it('Should filter by height range', () => {
      filterData.heightRange.lower = 0;
      filterData.heightRange.upper = 100;
      const filteredInhabitantsList = filterData.heightRangeStrategy(inhabitantsList);

      expect(filteredInhabitantsList.length).toBe(1);
      expect(filteredInhabitantsList[0].height).toBe(0);
    });
    it('Should filter by height range including lower and upper limits', () => {
      filterData.heightRange.lower = 0;
      filterData.heightRange.upper = 150;
      const filteredInhabitantsList = filterData.heightRangeStrategy(inhabitantsList);

      expect(filteredInhabitantsList.length).toBe(2);
      expect(filteredInhabitantsList[0].height).toBe(0);
      expect(filteredInhabitantsList[1].height).toBe(150);
    });

    it('Should return a new instance of data', () => {
      filterData.heightRange.lower = 0;
      filterData.heightRange.upper = 300;
      const filteredInhabitantsList = filterData.heightRangeStrategy(inhabitantsList);

      expect(filteredInhabitantsList.length).toBe(3);
      expect(filteredInhabitantsList).not.toBe(inhabitantsList);
    });
  });
  describe('#hairColorsStrategy', () => {
    it('Should filter by hair colors', () => {
      filterData.hairColors = ['pink', 'blue'];
      const filteredInhabitantsList = filterData.hairColorsStrategy(inhabitantsList);

      expect(filteredInhabitantsList.length).toBe(2);
      expect(filteredInhabitantsList[0].hair_color).toBe('blue');
      expect(filteredInhabitantsList[1].hair_color).toBe('pink');
    });

    it('Should return new instance of data when filter something', () => {
      filterData.hairColors = ['pink', 'blue'];
      const filteredInhabitantsList = filterData.hairColorsStrategy(inhabitantsList);

      expect(filteredInhabitantsList.length).toBe(2);
      expect(filteredInhabitantsList).not.toBe(inhabitantsList);
    });

    it('Should return all values when hairColors array is empty', () => {
      filterData.hairColors = [];
      const filteredInhabitantsList = filterData.hairColorsStrategy(inhabitantsList);

      expect(filteredInhabitantsList.length).toBe(3);
      expect(filteredInhabitantsList).toBe(inhabitantsList);
    });
  });
  describe('#professionsStrategy', () => {
    it('Should filter by professions', () => {
      filterData.professions = ['prof1'];
      const filteredInhabitantsList = filterData.professionsStrategy(inhabitantsList);

      expect(filteredInhabitantsList.length).toBe(2);
      expect(filteredInhabitantsList[0].professions).toContain('prof1');
      expect(filteredInhabitantsList[1].professions).toContain('prof1');
    });

    it('Should filter by professions with trim', () => {
      filterData.professions = ['prof1'];
      inhabitantsList[0].professions[0] = 'prof1   ';
      const filteredInhabitantsList = filterData.professionsStrategy(inhabitantsList);

      expect(filteredInhabitantsList.length).toBe(2);
      expect(filteredInhabitantsList[0].professions[0].trim()).toContain('prof1');
      expect(filteredInhabitantsList[1].professions).toContain('prof1');
    });

    it('Should return new instance of data when filter something', () => {
      filterData.professions = ['prof1'];
      const filteredInhabitantsList = filterData.professionsStrategy(inhabitantsList);

      expect(filteredInhabitantsList.length).toBe(2);
      expect(filteredInhabitantsList).not.toBe(inhabitantsList);
    });

    it('Should return all values when professions array is empty', () => {
      filterData.professions = [];
      const filteredInhabitantsList = filterData.professionsStrategy(inhabitantsList);

      expect(filteredInhabitantsList.length).toBe(3);
      expect(filteredInhabitantsList).toBe(inhabitantsList);
    });
  });
});
