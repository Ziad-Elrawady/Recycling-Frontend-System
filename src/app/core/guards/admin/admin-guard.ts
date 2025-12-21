import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../models/role.enum';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLogged()) {
    router.navigate(['/login']);
    return false;
  }

  if (auth.getRole() !== Role.Admin) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
