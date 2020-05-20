import { Module } from "@nestjs/common";
import { Author } from "../../dal/models/author";
import { AuthorResolver } from "../resolvers/author.resolver";
import { AuthorService } from "../services/author.service";
import { TypeOrmModule } from "@enigmatis/polaris-nest";

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorResolver, AuthorService],
})
export class AuthorModule {}
