export const updateTag = (
  tagName: string,
  keyName: string,
  keyValue: string,
  attrName: string,
  attrValue: string,
) => {
  const titleElem = document.head.querySelector('title');
  const metaElem = document.head.querySelector(
    `${tagName}[${keyName}="${keyValue}"]`,
  );

  // Удаляем элемент
  if (metaElem) {
    metaElem.parentNode.removeChild(metaElem);
  }

  // Затем добавляем снова для сохранения порядка
  if (titleElem && typeof attrValue === 'string') {
    const newMetaElem = document.createElement(tagName);
    newMetaElem.setAttribute(keyName, keyValue);
    newMetaElem.setAttribute(attrName, attrValue);

    // Всегда вставляем после title
    titleElem.parentNode.insertBefore(newMetaElem, titleElem.nextSibling);
  }
};

export const updateMeta = (name: string, content: string) => {
  updateTag('meta', 'name', name, 'content', content);
};

export const updateCustomMeta = (property: string, content: string) => {
  updateTag('meta', 'property', property, 'content', content);
};

export const updateLink = (rel: string, href: string) => {
  updateTag('link', 'rel', rel, 'href', href);
};

export const getWindowScroll = (): { left: number; top: number } => {
  const doc = document.documentElement;
  const left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

  return { left, top };
};

export const getWindowSize = (): { width: number; height: number } => {
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  return { width, height };
};
