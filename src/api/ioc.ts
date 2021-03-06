import { Container } from 'inversify';

import { TaskController } from '../api/controllers/task-controller';
import { TaskRepository } from '../data/task.repository';
import { UserRepository } from '../data/user.repository';
import { CryptoProvider } from '../providers/crypto.provider';
import { CryptoProviderInterface } from '../providers/crypto.provider.interface';
import { UserProvider } from '../providers/user.provider';
import { UserProviderInterface } from '../providers/user.provider.interface';
import { TaskRepositoryInterface } from '../repositories/task.repository.interface';
import { UserRepositoryInterface } from '../repositories/user.repository.interface';
import { TaskService } from '../services/task.service';
import { TaskServiceInterface } from '../services/task.service.interface';
import { UserService, UserServiceSettings } from '../services/user.service';
import { UserServiceInterface } from '../services/user.service.interface';
import { TYPES } from './ioc.types';

export module IoC {
    // Configure container
    export const container = new Container();

    export function configureContainer(constants: { [key: string]: any }): Container {
        // Constants
        container.bind<string>(TYPES.encryptionKey).toConstantValue(constants.encryptionKey);
        container.bind<number>(TYPES.sessionTimeout).toConstantValue(constants.sessionTimeout);

        // Providers
        container.bind<CryptoProviderInterface>(TYPES.CryptoProvider).to(CryptoProvider);
        container.bind<UserProviderInterface>(TYPES.UserProvider).to(UserProvider);

        // Repositories
        container.bind<TaskRepositoryInterface>(TYPES.TaskRepository).to(TaskRepository);
        container.bind<UserRepositoryInterface>(TYPES.UserRepository).to(UserRepository);

        // Services
        container.bind<TaskServiceInterface>(TYPES.TaskService).to(TaskService);
        container.bind<UserServiceInterface>(TYPES.UserService).to(UserService);
        container.bind<UserServiceSettings>(UserServiceSettings).toSelf();

        // Controllers
        container.bind<TaskController>(TaskController).toSelf();

        return container;
    }
}
