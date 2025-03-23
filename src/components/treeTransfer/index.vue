<!-- @format -->

<template>
    <el-dialog :visible="true">
        <div class="tree-transfer">
            <div class="transfer-container">
                <!-- 左侧面板 -->
                <div class="transfer-panel">
                    <div class="panel-header">
                        <span>
                            {{ sourceTitle }}
                        </span>
                        <span class="checked-num" v-if="leftCheckedKeys.length > 0">
                            ({{ leftCheckedKeys.length }}/{{ getSourceDataLength }})
                        </span>
                    </div>
                    <div class="panel-body">
                        <el-input v-model="leftFilterText" placeholder="请输入关键字过滤" size="small" />
                        <el-tree ref="leftTree" :data="sourceData" :show-checkbox="true" node-key="id"
                            :props="defaultProps" :default-expanded-keys="leftCheckedKeys"
                            :filter-node-method="filterNode" @check="handleLeftTreeCheck" />
                    </div>
                </div>

                <!-- 中间操作按钮 -->
                <div class="transfer-buttons">
                    <el-button type="primary" :disabled="leftCheckedKeys.length === 0" @click="addToRight"
                        class="bg ">{{ "添加租户"
                        }}<i class="el-icon-arrow-right el-icon--right"></i>
                    </el-button>
                    <el-button type="primary" :disabled="rightCheckedKeys.length === 0" @click="addToLeft"
                        class="bg-cancle bg">
                        <i class="el-icon-arrow-left"></i>{{
                        "取消添加" }}
                    </el-button>

                </div>

                <!-- 右侧面板 -->
                <div class="transfer-panel">
                    <div class="panel-header">
                        <span>
                            {{ targetTitle }}
                        </span>
                        <span class="checked-num" v-if="rightCheckedKeys.length > 0">
                            ({{ rightCheckedKeys.length }}/{{ getTargetDataLength }})
                        </span>
                    </div>
                    <div class="panel-body">
                        <el-input v-model="rightFilterText" placeholder="请输入关键字过滤" size="small" />
                        <el-tree ref="rightTree" :data="targetData" :show-checkbox="true" node-key="id"
                            :props="defaultProps" default-expand-all :default-expanded-keys="rightCheckedKeys"
                            :filter-node-method="filterNode" @check="handleRightTreeCheck" />
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
// import Vue from 'vue';
export default {
    name: "TreeTransfer",
    props: {
        // 源数据
        data: {
            type: Array,
            required: true,
        },
        target: {
            type: Array,
            default: () => []
        },
        // 默认已选值
        value: {
            type: Array,
            default: () => [],
        },
        // 左侧标题
        sourceTitle: {
            type: String,
            default: "源数据",
        },
        // 右侧标题
        targetTitle: {
            type: String,
            default: "目标数据",
        },
    },
    data() {
        return {
            // 源数据
            sourceData: [],
            targetData: [],
            // 左侧选中的节点keys
            leftCheckedKeys: [],
            // 右侧选中的节点keys
            rightCheckedKeys: [],
            // 左侧过滤文本
            leftFilterText: "",
            // 右侧过滤文本
            rightFilterText: "",
            // 配置项
            defaultProps: {
                children: "children",
                label: "label",
            },
        };
    },
    computed: {
        // 获取源数据长度
        getSourceDataLength() {
            return this.getAllKeys(this.sourceData).length;
        },
        // 获取目标数据长度
        getTargetDataLength() {
            return this.getAllKeys(this.targetData).length;
        },
    },
    watch: {
        data: {
            handler() {
                this.initData();
            },
            immediate: true,
        },
        leftFilterText(val) {
            this.$refs.leftTree.filter(val);
        },
        rightFilterText(val) {
            this.$refs.rightTree.filter(val);
        },
    },
    methods: {
        // 初始化数据

        initData() {
            let treeData = this._filter(this.data)

            const sourceData = this.compareTree(treeData, this.target)
            this.sourceData = sourceData;
            this.targetData = this.target;

        },
        _filter(arr) {
            if (Array.isArray(arr) && arr.length > 0) {
                return arr.map((item) => {

                    return {
                        label: item.name,
                        value: item.id,
                        id: item.id,
                        disabled: item.is_tenant,
                        children: item.children ? this._filter(item.children) : []
                    };
                });
            }
            return [];
        },
        // 分割数据
        splitData(sourceData, targetData, targetKeys, parent = null) {
            for (let i = sourceData.length - 1; i >= 0; i--) {
                const item = sourceData[i];
                if (targetKeys.includes(item.id)) {
                    sourceData.splice(i, 1);
                    const target = JSON.parse(JSON.stringify(item));
                    if (parent) {
                        const parentInTarget = this.findNodeById(targetData, parent.id);
                        if (parentInTarget) {
                            if (!parentInTarget.children) parentInTarget.children = [];
                            parentInTarget.children.push(target);
                        }
                    } else {
                        targetData.push(target);
                    }
                } else if (item.children && item.children.length > 0) {
                    const targetItem = this.findOrCreateNode(targetData, item);
                    this.splitData(item.children, targetData, targetKeys, item);
                    if (item.children.length === 0) {
                        delete item.children;
                    }
                    if (
                        targetItem &&
                        (!targetItem.children || targetItem.children.length === 0)
                    ) {
                        const index = targetData.indexOf(targetItem);
                        if (index > -1) {
                            targetData.splice(index, 1);
                        }
                    }
                }
            }
        },

        // 查找或创建节点
        findOrCreateNode(data, node) {
            let found = this.findNodeById(data, node.id);
            if (!found) {
                found = JSON.parse(JSON.stringify(node));
                found.children = [];
                data.push(found);
            }
            return found;
        },

        // 根据ID查找节点
        findNodeById(data, id) {
            for (const item of data) {
                if (item.id === id) {
                    return item;
                }
                if (item.children) {
                    const found = this.findNodeById(item.children, id);
                    if (found) return found;
                }
            }
            return null;
        },

        // 获取所有节点的key
        getAllKeys(data) {
            const keys = [];
            const traverse = (nodes) => {
                nodes.forEach((node) => {
                    keys.push(node.id);
                    if (node.children) {
                        traverse(node.children);
                    }
                });
            };
            traverse(data);
            return keys;
        },

        // 过滤节点方法
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },

        // 左侧树选中事件
        handleLeftTreeCheck(data, checked) {
            console.log("left", data, checked);

            this.leftCheckedKeys = checked.checkedKeys;
        },

        // 右侧树选中事件
        handleRightTreeCheck(data, checked) {
            this.rightCheckedKeys = checked.checkedKeys;

        },

        // 左侧全选事件
        handleLeftCheckAll(val) {
            this.$refs.leftTree.setCheckedNodes(val ? this.sourceData : []);
        },

        // 右侧全选事件
        handleRightCheckAll(val) {
            console.log("rightll");

            this.$refs.rightTree.setCheckedNodes(val ? this.targetData : []);
        },

        // 移动到右侧
        addToRight() {
            // 获取选中的完整节点
            const checkedNodes = this.$refs.leftTree.getCheckedNodes(true);

            const targetNode = this.$refs.leftTree.getCheckedNodes(false)



            if (checkedNodes.length === 0) return;
            targetNode.forEach(id => {
                this.$refs.leftTree.remove(id)
            })


            // // 深拷贝后，添加到目标数据
            if (this.rightCheckedKeys.length !== 0) {
                console.log(this.rightCheckedKeys);

                this.rightCheckedKeys = [...this.rightCheckedKeys]
            }
            this.targetData = [...JSON.parse(JSON.stringify(this.compareTree(this.data, this.sourceData)))];


            // 清空左侧选中的状态

            this.$refs.leftTree.setCheckedKeys([]);
            this.leftCheckedKeys = []

            this.$emit("treeChange", targetNode)
        },
        // 移动到左侧
        addToLeft() {
            const checkedNodes = this.$refs.rightTree.getCheckedNodes(true);

            const targetNode = this.$refs.rightTree.getCheckedNodes(false)



            if (checkedNodes.length === 0) return;
            targetNode.forEach(id => {
                this.$refs.rightTree.remove(id)
            })

            // // 深拷贝后，添加到目标数据

            this.sourceData = [...JSON.parse(JSON.stringify(this.compareTree(this.data, this.targetData)))];
            this.$refs.rightTree.setCheckedKeys([]);
            this.rightCheckedKeys = []

            this.$emit("treeChange", targetNode)

        },
        // 构造diff tree
        compareTree(raw, tree) {
            // 构造 tree 中所有节点的 Map（以 node.value 为 key）
            const treeMap = new Map();
            function mapTree(nodes) {
                nodes.forEach(n => {
                    treeMap.set(n.id, n);
                    if (n.children) {
                        mapTree(n.children);
                    }
                });
            }
            mapTree(tree);
            // 递归遍历 raw，并剔除在 tree 中存在的部分
            function subtract(rawNodes) {
                let result = [];
                rawNodes.forEach(rawNode => {

                    // console.log(treeMap.has(rawNode.value));

                    const inTree = treeMap.has(rawNode.id);
                    // 为确保 label 正确显示，取 rawNode.label，如不存在则 fallback 到 rawNode.name
                    const label = rawNode.label || rawNode.name || "";
                    if (!inTree) {
                        // raw 中的节点在 tree 中不存在，则完整保留
                        let newNode = { ...rawNode, label }; // 强制复制 label 字段
                        if (rawNode.children) {
                            newNode.children = subtract(rawNode.children);
                        }
                        result.push(newNode);
                    } else {
                        // raw 中的节点在 tree 中存在，则可能有部分子节点未选中
                        if (rawNode.children) {
                            const newChildren = subtract(rawNode.children);
                            if (newChildren.length > 0) {
                                let newNode = { ...rawNode, label, children: newChildren };
                                result.push(newNode);
                            }
                            // 若 newChildren 为空，则表示该节点在 tree 中已全部选中，不返回该节点
                        }
                    }
                });
                return result;
            }
            return subtract(raw);
        }

    },
}
</script>

<style scoped>
.bg-cancle {
    background-color: #F87579;
}

.bg-cancle:hover {
    background-color: #F87579;
}

.bg {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    width: 120px;
    height: 32px;
}

.tree-transfer {
    width: 100%;
}

.transfer-container {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}

.transfer-panel {
    width: 45%;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    overflow: hidden;
}

.panel-header {
    height: 40px;
    line-height: 40px;
    background-color: #f5f7fa;
    padding: 0 15px;
    border-bottom: 1px solid #dcdfe6;
}

.checked-num {
    font-size: 12px;
    color: #909399;
    margin-left: 4px;
}

.panel-body {
    padding: 10px;
    height: 300px;
    overflow: auto;
}

.panel-body .el-input {
    margin-bottom: 10px;
}

.transfer-buttons {
    display: flex;
    height: 270px;
    flex-direction: column;
    justify-content: center;
    padding: 0 10px;
    margin-top: 20px;
}

.transfer-buttons .el-button {
    margin: 5px 0;
}
</style>