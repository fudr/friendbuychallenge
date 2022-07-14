export interface IStore {
  set(key: string, value?: string): void;
  get(key: string): string;
  count(value: string): number;
}

export class Store implements IStore {
  count(value: string): number {
    let c = 0
    for(let cc in this.data)
    {
      if(this.get(cc) == value) c++
    }
    return c
    //return this.valueIndex[value]?.size || 0;
  }
  set(key: string, value?: string): void {
    const currentValue = this.data[key];
    this.data[key] = value;

    this.indexValue(key, currentValue);
    this.indexValue(key, value);
  }
  get(key: string): string {
    return this.data[key];
  }

  private indexValue(key, value) {
    if (!this.valueIndex[value]) this.valueIndex[value] = new Set<string>();

    if (value == undefined) {
      this.valueIndex[value].delete(key);
    } else {
      this.valueIndex[value].add(key);
    }
  }

  data: { [key: string]: string } = {};
  valueIndex: { [key: string]: Set<string> } = {};
}
