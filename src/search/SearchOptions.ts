export default class SearchOptions<T> {
  private _searchOptions: T;

  constructor(searchOptions: T) {
    this._searchOptions = searchOptions;
  }

  get searchOptions(): T {
    return this._searchOptions;
  }

  set searchOptions(value: T) {
    this._searchOptions = value;
  }

}