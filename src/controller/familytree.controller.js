export default class FamilyTree {
  constructor(json) {
    this.relations = [];
    this.renderingUL = "";
    this.renderTree(this.getData(json).filter(el => el.isRoot));
  }

  getData(json) {
    let data = json;

    data.forEach(obj => {
      let relation = obj.split(" ");
      let child = relation[0];
      let parent = relation[1];

      if (this.isExistingParent(parent)) {
        this.parentExists(child, parent);
      } else {
        this.parentDoesntExist(child, parent);
      }
    });

    if (this.hasCycle()) {
      return null;
    } else {
      return this.relations;
    }
  }

  hasCycle() {
    let rootRelations = this.relations.filter(rel => rel.isRoot);

    if (this.relations.length > 0 && rootRelations.length == 0) {
      return true;
    }

    let continsCycle = false;
    rootRelations.forEach(rel => {
      continsCycle = continsCycle || this.cyclicDescent([], rel.name);
    });
  }

  cyclicDescent(array, last) {
    if (!this.isExistingParent(last)) {
      return false;
    }

    let nameRepeated = false;
    let childrenOfLast = this.relations.filter(rel => rel.name === last)[0]
      .children;

    array.push(last);

    for (let child of childrenOfLast) {
      if (array.filter(name => name === child).length > 0) {
        nameRepeated = true;
        break;
      } else {
        nameRepeated = nameRepeated || this.cyclicDescent(array, child);
      }
    }

    return nameRepeated;
  }

  parentExists(child, parent) {
    if (!this.hasChild(child, parent)) {
      this.relations.filter(rel => rel.name == parent)[0].children.push(child);
    }

    if (this.isExistingParent(child)) {
      this.removeIsRoot(child);
    }
  }

  parentDoesntExist(child, parent) {
    let isChild = this.isExistingChild(parent);

    this.relations.push({
      isRoot: !isChild,
      name: parent,
      children: [child]
    });

    if (this.isExistingParent(child)) {
      this.removeIsRoot(child);
    }
  }

  hasChild(child, parent) {
    if (this.isExistingParent(parent)) {
      return (
        this.relations
          .filter(rel => rel.name == parent)[0]
          .children.filter(ch => ch === child).length > 0
      );
    }
    return false;
  }

  isExistingChild(child) {
    let exists = false;
    this.relations.forEach(rel => {
      exists = exists || rel.children.filter(ch => ch === child).length > 0;
    });

    return exists;
  }

  isExistingParent(parent) {
    return this.relations.findIndex(rel => rel.name == parent) >= 0;
  }

  removeIsRoot(parent) {
    if (this.isExistingParent(parent)) {
      this.relations.filter(rel => rel.name === parent)[0].isRoot = false;
    }
  }

  hasChildren(parent) {
    var relation = this.relations.filter(rel => rel.name === parent)[0];
    if (relation) {
      return relation.children.length > 0;
    }

    return false;
  }

  getChildren(parent) {
    return this.relations.filter(rel => rel.name === parent)[0].children;
  }

  renderTree(arr) {
    arr.forEach(el => {
      this.renderingUL += `<li class="root">${el.name}</li>`;
      if (this.hasChildren(el.name)) {
        this.generateUL(el.children);
      }
    });
  }

  generateUL(arr) {
    this.renderingUL += `<ul>`;
    for (let k in arr) {
      this.renderingUL += `<li class="children">${arr[k]}</li>`;
      if (this.hasChildren(arr[k])) {
        this.generateUL(this.getChildren(arr[k]));
      }
    }
    this.renderingUL += `</ul>`;
  }
}
