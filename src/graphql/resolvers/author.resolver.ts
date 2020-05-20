import { Args, Query, Resolver } from "@nestjs/graphql";
import * as AuthorApi from "../entities/author";

import { AuthorService } from "../services/author.service";
import { Author } from "../../dal/models/author";

@Resolver(() => AuthorApi.Author)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Query((returns) => [AuthorApi.Author])
  async authorsByName(@Args("name") id: string): Promise<Author[]> {
    return this.authorService.findByName(id);
  }
  // @Query((returns) => AuthorApi.Author)
  // async authorsById(@Args("id") id: string): Promise<Author | undefined> {
  //   return this.authorService.findOneById(id);
  // }
  //
  // @Mutation((returns) => AuthorApi.Author)
  // async createAuthor(
  //   @Args("firstName") firstName: string,
  //   @Args("lastName") lastName: string
  // ): Promise<Author[] | Author> {
  //   return await this.authorService.create(firstName, lastName) as any;
  // }
  //
  // @Mutation((returns) => Boolean)
  // async deleteAuthor(@Args("id") id: string) {
  //   return this.authorService.deleteAuthor(id);
  // }
}
