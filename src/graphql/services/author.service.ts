import { Inject, Injectable, Scope } from "@nestjs/common";
import {
  Like,
  PolarisConnection,
  PolarisRepository,
  PolarisGraphQLContext,
  DeleteResult,
} from "@enigmatis/polaris-core";
import { CONTEXT } from "@nestjs/graphql";
import { Author } from "../../dal/models/author";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";

@Injectable({ scope: Scope.REQUEST })
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: PolarisRepository<Author>,
    @InjectConnection()
    private readonly connection: PolarisConnection,
    @Inject(CONTEXT) private readonly ctx: PolarisGraphQLContext
  ) {}

  async create(firstName: string, lastName: string): Promise<Author | undefined> {
    const author = new Author(firstName, lastName);
    return ((await this.authorRepository.save(
      this.ctx,
      author
    )) as unknown) as Promise<Author | undefined>;
  }

  async findOneById(id: string): Promise<Author | undefined> {
    return this.authorRepository.findOne(this.ctx, id);
  }

  async findOneByName(name: string): Promise<Author | undefined> {
    return this.authorRepository.findOne(this.ctx, name);
  }

  async findByName(name: string): Promise<Author[]> {
    return this.authorRepository.find(this.ctx, {
      where: { firstName: Like(`%${name}%`) },
    });
  }

  async deleteAuthor(id: string): Promise<boolean> {
    const result: DeleteResult = await this.authorRepository.delete(
      this.ctx,
      id
    );
    return (
      result &&
      result.affected !== null &&
      result.affected !== undefined &&
      result.affected > 0
    );
  }
}
