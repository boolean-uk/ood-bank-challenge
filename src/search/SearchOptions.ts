export default class SearchOptions<T> {
  searchOptions: T;

  constructor(searchOptions: T) {
    this.searchOptions = searchOptions;
  }

  setSearchOptions(value: T) {
    this.searchOptions = value;
  }
}
