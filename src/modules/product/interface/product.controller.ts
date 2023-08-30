import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { CaslAbilityFactory } from 'src/modules/common/infrastructure/casl/casl-ability.factory';
import { Action } from '../application/enum/action.enum';
import { User } from '../domain/user.domain';
import { Product } from '../domain/product.domain';

@Controller('product')
export class ProductController {
  constructor(private caslAbilityFactory: CaslAbilityFactory) {}

  @Get()
  findAll(): string {
    const user = {
      id: 1,
      isAdmin: false,
    };

    const ability = this.caslAbilityFactory.createForUser(user);
    if (ability.can(Action.Manage, 'all')) {
      return 'This action returns all products';
    } else {
      return 'Only admins!!!';
    }
  }

  @Get(':id')
  findOne(id: string): string {
    return `This action returns a product with id ${id}`;
  }

  @Post()
  create(): string {
    return 'This action adds a new product';
  }

  @Put(':id')
  update(id: string): string {
    const user = new User();
    user.id = 2;

    const product = new Product();
    product.user = 1;

    const ability = this.caslAbilityFactory.createForUser(user);
    if (ability.can(Action.Update, product)) {
      return `This action updates a product with id ${id}`;
    } else {
      return 'You can only update your products!!!';
    }
  }

  @Delete(':id')
  remove(id: string): string {
    return `This action removes a product with id ${id}`;
  }
}
