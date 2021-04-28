import { Module } from '@nestjs/common';
import { OrmModule } from '@note-app/framework';
import { ConfigModule } from './config.module';
import { NotesModule } from './notes/notes.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [ConfigModule, OrmModule, NotesModule, TagsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
