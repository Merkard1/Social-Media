import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from '@/modules/notifications/entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const notification = this.notificationsRepository.create(
      createNotificationDto,
    );
    return this.notificationsRepository.save(notification);
  }

  findByUser(userId: string): Promise<Notification[]> {
    return this.notificationsRepository.find({
      where: { recipient: { id: userId } },
      relations: ['sender', 'recipient'],
    });
  }

  update(
    id: string,
    updateNotificationDto: UpdateNotificationDto,
  ): Promise<any> {
    return this.notificationsRepository.update(id, updateNotificationDto);
  }

  remove(id: string): Promise<any> {
    return this.notificationsRepository.delete(id);
  }
}
