import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './infrastructure/casl/casl-ability.factory';

@Module({
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class CommonModule {}
