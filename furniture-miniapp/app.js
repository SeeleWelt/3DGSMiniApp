const PRODUCTION_SHOWROOM_URL = "https://furniture.metop.com.cn/miniapp/";
const DEVTOOLS_SHOWROOM_URL = "http://127.0.0.1:4175/";

function resolveShowroomUrl() {
  try {
    const systemInfo = wx.getSystemInfoSync?.();
    const accountInfo = wx.getAccountInfoSync?.();
    const envVersion = accountInfo?.miniProgram?.envVersion;

    if (systemInfo?.platform === "devtools" && envVersion === "develop") {
      return DEVTOOLS_SHOWROOM_URL;
    }
  } catch (error) {
    console.warn("Resolve showroom url failed", error);
  }

  return PRODUCTION_SHOWROOM_URL;
}

App({
  globalData: {
    showroomUrl: resolveShowroomUrl()
  }
});
