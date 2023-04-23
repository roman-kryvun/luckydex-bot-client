export default { foo: 'bar' }
//
//
// import * as firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';
//
// // import { UserService } from './user.service';
// // import { IUserData, IReleased } from '../models/user.model';
// //
// // import { POKEMON_ARR } from '../constants/pokemon.constant';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class StorageService {
//   db: any;
//   filters: any;
//
//   releasedPokemons: IReleased = { lucky: 0, shiny: 0 };
//
//   constructor(private userService: UserService) {
//     this.db = firebase.firestore().collection('luckydex');
//     this.filters = firebase.firestore().collection('filters');
//   }
//
//   getUserData(option?: string): Promise<number[]> {
//     return this.userService.getUserKey()
//       .then((userKey: string) =>
//         this.db.doc(userKey)
//           .get()
//           .then(doc => {
//             const data = this.emptyCheck(doc.data(), userKey);
//             return option === 'shiny' ? data.sdata : data.data;
//           })
//       );
//   }
//
//   getSelectedUser(userKey: string): Promise<any> {
//     const userData$ = this.db.doc(userKey).get();
//
//     return userData$.then((response: any) => {
//       const data = this.emptyCheck(response.data(), userKey);
//
//       return {
//         data: data.data && data.data,
//         sdata: data.sdata && data.sdata
//       };
//     });
//   }
//
//   setUserData(data: number[], option?: string): void {
//     this.userService.getUserKey()
//       .then((userKey) => {
//         const updateEntity = option === 'shiny' ? { sdata: data } : { data };
//         this.db.doc(userKey).update(updateEntity)
//       });
//   }
//
//   setNickname(nickname: string): Promise<void> {
//     return new Promise<void>((resolve) => {
//       const user = firebase.auth().currentUser;
//
//       user.updateProfile({'displayName': nickname })
//         .then(() => {
//           this.db.doc(user.email)
//             .update({ nickname })
//             .then();
//           resolve();
//         });
//     });
//   }
//
//   setInvisibleMode(value: boolean): Promise<void> {
//     return new Promise<void>((resolve) => {
//       const user = firebase.auth().currentUser;
//
//       this.db.doc(user.email).update({ isHidden: value }).then();
//       this.userService.setUserSettings({ isHidden: value });
//       resolve();
//     });
//   }
//
//   setDarkMode(value: boolean): Promise<void> {
//     return new Promise<void>((resolve) => {
//       const user = firebase.auth().currentUser;
//
//       this.db.doc(user.email).update({ darkMode: value }).then(r => console.log('r', r));
//       this.userService.setUserSettings({ darkMode: value });
//
//       if(value) {
//         document.body.classList.add('darkTheme');
//         document.body.classList.remove('lightTheme');
//       } else {
//         document.body.classList.add('lightTheme');
//         document.body.classList.remove('darkTheme');
//       }
//
//       resolve();
//     });
//   }
//
//   setShinydex(value: boolean): Promise<void> {
//     return new Promise<void>((resolve) => {
//       const user = firebase.auth().currentUser;
//
//       this.db.doc(user.email).update({ shinydex: value }).then(r => console.log('r', r));
//       this.userService.setUserSettings({ shinydex: value });
//       resolve();
//     });
//   }
//
//   getReleasedPokemons(): Promise<IReleased> {
//     if (this.releasedPokemons.lucky) {
//       return Promise.resolve(this.releasedPokemons);
//     } else {
//       return this.setUnreleasedPokemons().then(() => this.releasedPokemons);
//     }
//   }
//
//   private setUnreleasedPokemons(): Promise<void> {
//     const unreleasedData$ = this.filters.doc('unreleased').get();
//
//     return unreleasedData$.then((response: any) => {
//       const config = response.data();
//
//       config.common.forEach((id: number) => {
//         POKEMON_ARR[id - 1].unreleasedC = true;
//       });
//
//       config.shiny.forEach((id: number) => {
//         POKEMON_ARR[id - 1].unreleasedS = true;
//       });
//
//       this.releasedPokemons = {
//         lucky: POKEMON_ARR.length - config.common.length,
//         shiny: POKEMON_ARR.length - config.shiny.length
//       };
//     });
//   }
//
//   private emptyCheck(data, email: string): Partial<IUserData> {
//     if (!data || !data.data) {
//       const initData = {
//         data: [],
//         sdata: [],
//         nickname: email
//       };
//
//       this.db.doc(email).update(initData).then();
//
//       return initData;
//     }
//
//     return data;
//   }
// }
