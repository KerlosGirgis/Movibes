import { Injectable, inject } from '@angular/core';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendEmailVerification

} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  register(email: string, password: string, name: string, phone: string, age: number, extraData?:any) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        // إضافة بيانات في Firestore
        await setDoc(doc(this.firestore, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          name:name,
          phone:phone,
          age:age,

        });

        // إرسال إيميل تأكيد
        await sendEmailVerification(user);

        return userCredential;
      });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);

  }

  googleLogin() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider).then(async (result) => {
      const user = result.user;
      const userDocRef = doc(this.firestore, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      // لو المستخدم جديد، ضيفه في Firestore
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          name: user.displayName || '',
          photo: user.photoURL || ''
        });
      }
    });
  }

  logout() {
    return signOut(this.auth).then(() => {
    });
  }

  // get user data
  async getUserData(uid: string) {
    const userRef = doc(this.firestore, 'users', uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data() : null;
  }

  isLogged(): boolean {
    return !!this.auth.currentUser;
  }
}

