import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Web3ModalService } from '@services/web3modal.service';

export const HasNetworkIdGuard: CanActivateFn = () => {
  const web3ModalService = inject(Web3ModalService);
  return (web3ModalService.getState().selectedNetworkId || 0) > 0;
};
