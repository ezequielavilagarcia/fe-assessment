import { TestBed } from '@angular/core/testing';

import { Storage } from '@ionic/storage';

import { AuthService } from './auth.service';
import { User } from 'src/app/core/models/user';
import { APP_CONFIG, AppConfig } from 'src/app/app.config';

describe('AuthService', () => {
  beforeEach(() => {
    const APP_CONFIGStub: AppConfig = {
      apiEndpoint: 'fakeApiEndpoint',
      userDBKey: 'user'
    };

    class UserStub {
      username: string;
      dateOfBirth: Date;
      race: string;
      gender: string;

      constructor() {
        this.username = '';
        this.dateOfBirth = null;
        this.race = null;
        this.gender = null;
      }
      copy(user: User) {}
    }

    class StorageStub {
      set(key, value) {
        return new Promise((resolve, reject) => resolve(true));
      }
      get(key) {
        return new Promise((resolve, reject) => resolve(true));
      }
      remove(key) {
        return new Promise((resolve, reject) => resolve(true));
      }
    }
    TestBed.configureTestingModule({
      providers: [
        { provide: APP_CONFIG, useValue: APP_CONFIGStub },
        { provide: User, useClass: UserStub },
        { provide: Storage, useClass: StorageStub }
      ]
    });
  });

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
