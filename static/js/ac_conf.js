// let ip = '192.168.50.102';
let ip = '127.0.0.1';
// let ip = '192.168.0.80';
// let ip = '222.128.55.242';
let imgIp = 'http://127.0.0.1:8089';
let sxCookie = 'SSO-PDID=NmY4NTQyZDYtYWU5Zi00ZDgyLTk0Y2UtYTVlNGY1MTNmNWUx'
// let sxCookie = ''
const conf = {
    city: "海宁",
    // 行政区编码
    cityCode: '330481',
    baiduAk: '9PPna2flj5FNI7c42RoYExqGMUzKzUko',
    // 开屏页领导配置
    leaderInfo: '各位领导',
    // 集控调用一次接线图url本地代理地址
    // jkProxyUrl: 'http://localhost:8088/',
    jkProxyUrl: 'http://test.ctgne.com/DPEWDL/',
    // jkProxyUrl: ' https://10.40.34.16:8091/',
    // jkProxyUrl: 'https://10.40.34.16:8091',
    // 集控调用一次接线图url地址的访问token
    // jkAccessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZW5jZW50IiwidmVyIjoiSldUMS4wIiwibGFzdF9sb2dpbiI6MTY4NzIyMjUzMSwicHJpIjpbIlRFTkNFTlRHUkFQSCJdLCJzY29wZSI6WyJhbGwiXSwiaXNzIjoibnJlYyIsImV4cCI6MTY5MzU2MjIyOCwiYXV0aG9yaXRpZXMiOlsiVEVOQ0VOVEdSQVBIIl0sImp0aSI6IjJkMjg5Y2U2LTMzY2ItNDhkNS1hNjRhLTcwMzc1ODBhODkyOSIsImNsaWVudF9pZCI6InRlbmNlbnQifQ.aYiWvzW3wU75QdKuZdwHKWU-00zfvu0U6mgmZOTBwBBxRdYrVtdnwg7xIw4s9ovZZ1cAuPGsKf07U0oY1b0SXY8C1VTS87t5QIrhOCKTT00ijrIB7hiV1mmUfhtZ-tQFZmGWmLAUonUr2HdGDF-a9cVoVPB-TUhyH_AJMmDteMI',
    jkAccessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ODFkYTJiODdhMzQ0YzNlYjc1YTg5MDQ5ZjZiMTkyYiIsInZlciI6IkpXVDEuMCIsInVzZXJfbmFtZSI6InRlbmNlbnQiLCJwcmkiOlsiVEVOQ0VOVEdSQVBIIl0sImxhc3RfbG9naW4iOjE2ODQwNDc1MjIwMDAsInNjb3BlIjpbImFsbCJdLCJpc3MiOiJucmVjIiwiZXhwIjoxNjg0NjUyMzIyODYwLCJqdGkiOiI2OGY1OTZmNS0wZjNhLTQwYzAtYjU3NS1kM2JhOTQ0NGEyNzYiLCJjbGllbnRfaWQiOiJmcm9udGVuZCJ9.NCBwDuRgETGcVue6YLdheu0mj40RLqhwSJtW4wqlgE9grUVMQbIo0EZ7yep8sdEsK9J6VAkt1bQLrSSrwZOzZvVGrlv0WFq_8e3rUYvSMM3ehjSEZ5rIpyiaj8ZxwOX1FscAVTjeq8W3RQkavQoHSt8R5cWp_tO27beQBi3aOpc',

}
var isTest = true; // 是否使用测试数据
// 根据流量判断管井是否打开，5000 为每日立方米
// var flowMinValue = 5000 / 24
var flowMinValue = 50

var HostConfig = {
    // AirCityPlayer: `43.227.255.154:20420/player`,
    AirCityPlayer: `${ip}:8081`,
    AirCityManager: `${ip}:8081`,
    fileIp: window.origin,
    //    AirCityPlayer: `${ip}:20412`,
    //    AirCityManager: `${ip}:20412`,
    Token: "",
    // iid: "2491140650845", // 实例id，配置后加载指定的实例，如果实例id不存在，则加载不出来三维场景；不配置，显示默认实例
      iid: "",
      sxCookie:sxCookie
}
