import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsListComponent } from './friends-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('FriendsListComponent', () => {
  let component: FriendsListComponent;
  let fixture: ComponentFixture<FriendsListComponent>;

  let gnome;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FriendsListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(FriendsListComponent);
    component = fixture.componentInstance;

    gnome = {
      id: 2,
      name: 'fakeName',
      age: 35,
      hair_color: 'pink',
      weight: 12,
      height: 15,
      thumbnail: 'fakethumb.jpg',
      friends: [],
      professions: []
    };

    component.gnome = gnome;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Inhabitant has friends', () => {
    const friends = ['fake1', 'fake2', 'fake3'];
    beforeEach(() => {
      gnome.friends = friends;
      fixture.detectChanges();
    });
    it('Should show the list of friends', () => {
      const listOfFriendsElement = fixture.debugElement.queryAll(By.css('#friend-value'));
      const friendsValues = listOfFriendsElement.map(element => element.nativeElement.textContent);

      for (const friend of friendsValues) {
        expect(friends).toContain(friend);
      }
    });
  });

  describe('Inhabitant does not have any friend', () => {
    beforeEach(() => {
      gnome.firends = [];
      fixture.detectChanges();
    }),
      it('Should show a message when inhabitant does not have friends', () => {
        const noFriendsMessageElement = fixture.debugElement.query(By.css('#no-friends-message'));

        expect(noFriendsMessageElement).not.toBeNull();
      });
    it('Should hide friends list when inhabitant does not have friends', () => {
      const friendsMessageElement = fixture.debugElement.query(By.css('#friends-list'));

      expect(friendsMessageElement).toBeNull();
    });
  });
});
