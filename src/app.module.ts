import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AppResolver } from './app.resolver';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    PrismaModule,
    ProfileModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      graphiql: false,
      // Apollo disables introspection in production, but Sandbox needs it to show the schema.
      introspection: true,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault() as unknown as NonNullable<
          ApolloDriverConfig['plugins']
        >[number],
      ],
    }),
  ],
  providers: [AppResolver],
})
export class AppModule {}
