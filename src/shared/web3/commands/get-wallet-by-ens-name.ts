import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { normalize } from 'viem/ens';

import { Command, FailureResult, OkResult } from 'shared/messaging';

import { Hex } from '../types';
import { hexSchema } from '../schema';

interface Payload {
  username: string;
}

type Response = Hex;

export class GetWalletByEnsNameCommand extends Command<Payload, Response> {
  public readonly name = 'GetWalletByEnsNameCommand' as const;

  constructor(public payload: Payload) {
    super();
  }

  async handle() {
    try {
      const client = createPublicClient({
        transport: http('https://eth.llamarpc.com'),
        chain: mainnet,
      });
      const maybeWallet = await client.getEnsAddress({
        name: normalize(this.payload.username),
      });
      const walletValidationResult = hexSchema.safeParse(maybeWallet);
      if (!walletValidationResult.success) {
        return new FailureResult();
      }
      return new OkResult(walletValidationResult.data);
    } catch (error) {
      this.captureException(error);
      return new FailureResult();
    }
  }
}
