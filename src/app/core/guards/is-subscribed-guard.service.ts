import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { Web3Service } from "@services/web3.service";

export const IsSubscribedGuard: CanActivateFn = () => {
  const web3Service = inject(Web3Service);
  const router = inject(Router);
    
  return web3Service.isSubscribed()
    .then((isSubscribed) => isSubscribed)
    .catch(() => router.navigate(['/not-subscribed']));
};