
// 对特定的新闻社进行设计的类
public class FXNewsProvider {
  private IFXNewsListener newsListener;
  private IFXNewsPersister newsPersistener;

  public FXNewsProvider() {
    this.newsListener = new DowJonesNewsListener();
    this.newsLPersistener = new DowJonesNewsPersister();
  }
  public void getANdPersistNews() {
    String [] newsIds = newsListener.getAvailableNewsIds();
    if(ArrayUtils.isEmpty(newsIds)) {
      return;
    }

    for(String newsId : newsIds) {
      FXNewsBean newsBean = newsListener.getNewsByPK(newsId);
      newsPersister.persistNews(newsBean);
      newsListener.postProcessIfNecessary(newsId);
    }
  }
}
// 通过依赖注入的方式, 对任意一个新闻社设计的通用类
// 构造方法注入

public class FXNewsProvider {
  private IFXNewsListener newsListener;
  private IFXNewsPersister newsPersistener;

  public FXNewsProvider(IFXNewsListener newsListener, IFXNewsPersister newsPersister) {
    this.newsListener = newsListener;
    this.newsLPersister = newsPersister;
  }
  public void getANdPersistNews() {
    String [] newsIds = newsListener.getAvailableNewsIds();
    if(ArrayUtils.isEmpty(newsIds)) {
      return;
    }

    for(String newsId : newsIds) {
      FXNewsBean newsBean = newsListener.getNewsByPK(newsId);
      newsLPersister.persistNews(newsBean);
      newsListener.postProcessIfNecessary(newsId);
    }
  }
}

// setter 注入，从外部调用，延迟执行
public class FXNewsProvider {
  private IFXNewsListener newsListener;
  private IFXNewsPersister newsPersistener;

  public void getANdPersistNews() {
    String [] newsIds = newsListener.getAvailableNewsIds();
    if(ArrayUtils.isEmpty(newsIds)) {
      return;
    }

    for(String newsId : newsIds) {
      FXNewsBean newsBean = newsListener.getNewsByPK(newsId);
      newsLPersister.persistNews(newsBean);
      newsListener.postProcessIfNecessary(newsId);
    }
  }

  public setNewsListener(IFXNewsListener newsListener) {
    this.newsListener = newsListener
  }
  public setNewsPersister(IFXNewsPersister newsPersister) {
    this.newsPersister = newsPersister
  }
}
