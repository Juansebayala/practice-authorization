import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Product } from '../../../product/domain/product.domain';
import { User } from '../../../product/domain/user.domain';
import { Action } from '../../application/enum/action.enum';

type Subjects = InferSubjects<typeof Product | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
      Ability as AbilityClass<AppAbility>,
    );

    if (user.isAdmin) {
      can(Action.Manage, 'all');
    } else if (user.isProducer) {
      can(Action.Create, Product);
      can(Action.Update, Product, { user: user.id });
    }

    can(Action.Read, Product, 'all');

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
