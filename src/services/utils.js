export function getList() {
  const listString = localStorage.getItem('LIST') || '[]';
  const list = JSON.parse(listString);
  return list;
}

export function addItem(item) {
  const list = getList();
  const stringList = JSON.stringify(list.push(item));
  localStorage.setItem('LIST', stringList);
}
