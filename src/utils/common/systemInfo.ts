interface SystemInfo {
  model: string; // 设备型号
  statusBarHeight: number | undefined; // 状态栏高度
  notchHeight?: number; // 刘海屏高度
  windowWidth: number; // 屏幕宽度
  windowHeight: number; // 屏幕高度
  networkType: string | undefined; // 网络状态
  batteryLevel: number; // 电量状态
  systemLanguage: string | undefined; // 系统语言
  pixelRatio: number; // 设备像素比
  systemVersion: string; // 系统版本号
}

/**
 * 获取设备信息
 * @returns 设备信息对象SystemInfo
 */
export const getSystemInfo = function (): SystemInfo {
  // 使用uni.getSystemInfoSync()方法获取设备信息
  const systemInfo = uni.getSystemInfoSync();
  // 判断设备是否为iPhone
  const isIphone = /iphone/gi.test(systemInfo.model);
  // 获取状态栏高度
  const statusBarHeight = systemInfo.statusBarHeight;
  let notchHeight;
  let networkType;
  let batteryLevel;

  // 如果是iPhone设备，则根据状态栏高度计算刘海屏高度
  if (isIphone) {
    if (statusBarHeight === 44) {
      notchHeight = 132; // iPhoneX等异形屏高度
    } else if (statusBarHeight === 20) {
      notchHeight = 88; // iPhone8等非异形屏高度
    }
  }

  // 使用uni.getNetworkType()方法获取当前的网络状态
  uni.getNetworkType({
    success(res) {
      networkType = res.networkType;
    },
  });

  // 使用uni.getBatteryInfoSync()方法获取当前设备的电量信息
  const batteryInfo = uni.getBatteryInfoSync();
  // eslint-disable-next-line prefer-const
  batteryLevel = batteryInfo.level;

  // 将所有设备信息保存到SystemInfo对象中，并将该对象返回
  return {
    model: systemInfo.model,
    statusBarHeight,
    notchHeight,
    windowWidth: systemInfo.windowWidth,
    windowHeight: systemInfo.windowHeight,
    networkType,
    batteryLevel,
    systemLanguage: systemInfo.language,
    pixelRatio: systemInfo.pixelRatio,
    systemVersion: systemInfo.system,
  };
};
