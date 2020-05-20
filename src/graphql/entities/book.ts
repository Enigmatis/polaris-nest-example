import { RepositoryEntity } from "@enigmatis/polaris-nest";
import { Author } from "./author";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({
  implements: [RepositoryEntity],
})
export class Book extends RepositoryEntity {
  @Field()
  title?: string;
  @Field((type) => Author, { nullable: true })
  author?: Author;
}
