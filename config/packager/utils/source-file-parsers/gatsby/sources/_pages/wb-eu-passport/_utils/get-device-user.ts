import { USER_DEVICE_LIST } from '@/_pages/wb-eu-passport/_constants';

type DeviceType = {
  device: string;
  platform: RegExp;
};
export const getDeviceUser = (): string => {
  const { userAgent } = window.navigator;
  const userDevice = USER_DEVICE_LIST.find((device: DeviceType) =>
    device.platform.test(userAgent),
  );

  return userDevice ? userDevice.device : 'Неизвестная платформа';
};
