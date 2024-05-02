import { CanActivateFn, Router } from "@angular/router";
import { Web3ModalService } from "../services/web3modal.service";
import { inject } from "@angular/core";

export const HasNetworkIdGuard: CanActivateFn = () => {
  const web3ModalService = inject(Web3ModalService);
  return (web3ModalService.web3Modal.getState().selectedNetworkId || 0) > 0 ? true : inject(Router).createUrlTree(['']);
};
