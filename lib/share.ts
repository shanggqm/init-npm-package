const shareData = {
  logger: null
};
export function set(key: string, value: any) {
  shareData[key] = value;
}

export function get(key: string): any {
  return shareData[key];
}
