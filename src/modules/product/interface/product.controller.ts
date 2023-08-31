import { Controller, Get, Post, Put, Delete, UseGuards } from '@nestjs/common';
import {
  AppAbility,
  CaslAbilityFactory,
} from 'src/modules/common/infrastructure/casl/casl-ability.factory';
import { Action } from '../../common/application/enum/action.enum';
import { Product } from '../domain/product.domain';
import { PoliceGuard } from 'src/modules/common/application/guard/police-guard';
import { CheckPolicies } from 'src/modules/common/application/repository/police-guard.repository';

const product = new Product();
product.user = 1;

@Controller('product')
export class ProductController {
  constructor(private caslAbilityFactory: CaslAbilityFactory) {}

  @Get()
  findAll(): string {
    return 'This action returns all products';
  }

  @UseGuards(PoliceGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Manage, 'all'))
  @Get(':id')
  findOne(id: string): string {
    return `This action returns a product with id ${id}`;
  }

  @UseGuards(PoliceGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, product))
  @Post()
  create(): string {
    return 'This action adds a new product';
  }

  @UseGuards(PoliceGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, product))
  @Put(':id')
  update(id: string): string {
    return `This action updates a product with id ${id}`;
  }

  @UseGuards(PoliceGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Manage, 'all'))
  @Delete(':id')
  remove(id: string): string {
    return `This action removes a product with id ${id}`;
  }
}
