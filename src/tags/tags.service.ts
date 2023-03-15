import { SingleTagDto } from './dto/single-tag.dto';
import { Tag } from 'src/tags/entities/tag.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    return await this.tagRepository.save(createTagDto);
  }

  async findAll() {
    return await this.tagRepository.find();
  }

  async findOne(tags: number): Promise<SingleTagDto> {
    // console.log(tags)
    const tag = await this.tagRepository.findOne({ where: { id: tags } });

    if (!tag) {
      throw new Error('data tidak ada');
    }

    return <SingleTagDto>{
      id: tag.id,
      name: tag.name,
      create_at: tag.create_at,
      update_at: tag.update_at,
      delete_at: tag.delete_at,
    };
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tag = await this.tagRepository.findOne({ where: { id: id } });

    if (!tag) {
      return new Error('data tidak ada');
    }

    tag.name = updateTagDto.name;

    await this.tagRepository.save(tag);

    return `This action updates a #${id} tag`;
  }

  async remove(id: number) {
    const tag = await this.tagRepository.findOne({ where: { id: id } });
    if (!tag) {
      return NotFoundError;
    }

    await this.tagRepository.delete(id);

    return `This action removes a #${id} tag`;
  }
}
