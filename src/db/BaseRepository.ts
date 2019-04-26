import { Repository, getRepository, ObjectType, FindManyOptions, FindConditions, UpdateResult, DeleteResult } from 'typeorm';

export abstract class BaseRepository<Model, Entity> {
  private context: Repository<Entity>;

  public constructor(type: ObjectType<Entity>) {
    this.context = getRepository(type);
  }

  public async findAll(): Promise<Model[]> {
    return (await this.context.find()).map(entity => this.toModel(entity));
  }

  public async find(options?: FindManyOptions<Entity>): Promise<Model[]>;
  public async find(conditions?: FindConditions<Entity>): Promise<Model[]>;
  public async find(conditions?: FindConditions<Entity> | FindManyOptions<Entity>): Promise<Model[]> {
    return (await this.context.find(conditions)).map(entity => this.toModel(entity));
  }

  public async findOne(options?: FindManyOptions<Entity>): Promise<Model | undefined>;
  public async findOne(conditions?: FindConditions<Entity>): Promise<Model | undefined>;
  public async findOne(conditions?: FindConditions<Entity> | FindManyOptions<Entity>): Promise<Model | undefined> {
    const entities = await this.context.find(conditions);
    if (entities.length === 0) {
      return undefined;
    }

    return this.toModel(entities[0]);
  }

  public async save(model: Model): Promise<Model> {
    return await this.context.save(model);
  }

  public async update(model: Model): Promise<UpdateResult> {
    // TODO: FIX UPDATE CIRTERIA
    return await this.context.update('', model);
  }

  public async delete(model: Model): Promise<DeleteResult> {
    // TODO: FIX DELETE CIRTERIA
    return await this.context.delete('');
  }

  protected abstract toModel(entity: Entity): Model;
}
