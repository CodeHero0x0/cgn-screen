import axios from "axios"

/**
 * 河段
 */
export const getFanMonitorData = () => {
  return axios.get(`${HostConfig.fileIp}/static/config/data/fanMonitorData.json`)
}
