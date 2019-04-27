export interface IRepository<Model> {
  findAll(): Promise<Model[]>;
  find(options?: any): Promise<Model[]>;
  findOne(options?: any): Promise<Model | undefined>;
  save(model: Model): Promise<Model>;
  delete(model: Model): Promise<void>;
}
