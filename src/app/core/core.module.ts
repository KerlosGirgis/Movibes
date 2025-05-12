// src/app/core/core.module.ts
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from './services/auth.service';

@NgModule({
  providers: [
    AuthService,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. Import it only in AppModule.');
    }
  }
}
