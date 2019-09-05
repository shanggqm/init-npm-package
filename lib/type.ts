
// koala的配置对象
export interface KoalaConfig {
  hosts: string;
  timeout?: number;
  auth: string;
  hostname: string;
  pathNQs: string;
}

// 从配置中心获取到的fe.properties原始数据格式
export interface OriginFEProperties{
    ['fe.static.app']: string;
    ['fe.static.version']: string;
    ['fe.static.url']: string;
    ['fe.static.publishType']: string;
}

// 经过翻译后的fe.properties数据格式
export interface SimpleFEProperties{
    app: string;
    beApp: string;
    appId?: string;
    version: string;
    url: string;
    publishType: string;
}

export interface ZKMonitorCache{
    oldOrigin?: OriginFEProperties;
    old?: SimpleFEProperties[];
    latestOrigin?:OriginFEProperties;
    latest?: SimpleFEProperties[];
    diff?: any
}

export interface Diff{
    key: string,
    type: string,
    location?: string,
    before: string|number,
    after: string|number
}
