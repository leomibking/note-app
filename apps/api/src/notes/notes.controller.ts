import { Note } from '.prisma/client';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from '../../../../libs/framework/src/modules/prisma/prisma.service';
import { INote } from './notes.interfaces';

@Controller('/notes')
export class NotesController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async findAll(): Promise<Note[]> {
    return this.prismaService.note.findMany({ include: { tags: { include: { tag: true } } } });
  }

  @Post()
  async create(@Body() note: INote): Promise<Note> {
    const tags = await Promise.all(
      note.tags.map((tag) => {
        if (tag.id) {
          return this.prismaService.tag.findUnique({ where: { id: tag.id } });
        }
        return this.prismaService.tag.create({ data: { label: tag.label } });
      }),
    );
    return this.prismaService.note.create({
      data: {
        title: note.title,
        content: note.content,
        tags: {
          createMany: {
            data: tags.map((tag) => ({ tagId: tag.id })),
          },
        },
      },
    });
  }
}
