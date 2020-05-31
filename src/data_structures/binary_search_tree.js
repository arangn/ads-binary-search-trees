class BSTNode {
  constructor({ key, value, parent, left, right }) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(Node = BSTNode) {
    this.Node = Node;
    this._count = 0;
    this._root = undefined;
  }

  insert(key, value = true) {
    // TODO
    // current = root
    // parent = root
    // _________
    // while current != null
    // check if input is smaller/larger/equal than root
    // parent = current
    //  if smaller, current = current.left
    // if larger, current = current.right
    // compare again
    // ________
    // if (parent > input) parent.left = input
    // if (parent <= input ) parent.right = input
    let input = new this.Node({key: key, value: value})
    if (!this._root) {
      this._root = input
      this._count++
      return
    }

    let current = this._root
    let parent = current
    while (current != null){ // what is null here?
      parent = current
      if (parent.key > current.key){
        current = current.left
      }
      if (parent.key <= current.key){
        current = current.right
      }
    }
    if (parent.key > input.key){
      parent.left = input
      this._count++
    }
    if (parent.key < input.key){
      parent.right = input
      this._count++
    }
    if (parent.key == input.key){
      parent.value = input.value
    }

  }

  lookup(key) {
    if(!this._findNode(key)){
      return
    }
    return this._findNode(key).value
    // let node = this._root;
    //
    // while (node) {
    //   if (key < node.key) {
    //     node = node.left;
    //   } else if (key > node.key) {
    //     node = node.right;
    //   } else { // equal
    //     return node.value;
    //   }
    // }
  }

  _findNode(key){
    let node = this._root;

    while (node) {
      if (key < node.key) {
        node = node.left;
      } else if (key > node.key) {
        node = node.right;
      } else { // equal
        return node;
      }
    }
  }

  delete(key) {
    // TODO (tests first!)
    // *find toDelete (3)
    // parent = toDelete.parent()
    // *find rightmost child of toDelete.left
    // let rightmost = toDelete.left
    // current = rightmost
    // ______
    // until (rightmost == null)
    // current = rightmost
    // rightmost = rightmost.right
    // _____
    // *current replaces toDelete
    // rightSubtree = toDelete.right
    // current.right = rightSubtree
    // parent.left = current

    toDelete = 4
    parent = 6
    rightmost = 5
    current = null

    if(!this.lookup(key)) return
    let toDelete = this._findNode(key)
    let returnValue = toDelete.value
    let parent = toDelete.parent
    let rightmost = toDelete.left
    let current = rightmost
    console.log(returnValue)
    if(this._root == toDelete && !toDelete.left && !toDelete.right){
      // delete root node
      this._root = null
      this._count--
      return returnValue
    } else {
      // if there is no left child, go to the right
      if(!rightmost) rightmost = toDelete.right
      // if there's also no right child, then we're deleting a leaf
      if(!rightmost) {
        if(toDelete.parent){
          toDelete.parent.left = undefined
          this._count--
          return returnValue
        }
      }
      while (rightmost){
        current = rightmost
        rightmost = rightmost.right
      }
      let rightSubtree = toDelete.right
      current.right = rightSubtree
      if(this._root == toDelete){
        current.left = toDelete.left
        this._root = current
        this.count--
        return returnValue
      }
      parent.left = current
      current.left = toDelete.left
      toDelete = null
      this.count--
      return returnValue
    }
  }

  toDelete = 4
  parent = 6
  rightmost = null
  current = 5
  rightsubtree= 5

  count() {
    return this._count;
  }

  forEach(callback) {
    // This is a little different from the version presented in the video.
    // The form is similar, but it invokes the callback with more arguments
    // to match the interface for Array.forEach:
    //   callback({ key, value }, i, this)
    const visitSubtree = (node, callback, i = 0) => {
      if (node) {
        i = visitSubtree(node.left, callback, i);
        callback({ key: node.key, value: node.value }, i, this);
        i = visitSubtree(node.right, callback, i + 1);
      }
      return i;
    }
    visitSubtree(this._root, callback)
  }
}

export default BinarySearchTree;
