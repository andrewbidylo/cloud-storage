import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity, FileType } from './entities/file.entity';
import { Repository, In } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private repository: Repository<FileEntity>,
  ) {}

  findAll(userId: number, fileType: FileType) {
    const qb = this.repository.createQueryBuilder('file');

    qb.where('file.userId = :userId', { userId });

    if (fileType === FileType.PHOTOS) {
      qb.andWhere('file.mimetype ILIKE :type', { type: '%image%' });
    }

    if (fileType === FileType.TRASH) {
      qb.withDeleted().andWhere('file.deletedAt IS NOT NULL');
    }

    return qb.getMany();
  }

  create(file: Express.Multer.File, userId: number) {
    return this.repository.save({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      user: { id: userId },
    });
  }

  async remove(userId: number, ids: string) {
    const idsArray = ids.split(',');

    const qb = this.repository.createQueryBuilder('file');

    qb.where('id IN (:...ids) AND userId = :userId', {
      ids: idsArray,
      userId,
    });

    return qb.softDelete().execute();
  }
  async removePermanently(userId: number, ids: string) {
    const idsArray = ids.split(',');

    const filesToDelete = await this.repository
      .createQueryBuilder('file')
      .innerJoin('file.user', 'user', 'user.id = :userId', { userId })
      .where('file.id IN (:...ids)', { ids: idsArray })
      .getMany();

    for (const fileToDelete of filesToDelete) {
      const filePath = path.join('/uploads', fileToDelete.filename); // Adjust the folder path accordingly
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`File deleted from server: ${filePath}`);
        } else {
          console.log(`File not found in server folder: ${filePath}`);
        }
      } catch (error) {
        console.error(`Error deleting file from server: ${filePath}`);
        console.error(error);
      }
    }
    return this.repository
      .createQueryBuilder()
      .delete()
      .from(FileEntity)
      .where('id IN (:...ids)', { ids: idsArray })
      .execute();
  }
}
