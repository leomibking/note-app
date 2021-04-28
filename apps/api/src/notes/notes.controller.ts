import { Prisma } from '.prisma/client';
import { Note } from '.prisma/client';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PrismaService } from '../../../../libs/framework/src/modules/prisma/prisma.service';
import { INote } from './notes.interfaces';

@Controller('/notes')
export class NotesController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async findAll(
    @Query('title') title: string,
    @Query('label') label: string,
    @Query('order') order: string,
  ): Promise<[number, Note[]]> {
    const where: Prisma.NoteWhereInput = {
      title: { contains: title, mode: 'insensitive' },
      tags: { some: { tag: { label: { contains: label, mode: 'insensitive' } } } },
    };
    const orderBy: Prisma.NoteOrderByInput = {};
    const count = await this.prismaService.note.count({ where });
    const data = await this.prismaService.note.findMany({
      where,
      orderBy,
      include: { tags: { include: { tag: true } } },
    });
    return [count, data];
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
