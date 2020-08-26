const Service = require("egg").Service;

class NewsService extends Service {
  async list(page = 1) {
    //读取配置
    const { serverUrl, pageSize } = this.config.news;
    //使用内置的httpClient获取api
    const { data: newsList } = await this.ctx.curl(
      `${serverUrl}`,
      //, {
      //   data: {
      //     orderBy: '"$key"',
      //     startAt: `"${pageSize * (page - 1)}"`,
      //     endAt: `"${pageSize * page - 1}"`,
      //   },
      { dataType: "json" }
      //}
    );

    // const newsList = await Promise.all(
    //   Object.keys(idList).map((key) => {
    //     const url = `${serverUrl}/item/${idList[key]}.json`;
    //     return this.ctx.curl(url, { dataType: "json" });
    //   })
    // );
    // return newsList.map((res) => res.res);
    return newsList;
  }
}

module.exports = NewsService;
