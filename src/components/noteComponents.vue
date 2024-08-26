<template>
  <div>
    <el-card class="box-card">
      <h1>记事本应用</h1>

      <!-- 显示笔记列表 -->
      <el-list v-if="notes.length > 0" class="note-list">
        <el-list-item v-for="(note, index) in notes" :key="index" class="note-item">
          <el-checkbox v-if="batchDeleting" v-model="selectedNotes[index]" />
          <div class="note-text">{{ note }}</div>
        </el-list-item>
      </el-list>

      <el-empty v-else description="暂无笔记" />

      <!-- 写笔记按钮 -->
      <el-button type="primary" @click="showInput = true" v-if="!showInput && !batchDeleting" block>写笔记</el-button>

      <!-- 输入框和完成按钮 -->
      <div v-if="showInput">
        <el-input
            type="textarea"
            v-model="noteContent"
            placeholder="编輯你的笔记..."
            rows="4"
            resize="none"
            class="note-input"
        ></el-input>
        <el-button type="success" @click="completeNote" block>完成</el-button>
      </div>

      <!-- 批量删除按钮 -->
      <el-button type="danger" @click="toggleBatchDelete" v-if="!showInput && !batchDeleting && notes.length > 0" block>批量删除</el-button>

      <!-- 批量删除模式下的删除和取消按钮 -->
      <div v-if="batchDeleting" class="batch-actions">
        <el-button type="danger" @click="confirmDelete" block>删除</el-button>
        <el-button @click="toggleBatchDelete" block>取消</el-button>
      </div>
    </el-card>

    <!-- 确认删除对话框 -->
    <el-dialog
        title="确认删除"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleDialogClose"
    >
      <span>你确定要删除选中的笔记吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteSelectedNotes">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'NoteComponents',
  data() {
    return {
      showInput: false,
      batchDeleting: false,
      noteContent: "",
      notes: JSON.parse(localStorage.getItem("notes")) || [],
      selectedNotes: [],
      dialogVisible: false,
    };
  },
  methods: {
    completeNote() {
      if (this.noteContent.trim() !== "") {
        this.notes.push(this.noteContent);
        this.noteContent = "";
        this.saveNotes();
        this.showInput = false;
        this.$message.success('笔记已保存');
      }
    },
    saveNotes() {
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
    toggleBatchDelete() {
      this.batchDeleting = !this.batchDeleting;
      if (!this.batchDeleting) {
        this.selectedNotes = [];
      }
    },
    confirmDelete() {
      if (this.selectedNotes.length > 0) {
        this.dialogVisible = true;
      } else {
        this.$message.warning('请先选择要删除的笔记');
      }
    },
    deleteSelectedNotes() {
      this.notes = this.notes.filter((_, index) => !this.selectedNotes[index]);
      this.selectedNotes = [];
      this.saveNotes();
      this.dialogVisible = false;
      this.$message.success('已删除选中的笔记');
      this.batchDeleting = false;
    },
    handleDialogClose() {
      this.dialogVisible = false;
    }
  }
};
</script>

<style scoped>
.box-card {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
}

h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.note-list {
  margin-bottom: 20px;
}

.note-item {
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
}

.note-text {
  font-size: 18px;
  line-height: 1.6;
  flex-grow: 1;
}

.note-input {
  margin-bottom: 20px;
}

.batch-actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.dialog-footer {
  text-align: right;
}
</style>
