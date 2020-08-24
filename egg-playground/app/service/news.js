const Service = require("egg").Service;

class NewsService extends Service {
  async list(page = 1) {
    //读取配置
    const { serverUrl, pageSize } = this.config.news;
    //使用内置的httpClient获取api
    const { data: idList } = await this.ctx.curl(
      `${serverUrl}/topstories.json`,
      {
        data: {
          orderBy: '"$key"',
          startAt: `"${pageSize * (page - 1)}"`,
          endAt: `"${pageSize * page - 1}"`,
        },
        dataType: "json",
      }
    );

    const newList = await Promise.all;
  }
}
