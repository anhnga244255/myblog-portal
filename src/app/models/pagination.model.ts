import { Json } from '../modules';

export class PaginationModel {
  @Json('totalItems')
  public totalItems: number = undefined;

  @Json('itemsPerPage')
  public itemsPerPage: number = undefined;

  @Json('data')
  public data: any = undefined;

  /**
   *
   * @param totalItems
   * @param itemsPerPage
   * @param data
   * @returns {PaginationModel}
   */
  public static toResponse(totalItems: number, itemsPerPage: number, data: any = []): PaginationModel {
    let model = new PaginationModel();
    model.totalItems = totalItems;
    model.itemsPerPage = itemsPerPage;
    model.data = data;
    return model;
  }

}
